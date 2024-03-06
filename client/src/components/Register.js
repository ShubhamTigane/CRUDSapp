import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [inputVal, setInputVal] = useState({
    name: "",
    number: "",
    email: "",
    hobbies: "",
  });

  const [error, setError] = useState({
    name: "",
    number: "",
    email: "",
    hobbies: "",
  });

  const setdata = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setInputVal((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { name: "", number: "", email: "", hobbies: "" };

    if (!inputVal.name.trim()) {
      isValid = false;
      newErrors.name = "Name is required";
    }

    const numberRegex = /^\d{10}$/;
    if (!inputVal.number.trim() ||!numberRegex.test(inputVal.number.trim()) ) {
      isValid = false;
      newErrors.number = "Number is invalid";
    }

    if (!inputVal.email.trim()) {
      isValid = false;
      newErrors.email = "Email is required";
    }

    if (!inputVal.hobbies.trim()) {
      isValid = false;
      newErrors.hobbies = "Hobbies are required";
    }

    setError(newErrors);
    return isValid;
  };

  const addData = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    const { name, number, email, hobbies } = inputVal;

    try {
      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          number,
          email,
          hobbies,
        }),
      });

      if (!res.ok) {
        // Handle non-successful response status
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);

      alert("Data added successfully");
      console.log("Data added successfully");
      navigate("/");
    } catch (error) {
      alert("Error while adding data");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container">
      <form onSubmit={addData}>
        <div className="row">
          <div className="mb-3 mt-3 col-lg-6 col-md-6 col-12">
            <label>Name</label>
            <input
              type="text"
              value={inputVal.name}
              onChange={setdata}
              name="name"
              className={`form-control ${error.name && "is-invalid"}`}
            />
            <div className="invalid-feedback">{error.name}</div>
          </div>

          <div className="mb-3 mt-3 col-lg-6 col-md-6 col-12 ">
            <label>Number</label>
            <input
              type="number"
              value={inputVal.number}
              onChange={setdata}
              name="number"
              className={`form-control ${error.number && "is-invalid"}`}
            />
            <div className="invalid-feedback">{error.number}</div>
          </div>
          <div className="mb-3 mt-3 col-lg-6 col-md-6 col-12 ">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={inputVal.email}
              onChange={setdata}
              name="email"
              className={`form-control ${error.email && "is-invalid"}`}
            />
            <div className="invalid-feedback">{error.email}</div>
          </div>
          <div className="mb-3 mt-3 col-lg-6 col-md-6 col-12 ">
            <label className="form-label">Hobbies</label>
            <input
              type="text"
              value={inputVal.hobbies}
              onChange={setdata}
              name="hobbies"
              className={`form-control ${error.hobbies && "is-invalid"}`}
            />
            <div className="invalid-feedback">{error.hobbies}</div>
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
