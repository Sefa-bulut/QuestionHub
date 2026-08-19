import React from "react";
import {
  Avatar,
  Card,
  HStack,
  Text,
  Collapsible,
  Stack,
  Box,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import UserAvatar from "../Profile/UserAvatar";

const Comment = ({ comment }) => {
  return (
    <div>
      <Box py={3}>
        <HStack align="start" gap={3}>
          <Link to={`/users/${comment.userId}`}>
            <UserAvatar
              userName={comment.userName}
              avatarId={comment.avatarId}
              size="sm"
            />
          </Link>

          <Box>
            <Text fontWeight="semibold" fontSize="sm">
              {comment.userName}
            </Text>

            <Card.Description>{comment.text}</Card.Description>
          </Box>
        </HStack>
      </Box>
    </div>
  );
};

export default Comment;
