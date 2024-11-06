const Action = require('../models/actions.model');

// Đếm số lần bật/tắt thiết bị trong ngày hôm nay
const countAction = async (req, res) => {
    // Truyền lên tên thiết bị
    const deviceName = req.query.deviceName;
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

    
    if (deviceName) query.sensorName = deviceName;
    try {
        const countOn = await Action.countDocuments({ ...query, action: 'Bật' });
        const countOff = await Action.countDocuments({ ...query, action: 'Tắt' });
        res.status(200).json({ countOn, countOff });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}

module.exports = countAction;