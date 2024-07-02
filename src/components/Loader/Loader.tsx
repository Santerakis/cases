import React from "react";
import loader from "../../assets/images/Rolling-1s-71px.svg";

const Loader = () => {
  return (
    <div
      style={{
        // position: "fixed",
        // top: "30%",
        textAlign: "center",
        width: "100%",
      }}
    >
      <img src={loader} alt="Loading..." />
      нет данных 📋
    </div>
  );
};

export default Loader;
