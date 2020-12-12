const express = require("express");
const app = express();
const trendRoute = require("./src/routes/trend");

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "https://azharimm.tk");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

app.get("/", (req, res) => {
    return res.json({
        status: true,
		data: {
            maintainer: 'Azhari Muhammad M <azhari.marzan@gmail.com>',
            source: 'https://github.com/azharimm/google-trends-api',
        }
	});
});

app.use("/trend", trendRoute);

app.get("/*", (req, res) => {
    return res.status(404).json({
        status: false,
        message: 'Not found!'
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
