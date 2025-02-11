import { useState, useEffect } from 'react';
import { supabase } from './SupabaseClient';

const useCongeForm = () => {
    
    const [formData, setFormData] = useState({
        titreConge: "",
        soukAhrasLe: new Date().toLocaleDateString(),
        matricule: "",
        nomPrenom: "",
        poste: "",
        residence: "",
        du: "",
        au: "",
        reste: 30,
        exercice: new Date().getFullYear(),
        natureConge: "Annuel",
        remplacant: "",
        signataire: "",
    })

    const [matricules, setMatricules] = useState([]);
    const [postes, setPostes] = useState([]);
    const [remplacants, setRemplacants] = useState([]);
    const [signataires, setSignataires] = useState([]);

    const calculateReste = () => {
        if (formData.du && formData.au) {
          const start = new Date(formData.du);
          const end = new Date(formData.au);
          const diffDays = (end - start) / (1000 * 60 * 60 * 24);
          setFormData((prev) => ({ ...prev, reste: 30 - diffDays }));
        }
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Saving to DB", formData);
      };

      const handleReset = () => {
        setFormData({
          titreConge: "",
          soukAhrasLe: new Date().toLocaleDateString(),
          matricule: "",
          nomPrenom: "",
          poste: "",
          residence: "",
          du: "",
          au: "",
          reste: 30,
          exercice: new Date().getFullYear(),
          natureConge: "Annuel",
          remplacant: "",
          signataire: "",
        });
      };

      return {
        formData,
        matricules,
        postes,
        remplacants,
        signataires,
        handleChange,
        handleSubmit,
        handleReset,
        calculateReste,
      };
    };

export default useCongeForm;