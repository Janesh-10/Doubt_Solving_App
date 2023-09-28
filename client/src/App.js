import "./App.css";
import Footer from "./components/Footer";
import Headernav from "./components/Headernav";
import CreateDoubt from "./pages/CreateDoubt";
import Landingpage from "./pages/Landingpage";
import MyDoubts from "./pages/MyDoubts";
import ProfileScreen from "./pages/ProfileScreen";
import SingleDoubt from "./pages/SingleDoubt";
import Studentlogin from "./pages/Studentlogin";
import Studentregister from "./pages/Studentregister";
import Teacherregister from "./pages/Teacherregister";
import Teacherlogin from "./pages/Teacherlogin";
import TeacherDoubts from "./pages/TeacherDoubts";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Headernav />
      <main>
        <Routes>
          <Route path="/" element={<Landingpage />} exact />
          <Route path="/mydoubts" element={<MyDoubts />} />
          <Route path="/studentlogin" element={<Studentlogin />} />
          <Route path="/studentregister" element={<Studentregister />} />
          <Route path="/createdoubt" element={<CreateDoubt />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/teacherregister" element={<Teacherregister />} />
          <Route path="/teacherlogin" element={<Teacherlogin />} />
          <Route path="/teacherdoubts" element={<TeacherDoubts />} />
          <Route path="/doubt/:id" element={<SingleDoubt />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
