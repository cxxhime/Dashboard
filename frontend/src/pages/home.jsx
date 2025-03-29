import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const Home = () => {
  const [applications, setApplications] = useState([]);
  const [selectedStatut, setSelectedStatut] = useState("all");
  const [selectedEntreprise, setSelectedEntreprise] = useState("all");
  const navigate = useNavigate();

  const fetchApplications = async () => {
    try {
      const { data } = await axios.get("http://localhost:3000/api/applications/get");
      setApplications(data);
    } catch (error) {
      console.error("Erreur lors du chargement :", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const total = applications.length;
  const attente = applications.filter(a => a.status === "En attente").length;
  const acceptee = applications.filter(a => a.status === "Acceptée").length;
  const refusee = applications.filter(a => a.status === "Refusée").length;

  const isRelanceDue = (relaunchDate) => {
    if (!relaunchDate) return false;
    const relanceDate = new Date(relaunchDate);
    const now = new Date();
    const diffDays = Math.floor((now - relanceDate) / (1000 * 60 * 60 * 24));
    return diffDays >= 7;
  };

  const entreprises = [...new Set(applications.map(a => a.entreprise))];

  const filtered = applications.filter((item) => {
    const matchStatut = selectedStatut === "all" || item.status === selectedStatut;
    const matchEntreprise = selectedEntreprise === "all" || item.entreprise === selectedEntreprise;
    return matchStatut && matchEntreprise;
  });

  const handleDelete = async (id) => {
    const confirm = window.confirm("Supprimer cette candidature ?");
    if (!confirm) return;
    try {
      await axios.delete(`http://localhost:3000/api/applications/delete/${id}`);
      setApplications(prev => prev.filter(item => item._id !== id));
    } catch (error) {
      console.error("Erreur lors de la suppression :", error);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="home-container">
        <h1 className="title">📊 Dashboard des candidatures</h1>

        <div className="stats-grid">
          <div className="stat-card indigo">🔢 Total: {total}</div>
          <div className="stat-card yellow">🕓 En attente: {attente}</div>
          <div className="stat-card green">✅ Acceptées: {acceptee}</div>
          <div className="stat-card red">❌ Refusées: {refusee}</div>
        </div>

        <div className="filters">
          <label><strong>Statut:</strong></label>
          <select value={selectedStatut} onChange={(e) => setSelectedStatut(e.target.value)}>
            <option value="all">Tous</option>
            <option value="En attente">En attente</option>
            <option value="Acceptée">Acceptée</option>
            <option value="Refusée">Refusée</option>
          </select>

          <label><strong>Entreprise:</strong></label>
          <select value={selectedEntreprise} onChange={(e) => setSelectedEntreprise(e.target.value)}>
            <option value="all">Toutes</option>
            {entreprises.map((name) => (
              <option key={name} value={name}>{name}</option>
            ))}
          </select>
        </div>

        <div className="relance-block">
          <h3>📌 À relancer (plus de 7 jours)</h3>
          {applications.filter(a => isRelanceDue(a.relaunchDate)).length === 0 ? (
            <p className="success">✅ Aucune relance nécessaire.</p>
          ) : (
            <div className="relance-list">
              {applications.filter(a => isRelanceDue(a.relaunchDate)).map(item => (
                <div key={item._id} className="relance-item">
                  <p><strong>Entreprise:</strong> {item.entreprise}</p>
                  <p><strong>Date de relance:</strong> {item.relaunchDate}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <h2 className="section-title">📋 Mes candidatures</h2>
        {filtered.length === 0 ? (
          <p className="empty">⚠️ Aucune candidature pour l'instant</p>
        ) : (
          <div className="application-list">
            {filtered.map((item) => (
              <div key={item._id} className="application-card">
                <p className="entreprise-name">{item.entreprise}</p>
                <p><strong>Poste:</strong> {item.offer}</p>
                <p><strong>Lien:</strong> <a href={item.lien} target="_blank" rel="noreferrer">Voir l'offre</a></p>
                <p><strong>Date:</strong> {new Date(item.date).toLocaleDateString()}</p>
                <p><strong>Statut:</strong> {item.status}</p>
                <p><strong>Date de relance:</strong> {item.relaunchDate || "—"}</p>
                <div className="actions">
                  <button className="btn edit" onClick={() => navigate(`/edit/${item._id}`)}>Modifier</button>
                  <button className="btn delete" onClick={() => handleDelete(item._id)}>Supprimer</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;