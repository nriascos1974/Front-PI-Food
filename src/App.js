import "./App.css";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./components/LandingPage/LandingPage";
import Home from "./components/Home/Home";
import Detail from "./components/DetailRecipe/Detail";
import NewRecipe from "./components/NewRecipe/NewRecipe";
import About from "./components/About/About";


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:detailId" element={<Detail/>} />
        <Route path="/recipe" element={<NewRecipe />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
