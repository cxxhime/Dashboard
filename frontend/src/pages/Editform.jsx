import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [candidature, setCandidature] = useState({
    entreprise: "",
    post: "",
    lien: "",
    date: "",
    statut: "En attente",
    dateRelance: "",
  });

  useEffect(() => {
    const fetchCandidature = async () => {
      try {
        const { data } = await axios.get(`http://localhost:3000/api/candidatures/get/${id}`);
        setCandidature(data);
      } catch (error) {
        console.error("Erreur lors du chargement :", error);
      }
    };
    fetchCandidature();
  }, [id]);

  const handleChange = (e) => {
    setCandidature({ ...candidature, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3000/api/candidatures/update/${id}`, candidature);
      alert("Candidature modifiée !");
      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la modification :", error);
      alert("Erreur lors de la modification");
    }
  };

  return (
    <div>
      <h2>Modifier une candidature</h2>
      <form onSubmit={handleSubmit}>
        <input name="entreprise" value={candidature.entreprise} onChange={handleChange} required />
        <input name="post" value={candidature.post} onChange={handleChange} required />
        <input name="lien" value={candidature.lien} onChange={handleChange} />
        <input type="date" name="date" value={candidature.date} onChange={handleChange} required />
        <select name="statut" value={candidature.statut} onChange={handleChange}>
          <option value="En attente">En attente</option>
          <option value="Acceptée">Acceptée</option>
          <option value="Refusée">Refusée</option>
        </select>
        <label>Date de relance :</label>
        <input type="date" name="dateRelance" value={candidature.dateRelance} onChange={handleChange} />
        <button type="submit">Enregistrer</button>
      </form>
    </div>
  );
};

export default EditForm;