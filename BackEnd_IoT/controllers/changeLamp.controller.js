const mqttClient = require('../mqtt/mqttClient');
const Action = require('../models/actions.model');
const changeLamp = (req, res) => {
    const state = req.body.state;
    console.log(state);
    
    if (state === "on" || state === "off") {
      // Đặt một callback để lắng nghe phản hồi từ MQTT
      const mqttResponseHandler = (topic, message) => {
        if (topic === 'iot/lamp/status') {
          const status = message.toString();
          console.log(`Received Lamp status: ${status}`);
          
          if (status === state) {
            // Lưu hành động vào database
            const actionStr = state === 'on' ? 'Bật' : 'Tắt';
            const action = new Action({
              sensorName: 'Đèn',
              action: actionStr
            });
            action.save();
            res.status(200).json({ lampState: state });
          } else {
            res.status(500).json({ message: 'Failed to change Lamp state' });
          }
          // Loại bỏ listener sau khi nhận được phản hồi
          mqttClient.removeListener('message', mqttResponseHandler);
        }
      };
  
      // Đăng ký listener cho phản hồi từ MQTT
      mqttClient.on('message', mqttResponseHandler);
  
      // Gửi yêu cầu bật/tắt đèn qua MQTT
      mqttClient.publish('iot/lamp', state);
      console.log('Sent lamp');
  
    } else {
      res.status(400).json({ message: 'Invalid state' });
    }
};

module.exports = changeLamp;