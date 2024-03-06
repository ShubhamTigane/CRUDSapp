import React, { useState, useEffect } from "react";
import { NavLink, useParams, useNavigate } from "react-router-dom";

const Edit = () => {
  
  const navigate =useNavigate();

  const [inputVal, setInputVal] = useState({
    name: "",
    number: "",
    email: "",
    hobbies: "",
  });

  const setdata = (e) => {
    e.preventDefault();
    console.log(e.target.value);
    const { name, value } = e.target;
    setInputVal((prevVal) => {
      return {
        ...prevVal,
        [name]: value,
      };
    });
  };

  const { id } = useParams("");
  console.log(id);

  const getdata = async () => {
    const res = await fetch(`/getuser/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 400 || !data) {
      console.log("error ");
    } else {
      setInputVal(data);
      console.log("get data");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const updateuser = async (e) => {
    e.preventDefault();
    const { name, number, email, hobbies } = inputVal;
    const res2 = await fetch(`/updateuser/${id}`, {
      method: "PATCH",
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
    const data2 = await res2.json();
    console.log(data2);

    if (res2.status === 400 || !data2) {
      alert("fill the data");
    } else {
      alert("data updated");

      navigate("/");
    }
  };

  return (
    <div className="container">
      <NavLink to="/">home2</NavLink>

      <form onSubmit={updateuser}>
        <div className="row">
          <div className="mb-3 mt-3 col-lg-6 col-md-6 col-12">
            <label>Name</label>
            <input
              type="text"
              value={inputVal.name}
              onChange={setdata}
              name="name"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>

          <div className="mb-3 mt-3 col-lg-6 col-md-6 col-12 ">
            <label>Number</label>
            <input
              type="number"
              value={inputVal.number}
              onChange={setdata}
              name="number"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 mt-3 col-lg-6 col-md-6 col-12 ">
            <label className="form-label">Email</label>
            <input
              type="email"
              value={inputVal.email}
              onChange={setdata}
              name="email"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <div className="mb-3 mt-3 col-lg-6 col-md-6 col-12 ">
            <label className="form-label">Hobbies</label>
            <input
              type="text"
              value={inputVal.hobbies}
              onChange={setdata}
              name="hobbies"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Edit;
