package example.questionhub.dto.request;

import lombok.Data;

@Data
public class CreateCommentRequest {
    private Long postId;
    private Long userId;
    private String text;
}
