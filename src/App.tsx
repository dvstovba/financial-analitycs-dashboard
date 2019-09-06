import React from 'react';
import { ThemeProvider } from "react-bootstrap";
import './styles/bootstrap.min.css'
import './styles/bootstrap-grid.min.css'
import Dashboard from "./components/Dashboard";
import ThemeContextProvider from "./ThemeContext";

const App: React.FC = () => {
  return <ThemeProvider prefixes={{ btn: 'my-btn' }}>
          <ThemeContextProvider>
            <Dashboard/>
          </ThemeContextProvider>
        </ThemeProvider>;
};

export default App;
