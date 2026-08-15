import api from "@/services/api";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  Field,
  Flex,
  Input,
  Portal,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { toaster } from "../ui/toaster";

const PostForm = ({ currentUser, setPostList }) => {
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);

  const createPost = async () => {
    // Yeni bir post nesnesi oluşturuyoruz
    const newPost = { title, text, userId: currentUser.userId };
    // Oluşturulan yeni post nesnesi ile API call yapıyoruz
    const response = await api.post("/posts", newPost);
    return response.data;
  };

  const handleSubmit = async () => {
    try {
      const post = await createPost();
      //gelen post ile setPostlist'i güncelliyoruz ve Sayfa yeniden render oluyor
      setPostList((prev) => [post, ...prev]);

      setTitle("");
      setText("");
      setOpen(false); // Modal penceresini kapatıyoruz

      toaster.create({
        title: "Başarılı",
        description: "Başlık başarıyla oluşturuldu.",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Hata",
        description: "Başlık oluşturulamadı.",
        type: "error",
      });
      console.log(error);
    }
  };

  return (
    <div>
      <Box
        w={{ base: "95%", lg: "50%" }}
        mx="auto"
        p={4}
        border="1px solid"
        borderColor="gray.300"
        borderRadius="xl"
        bg="white"
      >
        <Dialog.Root
          open={open}
          onOpenChange={(detail) => setOpen(detail.open)}
        >
          <Flex align="center" gap={4}>
            <Avatar.Root>
              <Avatar.Fallback name={currentUser.userName} />
            </Avatar.Root>

            <Dialog.Trigger asChild>
              <Button
                flex={1}
                h="48px"
                variant="outline"
                justifyContent="flex-start"
                borderRadius="full"
                color="gray.500"
                fontWeight="normal"
                bg="white"
                _hover={{ bg: "gray.200" }}
              >
                Post oluşturun...
              </Button>
            </Dialog.Trigger>
          </Flex>

          <Portal>
            <Dialog.Backdrop />

            <Dialog.Positioner>
              <Dialog.Content w={{ base: "80%", lg: "100%" }}>
                <Dialog.Header>
                  <Dialog.Title>Post Oluşturma</Dialog.Title>
                </Dialog.Header>

                <Dialog.Body>
                  <Stack gap={4}>
                    <Field.Root>
                      <Field.Label>Başlık</Field.Label>
                      <Input
                        maxLength={50}
                        placeholder="Başlık giriniz"
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </Field.Root>

                    <Field.Root>
                      <Field.Label>İçerik</Field.Label>
                      <Textarea
                        placeholder="Ne düşünüyorsunuz?"
                        autoresize
                        onChange={(e) => setText(e.target.value)}
                      />
                    </Field.Root>
                  </Stack>
                </Dialog.Body>

                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">İptal</Button>
                  </Dialog.ActionTrigger>

                  <Button colorScheme="blue" onClick={handleSubmit}>
                    Paylaş
                  </Button>
                </Dialog.Footer>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </Box>
    </div>
  );
};

export default PostForm;
