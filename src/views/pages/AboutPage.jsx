import React from "react";
import PillsCommunity from "../../shared/components/aboutContent/PillsCommunity";
import Perks from "../../shared/components/aboutContent/Perks";
import RoadMap from "../../shared/components/aboutContent/RoadMap";
import Teams from "../../shared/components/aboutContent/Teams";
import ButtonContent from "../../shared/components/aboutContent/ButtonContent";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router";
import "../../assets/styles/styles.css";
import Helmet from "react-helmet"

export default function About() {
  const { id } = useParams(); 

  return (
    <section className="about-page common-container">
      <Helmet title="About Everyday Goddesses" />
        <div className="outer-content-box">
          <div className="inner-box d-flex flex-column justify-content-between">
            <div className="tab-content d-flex " id="pills-tabContent">
              {!id && <PillsCommunity />}
              {id === "everyday-goddesses-roadmap" && <RoadMap />}
              {id === "perks-of-owning-an-everyday-goddess" && <Perks />}
              {id === "everyday-goddesses-team" && <Teams />}
            </div>
            <div className="tab-buttons justify-self-end">
              <ButtonContent />
            </div>
          </div>
        </div>
    </section>
  );
}
