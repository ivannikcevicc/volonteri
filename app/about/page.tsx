"use client";

import React from "react";
import AboutHeading from "../components/about/AboutHeading";
import HeadingPage from "../components/page/HeadingPage";
import ImageText from "../components/about/ImageText";
import { useRouter } from "next/navigation";
import { useContactModal } from "../hooks/useContactModal";

const About = () => {
  const router = useRouter();
  const contactModal = useContactModal();
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
        title="Ko smo mi, i koji problem rješavamo?"
        src="/volonteri.png"
        buttonLabel="Potraži poslove"
        tip1="Istražite prilike"
        tip2="Prijavite se na vrijeme"
        tip3="Povežite se sa organizacijama"
        tip4="Budite pouzdani"
        onClick={() => {
          router.push("/");
        }}
        invert={true}
        subtitle="Naša organizacija predstavlja most koji povezuje volontere sa organizacijama kojima je potrebna pomoć vrijednih i empatičnih pojedinaca. Rješavamo problem nedostatka lako dostupnih informacija o volonterskim prilikama, omogućavajući jednostavno pretraživanje i prijavu za poslove."
      ></ImageText>
      <ImageText
        title="Koji je cilj našeg projekta?"
        src="/volonteri.png"
        invert={false}
        tip1="Pouzdane ponude"
        tip2="Jednostavna pretraga"
        tip3="Sigurnost angažovanja"
        tip4="Privilegovan status za organizacije"
        buttonLabel="Kontaktirajte nas"
        onClick={() => {
          contactModal.onOpen();
        }}
        subtitle="Cilj našeg projekta je da se povežemo sa organizacijama koje angažuju volontere, i distribuiramo njihove usluge, a da pritom čitav proces osiguramo na način da svaka ponuda bude postavljena od strane pouzdanih organizacija i pojedinaca, kako bi postigli maksimalnu sigurnost tokom procesa angažovanja. U koliko ste organizacija i želite saradnju sa nama, sa kojom dobijate privilegovan status na našoj platformi, kontaktirajte nas."
      ></ImageText>
    </>
  );
};

export default About;
