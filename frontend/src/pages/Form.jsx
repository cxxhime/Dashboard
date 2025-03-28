import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Form = () => {
  const navigate = useNavigate();
  const [candidature, setCandidature] = useState({
    entreprise: "",
    offer: "",
    lien: "",
    date: "",
    statut: "En attente",
    dateRelance: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCandidature((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/candidatures/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(candidature),
      });

      if (!response.ok) throw new Error("Erreur lors de l'envoi");
      alert("Candidature ajoutée !");
      navigate("/");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'envoi");
    }
  };

  return (
    <div className="page-bg">
      <div className="form-wrapper">
        <div className="form-container">
          <h2>Ajouter une candidature</h2>
          <form onSubmit={handleSubmit}>
            <label>Entreprise</label>
            <input name="entreprise" value={candidature.entreprise} onChange={handleChange} required />

            <label>Poste</label>
            <input name="offer" value={candidature.post} onChange={handleChange} required />

            <label>Lien de l’offre</label>
            <input name="lien" value={candidature.lien} onChange={handleChange} />

            <label>Date de candidature</label>
            <input type="date" name="date" value={candidature.date} onChange={handleChange} required />

            <label>Statut</label>
            <select name="statut" value={candidature.statut} onChange={handleChange}>
              <option value="En attente">En attente</option>
              <option value="Acceptée">Acceptée</option>
              <option value="Refusée">Refusée</option>
            </select>

            <label>Date de relance</label>
            <input type="date" name="dateRelance" value={candidature.dateRelance} onChange={handleChange} />

            <button type="submit">Valider</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;

