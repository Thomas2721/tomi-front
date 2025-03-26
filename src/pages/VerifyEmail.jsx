import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import axiosInstance from "../services";

const VerifyEmail = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const verify = async () => {
      const queryParams = new URLSearchParams(window.location.search);
      const token = queryParams.get("token");
      try {
        await axiosInstance.get(
          `https://tomas-back.onrender.com/user/verify-email?token=${token}`
        );
        alert("Email verified successfully. You can now log in.");
        navigate("/");
      } catch (error) {
        console.error(error);
        alert(error.response.data.message || "Verification failed");
      }
    };

    verify();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <h2>Verifying your email...</h2>
    </div>
  );
};

export default VerifyEmail;
