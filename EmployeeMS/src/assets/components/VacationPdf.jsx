import React from "react";
import { Document, Page, Text, View, StyleSheet } from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: { padding: 30, fontSize: 12 },
  titleContainer: { textAlign: "center", marginBottom: 20 },
  title: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
  table: { display: "flex", flexDirection: "column", border: "1px solid black", width: "100%" },
  row: { flexDirection: "row", borderBottom: "1px solid black", width: "100%" },
  cell: { flex: 1, padding: 6, borderRight: "1px solid black" },
  lastCell: { flex: 1, padding: 6 }, 
  bold: { fontWeight: "bold" },
  centered: { textAlign: "center", marginTop: 30 },
});


const VacationPDF = ({ formData }) => {
  console.log("Form Data: ", formData);
  return(
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>TITRE DE CONGÉ</Text>
      </View>

      {/* Table */}
      <View style={styles.table}>
        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold]}>Matricule</Text>
          <Text style={styles.lastCell}>{formData.matricule || "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold]}>Nom et Prénom</Text>
          <Text style={styles.lastCell}>{formData.name || "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold]}>Fonction</Text>
          <Text style={styles.lastCell}>{formData.poste || "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold]}>Résidence Administrative</Text>
          <Text style={styles.lastCell}>{formData.residence || "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold]}>Nature du Congé</Text>
          <Text style={styles.lastCell}>{formData.nature || "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold]}>Durée du Congé</Text>
          <Text style={styles.lastCell}>{formData.dureeDeConge ? `${formData.dureeDeConge} jours` : "N/A jours"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold]}>Période du</Text>
          <Text style={styles.lastCell}>{formData.dateFrom || "N/A"} AU {formData.dateTo || "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold]}>Exercice</Text>
          <Text style={styles.lastCell}>{formData.exercice || "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold]}>Reste</Text>
          <Text style={styles.lastCell}>{formData.reste || "/"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold]}>Remplaçant</Text>
          <Text style={styles.lastCell}>{formData.remplacent_name || "N/A"}</Text>
        </View>

        <View style={styles.row}>
          <Text style={[styles.cell, styles.bold]}>Signataire:</Text>
          <Text style={styles.lastCell}>{formData.signataire_name ? `${formData.signataire_name} - ${formData.signataire_grade}` : "N/A"}</Text>
        </View>
      </View>

      {/* Signature */}
      <View style={styles.centered}>
        <Text style={styles.bold}>LA DIRECTRICE</Text>
      </View>
    </Page>
  </Document>
  );
};

export default VacationPDF;
