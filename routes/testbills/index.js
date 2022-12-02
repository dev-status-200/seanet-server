const routes = require('express').Router();
//const { Orders } = require('../../functions/associations/clientAssociations');
const { Testbills } = require('../../models/');
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

routes.post("/createOrder", async(req, res) => {
    // pending => order not started
    // pipeline => order started for delivery
    // complete => order delivered
    try {
        console.log(req.body);
        const find_result = await Testbills.findAll({
          where: {
            [Op.or]:[
              {invoice:req.body.invoice},{job:req.body.job},
              {machineNo:req.body.machineNo}, {code:req.body.code}
            ]
          }
        });
        if(find_result.length==0){
          const result = await Testbills.create({
              invoice:req.body.invoice, job:req.body.job,name:req.body.name,
              machineNo:req.body.machineNo, balance:req.body.balance, code:req.body.code, 
              status:'pending', active:1
          });
          res.json({res:'success', data:result});
        }else{
          res.json({res:'failed', data:[]});
        }
    }
    catch (error) {
      res.send(error)
    }
  }
);

routes.get("/getOrders", async(req, res) => {
    try {
        console.log(req.body);
        const result = await Testbills.findAll({
          // include:[
          //   {
          //     model:Clients,
          //     attributes:['id','name']
          //   },
          // ],
          order: [['createdAt', 'DESC'], /* ['name', 'ASC'],*/],
          //raw:true
        });
        res.send(result);
    }
    catch (error) {
      res.send(error);
    }
  }
);

routes.put("/editOrder", async(req, res) => {
    try {
      console.log(req.body)
        await Testbills.update({
            invoice:req.body.invoice, job:req.body.job, status:'pending', active:1, name:req.body.name,
            machineNo:req.body.machineNo, balance:req.body.balance, code:req.body.code
        },{ where:{id:req.body.id} })
        res.json({res:'success'});
    }
    catch (error) {
      res.send(error)
    }
  }
);

routes.post("/generateLog", async(req, res) => {
    // pending => order not started
    // pipeline => order started for delivery
    // complete => order delivered
    try {
        const update = await Testbills.update({
          status:'pipeline'
        },{ where:{code:req.body.code, status:'pending'} })
        res.send(update);
    }
    catch (error) {
      res.send(error)
    }
  }
);

routes.get("/getPipelineOrders", async(req, res) => {
    // pending => order not started
    // pipeline => order started for delivery
    // complete => order delivered
    try {
        const result = await Testbills.findAll({where:{status:'pipeline'}});
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
  }
);

routes.post("/completeOrder", async(req, res) => {
    // pending => order not started
    // pipeline => order started for delivery
    // complete => order delivered
    try {
        const result = await Testbills.update({
          status:'complete'
        },{ where:{code:req.body.code, status:'pipeline'}})
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
  }
);

routes.post("/createBulkOrders", async(req, res) => {
    try {
        console.log(req.body)
        const result = await Testbills.bulkCreate(req.body.data)
        res.json({status:'success', result:result});
    }
    catch (error) {
      res.send(error)
    }
  }
);


module.exports = routes;
