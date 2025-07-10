import { RedirectToSignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <SignedIn>
                <Dashboard />
              </SignedIn>
              <SignedOut>
                <RedirectToSignIn />
              </SignedOut>
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
