const routes = require('express').Router();
const { Clients } = require('../../models');
const { Shipments } = require('../../functions/associations/clientAssociations')

routes.post("/createClient", async(req, res) => {
    try {
        console.log(req.body)
        await Clients.create({
            name:req.body.name, contact:req.body.contact, address:req.body.address, active:1
        }).then(function(item){
            res.send(item)
          }).catch(function (err) {
            console.log(err)
          });
    }
    catch (error) {
      res.send(error)
    }
});

routes.get("/getClients", async(req, res) => {
    try {
        const result = await Clients.findAll({
            order: [['createdAt', 'DESC'], /* ['name', 'ASC'],*/]
        })
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.get("/orderTrack", async(req, res) => {
    try {
      console.log(req.headers.id)
        const result = await Clients.findOne({where:{id:req.headers.id},
          include:[{
            model:Shipments,
            order: [['createdAt', 'DESC'], /* ['name', 'ASC'],*/]
          }]})
        res.json({result:result});
    }
    catch (error) {
      res.send(error)
    }
});

routes.post("/testApi", async(req, res) => {
  console.log(req.body)
  console.log('API HIT')
    try {
      const accountSid = 'AC32f58a1ee5b2128888ea96a49c22816e'; 
      const authToken = '96a234abdced8e34257e66f7fdf6c993'; 
      const client = require('twilio')(accountSid, authToken); 
  
      // client.usage.records.list({limit: 20})
      // .then(records => records.forEach(r => console.log(r)));
  
      client.messages 
            .create({ 
               body: req.body.msg,
               from:'+15155166543',     
               to: `+${req.body.to}`
             }) 
            .then(message => {
              console.log(message)
              res.json(message);
            })
            .catch((x)=>console.log(x))
            .done()
        
    }
    catch (error) {
      res.send(error)
    }
});

module.exports = routes;