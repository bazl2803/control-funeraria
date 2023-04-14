import Landing from "@/features/misc/Landing";
import { Route, Routes } from "react-router-dom";

const user = true;

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
    </Routes>
  );
};
