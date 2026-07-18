import { queryClient } from "@/core/config/queryClient.ts";
import { store } from "@/core/store/store.ts";
import { Toaster } from "@/shared/components/ui/sonner.tsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
import "./index.css";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
        <Toaster
          richColors
          position="bottom-right"
          visibleToasts={1}
          duration={1500}
        />
      </QueryClientProvider>
    </Provider>
  </StrictMode>,
);
