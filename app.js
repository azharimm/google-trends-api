const express = require("express");
const app = express();
const trendRoute = require('./src/routes/trend');

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE')
    next();
});

app.get("/", (req, res) => {
	return res.send("Google Trend API Wrapper");
});

app.use('/trend', trendRoute);

app.get("/related-queries", async (req, res) => {
    const response = await googleTrends.relatedQueries({
        keyword: "Westminster Dog Show",
    });
    return res.json({
        data: JSON.parse(response),
    });
});

app.get("/related-topics", async (req, res) => {
    const response = await googleTrends.relatedTopics({
		keyword: "Westminster Dog Show",
		startTime: new Date('2020-10-01'),
		endTime: new Date('2020-12-26')
    });
    return res.json({
        data: JSON.parse(response),
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
