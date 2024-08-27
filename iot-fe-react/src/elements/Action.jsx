// src/pages/Action.js
import React, { useState } from 'react';
import '../style/Action.css';

const mockActions = Array.from({ length: 100 }, (_, i) => ({
    id: i + 1,
    device: i % 3 === 0 ? 'Điều hòa' : i % 3 === 1 ? 'Tủ lạnh' : 'Quạt',
    status: i % 2 === 0 ? 'Bật' : 'Tắt',
    timestamp: `2024-08-${String(i % 30 + 1).padStart(2, '0')} ${String(i % 24).padStart(2, '0')}:00:00`,
}));

const Action = () => {
    const [selectedDevice, setSelectedDevice] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const itemsPerPage = 10;

    const filteredActions = mockActions
        .filter(action =>
            (action.device.includes(searchTerm)) &&
            (!selectedDevice || action.device === selectedDevice) &&
            (!startDate || action.timestamp >= startDate) &&
            (!endDate || action.timestamp <= endDate)
        );

    const paginatedActions = filteredActions.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    const totalPages = Math.ceil(filteredActions.length / itemsPerPage);

    return (
        <div className="action-container">
            <h1>Action History</h1>
            <div className="filter-container">
                <label>
                    Chọn thiết bị:
                    <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)}>
                        <option value="">Tất cả</option>
                        <option value="Điều hòa">Điều hòa</option>
                        <option value="Tủ lạnh">Tủ lạnh</option>
                        <option value="Quạt">Quạt</option>
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
                <button onClick={() => setCurrentPage(1)}>Tìm kiếm</button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tên thiết bị</th>
                        <th>Trạng thái</th>
                        <th>Thời gian hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedActions.map((action) => (
                        <tr key={action.id}>
                            <td>{action.id}</td>
                            <td>{action.device}</td>
                            <td>{action.status}</td>
                            <td>{action.timestamp}</td>
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

export default Action;
