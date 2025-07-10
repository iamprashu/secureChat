import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import UiContext from "./Contexts/UiContext.jsx";
import { ClerkProvider } from "@clerk/clerk-react";
import AppRouter from "./router/AppRouter.jsx";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <UiContext>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <AppRouter>
        <App />
      </AppRouter>
    </ClerkProvider>
  </UiContext>
);
