import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import CreateQuiz from "./pages/CreateQuiz";
import EditQuiz from "./pages/EditQuiz";
import SlideshowQuiz from "./pages/SlideshowQuiz";
import NavigationBar from "./components/NavigationBar";

const App = () => {
  return (
    <BrowserRouter>
      <NavigationBar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/create" element={<CreateQuiz />} />
        <Route path="/edit/:id" element={<EditQuiz />} />
        <Route path="/slideshow/:id" element={<SlideshowQuiz />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
