import React, { useState } from "react";
import Bydleni from "./pages/Bydleni";
import ONas from "./pages/ONas";
import SeznamSe from "./pages/SeznamSe";
import "./App.css";

function App() {
  const [activeTab, setActiveTab] = useState("bydleni");

  const renderContent = () => {
    switch (activeTab) {
      case "bydleni":
        return <Bydleni />;
      case "o-nas":
        return <ONas />;
      case "seznam-se":
        return <SeznamSe />;
      default:
        return <Bydleni />;
    }
  };

  return (
    <div className="App">
      <header>
        <h1>Studentské Bydlení</h1>
        <nav>
          <ul className="menu">
            <li onClick={() => setActiveTab("bydleni")}>Bydlení</li>
            <li onClick={() => setActiveTab("o-nas")}>O nás</li>
            <li onClick={() => setActiveTab("seznam-se")}>Seznam se</li>
          </ul>
        </nav>
      </header>
      <main>{renderContent()}</main>
    </div>
  );
}

export default App;