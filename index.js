const express = require("express");
const cors = require('cors');
const morgan = require('morgan');
const verify = require('./functions/tokenVerification');
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const bodyParser = require('body-parser');
const db = require("./models");

const clientRoutes = require('./routes/clients/');
const shipmentRoutes = require('./routes/shipments/');
const authRoutes = require('./routes/auth/');
const riderRoutes = require('./routes/riders/');
const userRoutes = require('./routes/users/');
const testBillsRoutes = require('./routes/testbills/');

app.use(morgan('tiny'));
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, { cors: {origin: "*"} });

const socketRoutes = require('./routes/socketRoutes/')(io);

const { PayRequests } = require('./functions/associations/payRequestAssociation')

app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(bodyParser.json({limit: '100mb', extended: true}));
app.use(express.json());
db.sequelize.sync();

//app.get("/", (req, res) => { res.json('Welcome to Sea Net System Server') });
app.get("/getUser", verify, (req, res) => { res.json({isLoggedIn:true, username:req.body.username}) });
app.use("/testBills", testBillsRoutes);
app.use("/shipments",shipmentRoutes);
app.use("/client", clientRoutes);
app.use("/riders", riderRoutes);
app.use("/users", userRoutes);
app.use("/auth", authRoutes);
app.get("/", socketRoutes);

const PORT = process.env.PORT || 8080;

server.listen(PORT, () => { console.log(`App listenings on port ${PORT}`) });