import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardPage from "./pages/dashboard";
import ContentPage from "./pages/content";
import { BeerProvider } from "./context/beer";
import { CheckFlagProvider } from "./context/checkflag";
import { ToastProvider } from "./context/ToastContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { AddGlassCountProvider } from "./context/addGlassCount";
import { UserProvider } from "./context/user";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <ErrorBoundary>
      <UserProvider>
        <ToastProvider>
          <AddGlassCountProvider>
            <CheckFlagProvider>
              <BeerProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<DashboardPage />} />
                    <Route path="/game" element={<ContentPage />} />
                  </Routes>
                </Router>
                <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                  theme="dark"
                />
              </BeerProvider>
            </CheckFlagProvider>
          </AddGlassCountProvider>
        </ToastProvider>
      </UserProvider>
    </ErrorBoundary>
  );
}

export default App;
