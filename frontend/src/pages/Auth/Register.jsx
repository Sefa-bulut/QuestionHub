import { toaster } from "@/components/ui/toaster";
import api from "@/services/api";
import {
  Stack,
  Button,
  Field,
  Input,
  Card,
  Box,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // Şifreler eşleşiyor mu kontrol ediyoruz
    if (password !== confirmPassword) {
      toaster.create({
        title: "Hata",
        description: "Şifreler eşleşmiyor.",
        type: "error",
      });
      return;
    }

    setLoading(true);
    try {
      const userResponse = await createUser();

      setUsername("");
      setPassword("");

      console.log(userResponse);

      toaster.create({
        title: "Başarılı",
        description: "Kayıt başarıyla oluşturuldu. Artık login olabilirsiniz",
        type: "success",
      });

      navigate("/login");
    } catch (error) {
      toaster.create({
        title: "Hata",
        description: "Kayıt oluşturulamadı.",
        type: "error",
      });
      console.log(error.response?.data);
    } finally {
      setLoading(false);
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
          <Card.Title>
            <HStack gap="5">
              <Image src="/ask-me.png" boxSize="50px" objectFit="contain" />
              <Text textStyle="xl">Question Hub Register</Text>
            </HStack>
          </Card.Title>
          <Card.Description>Yeni Bir Hesap Oluştur</Card.Description>
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

            <Field.Root>
              <Field.Label>Confirm Password</Field.Label>
              <Input
                placeholder="Confirm Password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Field.Root>

            <Button loading={loading} width="100%" onClick={handleRegister}>
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
