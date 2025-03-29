import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Form = () => {
  const navigate = useNavigate();
  const [application, setApplication] = useState({
    entreprise: "",
    offer: "",
    lien: "",
    date: "",
    status: "En attente",
    relaunchDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setApplication(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/applications/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(application),
      });
      if (!response.ok) throw new Error("Erreur lors de l'envoi");
      alert("Application ajoutée !");
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
            <input name="entreprise" value={application.entreprise} onChange={handleChange} required />

            <label>Poste</label>
            <input name="offer" value={application.offer} onChange={handleChange} required />

            <label>Lien de l'offre</label>
            <input name="lien" value={application.lien} onChange={handleChange} />

            <label>Date</label>
            <input type="date" name="date" value={application.date} onChange={handleChange} required />

            <label>Statut</label>
            <select name="status" value={application.status} onChange={handleChange}>
              <option value="En attente">En attente</option>
              <option value="Acceptée">Acceptée</option>
              <option value="Refusée">Refusée</option>
            </select>

            <label>Date de relance</label>
            <input type="date" name="relaunchDate" value={application.relaunchDate} onChange={handleChange} />

            <button type="submit">Valider</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;