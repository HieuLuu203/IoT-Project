const Sensor = require('../models/sensors.model');
// Hàm đếm số lần độ bụi lớn hơn một giá trị nào đó trong hôm nay
const countWarning = async (req, res) => {
    // Giá trị độ bụi phải lớn hơn 60
    const dustVal = 60;
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
    // Giải thích: $gt: greater than, $lt: less than, lấy các giá trị lớn hơn 60
    query.dust = { $gt: dustVal };
    try {
        const countDust = await Sensor.countDocuments({ ...query });
        res.status(200).json({ countDust });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = countWarning;
