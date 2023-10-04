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
import PostSolution from "./pages/PostSolution";
import CreateSolution from "./pages/CreateSolution";
import PostQueries from "./pages/PostQueries";
import CreateQuery from "./pages/CreateQuery";
import TeacherProfile from "./pages/TeacherProfile";

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
          <Route path="/teacherprofile" element={<TeacherProfile />} />
          <Route path="/teacherregister" element={<Teacherregister />} />
          <Route path="/teacherlogin" element={<Teacherlogin />} />
          <Route path="/teacherdoubts" element={<TeacherDoubts />} />
          <Route path="/doubt/:id" element={<SingleDoubt />} />
          <Route path="/posts/:id" element={<PostSolution />} />
          <Route path="/queries/:id" element={<PostQueries />} />
          <Route
            path="/posts/createsolution/:id"
            element={<CreateSolution />}
          />
          <Route path="/queries/createquery/:id" element={<CreateQuery />} />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
