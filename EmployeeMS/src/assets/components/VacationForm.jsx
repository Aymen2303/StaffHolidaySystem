import React, { useState } from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel, Typography } from "@mui/material";
import useVacationForm from "../functions/VacationFormLogic";
import { pdf } from "@react-pdf/renderer";
import VacationPDF from "./VacationPdf";
import PrintVacationPDF from "./PrintVacationPdf";
import "./../styles/VacationForm.css";

const VacationForm = () => {
  const {
    formData,
    postes,
    matricules,
    remplacents,
    signataires,
    calculateRemainingDays,
    handleFormChange,
    handleSubmit,
  } = useVacationForm();

  const [savedData, setSavedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const isButtonDisabled = formData.error || formData.dureeDeConge > 30;

  const handleSave = (event) => {
    event.preventDefault();
    setSavedData({ ...formData }); 
  };

  const resetForm = () => {
    setSavedData(null);
    handleFormChange({
      target: {
        name: "reset",
        value: {
          matricule: "",
          name: "",
          poste: "",
          residence: "",
          dateFrom: "",
          dateTo: "",
          dureeDeConge: "",
          nature: "",
          remplacent: "",
          signataire: "",
          error: "",
        },
      },
    });
  };

  const handlePrint = async () => {
    const remainingDays = calculateRemainingDays(formData.dateFrom, formData.dateTo);

    const pdfData = {
      ...formData,
      reste: remainingDays, 
    };
    console.log("Remplaçant Name:", formData.remplacant_name);
    const blob = await pdf(<VacationPDF formData={formData} />).toBlob();
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="vacation-form">
        <h2>Formulaire de Congé</h2>

        {/* Matricule */}
        <TextField
          select
          label="Matricule"
          name="matricule"
          value={formData.matricule}
          onChange={handleFormChange}
          fullWidth
        >
          {matricules.map((matricule) => (
            <MenuItem key={matricule.employee_id} value={matricule.employee_id}>
              {matricule.employee_id} - {matricule.nom} {matricule.prenom}
            </MenuItem>
          ))}
        </TextField>

        {/* Name */}
        <TextField  
          label="Nom Complet"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          fullWidth
          disabled 
        />

        {/* Grade */}
        <TextField
          label="Grade"
          name="poste"
          value={formData.poste}
          onChange={handleFormChange}
          fullWidth
          disabled
        />

        {/* Residence */}
        <TextField
          label="Résidence"
          name="residence"
          value={formData.residence}
          onChange={handleFormChange}
          fullWidth
          disabled
        />

        {/* Date From and Date To */}
        <TextField
          type="date"
          label="Date de début"
          name="dateFrom"
          value={formData.dateFrom}
          onChange={handleFormChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          type="date"
          label="Date de fin"
          name="dateTo"
          value={formData.dateTo}
          onChange={handleFormChange}
          fullWidth
          InputLabelProps={{ shrink: true }}
        />

        {/* Duration */}
        <TextField
          label="Durée du Congé (Jours)"
          name="dureeDeConge"
          value={formData.dureeDeConge}
          onChange={handleFormChange}
          fullWidth
          disabled 
        />

        {/* Error Message */}
        {formData.error && (
          <Typography color="error" variant="body2">
            {formData.error}
          </Typography>
        )}

        {/* Remaining Days */}
        <div>
          <strong>Jours Restants: </strong>
          {formData.dateFrom && formData.dateTo
            ? calculateRemainingDays(formData.dateFrom, formData.dateTo)
            : formData.reste}
        </div>

        {/* Nature de Congé */}
        <FormControl fullWidth>
          <InputLabel>Nature de congé</InputLabel>
          <Select
            name="nature"
            value={formData.nature}
            onChange={handleFormChange}
            fullWidth
          >
            <MenuItem value="Annuel">Annuel</MenuItem>
            <MenuItem value="Maladie">Maladie</MenuItem>
            <MenuItem value="Exceptionnel">Exceptionnel</MenuItem>
          </Select>
        </FormControl>

        {/* Remplaçant */}
        <TextField
          select
          label="Remplaçant"
          name="remplacent"
          value={formData.remplacent}
          onChange={handleFormChange}
          fullWidth
        >
          {remplacents.map((remplacent) => (
            <MenuItem key={remplacent.employee_id} value={remplacent.employee_id}>
              {remplacent.nom} {remplacent.prenom}
            </MenuItem>
          ))}
        </TextField>

        {/* Signataire */}
        <TextField
          select
          label="Signataire"
          name="signataire"
          value={formData.signataire}
          onChange={handleFormChange}
          fullWidth
        >
          {signataires.map((signataire) => (
            <MenuItem key={signataire.employee_id} value={signataire.employee_id}>
              {signataire.employee_id} - {signataire.nom} {signataire.prenom} : {signataire.grades?.grade_name || "N/A"}
            </MenuItem>
          ))}
        </TextField>

        {/* Sauvegarder Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }}
          disabled={isButtonDisabled} 
        >
          Sauvegarder
        </Button>

        {/* Cancel Button */}
        <Button
          type="button"
          variant="outlined"
          sx={{ color: 'red', borderColor: 'red', '&:hover': { borderColor: 'darkred', color: 'darkred' } }}
          onClick={resetForm}
        >
          Annuler
        </Button>

        {/* Imprimer Button */}
        <Button
          type="button"
          variant="outlined"
          sx={{ color: 'blue', borderColor: 'blue', '&:hover': { borderColor: 'darkblue', color: 'darkblue' } }}
          onClick={handlePrint}
        >
        <PrintVacationPDF formData={formData} />
        </Button>
      </div>
    </form>
  );
};

export default VacationForm;