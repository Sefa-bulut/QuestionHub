import { Avatar, Button, Dialog, Grid, RadioCard } from "@chakra-ui/react";
import React, { useState } from "react";
import { avatars } from "../../assets/avatarImages/avatars";

const AvatarSelectorDialog = ({ selectedAvatar, setSelectedAvatar }) => {
  console.log(selectedAvatar);
  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Button>Avatar Değiştir</Button>
      </Dialog.Trigger>

      <Dialog.Backdrop />

      <Dialog.Positioner>
        <Dialog.Content w="clamp(300px, 90vw, 500px)" maxH="85vh">
          <Dialog.Header>
            <Dialog.Title>Avatarını Seç</Dialog.Title>
          </Dialog.Header>

          {/* Çok fazla avatar olduğunda diyalog dışına taşmaması için overflowY eklendi */}
          <Dialog.Body overflowY="auto" py={4}>
            <RadioCard.Root
              value={String(selectedAvatar)}
              onValueChange={(details) => {
                setSelectedAvatar(Number(details.value));
              }}
              w="100%"
            >
              <Grid
                w="100%"
                templateColumns="repeat(auto-fill, minmax(80px, 1fr))"
                gap={3}
                justifyItems="center"
              >
                {avatars.map((avatar) => (
                  <RadioCard.Item
                    key={avatar.id}
                    value={String(avatar.id)}
                    w="100%"
                  >
                    <RadioCard.ItemHiddenInput />

                    <RadioCard.ItemControl
                      w="100%"
                      h="80px"
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      borderRadius="md"
                      p={1}
                      _hover={{ bg: "gray.50" }}
                    >
                      <Avatar.Root w="60px" h="60px" flexShrink={0}>
                        <Avatar.Image src={avatar.src} objectFit="cover" />
                        <Avatar.Fallback />
                      </Avatar.Root>
                    </RadioCard.ItemControl>
                  </RadioCard.Item>
                ))}
              </Grid>
            </RadioCard.Root>
          </Dialog.Body>

          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline">İptal</Button>
            </Dialog.ActionTrigger>

            <Dialog.ActionTrigger asChild>
              <Button colorScheme="blue">Kaydet</Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>

          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default AvatarSelectorDialog;
