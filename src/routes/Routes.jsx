import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "../views/pages/HomePage";
import AboutPage from "../views/pages/AboutPage";
import ShopPage from "../views/pages/ShopPage";
import NftPage from "../views/pages/NftPage";
import TermsPage from '../views/pages/TermsPage'
import TransactionPage from "../views/pages/TransactionPage";
import PrivateRoutes from "../routes/PrivateRoutes";
import PubilcRoutes from "../routes/PubilcRoutes";
import Layout from "../shared/components/layout";

export default function RoutesHandler() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />} >
          <Route path="/" element={<HomePage />} />
          {/* Private Routes */}
          <Route path="/" element={<PrivateRoutes />}>
            {/* Main Pages */}
            <Route path="/your-everyday-goddesses" element={<NftPage />} />
            <Route path="/your-transactions" element={<TransactionPage />} />
          </Route>

          {/* Pubilc Routes */}
          <Route
            path="/about-everyday-goddesses"
            element={
              <PubilcRoutes>
                <AboutPage />
              </PubilcRoutes>
            }
          />
          {/*Sub Contain*/}
          <Route
            path="/about-everyday-goddesses/:id"
            element={
              <PubilcRoutes>
                <AboutPage />
              </PubilcRoutes>
            }
          />
          <Route
            path="/everyday-goddesses-boba-Shop"
            element={
              <PubilcRoutes>
                <ShopPage />
              </PubilcRoutes>
            }
          />
           <Route
          path="/everyday-goddesses-terms-and-conditions"
          element={
            <PubilcRoutes>
              <TermsPage />
            </PubilcRoutes>
          }
        />
        {/*Sub Contain*/}
        <Route
          path="/everyday-goddesses-terms-and-conditions/:id"
          element={
            <PubilcRoutes>
              <TermsPage />
            </PubilcRoutes>
          }
        />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
