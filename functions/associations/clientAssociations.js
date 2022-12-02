const {DataTypes} = require('sequelize');

const { Clients, Shipments } = require("../../models/");


// ============================ CLIENTS TO ORDERS ASSOCIATIONS ============================ //

Clients.hasMany(Shipments,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
Shipments.belongsTo(Clients)

module.exports = { Shipments }