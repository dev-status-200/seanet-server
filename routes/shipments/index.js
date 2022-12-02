const routes = require('express').Router();
const Sequelize = require('sequelize');
const { Clients } = require('../../models');
const { Shipments } = require('../../functions/associations/clientAssociations')
const Op = Sequelize.Op;

routes.post("/createShipment", async(req, res) => {
    try {
        console.log(req.body)
        await Shipments.create({
            referenceInvoice:req.body.referenceInvoice,
            consignment:req.body.consignment,
            vessel:req.body.vessel,
            gd:req.body.gd,
            contacts:req.body.contacts,
            active:1,
            status:req.body.status,
            statusNo:req.body.statusNo,
            terminal:req.body.terminal,
            container:req.body.container,
            ClientId:req.body.ClientId
        },{include:[{model:Clients}]}).then(function(item){ res.send(item) })
        .catch(function (err) { console.log(err); res.send('error') });
    }
    catch (error) {
      res.send(error)
    }
});

routes.get("/getShipment", async(req, res) => {
    try {
        const result = await Shipments.findAll({
            order: [['createdAt', 'DESC'], /* ['name', 'ASC'],*/],
            include:[{
                model:Clients,
                attributes:['name']
            }]
        })
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.post("/editShipment", async(req, res) => {
    try {
        console.log('Request Got For Edit');
        console.log(req.body)
        const result = await Shipments.update({
            referenceInvoice:req.body.referenceInvoice, consignment:req.body.consignment, 
            vessel:req.body.vessel, gd:req.body.gd, terminal:req.body.terminal, contacts:req.body.contacts,
            container:req.body.container
        },{where:{id:req.body.id}})
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.post("/statusUpdate", async(req, res) => {
    try {
        console.log('Request Got')
        console.log(req.body)
        const result = await Shipments.update({status:req.body.status, statusNo:req.body.statusNo},{where:{id:req.body.id}})
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.get("/getPortShipment", async(req, res) => {
    try {
        const result = await Shipments.findAll({
            where: {
                [Op.and]:[
                    { statusNo:{[Op.ne]:'0'} },
                    { statusNo:{[Op.ne]:'1'} },
                    { statusNo:{[Op.ne]:'32'} },
                    { statusNo:{[Op.ne]:'33'} },
                ]        
            },
        order: [['createdAt', 'DESC'], /* ['name', 'ASC'],*/],
        include:[{
            model:Clients,
            attributes:['name']
        }]})
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.get("/getCompletedShipments", async(req, res) => {
    try {
        const result = await Shipments.findAll({
            where: {
                [Op.or]:[
                    { statusNo:{[Op.eq]:'32'} },
                    { statusNo:{[Op.eq]:'33'} },
                ]        
            },
        order: [['createdAt', 'DESC'], /* ['name', 'ASC'],*/],
        include:[{
            model:Clients,
            attributes:['name']
        }]})
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

module.exports = routes;