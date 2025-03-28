import React from 'react';

const ApplicationCard = ({ application, onDelete }) => {
  const statusColors = {
    'En attente': '#ffb347', /* Orange pastel */
    'Acceptée': '#77dd77',   /* Vert pastel */
    'Refusée': '#ff6961'     /* Rouge pastel */
  };

  return (
    <div className="card">
      <h3 style={{ 
        color: '#ff85a2', /* Rose */
        marginTop: 0 
      }}>
        {application.entreprise}
      </h3>
      <p style={{ color: '#666' }}>Poste: {application.offer}</p>
      <p style={{ 
        color: statusColors[application.status],
        fontWeight: 'bold'
      }}>
        Statut: {application.status}
      </p>
      <div style={{ 
        display: 'flex', 
        gap: '10px', 
        marginTop: '15px'
      }}>
        <button 
          className="btn btn-primary"
          onClick={() => window.location = `/modifier/${application._id}`}
        >
          Modifier
        </button>
        <button 
          style={{ 
            background: '#f3f3f3',
            color: '#666'
          }}
          className="btn"
          onClick={() => onDelete(application._id)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default ApplicationCard;