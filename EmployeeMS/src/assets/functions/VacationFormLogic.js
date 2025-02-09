import { useState, useEffect } from "react";  
import { supabase } from "./SupabaseClient";

// Fetching all necessary data
const fetchPostes = async () => {
  const { data, error } = await supabase.from("grades").select("*");
  if (error) console.error("Error fetching postes:", error);
  return data || [];
};

const fetchMatricules = async () => {
  const { data, error } = await supabase.from("employees").select("employee_id, nom, prenom, grade_id, residence");
  if (error) console.error("Error fetching matricules:", error);
  return data || [];
};

const fetchRemplacents = async () => {
  const { data, error } = await supabase.from("employees").select("employee_id, nom, prenom");
  if (error) console.error("Error fetching remplacents:", error);
  return data || [];
};

const fetchSignataires = async () => {
  const { data, error } = await supabase.from("employees")
    .select("employee_id, nom, prenom, grade_id")
    .in("grade_id", [4, 5, 6]);
  if (error) console.error("Error fetching signataires:", error);
  return data || [];
};

const useVacationForm = () => {
  const [formData, setFormData] = useState({
    matricule: "",
    name: "",
    poste: "",
    residence: "",
    dateFrom: "",
    dateTo: "",
    dureeDeConge: "",  // New field for vacation duration
    reste: 0,
    exercice: new Date().getFullYear(),
    nature: "Annuel",
    remplacent: "",
    signataire: "",
    error: "", // Error message for validation
  });
  const [postes, setPostes] = useState([]);
  const [matricules, setMatricules] = useState([]);
  const [remplacents, setRemplacents] = useState([]);
  const [signataires, setSignataires] = useState([]);

  // Simulate fetching data from Supabase
  useEffect(() => {
    const fetchData = async () => {
      setPostes(await fetchPostes());
      setMatricules(await fetchMatricules());
      setRemplacents(await fetchRemplacents());
      setSignataires(await fetchSignataires());
    };
    fetchData();
  }, []);

  // Fetch employee details when matricule changes
  useEffect(() => {
    const fetchEmployeeDetails = async (employeeId) => {
      if (employeeId) {
        const { data, error } = await supabase
          .from("employees")
          .select("nom, prenom, grade_id, residence")
          .eq("employee_id", employeeId)
          .single();
        if (error) console.error("Error fetching employee details:", error);
        else {
          setFormData((prevData) => ({
            ...prevData,
            name: `${data.nom} ${data.prenom}`,
            poste: data.grade_id,
            residence: data.residence,
          }));
        }
      }
    };

    if (formData.matricule) {
      fetchEmployeeDetails(formData.matricule);
    }
  }, [formData.matricule]);

  // Logic to calculate remaining days for vacation
  const calculateRemainingDays = (dateFrom, dateTo) => {
    const from = new Date(dateFrom);
    const to = new Date(dateTo);
    const diffTime = Math.abs(to - from);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return 30 - diffDays;
  };

  // Calculate duration of vacation (dureeDeConge)
  const calculateDuration = (dateFrom, dateTo) => {
    if (dateFrom && dateTo) {
      const from = new Date(dateFrom);
      const to = new Date(dateTo);
      const diffTime = Math.abs(to - from);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays;
    }
    return 0;  // If no dates are selected, return 0
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    // Call API to save form data
  };

  // Update the duration dynamically whenever dateFrom or dateTo changes
  useEffect(() => {
    const duree = calculateDuration(formData.dateFrom, formData.dateTo);
    setFormData((prevData) => ({
      ...prevData,
      dureeDeConge: duree,
      error: duree > 30 ? "La durée du congé ne peut pas dépasser 30 jours." : "", // Show error if > 30 days
    }));
  }, [formData.dateFrom, formData.dateTo]);

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
