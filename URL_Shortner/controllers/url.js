const {nanoid} = require("nanoid");
const URLModel = require("../models/url");

async function handleGenerateShortURL(req, res) {
    const body = req.body;
    if (!body || !body.url) return res.status(400).json({error: "url is required"});
    
    const shortID = nanoid(8);
    try {
        await URLModel.create({
            shortId: shortID,
            redirectURL: body.url,
            visitHistory: [],
        });
        return res.render("home", {id: shortID});
    } catch (error) {
        console.error("Database error:", error);
        return res.render("home", { error: "Failed to create short URL. Is the database running?" });
    }
}

async function handleRedirectURL(req, res) {
    const shortId = req.params.shortId;
    try {
        const entry = await URLModel.findOneAndUpdate(
            { shortId }, 
            { $push: { visitHistory: { timestamp: Date.now() } } }
        );
        
        if (!entry) {
            return res.status(404).render("home", { error: "Short URL not found" });
        }

        res.redirect(entry.redirectURL);
    } catch (error) {
        console.error("Error redirecting:", error);
        res.status(500).send("Internal Server Error");
    }
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await URLModel.findOne({shortId});
    
    if (!result) {
        return res.status(404).json({ error: "Short URL not found" });
    }

    return res.json({totalClicks: result.visitHistory.length, analytics: result.visitHistory});
}

module.exports = {
    handleGenerateShortURL, handleRedirectURL, handleGetAnalytics
}