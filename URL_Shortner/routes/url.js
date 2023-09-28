const express = require("express");
const {handleGenerateShortURL, handleRedirectURL, handleGetAnalytics} = require("../controllers/url.js");

const router = express.Router();

router.post("/url", handleGenerateShortURL);

router.get("/:shortId", handleRedirectURL);

router.get("/analytics/:shortId", handleGetAnalytics)

module.exports = router;