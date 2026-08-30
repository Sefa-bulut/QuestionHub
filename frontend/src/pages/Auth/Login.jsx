import { toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import {
  Stack,
  Button,
  Field,
  Input,
  Card,
  Box,
  Image,
  HStack,
  Text,
  InputGroup,
  IconButton,
  Alert,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { LuEye, LuEyeOff } from "react-icons/lu";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();

  const sessionExpired = searchParams.get("sessionExpired") === "true";

  // useAuth() çağırarak Context içindeki login fonksiyonunu al
  const { login } = useAuth();

  const handleLogin = async () => {
    setLoading(true);
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
        description: "Kullanıcı Adı veya Şifre Yanlış!",
        type: "error",
      });
      console.log(error.response?.data);
    } finally {
      setLoading(false);
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
    <Stack
      gap="4"
      maxW="md"
      w={{ base: "95%", md: "65%", lg: "65%" }}
      mx="auto"
    >
      {sessionExpired && (
        <Alert.Root status="info" title="This is the alert title">
          <Alert.Indicator />
          <Alert.Title>
            Oturumunuzun süresi doldu. Lütfen tekrar giriş yapın.
          </Alert.Title>
        </Alert.Root>
      )}
      <Card.Root>
        <Card.Header>
          <Card.Title>
            <HStack gap="5">
              <Image src="/ask-me.png" boxSize="50px" objectFit="contain" />
              <Text textStyle="xl">Question Hub Login</Text>
            </HStack>
          </Card.Title>
          <Card.Description>Hesabına Giriş Yap</Card.Description>
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
              <InputGroup
                endElement={
                  <IconButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <LuEyeOff /> : <LuEye />}
                  </IconButton>
                }
              >
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </InputGroup>
            </Field.Root>

            <Button loading={loading} width="100%" onClick={handleLogin}>
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
    </Stack>
  );
};

export default Login;
