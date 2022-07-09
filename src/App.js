import { Routes, Route } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import Navbar from "./components/Navbar/Navbar";
import AbonementsListPage from "./pages/AbonementsPages/AbonementsListPage/AbonementsListPage";
import InstructorListPage from "./pages/InstructorsPages/InstructorsListPage/InstructorsListPage";
import EquipmentPage from "./pages/EquipmentPage";
import { RecoilRoot } from "recoil";
import ClassesPage from "./pages/ClassesPage/ClassesPage";
import { SnackbarProvider } from "notistack";

function App() {
  return (
    <SnackbarProvider>
      <RecoilRoot>
        <Navbar />
        <Routes>
          <Route path="/instructors" element={<InstructorListPage />} />
          <Route path="/abonements" element={<AbonementsListPage />} />
          <Route path="/equipment" element={<EquipmentPage />} />
          <Route path="*" element={<ClassesPage />} />
        </Routes>
        <Footer />
      </RecoilRoot>
    </SnackbarProvider>
  );
}

export default App;
