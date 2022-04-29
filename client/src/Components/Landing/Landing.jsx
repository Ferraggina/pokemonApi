import React from "react";
import { Link } from "react-router-dom";
import LandingTest from "../../assets/LandingTest.gif";
import "../Landing/landing.css";

export default function LandingPage() {
  return (
    <div className="landingDiv">
      <img src={LandingTest} alt="Landing-Ima" className="imageLanding" />
      <div className="landingFoot">
        <Link to="/home">
          <button className="landingButton">ATRAPALOS YA!</button>
        </Link>
      </div>
    </div>
  );
}
