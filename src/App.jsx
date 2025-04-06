import React from "react";
import { BrowserRouter } from "react-router-dom";
import { Container, MantineProvider, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import AppHeader from "./components/AppHeader";
import AppRoutes from "./routes";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <MantineProvider>
      <BrowserRouter>
        <AppHeader />
        <AppRoutes />
        <Footer />
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
