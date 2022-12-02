const {DataTypes} = require('sequelize')

const { Users, Permissions } = require("../../models/");


// ============================ CLIENTS TO ORDERS ASSOCIATIONS ============================ //

Users.hasOne(Permissions,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
Permissions.belongsTo(Users)

module.exports = { Permissions }