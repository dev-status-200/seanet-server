module.exports = (sequelize, DataTypes) => {
    const Permissions = sequelize.define("Permissions", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        f1:{
            type:DataTypes.STRING,
        },
        f2:{
            type:DataTypes.STRING,
        },
        f3:{
            type:DataTypes.STRING,
        },
        f4:{
            type:DataTypes.STRING,
        },
        f5:{
            type:DataTypes.STRING,
        },
        f6:{
            type:DataTypes.STRING,
        },
        f7:{
            type:DataTypes.STRING,
        },
        f8:{
            type:DataTypes.STRING,
        },
        f9:{
            type:DataTypes.STRING,
        },
        f10:{
            type:DataTypes.STRING,
        },
        f11:{
            type:DataTypes.STRING,
        },
        f12:{
            type:DataTypes.STRING,
        },
        f13:{
            type:DataTypes.STRING,
        },
        f14:{
            type:DataTypes.STRING,
        },
        f15:{
            type:DataTypes.STRING,
        },
        f16:{
            type:DataTypes.STRING,
        },
        f17:{
            type:DataTypes.STRING,
        },
        f18:{
            type:DataTypes.STRING,
        },
        f19:{
            type:DataTypes.STRING,
        },
        f20:{
            type:DataTypes.STRING,
        },
    })
    return Permissions;
}