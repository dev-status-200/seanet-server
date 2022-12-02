const {DataTypes} = require('sequelize')

const { Users, PayRequests } = require("../../models/");


// ============================ CLIENTS TO ORDERS ASSOCIATIONS ============================ //

Users.hasMany(PayRequests,{
    foriegnKey:{
        type: DataTypes.UUID,
        allowNull:false
    }
});
PayRequests.belongsTo(Users)

Users.hasMany(PayRequests,{
    foriegnKey:{
        type: DataTypes.UUID,
    }
});
PayRequests.belongsTo(Users, { as: 'approver' })

module.exports = { PayRequests }