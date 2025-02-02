import React from 'react';
import { PiSignOutBold } from "react-icons/pi";
import { VscNewFile } from "react-icons/vsc"; 
import { MdDashboard } from "react-icons/md";
import { FaListUl } from "react-icons/fa6";
import logo from "../../assets/logo.svg";   
import CardItemView from '../../assets/components/CardItemView';
import Button from '../../assets/components/Button';
import UserInfoCard from '../../assets/components/UserInfoCard';
import '../../assets/styles/Dashboard.css'; 
import userAuthOut from '../functions/LogOut';

const Dashboard = () => {
    // Placeholder user data (will be replaced with API data later)
    const { logout } = userAuthOut();
    const user = {
        email: 'user@example.com',
        position: 'Admin',
    };

    return (
        <div className="dashboard-container">
            {/* Sidebar */}
            <div className="sidebar">
                {/* Logo and Text */}
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1 className="logo-text">Souk Ahras</h1>
                </div>

                {/* Menu Items */}
                <div className="menu-items">
                    <CardItemView icon={MdDashboard} text="Tableau"/>
                    <CardItemView icon={VscNewFile} text="Nouveau titre de congé"/>
                    <CardItemView icon={FaListUl} text="Liste des employés"/>
                </div>

                {/* Log Out Button */}
                <div className="logout-button">
                    <Button
                        onClick={logout}
                        text="Log out"
                        icon={PiSignOutBold}
                        color="#ff4757"
                    />
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* User Information Card */}
                <div className='user-info'>
                <UserInfoCard email={user.email} position={user.position} />
                </div>
                {/* Table Placeholder */}
                <div className="table-placeholder">
                    <h2>Tableau</h2>
                    <p>Table content will go here.</p>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;