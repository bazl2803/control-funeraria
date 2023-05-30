import "./index.css";
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
