import nodeLogo from "./assets/node.svg";
import { useState } from "react";
import Update from "@/components/update";
import "./App.scss";
import { AppProvider } from "./providers/app";
import { AppRoutes } from "./routes";

console.log(
  "[App.tsx]",
  `Hello world from Electron ${process.versions.electron}!`
);

function App() {
  return (
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  );
}

export default App;
