import React, { useState } from 'react';
import { FaFan, FaSnowflake, FaIceCream } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Chart from "./Chart";
import '../style/Home.css';

const Home = () => {
    const temperature = 33;
    const humidity = 90;
    const light = 850;

    const data = Array.from({ length: 10 }, (_, i) => ({
        date: `2021-09-0${i + 1}`,
        temperature: Math.floor(Math.random() * 20) + 20,
        humidity: Math.floor(Math.random() * 30) + 70,
        light: Math.floor(Math.random() * 200) + 800,
    }));

    const [loading, setLoading] = useState(false);
    const [deviceStatus, setDeviceStatus] = useState({
        airConditioner: false,
        fridge: false,
        fan: false,
    });

    const handleButtonClick = (device, action) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setDeviceStatus(prevStatus => ({
                ...prevStatus,
                [device]: action === 'Bật',
            }));
            toast.success(`${device === 'airConditioner' ? 'Điều hòa' : device === 'fridge' ? 'Tủ lạnh' : 'Quạt'} ${action} thành công`);
        }, 1000);
    };

    return (
        <div>
            <ToastContainer />
            <div className="container">
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
            <div className="chart-and-action">
                <div className="chart-container">
                    <Chart data={data} />
                </div>
                <div className="action-containerr">
                    <table>
                        <thead>
                            <tr>
                                <th>Hình ảnh</th>
                                <th>Tên thiết bị</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <FaSnowflake
                                        className={`device-icon air-conditioner ${deviceStatus.airConditioner ? 'on' : ''}`}
                                    />
                                </td>
                                <td>Điều hòa</td>
                                <td>
                                    <button
                                        onClick={() => handleButtonClick('airConditioner', 'Bật')}
                                        disabled={deviceStatus.airConditioner}
                                        className={`action-button ${deviceStatus.airConditioner ? 'off' : 'on'}`}
                                    >
                                        Bật
                                    </button>
                                    <button
                                        onClick={() => handleButtonClick('airConditioner', 'Tắt')}
                                        disabled={!deviceStatus.airConditioner}
                                        className={`action-button ${deviceStatus.airConditioner ? 'on' : 'off'}`}
                                    >
                                        Tắt
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FaIceCream
                                        className={`device-icon fridge ${deviceStatus.fridge ? 'on' : ''}`}
                                    />
                                </td>
                                <td>Tủ lạnh</td>
                                <td>
                                    <button
                                        onClick={() => handleButtonClick('fridge', 'Bật')}
                                        disabled={deviceStatus.fridge}
                                        className={`action-button ${deviceStatus.fridge ? 'off' : 'on'}`}
                                    >
                                        Bật
                                    </button>
                                    <button
                                        onClick={() => handleButtonClick('fridge', 'Tắt')}
                                        disabled={!deviceStatus.fridge}
                                        className={`action-button ${deviceStatus.fridge ? 'on' : 'off'}`}
                                    >
                                        Tắt
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <FaFan
                                        className={`device-icon fan ${deviceStatus.fan ? 'on' : ''}`}
                                    />
                                </td>
                                <td>Quạt</td>
                                <td>
                                    <button
                                        onClick={() => handleButtonClick('fan', 'Bật')}
                                        disabled={deviceStatus.fan}
                                        className={`action-button ${deviceStatus.fan ? 'off' : 'on'}`}
                                    >
                                        Bật
                                    </button>
                                    <button
                                        onClick={() => handleButtonClick('fan', 'Tắt')}
                                        disabled={!deviceStatus.fan}
                                        className={`action-button ${deviceStatus.fan ? 'on' : 'off'}`}
                                    >
                                        Tắt
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    {loading && <div className="loading">Loading...</div>}
                </div>
            </div>
        </div>
    );
};

export default Home;
