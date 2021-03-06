const googleTrends = require("google-trends-api");

exports.index = (req, res) => {
    return res.json({
		data: "Google Trend API Wrapper",
		docs: "https://github.com/azharimm/google-trends-api"
	});
}
exports.timeline = async (req, res) => {
    try {
        const data = req.body;
        const response = await googleTrends.interestOverTime({
            keyword: data.keyword,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
            geo: data.geo.toUpperCase()
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
            geo: data.geo.toUpperCase(),
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
exports.autocomplete = async (req, res) => {
    try {
        const data = req.body;
        const response = await googleTrends.autoComplete({
            keyword: data.keyword,
        });
        return resultJson(res, response);
    } catch (error) {
        return errResponse(res, error);
    }
};
exports.region = async (req, res) => {
    try {
        const data = req.body;
        const response = await googleTrends.interestByRegion({
            keyword: data.keyword,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
            resolution: data.resolution, //CITY || COUNTRY
        });
        return resultJson(res, response);
    } catch (error) {
        return errResponse(res, error);
    }
};
exports.realtime = async (req, res) => {
    const data = req.body;
    googleTrends.realTimeTrends(
        {
            geo: data.geo.toUpperCase(),
            category: data.category || "all",
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
exports.relatedQueries = async (req, res) => {
    try {
        const data = req.body;
        const response = await googleTrends.relatedQueries({
            keyword: data.keyword,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
            geo: data.geo.toUpperCase()
        });
        return resultJson(res, response);
    } catch (error) {
        return errResponse(res, error);
    }
};
exports.relatedTopics = async (req, res) => {
    try {
        const data = req.body;
        const response = await googleTrends.relatedTopics({
            keyword: data.keyword,
            startTime: new Date(data.startTime),
            endTime: new Date(data.endTime),
            geo: data.geo.toUpperCase()
        });
        return resultJson(res, response);
    } catch (error) {
        return errResponse(res, error);
    }
};

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
