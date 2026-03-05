import React from "react";
import "./App.css";
import { MemoryRouter } from "react-router-dom";
import Providers from "./provider";
import Header from "./components/header";

const App: React.FC = () => {
  const currentPath = window.location.pathname;

  console.log("📢 Header App mounting with current path:", currentPath);

  return (
    <Providers>
      <MemoryRouter initialEntries={[currentPath]}>
        <Header />
      </MemoryRouter>
    </Providers>
  );
};

export default App;