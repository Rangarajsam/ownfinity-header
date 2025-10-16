import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Providers from "./provider";
import Header from "./components/header";

const App: React.FC = () => {
  return (
    <Providers>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Providers>
  );
};

export default App;