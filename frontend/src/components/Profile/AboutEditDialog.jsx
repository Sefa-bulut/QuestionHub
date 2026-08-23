import { useAuth } from "@/contexts/AuthContext";
import { Button, Dialog, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import { toaster } from "../ui/toaster";
import api from "@/services/api";

const AboutEditDialog = ({ about, setAbout }) => {
  // AuthContext'ten updateUser fonksiyonunu alıyoruz
  const { user, updateUser } = useAuth();

  const updateProfile = async () => {
    const newUserProfile = { avatarId: user.avatarId, about: about };
    const response = await api.put(`/users/${user.userId}`, newUserProfile);
    return response.data;
  };

  const handleUpdate = async () => {
    try {
      const user = await updateProfile();

      updateUser({ about: about });

      toaster.create({
        title: "Başarılı",
        description: "Hakkında güncellendi.",
        type: "success",
      });
    } catch (error) {
      toaster.create({
        title: "Hata",
        description: "Bir hata oluştu!",
        type: "error",
      });
      console.log(error);
    }
  };

  return (
    <Dialog.Root placement="center">
      <Dialog.Trigger asChild>
        <Button size="xs">Hakkımda Düzenle</Button>
      </Dialog.Trigger>

      <Dialog.Backdrop />

      <Dialog.Positioner>
        <Dialog.Content w="clamp(300px, 90vw, 500px)" maxH="85vh">
          <Dialog.Header>
            <Dialog.Title>Hakkında Bilgisini Düzenle</Dialog.Title>
          </Dialog.Header>

          <Dialog.Body overflowY="auto" py={4}>
            <Textarea
              maxLength={220}
              placeholder="Kendinizden bahsedin..."
              rows={5}
              autoFocus
              resize="vertical"
              onChange={(e) => setAbout(e.target.value)}
            />
          </Dialog.Body>

          <Dialog.Footer>
            <Dialog.ActionTrigger asChild>
              <Button variant="outline">İptal</Button>
            </Dialog.ActionTrigger>

            <Dialog.ActionTrigger asChild>
              <Button colorScheme="blue" onClick={handleUpdate}>
                Kaydet
              </Button>
            </Dialog.ActionTrigger>
          </Dialog.Footer>

          <Dialog.CloseTrigger />
        </Dialog.Content>
      </Dialog.Positioner>
    </Dialog.Root>
  );
};

export default AboutEditDialog;
