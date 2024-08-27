// src/pages/Data.js
import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../style/Data.css';

const mockData = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    temperature: Math.floor(Math.random() * 20) + 20,
    humidity: Math.floor(Math.random() * 30) + 70,
    light: Math.floor(Math.random() * 200) + 800,
    date: `2024-08-${String(i % 30 + 1).padStart(2, '0')}`,
}));

const Data = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedField, setSelectedField] = useState('id');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const filteredData = mockData
        .filter(item => 
            item[selectedField]?.toString().toLowerCase().includes(searchTerm.toLowerCase()) &&
            (!startDate || item.date >= startDate) &&
            (!endDate || item.date <= endDate)
        );

    const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleSearch = () => {
        setCurrentPage(1);
    };

    return (
        <div className="data-container">
            <h1>Data Sensor</h1>
            <div className="search-container">
                <label>
                    Tìm kiếm theo thông số:
                    <input
                        type="text"
                        placeholder="Nhập giá trị để tìm kiếm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </label>
                <label>
                    Chọn chỉ số:
                    <select value={selectedField} onChange={(e) => setSelectedField(e.target.value)}>
                        <option value="temperature">Nhiệt độ</option>
                        <option value="humidity">Độ ẩm</option>
                        <option value="light">Ánh sáng</option>
                    </select>
                </label>
                <label>
                    Từ ngày:
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </label>
                <label>
                    Đến ngày:
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </label>
                <button onClick={handleSearch}><FaSearch /> Tìm kiếm</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nhiệt độ</th>
                        <th>Độ ẩm</th>
                        <th>Ánh sáng</th>
                        <th>Ngày đo</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.temperature}°C</td>
                            <td>{item.humidity}%</td>
                            <td>{item.light} Lux</td>
                            <td>{item.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    &laquo; Trước
                </button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Sau &raquo;
                </button>
            </div>
        </div>
    );
};

export default Data;
