import React from 'react';
import { ThemeProvider } from "react-bootstrap";
import './styles/bootstrap.min.css'
import './styles/bootstrap-grid.min.css'
import Dashboard from "./components/Dashboard";

const App: React.FC = () => {
  return <ThemeProvider prefixes={{ btn: 'my-btn' }}>
    <Dashboard/>
  </ThemeProvider>;
};

export default App;
