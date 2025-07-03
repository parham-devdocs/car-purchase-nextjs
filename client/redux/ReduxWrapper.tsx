"use client"; 

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor} from "./Index";
import ThemeProvider from "@/themeProvider";

export default function ReduxWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
      <ThemeProvider>
      {children}
      </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}