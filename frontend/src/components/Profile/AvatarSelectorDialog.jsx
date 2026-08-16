import { Avatar, Button, Dialog, Grid, RadioCard } from "@chakra-ui/react";
import React, { useState } from "react";
import { avatars } from "../../assets/avatarImages/avatars";

const AvatarSelectorDialog = ({ selectedAvatar, setSelectedAvatar }) => {
  console.log(selectedAvatar);
  return (
    <div>
      <Dialog.Root>
        <Dialog.Trigger asChild>
          <Button>Avatar Değiştir</Button>
        </Dialog.Trigger>

        <Dialog.Backdrop />

        <Dialog.Positioner>
          <Dialog.Content w="clamp(300px, 90vw, 600px)" maxH="90vh">
            <Dialog.Header>
              <Dialog.Title>Avatar Seç</Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <RadioCard.Root
                value={String(selectedAvatar)}
                onValueChange={(details) => {
                  setSelectedAvatar(Number(details.value));
                }}
              >
                <Grid
                  w="90%"
                  templateColumns="repeat(auto-fill, minmax(80px, 1fr))"
                  gap={3}
                  justifyContent="start"
                >
                  {avatars.map((avatar) => (
                    <RadioCard.Item key={avatar.id} value={String(avatar.id)}>
                      <RadioCard.ItemHiddenInput />

                      <RadioCard.ItemControl
                        w="90px"
                        h="90px"
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                      >
                        <Avatar.Root w="70px" h="70px" flexShrink={0}>
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

              <Button>Kaydet</Button>
            </Dialog.Footer>

            <Dialog.CloseTrigger />
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </div>
  );
};

export default AvatarSelectorDialog;
