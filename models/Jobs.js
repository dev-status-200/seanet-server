module.exports = (sequelize, DataTypes) => {
    const Jobs = sequelize.define("Jobs", {
        id:{
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey:true,
            allowNull: false,
            validate:{
                notEmpty: true
            }
        },
        job_start:{
            type:DataTypes.STRING
        },
        job_end:{
            type:DataTypes.STRING
        },
        job_active:{
            type:DataTypes.STRING
        },
    })
    return Jobs;
}