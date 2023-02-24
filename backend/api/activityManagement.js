const trackActivity = require("../util/activityTrack").trackActivity;
var sequelize = require("sequelize");
const Op = sequelize.Op;
var pattern = /(\d{2})\/(\d{2})\/(\d{4})/;
const pattern1 = /(\d{2})\-(\d{2})\-(\d{4})/;
const env = process.env.NODE_ENV || "development";
var config = require("../config/config")[env];
var backendUrl = config.backendUrl;
const getCredentialsText = require("../util/common").getCredentialsText;
const getPdf = require("../util/common").getPdf;
const fs = require("fs");
const localUpload = require("../util/storageLocal").upload;
const localgetPublicUrl = require("../util/storageLocal").getPublicUrl;

const sentMail = require("../util/SentMail");
const { url } = require("inspector");

module.exports = (app, db) => {
  async function getDate(dateString) {
    var newDate = new Date();
    if (dateString.includes("/")) {
      newDate = new Date(
        new Date(dateString.replace(pattern, "$3-$2-$1")).setHours(0, 0, 0)
      );
    } else {
      newDate = new Date(
        new Date(dateString.replace(pattern1, "$3-$2-$1")).setHours(0, 0, 0)
      );
    }
    // offset = 5.5
    // newDate = newDate + (3600000 * offset)
    // newDate = new Date(newDate)
    return newDate;
  }

  async function getNames(mailIds) {
    var names = "";
    for (i = 0; i < mailIds.length; i++) {
      var data = await db.Employees.findOne({
        where: {
          email: mailIds[i],
          isManagement: false,
        },
      });
      if (data) {
        names = names + data.name + ",";
      } else {
        names = names + mailIds[i] + ",";
      }
    }
    names = names.substring(0, names.length - 1);
    return names;
  }

  app.post("/mail", async (req, res) => {
    try {
      var out = await localUpload.fields([{ name: "attachment", maxCount: 1 }])(
        req,
        res,
        async function (err) {
          try {
            if (err) {
              console.log(err);
              throw err;
            } else {
              var url = null;
              attachmentFile = [];
              if (req.files["attachment"] && req.files["attachment"][0]) {
                url = await localgetPublicUrl(
                  req.files["attachment"][0].filename
                    ? req.files["attachment"][0].filename
                    : req.files["attachment"][0].key
                    ? req.files["attachment"][0].key
                    : req.files["attachment"][0].originalname
                );
              }
              console.log(req.body.data);
              req.body.data = JSON.parse(req.body.data);
              console.log(req.body.data);

              var send_to = req.body.data.to;
              var body = req.body.data.body || "";
              var subject = req.body.data.subject || "";
              var sent_to_info = await getNames(send_to);
              var activityData = {
                activity: "Sent Mail",
                description: subject,
                done_by: [req.user.userId],
                done_for: [sent_to_info],
              };
              var activity_id = await trackActivity(activityData, db);
              var nowDate = new Date();
              var companyData = await db.Company.findOne({
                where: {
                  id: req.user.companyId,
                },
              });

              var adminData = await db.Employees.findAll({
                where: {
                  is_compliance: true,
                  isManagement: false,
                },
              });
              var text = "";
              // var text = "Dear Insider,\n\n"
              text = text + body + "\n\n\n";
              text =
                text +
                "Yours faithfully,\nfor " +
                companyData.name +
                "\n" +
                adminData[0].name +
                "\nCompliance Officer";

              // sending mail
              var mailresponses = [];
              if (url) {
                // doc = await getPdf(url);
                attachmentFile.push({
                  filename:
                    "attachment." + url.split(".")[url.split(".").length - 1],
                  path: url,
                });
              }
              for (x = 0; x < send_to.length; x++) {
                text = await getCredentialsText(text, [backendUrl, send_to[x]]);
                var mailRes = await sentMail.sentMail({
                  to: send_to[x],
                  subject: subject,
                  text: text,
                  attachments: attachmentFile,
                });
                mailresponses.push(mailRes);
              }
              var activityData = { activityId: activity_id };
              activity_id = await trackActivity(activityData, db);
              if (url) {
                fs.unlinkSync(url);
              }
              res.status(200).json({
                message: "mail sent successfully",
                mailresponses: mailresponses,
              });
            }
          } catch (err) {
            console.log(err);
            res.status(500).json({ message: "Error to create user" });
          }
        }
      );
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Error to create user" });
    }
  });
};
