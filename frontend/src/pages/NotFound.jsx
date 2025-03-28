import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="text-center py-10">
            <h1 className="text-4xl font-bold mb-4">404 - Page non trouvée</h1>
            <p className="text-xl mb-6">Désolé, la page que vous cherchez n'existe pas.</p>
            <Link 
                to="/" 
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Retour à l'accueil
            </Link>
        </div>
    );
};

export default NotFound;