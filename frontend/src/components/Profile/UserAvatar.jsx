import React from "react";
import { avatars } from "../../assets/avatarImages/avatars";
import { Avatar } from "@chakra-ui/react";

const UserAvatar = ({ userName, avatarId, size = "sm" }) => {
  const avatar = avatars.find((a) => a.id === avatarId);
  return (
    <Avatar.Root size={size}>
      {avatar && <Avatar.Image src={avatar.src} />}
      <Avatar.Fallback name={userName} />
    </Avatar.Root>
  );
};

export default UserAvatar;
