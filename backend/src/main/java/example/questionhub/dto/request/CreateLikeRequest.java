package example.questionhub.dto.request;

import lombok.Data;

@Data
public class CreateLikeRequest {
    private Long userId;
    private Long postId;
}
