require('dotenv').config();
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const models = require('./core/models');
const sequelize = require('./core/database');
const router = require('./routes');
const fileUpload = require('express-fileupload')
const errorHandling = require('./middleware/error-handling')
const path = require('path')
const cookieParser = require('cookie-parser')

const app = express();

app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}));
app.use(express.json());
app.use(fileUpload({}));
app.use(cookieParser())
app.use(process.env.URL_START_POINT, router);
app.use(express.static(path.resolve(__dirname, 'static')))


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

start();

setInterval(async ()=>{
    await sequelize.query("DELETE FROM `tokens` WHERE DATE_SUB(`updatedAt`, INTERVAL 30 DAY) < NOW()")
}, 1000 * 60 * 60 * 24 )