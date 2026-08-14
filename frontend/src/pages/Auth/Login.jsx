import { Stack, Button, Field, Input, Card, Box } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
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
              <Input placeholder="Username" />
            </Field.Root>

            <Field.Root>
              <Field.Label>Password</Field.Label>
              <Input type="password" placeholder="Password" />
            </Field.Root>

            <Button width="100%">Login</Button>

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
