import { Spin } from "antd";
import Title from "antd/es/typography/Title";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();

  function handleStart() {
    // TODO: Redirect to login if the user is undefined
    navigate("/app");
  }

  // useEffect(() => {
  //   setTimeout(() => {
  //     handleStart();
  //   }, 5000);
  // }, []);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyItems: "center",
        alignItems: "center",
        gap: "32px",
      }}
    >
      <img style={{ objectFit: "scale-down" }} src="logo.jpg" width={150} />
      <Spin />
    </div>
  );
}

export default Landing;
