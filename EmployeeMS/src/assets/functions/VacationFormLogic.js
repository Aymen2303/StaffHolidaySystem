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
    .select("employee_id, nom, prenom, grade_id, grades(grade_name)")
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
    dureeDeConge: "",  
    reste: 0,
    exercice: new Date().getFullYear(),
    nature: "Annuel",
    remplacent: "",
    signataire: "",
    error: "", 
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
          .select("nom, prenom, grade_id, residence, grades(grade_name) ")
          .eq("employee_id", employeeId)
          .single();
        if (error) console.error("Error fetching employee details:", error);
        else {
          setFormData((prevData) => ({
            ...prevData,
            matricule: employeeId,
            name: `${data.nom} ${data.prenom}`,
            poste: data.grades?.grade_name || "N/A",
            residence: data.residence,
            employeeId: data.employee_id,  
            grade_id: data.grade_id, 
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
    return 0;  
  };

  // Handle form input changes
  const handleFormChange = (e) => {
    const { name, value } = e.target;
  
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: value };
  
      if (updatedData.dateFrom && updatedData.dateTo) {
        updatedData.dureeDeConge = calculateDuration(updatedData.dateFrom, updatedData.dateTo);
      }
  
      return updatedData;
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!formData.matricule || !formData.dateFrom || !formData.dateTo || !formData.remplacent || !formData.signataire) {
      setFormData((prevData) => ({
        ...prevData,
        error: "Please fill in all the required fields."
      }));
      return;
    }
  
    const duration = calculateDuration(formData.dateFrom, formData.dateTo);
    const remainingDays = 30 - duration; 
    const today = new Date().toISOString().split("T")[0];
  
    const vacationData = {
      employee_id: formData.matricule,
      grade_id: formData.grade_id,
      residence: formData.residence,
      nature_conge: formData.nature.toLowerCase(),
      date_debut: formData.dateFrom,
      date_fin: formData.dateTo,
      duree_conge: duration,
      exercice: formData.exercice,
      reste_jours: remainingDays,
      remplacant_id: formData.remplacent,
      signataire_id: formData.signataire,
      observation_status: formData.date_fin >= today ? "en cours" : "terminé",
    };
    
    console.log("Vacation Data:", vacationData); 
    
    const { data, error } = await supabase.from("vacations").insert([vacationData]);
    
    if (error) {
      console.error("Error inserting data into Vacations:", error);
    } else {
      console.log("Vacation data successfully inserted:", data);
    }
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
