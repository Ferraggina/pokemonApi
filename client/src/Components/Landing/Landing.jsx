import React from "react";
import { Link } from "react-router-dom";
import LandingTest from "../../assets/LandingTest.gif";

export default function LandingPage() {
  return (
    <div className="landing">
      <img src={LandingTest} alt="Landing-Ima" />
      <div>
        <h1>Bienvenido a mi POKEAPI</h1>
        <Link to="/home">
          <button className="homeButton">Cath 'Em all</button>
        </Link>
      </div>
    </div>
  );
}
