package example.questionhub.dto.response;

import lombok.Data;

@Data
public class UserStatsResponse {
    private Long receivedLikeCount; // Total likes received on user's posts
    private Long receivedCommentCount; // Total comments received on user's posts
    private Long sharedPostCount; // Total posts shared by the user
}
