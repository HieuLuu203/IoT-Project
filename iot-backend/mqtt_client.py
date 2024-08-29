import paho.mqtt.client as mqtt

# Cấu hình kết nối với MQTT broker
MQTT_BROKER = "test.mosquitto.org"  # Thay bằng địa chỉ broker của bạn
MQTT_PORT = 1883  # Cổng mặc định của MQTT
MQTT_TOPIC = "iot/sensor"

# Callback khi kết nối thành công
def on_connect(client, userdata, flags, rc):
    print(f"Connected with result code {rc}")
    client.subscribe(MQTT_TOPIC)

# Callback khi nhận tin nhắn
def on_message(client, userdata, msg):
    print(f"Message received: {msg.payload.decode()}")

# Khởi tạo client
client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message

# Kết nối đến broker
client.connect(MQTT_BROKER, MQTT_PORT, 60)

# Bắt đầu vòng lặp xử lý tin nhắn
client.loop_start()
