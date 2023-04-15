import { Spin } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Landing = () => {
  const navigate = useNavigate();

  function handleStart() {
    // TODO: Redirect to login if the user is undefined
    navigate("/app");
  }

  useEffect(() => {
    handleStart();
  }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
        placeItems: "center",
        gap: "32px",
        width: "100vw",
        height: "100vh",
        margin: 0,
        minWidth: 320,
        minHeight: "100vh",
      }}
    >
      <Spin />
    </div>
  );
};
