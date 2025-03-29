import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../App.css";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState({
    entreprise: "",
    offer: "",
    lien: "",
    date: "",
    status: "En attente",
    relaunchDate: "",
  });

  useEffect(() => {
    const fetchApplication = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/applications/get/${id}`);
        setApplication(data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };
    fetchApplication();
  }, [id]);

  const handleChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/applications/update/${id}`, application);
      alert("Application modifiée !");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      alert("Erreur lors de la modification");
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2>Modifier une candidature</h2>
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

          <button type="submit">Enregistrer</button>
        </form>
      </div>
    </div>
  );
};

export default EditForm;