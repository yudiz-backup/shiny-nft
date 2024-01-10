import React from "react";
import "../../assets/styles/styles.css";
import shopIconBtn from "../../assets/images/shop-icon-btn.svg";
import useWindowSize from "../../shared/hooks/useWindowSize/index"
import Helmet from "react-helmet"

export default function HomePage() {
  const [width] = useWindowSize()

  return (
    <section
      className="banner-section d-flex align-items-end"
      style={{ height: width }}
    >
      <Helmet title="Home of the Everyday Goddesses" />
        <a target="_blank" rel="noreferrer noopener"
          href="https://opensea.io/collection/everyday-goddesses"
          className="d-md-none d-flex align-items-center justify-content-center pink-bg-btn"
        >
          SHOP GODDESSES ON OS <img src={shopIconBtn} alt="everyday-goddesses" />
        </a>
    </section>

  );
}
