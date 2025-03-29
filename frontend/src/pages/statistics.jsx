import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = () => {
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        accepted: 0,
        rejected: 0
    });
    const [relaunches, setRelaunches] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, appsRes, relaunchesRes] = await Promise.all([
                    axios.get('/api/applications/stats'),
                    axios.get('/api/applications/get'),
                    axios.get('/api/applications/relaunches')
                ]);

                setStats({
                    total: appsRes.data.length,
                    pending: statsRes.data.find(s => s._id === 'En attente')?.count || 0,
                    accepted: statsRes.data.find(s => s._id === 'Acceptée')?.count || 0,
                    rejected: statsRes.data.find(s => s._id === 'Refusée')?.count || 0
                });
                
                setRelaunches(relaunchesRes.data);
            } catch (error) {
                console.error("Erreur:", error.response?.data || error.message);
            }
        };
        
        fetchData();
    }, []);

    return (
        <div className="stats-page">
            <h1 className="section-title">Statistiques des Applications</h1>
            
            <div className="stats-container">
                <div className="stat-item">
                    <p>Total: {stats.total}</p>
                </div>
                <div className="stat-item">
                    <p>
                        <input type="checkbox" readOnly checked={false} /> 
                        En attente: {stats.pending}
                    </p>
                </div>
                <div className="stat-item">
                    <p>
                        <input type="checkbox" readOnly checked={true} /> 
                        Acceptées: {stats.accepted}
                    </p>
                </div>
                <div className="stat-item">
                    <p>
                        <input type="checkbox" readOnly checked={true} /> 
                        Refusées: {stats.rejected}
                    </p>
                </div>
            </div>

            {relaunches.length > 0 && (
                <div className="relaunch-alert">
                    <h3>Applications à relancer ({relaunches.length})</h3>
                    <ul>
                        {relaunches.map(app => (
                            <li key={app._id}>
                                {app.entreprise} - {app.offer} (envoyée le {new Date(app.date).toLocaleDateString()})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Statistics;