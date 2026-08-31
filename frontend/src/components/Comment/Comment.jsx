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
            <HStack gap={3}>
              <Text fontWeight="semibold" fontSize="sm">
                {comment.userName}
              </Text>

              <Text fontSize="xs" color="gray.500">
                {comment.createdAt
                  ? new Date(comment.createdAt).toLocaleDateString("tr-TR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Tarih yok"}
              </Text>
            </HStack>

            <Card.Description>{comment.text}</Card.Description>
          </Box>
        </HStack>
      </Box>
    </div>
  );
};

export default Comment;
