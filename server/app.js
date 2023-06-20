const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const dataRoutes = require('./routes/routes');
const app = express();

dotenv.config();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

app.use('/api',dataRoutes);

const startServer = () => {
    connectDB(MONGODB_URI)
    .then((conn) => {
        console.log('Database connected Successfully');
        app.listen(PORT,() => {
            console.log(`Server started ${PORT}`);
        })
    })
    .catch((err) => {
        console.log(err);
    })
}

startServer();