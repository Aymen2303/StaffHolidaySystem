import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PiSignOutBold } from "react-icons/pi";
import { VscNewFile } from "react-icons/vsc";
import { MdDashboard } from "react-icons/md";
import { FaListUl } from "react-icons/fa6";
import logo from "../../assets/logo.svg";
import CardItemView from "../../assets/components/CardItemView";
import Button from "../../assets/components/Button";
import UserInfoCard from "../../assets/components/UserInfoCard";
import "../../assets/styles/AdminPages.css";
import "../styles/EmployeeList.css";
import userAuthOut from "../functions/LogOut";
import fetchEmployeesWithDetails from "../functions/FetchUserInfos";

const EmployeeList = () => {
    const { logout } = userAuthOut();
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState({
        email: location.state?.email || "default@example.com",
        position: "Admin",
    });

    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedDays, setSelectedDays] = useState({});

    useEffect(() => {
        // Retrieve saved selected days from localStorage
        const storedDays = localStorage.getItem("selectedDays");
        if (storedDays) {
            setSelectedDays(JSON.parse(storedDays));
        }

        const fetchData = async () => {
            try {
                const data = await fetchEmployeesWithDetails();
                if (data) {
                    setEmployees(data);
                } else {
                    setError("No data found.");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleDayChange = (employeeId, value) => {
        const updatedDays = {
            ...selectedDays,
            [employeeId]: value,
        };
        setSelectedDays(updatedDays);

        // Save to localStorage
        localStorage.setItem("selectedDays", JSON.stringify(updatedDays));
    };

    const handleItemClick = (route) => {
        navigate(route);
    };

    return (
        <div className="dashboard-container">
            <div className="sidebar">
                <div className="logo-container">
                    <img src={logo} alt="Logo" className="logo" />
                    <h1 className="logo-text">Souk Ahras</h1>
                </div>
                <div className="menu-items">
                    <CardItemView icon={MdDashboard} text="Tableau" onClick={() => handleItemClick("/dashboard")} selected={location.pathname === "/dashboard"} />
                    <CardItemView icon={VscNewFile} text="Nouveau titre de congé" onClick={() => handleItemClick("/new-vacation")} selected={location.pathname === "/new-vacation"} />
                    <CardItemView icon={FaListUl} text="Liste des employés" onClick={() => handleItemClick("/employees")} selected={location.pathname === "/employees"} />
                </div>
                <div className="logout-button">
                    <Button onClick={logout} text="Log out" icon={PiSignOutBold} color="#ff4757" />
                </div>
            </div>
            <div className="main-content">
                <div className="user-info">
                    <UserInfoCard email={user.email} position={user.position} />
                </div>
                <div className="table-container">
                    <h2>Liste des employés</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : error ? (
                        <p>Error: {error}</p>
                    ) : (
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nom</th>
                                    <th>Prénom</th>
                                    <th>Service</th>
                                    <th>Grade</th>
                                    {[21, 22, 23, 24, 25].map((year) => (
                                        <th key={`RLQ${year}`}>{`RLQ${year}`}</th>
                                    ))}
                                    <th>C/A/C</th>
                                    {[21, 22, 23, 24, 25].map((year) => (
                                        <th key={`RST${year}`}>{`RST${year}`}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => {
                                    const totalDays = employee.total_vacation_days;
                                    const selected = selectedDays[employee.employee_id] || 0;
                                    return (
                                        <tr key={employee.employee_id}>
                                            <td>{employee.employee_id}</td>
                                            <td>{employee.nom}</td>
                                            <td>{employee.prenom}</td>
                                            <td>{employee.Services?.service_name}</td>
                                            <td>{employee.Grades?.grade_name}</td>
                                            {[21, 22, 23, 24, 25].map((year) => (
                                                <td key={`RLQ${year}`}>{employee[`RLQ${year}`] || 0}</td>
                                            ))}
                                            <td>
                                                <select value={selected} onChange={(e) => handleDayChange(employee.employee_id, parseInt(e.target.value))}>
                                                    <option value="0">Select Days</option>
                                                    {[...Array(totalDays).keys()].map((num) => (
                                                        <option key={num + 1} value={num + 1}>{num + 1}</option>
                                                    ))}
                                                </select>
                                            </td>
                                            {[21, 22, 23, 24, 25].map((year) => (
                                                <td key={`RST${year}`}>{(employee[`RLQ${year}`] || 0) - selected}</td>
                                            ))}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EmployeeList;
