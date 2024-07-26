const shortid = require("shortid");
const URL = require("../models/url.model.js");

async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if(!body.url) return res.status(400).json({error: "url is required!"});
    const shortId = shortid();
    await URL.create({
        shortId: shortId, 
        redirectUrl: body.url,
        visitedUrl: []
    });
    return res.render("home", {id: shortId});
}

async function handleUrlAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({totalClicks: result.visitedUrl.length, analytics: result.visitedUrl});
}


module.exports = {handleGenerateShortUrl, handleUrlAnalytics};