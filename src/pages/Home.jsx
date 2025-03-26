import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";
import Booktable from "../components/home/Booktable";

const Home = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();
  const usernameLocal = localStorage.getItem("user");

  useEffect(() => {
    if (!usernameLocal) {
      navigate("/");
      return;
    }

    const token = localStorage.getItem("token");
    console.log("token ", token);

    axios
      .get("https://tomas-back.onrender.com/books", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setBooks(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
        if (error.code === "ERR_NETWORK") {
          alert(
            "Cannot connect to server. Please check your backend is running."
          );
        }
      });
  }, [usernameLocal, navigate]);

  const handleLogOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="contaner p-4">
      <div className="flex justify-between items-center">
        <h1 className="lead display-4 mt-5">Book List</h1>
        <Link to="/books/create">
          <CiSquarePlus className="display-5" />
        </Link>
        <span className="mx-2">Welcome, {usernameLocal}!</span>
        <button className="btn btn-primary my-3" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
      <Booktable books={books} />
    </div>
  );
};

export default Home;
