const routes = require('express').Router();
const jwt = require('jsonwebtoken');
const { Users } = require('../../models');
const { Permissions } = require('../../functions/associations/userAssociation');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

routes.post("/login", async(req, res)=>{
    console.log(req.body)
    const { contact, password, email } = req.body
      const users = await Users.findOne({
        where:{
          [Op.or]: [{email: email}, {contact:contact}]
        }, 
        include:[
          {
            model:Permissions,
            attributes:['f1','f2','f3','f4','f5','f6','f7','f8','f9','f10','f11','f12','f13','f14','f15','f16','f17','f18','f19','f20']
          }
      ]})
      console.log(users.f_name)
    if(users){
      if(password==users.password){
        const payload = { signature:users.signature, type:users.type, username:`${users.f_name} ${users.l_name}`,loginId:`${users.id}`, per:users.Permission}
        jwt.sign(
          payload,
          'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm',
          {expiresIn:"12h"},
          (err,token) => {
            if(err) return res.json({message: err})
            return res.json({
              message:"Success",
              token: "BearerSplit"+token
            })
          }
        )
      } else { return res.json({message:"Invalid"}) }

    } else { return res.json({message:"Invalid"}) }
});

routes.post("/outdoorUserlogin", async(req, res)=>{

  console.log(req.body)
  const { contact, password } = req.body
    const users = await Users.findOne({
      where:{contact:contact}
    })
  if(users){
    if(password==users.password){
      const payload = { type:users.type, username:`${users.f_name} ${users.l_name}`,loginId:`${users.id}`}
      jwt.sign(
        payload,
        'qwertyuiopasdfghjklzxcvbnmqwertyuiopasdfghjklzxcvbnm',
        {expiresIn:"12h"},
        (err,token) => {
          if(err) return res.json({message: err})
          return res.json({
            message:"Success",
            token: "BearerSplit"+token
          })
        }
      )
    } else { return res.json({message:"Invalid"}) }

  } else { return res.json({message:"Invalid"}) }
});

module.exports = routes;