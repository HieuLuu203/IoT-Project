// src/pages/Profile.js
import React from 'react';
import '../style/Profile.css';

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src='/img/avt.jpg' alt="Avatar" className="profile-avatar" />
                <h1>Lưu Minh Hiếu</h1>
                <p className="profile-id">Mã sinh viên: B21DCCN123</p>
                <p className="profile-class">Lớp: D21CQCN10-B</p>
                <p className="profile-links">
                    <a href="https://example.com/report" target="_blank" rel="noopener noreferrer">Báo cáo</a> | 
                    <a href="https://github.com/johndoe" target="_blank" rel="noopener noreferrer">GitHub</a>
                </p>
            </div>
            <div className="profile-details">
                <section className="profile-section">
                    <h2>Giới thiệu bản thân</h2>
                    <p>Tôi là một sinh viên công nghệ thông tin đam mê lập trình và học hỏi các công nghệ mới. Tôi thích làm việc với các dự án phần mềm và có kinh nghiệm trong phát triển game</p>
                </section>
                <section className="profile-section">
                    <h2>Kỹ năng</h2>
                    <ul>
                        <li>ReactJS & JavaScript</li>
                        <li>Node.js & Express.js</li>
                        <li>MongoDB & SQL</li>
                        <li>HTML & CSS</li>
                        <li>Git & GitHub</li>
                    </ul>
                </section>
            </div>
        </div>
    );
};

export default Profile;
