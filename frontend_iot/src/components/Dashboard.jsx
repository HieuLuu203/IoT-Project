import React, { useState } from "react";
import "../css/Dashboard.css";
import Sidebar from "./SideBar";
import {
  FaThermometerHalf,
  FaTint,
  FaSun,
  FaLightbulb,
  FaBars,
} from "react-icons/fa";
import { FaFan, FaRegSnowflake } from "react-icons/fa";
import { useEffect } from "react";
import DataChart from "./DataChart";
import DataChartDust from "./DataChartDust";
import { useSidebar } from "../contexts/SidebarContext";
const Dashboard = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebar();
  const [topLastSensor, setTopLastSensor] = useState([]);
  const [temperature, setTemperature] = useState(0);
  const [humidity, setHumidity] = useState(0);
  const [light, setLight] = useState(0);
  const [dust, setDust] = useState(0);
  const [countWarning, setCountWarning] = useState(0);
  // Trạng thái loading cho từng thiết bị
  const [loadingFan, setLoadingFan] = useState(false);
  const [loadingAC, setLoadingAC] = useState(false);
  const [loadingFridge, setLoadingFridge] = useState(false);

  // Trạng thái bật/tắt cho từng thiết bị
  const [isFanOn, setIsFanOn] = useState(false);
  const [isACOn, setIsACOn] = useState(false);
  const [isFridgeOn, setIsFridgeOn] = useState(false);
  const [isWarning, setIsWarning] = useState(false);
  const formatTime = (isoDate) => {
    const date = new Date(isoDate);

    // Chuyển đổi giờ về múi giờ Việt Nam (UTC+7)
    const vietnamOffset = 7 * 60; // UTC+7 tính bằng phút
    const localTime = new Date(date.getTime() + vietnamOffset * 60 * 1000);
    const hours = localTime.getUTCHours().toString().padStart(2, "0");
    const minutes = localTime.getUTCMinutes().toString().padStart(2, "0");
    const seconds = localTime.getUTCSeconds().toString().padStart(2, "0");
    const time = " " + hours + ":" + minutes + ":" + seconds;
    return time;
  };
  const handleFanClick = async () => {
    const apiFan = `http://localhost:8000/api/v1/change-fan`;
    const state = isFanOn ? "off" : "on";
    setLoadingFan(true);

    try {
      const response = await fetch(apiFan, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state }),
      });
      const data = await response.json();

      if (response.ok) {
        // Xử lý dữ liệu phản hồi nếu cần
        console.log("Fan state changed successfully:", data);
        const stateStr = data.fanState;
        console.log(stateStr);
        const state = stateStr === "on" ? true : false;

        // Cập nhật trạng thái bật/tắt của quạt
        setIsFanOn(state);
        localStorage.setItem("isFanOn", stateStr);
      } else {
        console.error("Server error:", data);
      }
    } catch (error) {
      console.error("Failed to change Fan state", error);
    } finally {
      // Dừng loading sau khi nhận phản hồi từ server
      setTimeout(() => {
        setLoadingFan(false);
      }, 100);
    }
  };

  const handleACClick = async () => {
    const apiAC = `http://localhost:8000/api/v1/change-air`;
    const state = isACOn ? "off" : "on";
    setLoadingAC(true);

    try {
      const response = await fetch(apiAC, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state }),
      });
      const data = await response.json();

      if (response.ok) {
        // Xử lý dữ liệu phản hồi nếu cần
        console.log("Fan state changed successfully:", data);
        const stateStr = data.airState;
        const state = stateStr === "on" ? true : false;

        // Cập nhật trạng thái bật/tắt của quạt
        setIsACOn(state);
        localStorage.setItem("isACOn", stateStr);
      } else {
        console.error("Server error:", data);
      }
    } catch (error) {
      console.error("Failed to change Fan state", error);
    } finally {
      // Dừng loading sau khi nhận phản hồi từ server
      setTimeout(() => {
        setLoadingAC(false);
      }, 100);
    }
  };

  const handleFridgeClick = async () => {
    const apiLamp = `http://localhost:8000/api/v1/change-lamp`;
    const state = isFridgeOn ? "off" : "on";
    setLoadingFridge(true);

    try {
      const response = await fetch(apiLamp, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ state }),
      });
      const data = await response.json();

      if (response.ok) {
        // Xử lý dữ liệu phản hồi nếu cần
        console.log("Fan state changed successfully:", data);
        const stateStr = data.lampState;
        const state = stateStr === "on" ? true : false;

        // Cập nhật trạng thái bật/tắt của quạt
        setIsFridgeOn(state);
        localStorage.setItem("isFridgeOn", stateStr);
      } else {
        console.error("Server error:", data);
      }
    } catch (error) {
      console.error("Failed to change Fan state", error);
    } finally {
      // Dừng loading sau khi nhận phản hồi từ server
      setTimeout(() => {
        setLoadingFridge(false);
      }, 100);
    }
  };
  // Lấy dữ liệu từ API
  const apiGetLastSenSor = "http://localhost:8000/api/v1/top-10-sensor";
  const fetchData = async () => {
    const response = await fetch(apiGetLastSenSor);
    if (response.ok) {
      const data = await response.json();
      // Lưu và sắp xếp theo từ cũ đến mới
      console.log(data);
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      data.forEach((item) => {
        item.date = formatTime(item.date);
      });

      setTopLastSensor(data);
      setTemperature(data[data.length - 1].temperature);
      setHumidity(data[data.length - 1].humidity);
      setLight(data[data.length - 1].light);
      setDust(data[data.length - 1].dust);
    }
  };
  // Lấy số lần cảnh báo
  const apiGetCountWarning = "http://localhost:8000/api/v1/count-warning";
  const getCountWarning = async () => {
    const response = await fetch(apiGetCountWarning);
    if (response.ok) {
      const data = await response.json();
      setCountWarning(data.countDust); 
    }
  };
  useEffect(() => {
    document.title = "Dashboard";
    fetchData();
    getCountWarning();
    // Thiết lập interval để gọi lại fetchData mỗi 30 giây
    const intervalId = setInterval(() => {
      fetchData();
      getCountWarning();
    }, 1000); // 1000ms = 1 giây
    // Kiểm tra trạng thái cảnh báo
    if (dust > 60) {
      setIsWarning(true);
    } else {
      setIsWarning(false);
    }
    console.log(isFridgeOn);
    if (localStorage.getItem("isFanOn") === "on") {
      setIsFanOn(true);
    }
    if (localStorage.getItem("isACOn") === "on") {
      setIsACOn(true);
    }
    if (localStorage.getItem("isFridgeOn") === "on") {
      setIsFridgeOn(true);
    }

    // Dọn dẹp interval khi component unmount
    return () => clearInterval(intervalId);
  }, [dust]);


  return (
    <div id="main">
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>
      {isSidebarOpen && <Sidebar />}
      <div className="dashboard">
        <div className="list-box-container">
          <h2 className="list-box-title">Thông số hiện tại</h2>
          <div className="list-box">
            {/* Độ bụi */}
            <div className="box">
              <h2>Độ bụi</h2>
              <p>{dust}</p>
              <div className="bar-container">
                <div
                  className="bar dust"
                  style={{ width: `${dust}%` }}
                />
            </div>
            </div>
            {/* Nhiệt độ */}
            <div className="box">
              <h2>Nhiệt độ</h2>
              <p>{temperature}°C</p>
              <div className="bar-container">
                <div
                  className="bar temperature"
                  style={{ width: `${temperature}%` }}
                />
              </div>
            </div>
            {/* Độ ẩm */}
            <div className="box">
              <h2>Độ ẩm</h2>
              <p>{humidity}%</p>
              <div className="bar-container">
                <div
                  className="bar humidity"
                  style={{ width: `${humidity}%` }}
                />
              </div>
            </div>
            {/* Ánh sáng */}
            <div className="box">
              <h2>Ánh sáng</h2>
              <p>{light} Lux</p>
              <div className="bar-container">
                <div
                  className="bar light"
                  style={{ width: `${(light / 1024) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
        
        <div className="count-warning">
          <h2 className="count-warning-title">Số lần đèn cảnh báo trong ngày</h2>
          <div className="count-warning-box">
            <h2>{countWarning}</h2>
          </div>
        </div>
        {/* Div dưới */}
        <div className="dashboard-container">
          <div className="chart-section">
            <h2 className="chart-title">Biểu đồ 10 giá trị đo gần nhất</h2>
            <div className="chart-container">
              {/* Biểu đồ nhiệt độ, độ ẩm, ánh sáng */}
              <DataChart data={topLastSensor} />
            </div>
          </div>
          <div className="control-panel">
            <h2 className="control-panel-title">Điều Chỉnh Thiết Bị Điện</h2>
            <table className="control-table">
              <thead>
                <tr>
                  <th>Thiết Bị</th>
                  <th>Điều Khiển</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="device-info">
                    <div className={`device-icon ${isFanOn ? "rotating" : ""}`}>
                      <FaFan className="icon" />
                    </div>
                    <span>Quạt</span>
                  </td>
                  <td>
                    <button
                      className={`control-button ${isFanOn ? "on" : "off"} ${
                        loadingFan ? "loading" : ""
                      }`}
                      onClick={handleFanClick}
                      disabled={loadingFan}
                    >
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="device-info">
                    <div
                      className={`device-icon ac-icon ${isACOn ? "on" : "off"}`}
                    >
                      <FaRegSnowflake className="icon" />
                    </div>
                    <span>Điều Hòa</span>
                  </td>
                  <td>
                    <button
                      className={`control-button ${isACOn ? "on" : "off"} ${
                        loadingAC ? "loading" : ""
                      }`}
                      onClick={handleACClick}
                      disabled={loadingAC}
                    >
                    </button>
                  </td>
                </tr>
                <tr>
                  <td className="device-info">
                    <div
                      className={`device-icon fridge-icon ${
                        isFridgeOn ? "on" : "off"
                      }`}
                    >
                      <FaLightbulb className="icon" />
                    </div>
                    <span>Đèn</span>
                  </td>
                  <td>
                    <button
                      className={`control-button ${isFridgeOn ? "on" : "off"} ${
                        loadingFridge ? "loading" : ""
                      }`}
                      onClick={handleFridgeClick}
                      disabled={loadingFridge}
                    >
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
            {/* Đèn cảnh báo */}
            <div className="warning-light">
              <h3>Đèn cảnh báo</h3>
            <div className="device-info">
                    <div
                      className={`device-icon w-icon ${
                        isWarning ? "on" : "off"
                      }`}
                    >
                      <FaLightbulb className="icon" />
                    </div>
                    <span>Đèn</span>
            </div>
            </div>
          </div>
        </div>

        {/* Biểu đồ độ bụi */}
        {/* <div>
          <h3>Biểu đồ về độ bụi</h3>
          <DataChartDust data={topLastSensor} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
