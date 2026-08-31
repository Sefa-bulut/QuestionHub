import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Dialog,
  Field,
  Flex,
  Portal,
  Spinner,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import api from "@/services/api";
import { toaster } from "../ui/toaster";
import UserAvatar from "../Profile/UserAvatar";
import { useAuth } from "@/contexts/AuthContext";

const CommentForm = ({ currentPost, setCommentList }) => {
  const [text, setText] = useState("");
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createComment = async () => {
    // Yeni bir comment nesnesi oluşturuyoruz
    const newComment = {
      postId: currentPost.postId,
      userId: user.userId,
      text,
    };
    // Oluşturulan yeni comment nesnesi ile API call yapıyoruz
    const response = await api.post("/comments", newComment);
    return response.data;
  };

  const handleSubmit = async () => {
    if (!text.trim()) return;
    setIsSubmitting(true);
    try {
      const comment = await createComment();
      //gelen comment ile setCommentlist'i güncelliyoruz ve Sayfa yeniden render oluyor
      setCommentList((prev) => [comment, ...prev]);
      setText("");
      setOpen(false); // Modal penceresini kapatıyoruz

      toaster.create({
        title: "Başarılı",
        description: "Yorum başarıyla oluşturuldu.",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Hata",
        description: "Yorum oluşturulamadı.",
        type: "error",
      });
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div>
      <Box
        mx="auto"
        p={3}
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
            <UserAvatar
              userName={user.userName}
              avatarId={user.avatarId}
              size="lg"
            />

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
                Yorum oluşturun...
              </Button>
            </Dialog.Trigger>
          </Flex>

          <Portal>
            <Dialog.Backdrop />

            <Dialog.Positioner>
              <Dialog.Content w={{ base: "80%", lg: "100%" }}>
                <Dialog.Header>
                  <Dialog.Title>Yorum Oluşturma</Dialog.Title>
                </Dialog.Header>

                <Dialog.Body>
                  <Stack gap={4}>
                    <Field.Root>
                      <Field.Label>İçerik</Field.Label>
                      <Textarea
                        placeholder="Ne düşünüyorsunuz?"
                        autoresize
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        disabled={isSubmitting}
                      />
                    </Field.Root>
                  </Stack>
                </Dialog.Body>

                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">İptal</Button>
                  </Dialog.ActionTrigger>
                  <Button
                    colorScheme="blue"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <Spinner size="sm" color="white" />
                    ) : (
                      "Paylaş"
                    )}
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

export default CommentForm;
