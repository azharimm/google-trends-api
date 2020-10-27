const googleTrends = require("google-trends-api");

exports.timeline = async (req, res) => {
    try {
        const data = req.body;
        const response = await googleTrends.interestOverTime({
            keyword: data.keyword,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
        });
        return resultJson(res, response);
    } catch (error) {
        return errResponse(res, error);
    }
};
exports.daily = async (req, res) => {
    const data = req.body;
    googleTrends.dailyTrends(
        {
            trendDate: new Date(data.date),
            geo: data.geo,
        },
        function (error, response) {
            if (error) {
                return errResponse(res, error);
            } else {
                return resultJson(res, response);
            }
        }
    );
};
exports.autocomplete = async (req, res) => {};
exports.region = async (req, res) => {};
exports.realtime = async (req, res) => {};
exports.relatedQueries = async (req, res) => {};
exports.relatedTopics = async (req, res) => {};

const resultJson = (res, response) => {
    res.json({
        data: JSON.parse(response)
    });
}

const errResponse = (res, error) => {
    res.json({
        status: false,
        error: "Server error: " + error,
    });
}
