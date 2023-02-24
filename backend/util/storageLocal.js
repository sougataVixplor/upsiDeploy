var multer = require("multer");
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./uploads");
  },
  filename: function (req, file, callback) {
    // console.error('file.originalname.split(".") = ',file.originalname.split("."))
    temp = file.originalname.split(".");
    type = temp[temp.length - 1];
    console.error("type = ", type);
    if (type == "xlsx") {
      callback(null, file.fieldname + "-" + Date.now() + ".xlsx");
    } else {
      var name = file.originalname.split(".");
      name.splice(file.originalname.split(".").length - 1, 1);
      name = name.join(".");
      var ext =
        file.originalname.split(".")[file.originalname.split(".").length - 1];
      callback(null, name + "-" + Date.now() + "." + ext);
    }
  },
});

module.exports.upload = multer({
  storage: storage,
});
module.exports.getPublicUrl = (originalName) => {
  const originalPath = "./uploads/" + originalName;
  // console.log(">>>>>>>>>>>>>>>>>>>> originalPath = ",originalPath)
  return originalPath;
};
