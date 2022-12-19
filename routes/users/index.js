const routes = require('express').Router();
const Sequelize = require('sequelize');
const { Users } = require('../../models');
const { Permissions } = require('../../functions/associations/userAssociation');
const { PayRequests } = require('../../functions/associations/payRequestAssociation');
const Sib = require('sib-api-v3-sdk');
const Op = Sequelize.Op;

const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: 'abdullah7c', 
    api_key: '535255685252371', 
    api_secret: 'fKOP8Dl4BSVWkI2tTH6p3rU_2JY',
    secure: true
});

const emailReqFunc = (emails, amount, name, type) => {
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = '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';
    const transEmailApi = new Sib.TransactionalEmailsApi();
    const sender = { email:'syedabdullahteamhail@gmail.com',name:'Syed Abdullah'};
    const recievers = emails;

    transEmailApi.sendTransacEmail({
      sender,
      to: recievers,
      subject:`Employee ${type} Request`,
      //textContent:'Wishing you a warm welcome to Hail Technologies',
      htmlContent:`<p>Following Employee {{params.name}} has requested a {{params.type}}</p>
        <p>The requested {{params.type}} amount is</p>
        <h1>Rs. {{params.amount}}</h1>
        <br/>
        <p>To respond the request please open your account and Approve the request.</p>
        <br/>
        <p>Regards</p>
        <p>Hail.Tech Support Team</p>`,
        params:{
            amount:amount,
            name:name,
            type:type
        },
    }).then((x)=>console.log(x))
    .catch((e)=>console.log(e));
}
const emailToAdmin = async(emails, name, type, username, amount) => {
    console.log( name, type, username, amount);

    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = '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';
    const transEmailApi = new Sib.TransactionalEmailsApi();
    const sender = { email:'syedabdullahteamhail@gmail.com',name:'Syed Abdullah'};
    const recievers = emails;
    await transEmailApi.sendTransacEmail({
      sender,
      to: recievers,
      subject:`Employee ${type} Request Update`,
      //textContent:'Wishing you a warm welcome to Hail Technologies',
      htmlContent:`<p>The following Employee, <b>{{params.name}}</b>'s request for <b>{{params.type}}</b> was approved by <b>{{params.approverName}}</b></p>
        <p>The requested {{params.type}} amount was</p>
        <h1>Rs. {{params.amount}}</h1>
        <p>Regards</p>
        <p>Hail.Tech Support Team</p>`,
        params:{
            name:name,
            type:type,
            approverName:username,
            amount:amount,
        },
    }).then((x)=>console.log(x))
    .catch((e)=>console.log(e));
}
const emailToUser = async(email, name, type, username, amount) => {
    console.log( name, type, username, amount);

    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = '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';
    const transEmailApi = new Sib.TransactionalEmailsApi();
    const sender = { email:'syedabdullahteamhail@gmail.com',name:'Syed Abdullah'};
    const recievers =  [ { email:email } ];
    await transEmailApi.sendTransacEmail({
      sender,
      to: recievers,
      subject:`Dear ${name}`,
      //textContent:'Wishing you a warm welcome to Hail Technologies',
      htmlContent:`<p>Your request for <b>{{params.type}}</b> was approved by <b>{{params.approverName}}</b></p>
        <p>The requested {{params.type}} amount was</p>
        <h1>Rs. {{params.amount}}</h1>
        <p>Regards</p>
        <p>Hail.Tech Support Team</p>`,
        params:{
            name:name,
            type:type,
            approverName:username,
            amount:amount,
        },
    }).then((x)=>console.log(x))
    .catch((e)=>console.log(e));
}

