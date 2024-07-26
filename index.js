const express = require("express");
const dotenv = require('dotenv').config();
const urlRoute = require('./router/url.route.js');
const {connectDB} = require('./connect.js');
const path = require('path');
const URL = require('./models/url.model.js');
const staticRoute = require('./router/static.route.js');

const app = express();
connectDB()
.then(() => console.log(`MongoDB connected successfully!`))
.catch((err) => console.log(`Error occured while connecting MongoDB: ${err.message}`));

app.set("view engine", "ejs");
app.set('views', path.resolve('./views'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use("/url", urlRoute);
app.use('/', staticRoute);

app.get('/url/:shortId', async (req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({shortId}, {$push: {
        visitedUrl: {
            timestamp: Date.now()
        }
    }});
    res.redirect(entry.redirectUrl);
});

app.listen(process.env.PORT, () => {
    console.log(`App listening on PORT ${process.env.PORT}`);
});