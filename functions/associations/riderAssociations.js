const {DataTypes} = require('sequelize')

const { Users, Jobs } = require("../../models/");

// ============================ CLIENTS TO ORDERS ASSOCIATIONS ============================ //

Users.hasOne(Jobs,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
Jobs.belongsTo(Users)

module.exports = { Jobs }