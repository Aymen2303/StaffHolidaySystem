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

    // Handle selection of vacation days
    const handleDayChange = (employeeId, value) => {
        setSelectedDays((prevState) => ({
            ...prevState,
            [employeeId]: value, // Store selected days per employee
        }));
    };

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
                    <Button onClick={logout} text="Log out" icon={PiSignOutBold} color="#ff4757" />
                </div>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* User Information Card */}
                <div className="user-info">
                    <UserInfoCard email={user.email} position={user.position} />
                </div>

                {/* Employee Table */}
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
                                    <th>RLQ20</th>
                                    <th>C/A/C</th>
                                    <th>RST20</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => {
                                    const totalDays = 30;
                                    const selected = selectedDays[employee.employee_id] || 0; // Default to 0
                                    const remainingDays = totalDays - selected;

                                    return (
                                        <tr key={employee.employee_id}>
                                            <td>{employee.employee_id}</td>
                                            <td>{employee.nom}</td>
                                            <td>{employee.prenom}</td>
                                            <td>{employee.Services?.service_name}</td>
                                            <td>{employee.Grades?.grade_name}</td>
                                            <td>{employee.total_vacation_days}</td> {/* RLQ20: Employee's vacation days */}
                                            <td>
                                                <select
                                                    value={selected}
                                                    onChange={(e) =>
                                                        handleDayChange(employee.employee_id, parseInt(e.target.value))
                                                    }
                                                >
                                                    <option value="0">Select Days</option>
                                                    {[...Array(30).keys()].map((num) => (
                                                        <option key={num + 1} value={num + 1}>
                                                            {num + 1}
                                                        </option>
                                                    ))}
                                                </select>
                                            </td>
                                            <td>{remainingDays}</td> {/* RST20: Remaining days after selection */}
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
