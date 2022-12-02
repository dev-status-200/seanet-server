const routes = require('express').Router();
const Sequelize = require('sequelize');
const { Users } = require('../../models');
const { Jobs } = require('../../functions/associations/riderAssociations');
const Op = Sequelize.Op;
const { dynamoClient } = require("../../dynamo")
const moment = require('moment')

routes.get("/getAllRiders", async(req, res) =>  {
    try {
        console.log(req.body)
        const result = await Users.findAll({
            where:{type:'Rider'},
            include:[{
                model:Jobs
            }]
        })
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.get("/getAllPortUsers", async(req, res) =>  {
    try {
        console.log(req.body)
        const result = await Users.findAll({
            where:{
                //firstName: { [Op.in]: ["Nathan", "Jane"] },
                type:{[Op.in]:["PortUser","Rider"]}
            },
            include:[{
                model:Jobs
            }]
        })
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.post("/createRiderRoute", async(req, res) =>  {

    const data = { TableName:'routes', Item:{ id:req.body.id, routes:[req.body.Routes] } }
    try {
        const result = await dynamoClient.put(data).promise();
        await Jobs.create({UserId:req.body.id, job_active:0})
        res.json({status:'success', result:result});

    } catch(err) {
        res.json({status:'error'}) 
    }
});

routes.post("/startRoute", async(req, res) =>  {
    const data = { 
            TableName:'routes', 
            Item:{ id:req.body.id, routes:[req.body.Routes] } 
        }
        const date = moment().tz('Asia/Karachi').format('MMMM Do YYYY, h:mm:ss a')
    try {
        await Jobs.update({job_active:1, job_start:date}, {where:{UserId:req.body.id}})
        const result = await dynamoClient.put(data).promise();
        res.json({status:'success', result:result});

    } catch(err) {
        res.json({status:'error'})
        console.log(err)
    }
});

routes.post("/endRoute", async(req, res) =>  {
    const date = moment().tz('Asia/Karachi').format('MMMM Do YYYY, h:mm:ss a')
    try {
        await Jobs.update({job_active:0, job_end:date}, {where:{UserId:req.body.id}})
        res.json({status:'success'});

    } catch(err) {
        res.json({status:'error'})
        console.log(err)
    }
});

routes.post("/addRouteUpdate", async(req, res) =>  {
    let id = req.body.id
    try {
        const data = {
            TableName: 'routes',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     
            Key: {
                id
            },
            UpdateExpression: "SET #attrName = list_append(#attrName, :attrValue)",
            ExpressionAttributeNames: {
                "#attrName": "routes"
            },
            ExpressionAttributeValues: {
                ":attrValue": [req.body.Routes],
            }
        };
        dynamoClient.update(data, function(err, data) {
            if (err) console.log(err);
            else console.log(data);

            res.send({status:"success"})
        });
    } catch (error) {
        res.send({status:"error"})
    }
});

routes.get("/getRoute", async(req, res) =>  {
    let id = req.headers.id
    const data = { 
        TableName:'routes',
        Key: {
            id
        },
    }
    try {
        const result = await dynamoClient.get(data).promise();
        console.log(result)
        res.json({status:'success', result:result});
    } catch (error) {
        res.json({status:'error'});
    }
});

module.exports = routes;