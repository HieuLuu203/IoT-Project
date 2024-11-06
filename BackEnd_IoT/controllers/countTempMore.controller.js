const Sensor = require('../models/sensors.model');
// Hàm đếm số lần nhiệt độ lớn hơn một giá trị nào đó trong hôm nay
const countTempMore = async (req, res) => {
    // Query là nhiệt độ
    const temp = req.query.temp;
    const tempVal = parseFloat(temp);
    // Query object
    const query = {};
    // Lấy ngày hôm nay
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const end = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    query.date = {
        $gte: start,
        $lt: end
    };
    console.log("Start date: ", start);
    console.log("End date: ", end);
    console.log("Temp: ", temp);
    if (temp) query.temperature = { $gt: tempVal };
    try {
        const countTemp = await Sensor.countDocuments({ ...query });
        res.status(200).json({ countTemp });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = countTempMore;
