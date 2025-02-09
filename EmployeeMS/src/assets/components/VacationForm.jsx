import React from "react";
import { TextField, Select, MenuItem, Button, FormControl, InputLabel } from "@mui/material";
import useVacationForm from "../functions/VacationFormLogic";

const VacationForm = () => {
  const {
    formData,
    postes,
    matricules,
    remplacents,
    signataires,
    calculateRemainingDays,
    handleFormChange,
    handleSubmit
  } = useVacationForm();

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
              {matricule.employee_id} {/* Select by employee ID */}
            </MenuItem>
          ))}
        </TextField>

        {/* Name (automatically updated when matricule changes) */}
        <TextField
          label="Nom Complet"
          name="name"
          value={formData.name}
          onChange={handleFormChange}
          fullWidth
          disabled // Disable the name field because it updates automatically
        />

        {/* Grade (poste) - Automatically updated when matricule changes */}
        <TextField
          label="Grade"
          name="poste"
          value={formData.poste}
          onChange={handleFormChange}
          fullWidth
          disabled // Disable the grade field because it updates automatically
        />

        {/* Residence (auto-filled from employee details) */}
        <TextField
          label="Résidence"
          name="residence"
          value={formData.residence}
          onChange={handleFormChange}
          fullWidth
          disabled
        />

        {/* Date From and To */}
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

        {/* Remaining days */}
        <div>
          <strong>Jours Restants: </strong>
          {formData.dateFrom && formData.dateTo
            ? calculateRemainingDays(formData.dateFrom, formData.dateTo)
            : formData.reste}
        </div>

        {/* Nature de congé */}
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
            <MenuItem value="Maternité">Maternité</MenuItem>
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
              {signataire.nom} {signataire.prenom}
            </MenuItem>
          ))}
        </TextField>

        {/* Submit Buttons */}
        <Button type="submit" variant="contained" color="primary">
          Sauvegarder
        </Button>
        <Button variant="outlined" color="secondary">
          Annuler
        </Button>
        <Button variant="outlined" color="default">
          Imprimer
        </Button>
      </div>
    </form>
  );
};

export default VacationForm;
