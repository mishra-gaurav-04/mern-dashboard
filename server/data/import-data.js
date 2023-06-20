const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fs = require('fs');
const Data = require('../models/Data');

dotenv.config({path : '/home/gaurav/internship-assignment/server/.env'});

mongoose.connect(process.env.MONGODB_URI)
.then((conn) => {
    console.log('DB connected successfully')
})
.catch((err) => {
    console.log(err);
})

// reading json file
const data = JSON.parse(fs.readFileSync('/home/gaurav/internship-assignment/server/data/jsondata.json','utf-8'));


// loading data to DB
const importData = async() => {
    try{
        await Data.create(data);
        console.log('Data loaded successsfully to database');
        process.exit();
    }
    catch(err){
        console.log(err);
    }
};

// Deleting the existing data from DB
const deleteData = async() => {
    try{
        await Data.deleteMany();
        console.log('Data deleted Successfully');
        process.exit();
    }
    catch(err){
        console.log(err);
    }
};

if(process.argv[2] === '--import'){
    importData();
}

else if(process.argv[2] === '--delete'){
    deleteData();
}
