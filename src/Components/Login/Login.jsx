import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Correct import
import CustomButton from "../ReusuableComponents/CustomButton";

const Login = () => {
  const [mobileNumber, setMobileNumber] = useState(""); // State for mobile number
  const navigate = useNavigate(); // Call useNavigate at the top level

  function handleContinue() {
    // Check if the mobile number is exactly 10 digits
    if (mobileNumber.length === 10) {
      // Navigate to specific path
      navigate("/");
    } else {
      alert("Please enter a valid 10-digit mobile number."); // Alert for invalid input
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#ffe5ee",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="container"
        style={{
          width: "30%",
          height: "500px",
          position: "relative",
          padding: 0,
        }}
      >
        <img
          className="loginimage"
          style={{ width: "100%", margin: 0 }}
          src="https://assets.myntassets.com/assets/images/2023/1/25/f5e9a029-33c3-4a92-811b-ef7917fe6d441674670210687-offer-banner-300-600x240-code-_-MYNTRA300.jpg"
          alt="Login Banner"
        />
        <div
          className="card"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "-5px",
            padding: "30px",
            border: "0px",
          }}
        >
          <div
            className="container-fluid"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <h4 style={{ fontSize: "16px" }}>Login or Signup</h4>
            <input
              type="text" // Changed to text for better input handling
              placeholder="+91 | Mobile Number"
              value={mobileNumber} // Bind input value to state
              onChange={(e) => setMobileNumber(e.target.value)} // Update state on change
              style={{ marginBottom: "20px", padding: "10px", width: "100%" }}
            />
            <div
              className="colorforlogin"
              style={{
                marginBottom: "20px",
                display: "flex",
                fontSize: "12px",
              }}
            >
              <p style={{ margin: 0 }}>By continuing, I agree to the</p>
              <p
                className="p-edit"
                style={{ color: "#F13AB1", margin: "0 5px", fontSize: "12px" }}
              >
                Terms of Use
              </p>
              <p style={{ margin: 0 }}>&</p>
              <p
                className="p-edit"
                style={{ color: "#F13AB1", margin: "0 5px", fontSize: "12px" }}
              >
                Privacy Policy
              </p>
            </div>
            <CustomButton
              variant="contained"
              text="Continue"
              className="button-continue"
              backgroundColor="#E72744"
              width="100%"
              height="40px"
              onClick={handleContinue}
            />
            <div
              className="b-trouble d-flex"
              style={{ marginTop: "20px", fontSize: "12px" }}
            >
              <p style={{ margin: 0 }}>Have Trouble Logging in?</p>
              <p style={{ color: "#F13AB1", marginLeft: "5px" }}>Get help</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;