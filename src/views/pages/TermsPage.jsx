import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useParams } from "react-router";
import '../../assets/styles/styles.css'
import TermsButtonContent from "../../shared/components/termsContent/TermsButtonContent";
import TermsConditions from "../../shared/components/termsContent/TermsCondition";
import PrivacyPolicy from "../../shared/components/termsContent/PrivacyPolicy";
import NFTLicense from "../../shared/components/termsContent/NFTLicence";
import Helmet from "react-helmet"

export default function Terms() {
  const { id } = useParams();

  return (
    <section className="about-page common-container terms-page">
      <Helmet title="Everyday Goddesses Terms & Conditions" />
        <div className="outer-content-box">
          <div className="inner-box d-flex flex-column justify-content-between">
            <div className="tab-content d-flex " id="pills-tabContent">
              {!id && <TermsConditions />}
              {id === "everyday-goddesses-privacy-policy" && <PrivacyPolicy />}
              {id === "everyday-goddesses-NFT-license" && <NFTLicense />}
            </div>
            <div className="tab-buttons justify-self-end">
              <TermsButtonContent />
            </div>
          </div>
        </div>
    </section>
  );
}
