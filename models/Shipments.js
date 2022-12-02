module.exports = (sequelize, DataTypes) => {
    const Shipments = sequelize.define("Shipments", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        referenceInvoice:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        consignment:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        active:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        vessel:{
            type:DataTypes.STRING
        },
        container:{
            type:DataTypes.STRING
        },
        terminal:{
            type:DataTypes.STRING
        },
        gd:{
            type:DataTypes.STRING
        },
        status:{
            type:DataTypes.STRING
        },
        statusNo:{
            type:DataTypes.STRING
        },
        contacts:{
            type:DataTypes.STRING
        }
    })
    return Shipments;
}