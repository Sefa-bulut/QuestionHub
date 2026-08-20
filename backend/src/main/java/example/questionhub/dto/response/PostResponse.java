package example.questionhub.dto.response;

import example.questionhub.entities.Post;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PostResponse {
    private Long postId;
    private String title;
    private String text;
    private Long userId;
    private String userName;
    private long likeCount;
    private int avatarId;

    public PostResponse(Post post, long likeCount) {
        this.postId = post.getId();
        this.title = post.getTitle();
        this.text = post.getText();
        this.userId = post.getUser().getId();
        this.userName = post.getUser().getUserName();
        this.likeCount = likeCount;
        this.avatarId = post.getUser().getAvatarId();
    }
}
