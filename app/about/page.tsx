import React from "react";
import AboutHeading from "../components/about/AboutHeading";
import HeadingPage from "../components/page/HeadingPage";
import ImageText from "../components/about/ImageText";

const About = () => {
  return (
    <>
      <HeadingPage title="O nama" />
      <AboutHeading
        center={true}
        className=""
        title="Dobrodošli"
        subtitle="Dobrodošli u našu aplikaciju za volontere, mjesto gdje se susreću dobri ljudi i organizacije sa srcem. Naša vizija je stvoriti zajednicu koja se zalaže za međusobno razumijevanje i podršku, gdje svako može pronaći svoje mjesto u stvaranju pozitivnih promjena."
      />
      <ImageText
        title="Achieving Growth and Excellence: Our Action Plan"
        src="/volonteri.png"
        invert={true}
        subtitle="We are a goal-oriented organization with a carefully crafted action plan. Our commitment lies in investing in initiatives that lead to stronger and expanded customer relationships."
      ></ImageText>
      <ImageText
        title="Achieving Growth and Excellence: Our Action Plan"
        src="/volonteri.png"
        invert={false}
        subtitle="We are a goal-oriented organization with a carefully crafted action plan. Our commitment lies in investing in initiatives that lead to stronger and expanded customer relationships."
      ></ImageText>
    </>
  );
};

export default About;
