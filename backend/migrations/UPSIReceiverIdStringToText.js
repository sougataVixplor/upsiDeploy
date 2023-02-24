module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("UPSILogs", "receiver_id", {
        type: Sequelize.DataTypes.TEXT,
        allowNull: true,
      }),
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.changeColumn("UPSILogs", "receiver_id", {
        type: Sequelize.DataTypes.STRING,
        allowNull: true,
      }),
    ]);
  },
};
