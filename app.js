const express = require("express");
const googleTrends = require("google-trends-api");

const app = express();

app.get("/", (req, res) => {
    return res.send(":)");
});

app.get("/trend", async (req, res) => {
    const response = await googleTrends.interestOverTime({
		keyword: "UU Cilaka",
		startTime: new Date("2020-10-01"),
        endTime: new Date("2020-10-26"),
    });
    return res.json({
        data: JSON.parse(response),
    });
});

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
