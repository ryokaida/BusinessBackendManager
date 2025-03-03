import { Routes, Route } from "react-router-dom";
import { Box, Button } from "@chakra-ui/react";
import StorePage from "../pages/StorePage";
// import Login from "../pages/Login";
import ManageProducts from "../pages/Owner/ManageProducts";
import ManageEmployees from "../pages/Owner/ManageEmployees";
import Tasks from "../pages/Employee/Tasks";
import CompletedTasks from "../pages/Employee/CompletedTasks";
import Navbar from "../components/Navbar/Navbar";
import AccountPage from "../pages/RegisteredUsers/AccountPage";
import LoginPage from "../pages/LoginPagePage";
import SignupPage from "../pages/SignupPage";
// import Signup from "../pages/Signup";

function App() {
  return (
    <Box minH={"100vh"}>
      <Navbar />
      <Routes>
        <Route path="/" element={<StorePage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/signupPage" element={<SignupPage />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/manageProducts" element={<ManageProducts />} />
        <Route path="/manageEmployees" element={<ManageEmployees />} />
        <Route path="/todoTasks" element={<Tasks />} />
        <Route path="/completedTasks" element={<CompletedTasks />} />
      </Routes>
    </Box>
  );
}

export default App;