routes.get("/getAllAdmins", async(req, res) => {
    try {
        console.log(req.body)
        const result = await Users.findAll({
            where:{type:'Admin'}
        })
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.get("/getAllUsers", async(req, res) => {
    try {
        console.log(req.body)
        const result = await Users.findAll({
            include:[{
                model:Permissions
            }]
        })
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.post("/createUser", async(req, res) => {
    try {
        const result = await Users.create({
            f_name:req.body.f_name,
            l_name:req.body.l_name,
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,
            contact:req.body.contact,
            address:req.body.address,
            cnic:req.body.cnic,
            type:req.body.type,
            designation:req.body.designation,
            active:1,
            signature:req.body.signature
        })
        if(req.body.type!='Rider' && req.body.type!="PortUser"){
           await Permissions.create({
            f1:  req.body.permissions.analytics==1?"1":"0",
            f2:  req.body.permissions.shipment==1?"1":"0",
            f3:  req.body.permissions.liveTrack==1?"1":"0",
            f4:  req.body.permissions.userManage==1?"1":"0",
            f5:  req.body.permissions.payReq==1?"1":"0",
            f6:"0",f7:"0",f8:"0",f9:"0",f10:"0",
            f11:"0", f12:"0", f13:"0", f14:"0", f15:"0",
            f16:"0", f17:"0", f18:"0", f19:"0", f20:"0",
            UserId:result.id
          })
        }
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.post("/editUser", async(req, res) => {
    try {
        console.log(req.body);
        const { permissions } = req.body
        const result = await Users.update({
            f_name:req.body.f_name,
            l_name:req.body.l_name,
            email:req.body.email,
            username:req.body.username,
            password:req.body.password,
            contact:req.body.contact,
            address:req.body.address,
            cnic:req.body.cnic,
            type:req.body.type,
            designation:req.body.designation,
            active:1,
            signature:req.body.signature
        }, {where:{
            id:req.body.id
        }})
        if(req.body.type!='Rider'){
        await Permissions.update({
            f1: req.body.permissions.analytics==1?"1":"0",
            f2: req.body.permissions.shipment==1?"1":"0",
            f3: req.body.permissions.liveTrack==1?"1":"0",
            f4: req.body.permissions.userManage==1?"1":"0",
            f5: req.body.permissions.payReq==1?"1":"0",
            f6:"0", f7:"0", f8:"0",f9:"0", f10:"0",
            f11:"0", f12:"0", f13:"0", f14:"0", f15:"0",
            f16:"0", f17:"0", f18:"0", f19:"0", f20:"0"
          }, { where:{ UserId:req.body.id } })
        }
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.post("/deleteUser", async(req, res) => {
    try {
        console.log(req.body)
        const result = await Users.findAll()
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.post("/makePayReq", async(req, res) => {
    try {
        console.log(req.body)
        const result = await PayRequests.create({
            reason:req.body.reason,
            amount:req.body.amount,
            paidTo:req.body.paidTo,
            reqBy:req.body.reqBy,
            rupees:req.body.rupees,
            company:req.body.company,
            approve:0,
            UserId:req.body.UserId,
            type:req.body.type
        })
        const list = await Users.findAll({where:{type:'Admin'}})

        emailReqFunc(list, req.body.amount, req.body.username, req.body.type, req.body.amount)
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.post("/editPayReq", async(req, res) => {
    try {
        console.log(req.body);
        const result = await PayRequests.update({
            amount:req.body.amount,
            rupees:req.body.rupees,
            editedBy:req.body.editedBy,
            editedDate:req.body.editedDate,
            type:req.body.type
        },{where:{id:req.body.id}})
        //const list = await Users.findAll({where:{type:'Admin'}});
        //emailReqFunc(list, req.body.amount, req.body.username, req.body.type, req.body.amount);
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.post("/adminEditPayReq", async(req, res) => {
    try {
        console.log(req.body);
        const result = await PayRequests.update({
            amount:req.body.amountNum,
            rupees:req.body.amountWords,
            editedBy:req.body.username,
            editedDate:req.body.approvedDate,
        },{where:{id:req.body.id}});
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

routes.get("/getUserPayRequests", async(req, res) => {
    console.log(req.headers)
    try {
        if(req.headers.type=='Admin'){
            const result = await PayRequests.findAll({include:[
                {
                    model:Users,
                    attributes:['f_name', 'l_name', 'designation', 'email']
                }
            ]});
            res.send(result);
        }else{
            const result = await PayRequests.findAll({where:{UserId:req.headers.userid}})
            res.send(result);
        }
    }
    catch (error) {
      res.send(error)
    }
});

routes.post("/approvePayRequest", async(req, res) => {
    console.log(req.body)
    const { name, type, username, amount, email } = req.body
    try {
        const result = await PayRequests.update(
        {
            approve:1, approvedDate:req.body.approvedDate,
            approverId:req.body.approverId
        }
        ,{where:{id:req.body.id}});
        const list = await Users.findAll({where:{type:'Admin'}})
        await emailToAdmin(list, name, type, username, amount);
        await emailToUser(email, name, type, username, amount);
        res.send(result);
    }
    catch (error) {
      res.send(error)
    }
});

module.exports = routes;