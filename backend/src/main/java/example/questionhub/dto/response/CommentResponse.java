package example.questionhub.dto.response;

import example.questionhub.entities.Comment;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CommentResponse {
    private Long commentId;
    private Long postId;
    private Long userId;
    private String text;
    private String userName;
    private int avatarId;

    public CommentResponse(Comment comment) {
        this.commentId = comment.getId();
        this.postId = comment.getPost().getId();
        this.userId = comment.getUser().getId();
        this.text = comment.getText();
        this.userName = comment.getUser().getUserName();
        this.avatarId = comment.getUser().getAvatarId();
    }

}
