import { toaster } from "@/components/ui/toaster";
import api from "@/services/api";
import { Stack, Button, Field, Input, Card, Box } from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const userResponse = await createUser();

      setUsername("");
      setPassword("");

      console.log(userResponse);

      toaster.create({
        title: "Başarılı",
        description: "User başarıyla oluşturuldu.",
        type: "success",
      });

      navigate("/login");
    } catch (error) {
      toaster.create({
        title: "Hata",
        description: "User oluşturulamadı.",
        type: "error",
      });
      console.log(error.response?.data);
    }
  };

  const createUser = async () => {
    // Yeni bir User nesnesi oluşturuyoruz
    const newUser = { userName: username, password };
    // Oluşturulan yeni User nesnesi ile API call yapıyoruz
    const response = await api.post("/auth/register", newUser);
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
              <Field.Label>Email</Field.Label>
              <Input type="email" placeholder="Email (Opsiyonel)" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Confirm Password</Field.Label>
              <Input
                type="password"
                placeholder="Confirm Password (Opsiyonel)"
              />
            </Field.Root>

            <Button width="100%" onClick={handleRegister}>
              Register
            </Button>

            <div>
              Already have an account?{" "}
              <Link
                to="/login"
                style={{
                  color: "blue",
                  textDecoration: "underline",
                }}
              >
                Login
              </Link>
            </div>
          </Stack>
        </Card.Body>
      </Card.Root>
    </Box>
  );
};

export default Register;
