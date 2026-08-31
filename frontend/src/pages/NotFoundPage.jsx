import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import React from "react";

const NotFoundPage = () => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      px={4}
    >
      <VStack gap={5} textAlign="center">
        <Heading
          fontSize={{ base: "6xl", md: "8xl" }}
          fontWeight="bold"
          color="blue.500"
        >
          404
        </Heading>

        <Heading size="lg" mt="8">
          Sayfa bulunamadı
        </Heading>

        <Text color="gray.500" maxW="400px">
          Aradığın sayfa mevcut değil veya taşınmış olabilir.
        </Text>

        <Button colorScheme="blue" onClick={() => (window.location.href = "/")}>
          Ana Sayfaya Dön
        </Button>
      </VStack>
    </Box>
  );
};

export default NotFoundPage;
