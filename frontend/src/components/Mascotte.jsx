import { useState } from 'react';
import './Mascotte.css'; // Fichier CSS à créer

const Mascotte = () => {
  const [heureuse, setHeureuse] = useState(false);
  const [message, setMessage] = useState("");

  const phrasesEncouragement = [
    "Allez, courage ! ✨",
    "Postule comme un chef ! 🎯",
    "Le bon stage est pour toi ! 💌",
    "Une candidature = une chance ! 🚀",
    "T'aurais pas oublié de relancé toi ?",
    "EZ WIN"
  ];

  const cliquerMascotte = () => {
    setHeureuse(true);
    setMessage(phrasesEncouragement[Math.floor(Math.random() * phrasesEncouragement.length)]);
    
    setTimeout(() => {
      setHeureuse(false);
      setMessage("");
    }, 3000);
  };

  return (
    <div className="mascotte-container">
      <div 
        className={`mascotte ${heureuse ? 'saute' : ''}`} 
        onClick={cliquerMascotte}
      >
        {/* Visage de chat-kawaii */}
        <div className="tete-mascotte">
          <div className="yeux">
            <div className="oeil"></div>
            <div className="oeil"></div>
          </div>
          <div className={`bouche ${heureuse ? 'sourire' : ''}`}></div>
        </div>
      </div>
      
      {message && <div className="bulle-discours">{message}</div>}
    </div>
  );
};

export default Mascotte;