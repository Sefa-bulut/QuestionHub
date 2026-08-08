package example.questionhub.dto.response;

import example.questionhub.entities.Like;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LikeResponse {
    private Long likeId;
    private Long postId;
    private Long userId;

    public LikeResponse(Like like) {
        this.likeId = like.getId();
        this.postId = like.getPost().getId();
        this.userId = like.getUser().getId();
    }

}
