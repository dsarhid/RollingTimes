import React from "react";
import "./bannerCovid.css";

const BannerCovid = () => {
  return (
    <div>


      <div className="d-flex row justify-content-center mx-0" id="banner-covid-container">
        <a
        className="col-sm-4 col-md-4 col-lg-2 pt-5"
          href="https://www.lanacion.com.ar/sociedad/la-vacunacion-en-la-argentina-en-tiempo-real-nid02022021/"
          id="covid-link"
        >
          CORONAVIRUS
        </a>
        <a className="col-sm-4 col-md-4 col-lg-2 pt-5" href="https://www.lanacion.com.ar/sociedad/vacunas-lo-que-hay-que-saber-sobre-todas-las-que-se-aplican-en-el-mundo-nid01062021/">
          VACUNAS, UNA POR UNA
        </a>
        <a className="col-sm-4 col-md-4 col-lg-2 pt-5" href="https://www.lanacion.com.ar/sociedad/vacunas-nid2568125/">
          VACUNACION GLOBAL, TIEMPO REAL
        </a>
        <a className="col-sm-4 col-md-4 col-lg-2 pt-5" href="https://www.lanacion.com.ar/el-mundo/coronavirus-asi-se-propaga-virus-mundo-nid2351138/">
          LA PANDEMIA EN EL MUNDO
        </a>
        <a className="col-sm-4 col-md-4 col-lg-2 pt-5" href="https://newsletter.lanacion.com.ar/#/newsletter/215/">
          COMO CUIDARSE
        </a>
      </div>
    </div>
  );
};

export default BannerCovid;
