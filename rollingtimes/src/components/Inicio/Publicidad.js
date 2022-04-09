import React from "react";
import ad1gif from "../../assets/gifs/sale.gif";
import ad1logo from "../../assets/gifs/rolling2.png";
import ad2gif from "../../assets/gifs/nike-gif.gif";
import ad3logo1 from "../../assets/gifs/netflix1-logo.png";
import ad3image from "../../assets/gifs/netflix-series.jpeg";
import "./publicidad.css";

const AdLogo = () => {
    return <div id='AdLogo'>
        <p>AD</p>
    </div>
}

const Publicidad = ({ publicidad = 1 }) => {
  if (publicidad === 1) {
    return (
      <div
        className="publicidad-container"
        style={{ backgroundColor: "black"  }}
      >
        <div className="title-logo-container">
          <img className="ad-logo" src={ad1logo}  alt="ad" style={{ maxWidth: "150px" }} />
          <h1 className="title1 title" style={{ color: "white" }}>
            JOIN THE CAREER OF THE FUTURE
          </h1>
        </div>
        <img
          className="ad-gif "
          src={ad1gif}
          alt="ad"
          style={{ maxWidth: "180px" }}
        />
        <AdLogo />
      </div>
    );
  }

  if (publicidad === 2) {
    return (
      <div
        className="publicidad-container"
        style={{ backgroundColor: "white" }}
      >
        <div className="title-logo-container">
          <h1
            className="title2 title"
            style={{ color: "#222222", padding: 0, margin: 0 }}
          >
            Say <strong>CUSTOM</strong>, enjoy <strong>CUSTOM</strong>.
          </h1>
          
        </div>
        <img
          className="ad-gif"
          src={ad2gif}
          alt="ad"
          style={{ maxWidth: "180px" }}
        />

        <AdLogo />
      </div>
    );
  }


  if (publicidad === 3) {
    return (
      <div
        className="publicidad-container"
        style={{ backgroundColor: "#222222", padding: 0 }}
      >
        <div className="title-logo-container" style={{paddingTop: '1rem'}}>
          <h1
            className="title3 title"
            style={{ color: "whitesmoke", padding: 0, margin: 0 }}
          >
            TUS SERIES Y PELICULAS FAVORITAS EN
          </h1>
          <img src={ad3logo1} alt="ad" style={{ maxWidth: "150px" }} />
        </div>
        <img
          className="ad-gif"
          src={ad3image}
          alt="ad"
          style={{ maxWidth: "400px" }}
        />

        <AdLogo />
      </div>
    );
  }
};

export default Publicidad;
