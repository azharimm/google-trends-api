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
	return res.send(":)");
});

app.use('/trend', trendRoute);

app.get("/autocomplete", async (req, res) => {
    const response = await googleTrends.autoComplete({
        keyword: "Back to School",
    });
    return res.json({
        data: JSON.parse(response),
    });
});

app.get("/daily", (req, res) => {
    googleTrends.dailyTrends(
        {
            trendDate: new Date("2020-10-27"),
            geo: "US",
        },
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                return res.json({
                    data: JSON.parse(results),
                });
            }
        }
    );
});

app.get("/region", async (req, res) => {
    const response = await googleTrends.interestByRegion({
        keyword: "omnibuslaw",
        startTime: new Date("2020-10-01"),
        endTime: new Date("2020-10-26"),
        resolution: "CITY",
    });
    return res.json({
        data: JSON.parse(response),
    });
});

app.get("/realtime", (req, res) => {
    googleTrends.realTimeTrends(
        {
            geo: "US",
            category: "all",
        },
        function (err, results) {
            if (err) {
                console.log(err);
            } else {
                return res.json({
                    data: JSON.parse(results),
                });
            }
        }
    );
});

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
