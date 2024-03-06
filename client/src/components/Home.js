import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Home = () => {
  const [userdata, setUserdata] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const getData = async () => {
    try {
      const res = await fetch("/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();
      setUserdata(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleRowSelection = (id) => {
    const isSelected = selectedRows.includes(id);
    if (isSelected) {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((rowId) => rowId !== id)
      );
    } else {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, id]);
    }
  };

  const deleteSelectedRows = async () => {
    // Implement logic to delete selected rows
    for (const id of selectedRows) {
      await deleteuser(id);
    }
    setSelectedRows([]); // Clear selected rows after deletion
  };

  const deleteuser = async (id) => {
    try {
      const res2 = await fetch(`/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deletedata = await res2.json();
      if (res2.status === 400 || !deletedata) {
        console.log("error");
      } else {
        console.log("user deleted");
        getData();
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="mt-5">
      <div className="container">
        <div className="add_btn mt-2 mb-2">
          <NavLink to="/register" className="btn btn-primary">
            Add
          </NavLink>

          <button className="btn btn-danger ms-2" onClick={deleteSelectedRows}>
            Delete Selected
          </button>

          <button className="btn btn-warning ms-2" >
            Send Email
          </button>
        </div>

        <table className="table">
          <thead>
            <tr className="table-dark">
              <th scope="col">
                <input
                  type="checkbox"
                  onChange={() => {
                    if (selectedRows.length === userdata.length) {
                      setSelectedRows([]);
                    } else {
                      const allRowIds = userdata.map((element) => element._id);
                      setSelectedRows(allRowIds);
                    }
                  }}
                  checked={selectedRows.length === userdata.length}
                />
              </th>
              <th scope="col">ID</th>
              <th scope="col">Name</th>
              <th scope="col">Number</th>
              <th scope="col">Email</th>
              <th scope="col">Hobbies</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {userdata.map((element, id) => {
              const isSelected = selectedRows.includes(element._id);
              return (
                <tr key={id + 1}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => toggleRowSelection(element._id)}
                      checked={isSelected}
                    />
                  </td>
                  <th scope="row">{id + 1}</th>
                  <td>{element.name}</td>
                  <td>{element.number}</td>
                  <td>{element.email}</td>
                  <td>{element.hobbies}</td>
                  <td className="d-flex justify-content-between">
                    <NavLink to={`edit/${element._id}`}>
                      <button className="btn btn-success">Update</button>
                    </NavLink>
                    <button
                      onClick={() => deleteuser(element._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
