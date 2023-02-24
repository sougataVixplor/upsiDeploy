const dbInit = require("../config/createTable.js");
const { getBackup } = require("../util/backup-database");
const { setRestore } = require("../util/backup-database");
const { getFileName } = require("../util/backup-database");
const trackActivity = require("../util/activityTrack").trackActivity;
module.exports = (app, db) => {
  // app.post("/initiateDb", async (req, res) => {
  //   console.error("req user", req.user);
  //   try {
  //     console.log("initiating DB");
  //     var activityData = {
  //       activity: "Database Reset",
  //       description: "Database Reset Done",
  //       done_by: [req.user.userId],
  //       done_for: [],
  //     };
  //     var activity_id = await trackActivity(activityData, db);
  //     var resp = await dbInit.createTables(db);
  //     await new Promise((resolve) => setTimeout(resolve, 10000));
  //     console.log("DB initiated");
  //     var activityData = {
  //       activity: "Database Reset",
  //       description: "Database Reset Done",
  //       done_by: [req.user.userId],
  //       done_for: [],
  //     };
  //     var activity_id = await trackActivity(activityData, db);
  //     var activityData = { activityId: activity_id };
  //     activity_id = await trackActivity(activityData, db);
  //     res.status(200).json({ message: "database initiation successful" });
  //   } catch (error) {
  //     console.error("activity info add error", error);
  //     res.status(500).json({ message: "activity info add error:: " + error });
  //   }
  // });

  // app.post("/backup", async (req, res) => {
  //   console.error("req user", req.user);
  //   try {
  //     console.log("initiating backup");
  //     var activityData = {
  //       activity: "Database Backup",
  //       description: "Database Backup Done",
  //       done_by: [req.user.userId],
  //       done_for: [],
  //     };
  //     var activity_id = await trackActivity(activityData, db);
  //     var fileName = await getFileName("backup");
  //     console.log("backup fileName = ", fileName);
  //     var resp = await getBackup(fileName);
  //     console.log("backup Done");
  //     if (resp[0] == 0) {
  //       var activityData = { activityId: activity_id };
  //       activity_id = await trackActivity(activityData, db);
  //       res.status(200).json({ message: "database backup successful" });
  //     } else {
  //       res.status(500).json({ error: "backup error" });
  //     }
  //   } catch (error) {
  //     console.error("backup error", error);
  //     res.status(500).json({ message: "backup error:: " + error });
  //   }
  // });

  // app.post("/restore", async (req, res) => {
  //   console.error("req user", req.user);
  //   try {
  //     console.log("initiating restore");
  //     var activityData = {
  //       activity: "Database Restore",
  //       description: "Database Restore Done",
  //       done_by: [req.user.userId],
  //       done_for: [],
  //     };
  //     var activity_id = await trackActivity(activityData, db);
  //     var fileName = await getFileName("restore");
  //     console.log("restore fileName = ", fileName);
  //     var resp = await setRestore(fileName);
  //     await new Promise((resolve) => setTimeout(resolve, 10000));
  //     console.log("restore Done");
  //     if (resp[0] == 0) {
  //       var activityData = {
  //         activity: "Database Restore",
  //         description: "Database Restore Done",
  //         done_by: [req.user.userId],
  //         done_for: [],
  //       };
  //       var activity_id = await trackActivity(activityData, db);
  //       var activityData = { activityId: activity_id };
  //       activity_id = await trackActivity(activityData, db);
  //       res.status(200).json({ message: "database restore successful" });
  //     } else {
  //       res.status(500).json({ message: "restore error" });
  //     }
  //   } catch (error) {
  //     console.error("restore error", error);
  //     res.status(500).json({ message: "restore error:: " + error });
  //   }
  // });
};
