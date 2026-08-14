import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import User from "./pages/User";
import NavBar from "./components/NavBar";
import NotFoundPage from "./pages/NotFoundPage";
import { Toaster } from "./components/ui/toaster";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import { Box } from "@chakra-ui/react";

function App() {
  return (
    <>
      <NavBar />
      <Box bg="AccentColor" minH="100vh">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        <Toaster />
      </Box>
    </>
  );
}

export default App;
