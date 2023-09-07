import "./App.css";
import Footer from "./components/Footer";
import Headernav from "./components/Headernav";
import Landingpage from "./pages/Landingpage";
import MyDoubts from "./pages/MyDoubts";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Headernav />
      <main>
        <Routes>
          <Route path="/" element={<Landingpage />} exact />
          <Route path="/mydoubts" element={<MyDoubts />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
