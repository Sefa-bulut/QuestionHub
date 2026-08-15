import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { Stack, Button, Field, Input, Card, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  // useAuth() çağırarak Context içindeki login fonksiyonunu al
  const { login } = useAuth();

  const handleLogin = async () => {
    try {
      const userResponse = await loginUser();

      setUsername("");
      setPassword("");

      // login'den dönen verileri authContext'e kaydediyrouz.
      login(userResponse);

      toaster.create({
        title: "Başarılı",
        description: "Giriş Başarılı",
        type: "success",
      });

      navigate("/");
    } catch (error) {
      toaster.create({
        title: "Hata",
        description: "Giriş başarısız",
        type: "error",
      });
      console.log(error.response?.data);
    }
  };

  const loginUser = async () => {
    // Yeni bir User nesnesi oluşturuyoruz
    const user = { userName: username, password };
    // Oluşturulan yeni User nesnesi ile API call yapıyoruz
    const response = await api.post("/auth/login", user);
    return response.data;
  };

  return (
    <Box pt="8">
      <Card.Root maxW="md" w={{ base: "95%", md: "65%", lg: "50%" }} mx="auto">
        <Card.Header>
          <Card.Title>QuestionHub</Card.Title>
          <Card.Description>Welcome to QuestionHub</Card.Description>
        </Card.Header>
        <Card.Body>
          <Stack gap="4" w="full">
            <Field.Root>
              <Field.Label>Username</Field.Label>
              <Input
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field.Root>

            <Button width="100%" onClick={handleLogin}>
              Login
            </Button>

            <div>
              Don't have an account?{" "}
              <Link
                to="/register"
                style={{
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                Register
              </Link>
            </div>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default Login;
