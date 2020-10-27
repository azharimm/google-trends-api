const express = require("express");
const googleTrends = require("google-trends-api");

const app = express();

app.get("/", (req, res) => {
    return res.send(':)');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
