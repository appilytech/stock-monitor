"use client";
import React, { useState } from "react";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Snackbar, Button } from "@mui/material";

import { Provider } from "react-redux";
import { store, persistor } from "@/app/store/store";
import { PersistGate } from "redux-persist/integration/react";

import theme from "@/theme";

export default function Providers({ children }: { children: React.ReactNode }) {
  const [error, setError] = useState("");
  const queryClient = new QueryClient({
    queryCache: new QueryCache({
      onError: (error) => setError(error.message)
    }),
  });

  const closeHandler = () => {
    setError("")
  }

  const action = (<Button onClick={closeHandler}>Close</Button>)

  return (
    <AppRouterCacheProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
              <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={!!error}
                message={error}
                action={action}
              />
              {children}
            </PersistGate>
          </Provider>
        </ThemeProvider>
      </QueryClientProvider>
    </AppRouterCacheProvider>
  );
}
