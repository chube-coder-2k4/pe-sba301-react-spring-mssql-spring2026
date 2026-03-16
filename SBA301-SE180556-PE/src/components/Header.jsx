import { useState, useEffect } from "react";

function Header({ title }) {
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();
    setCurrentDate(`${day}/${month}/${year}`);
  }, []);

  return (
    <div
      style={{
        borderBottom: "2px solid #dee2e6",
        marginBottom: "20px",
        paddingBottom: "10px",
      }}
    >
      <div className="d-flex justify-content-between align-items-center px-3 pt-2">
        <div
          style={{
            border: "1px solid #000",
            padding: "4px 12px",
            fontWeight: "bold",
          }}
        >
          Logo
        </div>
        <div style={{ fontSize: "14px" }}>
          <span>Date: </span>
          <span>{currentDate || "dd/MM/yyyy"}</span>
        </div>
      </div>
      <div className="text-center mt-1">
        <strong style={{ fontSize: "18px" }}>{title}</strong>
      </div>
    </div>
  );
}

export default Header;