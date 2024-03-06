import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js";
import "./components/Navbar";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Register from "./components/Register";
import Edit from "./components/Edit"
import { BrowserRouter, Routes, Route } from "react-router-dom";



function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route exact path="/register" element={<Register />} />

          <Route exact path="/edit/:id" element ={<Edit/>}  ></Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
