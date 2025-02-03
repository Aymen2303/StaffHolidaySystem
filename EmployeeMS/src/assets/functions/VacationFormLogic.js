import { useState, useEffect } from "react";

const fetchPostes = () => [
  { id: 1, label: "Manager" },
  { id: 2, label: "Developer" },
  { id: 3, label: "Designer" }
];

const fetchMatricules = () => [
  { id: 1, name: "John Doe" },
  { id: 2, name: "Jane Smith" },
  { id: 3, name: "Jack Johnson" }
];

const fetchRemplacents = () => [
  { id: 1, name: "Employee 1" },
  { id: 2, name: "Employee 2" },
];

const fetchSignataires = () => [
  { id: 1, name: "Approver 1" },
  { id: 2, name: "Approver 2" }
];

const useVacationForm = () => {
  const [formData, setFormData] = useState({
    matricule: "",
    poste: "",
    residence: "",
    dateFrom: "",
    dateTo: "",
    reste: 0,
    exercice: new Date().getFullYear(),
    nature: "Annuel",
    remplacent: "",
    signataire: "",
  });
  const [postes, setPostes] = useState([]);
  const [matricules, setMatricules] = useState([]);
  const [remplacents, setRemplacents] = useState([]);
  const [signataires, setSignataires] = useState([]);

  // Simulate fetching data from DB
  useEffect(() => {
    setPostes(fetchPostes());
    setMatricules(fetchMatricules());
    setRemplacents(fetchRemplacents());
    setSignataires(fetchSignataires());
  }, []);

  // Logic to calculate remaining days for vacation
  const calculateRemainingDays = (dateFrom, dateTo) => {
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    return 30 - diffDays; 
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Call API to save form data
  };

  return {
    formData,
    postes,
    matricules,
    remplacents,
    signataires,
    calculateRemainingDays,
    handleFormChange,
    handleSubmit,
  };
};

export default useVacationForm;
