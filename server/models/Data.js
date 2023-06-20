const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dataSchema = new Schema({
    end_year : {
        type : String,
        default : null
    },
    intensity : {
        type : Number,
        default : null
    },
    sector : {
        type : String,
        default : null
    },
    topic : {
        type : String,
        default : null
    },
    insight : {
        type : String,
        default : null
    },
    url : {
        type : String,
        default : null
    },
    region: {
        type : String,
        default : null
    },
    start_year : {
        type : String,
        default : null
    },
    impact : {
        type : String,
        default : null
    },
    added : {
        type : String,
        default : null
    },
    published : {
        type : String,
        default : null
    },
    country : {
        type : String,
        default : null
    },
    relevance : {
        type : Number,
        default : null
    },
    pestle : {
        type : String,
        default : null
    },
    source : {
        type : String,
        default : null
    },
    title : {
        type : String,
        default : null
    },
    likelihood : {
        type : Number,
        default : null
    },

});

module.exports = mongoose.model('Data',dataSchema);