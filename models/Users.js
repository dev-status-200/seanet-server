module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        f_name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        l_name:{
            type:DataTypes.STRING,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        email:{
            type:DataTypes.STRING,
        },
        username:{
            type:DataTypes.STRING,
        },
        password:{
            type:DataTypes.STRING,
        },
        contact:{
            type:DataTypes.STRING,
        },
        address:{
            type:DataTypes.STRING,
        },
        cnic:{
            type:DataTypes.STRING,
        },
        designation:{
            type:DataTypes.STRING
        },
        active:{
            type:DataTypes.STRING,
        },
        signature:{
            type:DataTypes.STRING,
        },
        status:{
            type:DataTypes.STRING,
        },
        type:{
            type:DataTypes.STRING
        },
        
    })
    return Users;
}