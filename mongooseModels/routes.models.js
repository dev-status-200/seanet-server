const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoutesSchema = new Schema({
    RiderId:String,
    Routes:Array
},{timestamps:true})

module.exports = mongoose.model('Routes', RoutesSchema);