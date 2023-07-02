require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const models = require('./core/models');
const sequelize = require('./core/database');
const router = require('./routes');
const errorHandling = require('./middleware/error-handling')

const app = express();

app.use(cors());
app.use(express.json());
app.use(process.env.URL_START_POINT, router);

app.use(errorHandling);
const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(PORT, ()=> console.log(`server listen on port ${PORT}`));
    } catch (e){
        console.log(e);
    }
}

start()