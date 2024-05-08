import React from "react";
import AboutHeading from "../components/about/AboutHeading";
import HeadingPage from "../components/page/HeadingPage";

const About = () => {
  return (
    <>
      <HeadingPage title="O nama" />
      <AboutHeading
        center={true}
        className=""
        title="O nama"
        subtitle="Dobrodošli u našu aplikaciju za volontere, mjesto gdje se susreću dobri ljudi i organizacije sa srcem. Naša vizija je stvoriti zajednicu koja se zalaže za međusobno razumijevanje i podršku, gdje svako može pronaći svoje mjesto u stvaranju pozitivnih promjena."
      />
    </>
  );
};

export default About;
