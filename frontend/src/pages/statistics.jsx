import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Statistics = () => {
    const [stats, setStats] = useState([]);
    const [total, setTotal] = useState(0);
    const [relaunches, setRelaunches] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsRes, totalRes, relaunchesRes] = await Promise.all([
                    axios.get('/applications/stats'),
                    axios.get('/applications/get'),
                    axios.get('/applications/relaunches')
                ]);
                
                setStats(statsRes.data);
                setTotal(totalRes.data.length);
                setRelaunches(relaunchesRes.data);
            } catch (error) {
                console.error("Erreur:", error.response?.data || error.message);
            }
        };
        fetchData();
    }, []);

    // ... reste du code inchangé
};

export default Statistics;