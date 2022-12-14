import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import classes from "./App.module.css";
import MovieShowPage from "./pages/MovieShowPage";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <div className={classes.contentContainer}>
          <main className={classes.main}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/media/:media/:id" element={<MovieShowPage/>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </>
  );
}

export default App;
