import React from "react";
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { PiSignOutBold } from "react-icons/pi";
import { VscNewFile } from "react-icons/vsc"; 
import { MdDashboard } from "react-icons/md";
import { FaListUl } from "react-icons/fa6";
import logo from "../../assets/logo.svg";   
import CardItemView from '../../assets/components/CardItemView';
import Button from '../../assets/components/Button';
import UserInfoCard from '../../assets/components/UserInfoCard';
import '../../assets/styles/AdminPages.css'; 
import '../styles/EmployeeList.css';
import userAuthOut from '../functions/LogOut';

const EmployeeList = () => {
    const { logout } = userAuthOut();
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: location.state?.email || 'default@example.com',
        position: 'Admin',
    });

    const [selectedItem, setSelectedItem] = useState("Liste des employés");
    const handleItemClick = (route) => {
        navigate(route);
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
                    <CardItemView 
                        icon={MdDashboard} 
                        text="Tableau" 
                        onClick={() => handleItemClick("/dashboard")}
                        selected={location.pathname === "/dashboard"}
                    />
                    <CardItemView 
                        icon={VscNewFile} 
                        text="Nouveau titre de congé" 
                        onClick={() => handleItemClick("/new-vacation")} 
                        selected={location.pathname === "/new-vacation"}
                    />
                    <CardItemView 
                        icon={FaListUl} 
                        text="Liste des employés" 
                        onClick={() => handleItemClick("/employees")}
                        selected={location.pathname === "/employees"}
                    />
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
                    <h2>{selectedItem}</h2>
                    <p>Table content will go here.</p>
                </div>
            </div>
        </div>
    );
};
 
export default EmployeeList;