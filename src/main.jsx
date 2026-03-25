import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/index.css";
import { HeroUIProvider } from "@heroui/react";
import AuthContextProvider from "./contexts/AuthContext.jsx";
import { QueryClient } from './../node_modules/@tanstack/query-core/src/queryClient';
import { QueryClientProvider } from "@tanstack/react-query";

const QueryClientInstance = new QueryClient();
createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <QueryClientProvider client={QueryClientInstance}>
      <HeroUIProvider>
        <App />
      </HeroUIProvider>
    </QueryClientProvider>
  </AuthContextProvider>,
);
