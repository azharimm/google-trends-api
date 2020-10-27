const express = require("express");
const app = express();
const trendRoute = require("./src/routes/trend");

app.use(express.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE");
    next();
});

app.get("/", (req, res) => {
    return res.json({
		data: "Google Trend API Wrapper",
		docs: ""
	});
});

app.use("/trend", trendRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`App running on port ${PORT}`));
