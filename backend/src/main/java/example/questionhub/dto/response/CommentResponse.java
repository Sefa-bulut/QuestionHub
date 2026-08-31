package example.questionhub.dto.response;

import example.questionhub.entities.Comment;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class CommentResponse {
    private Long commentId;
    private Long postId;
    private Long userId;
    private String text;
    private String userName;
    private int avatarId;
    private Date createdAt;

    public CommentResponse(Comment comment) {
        this.commentId = comment.getId();
        this.postId = comment.getPost().getId();
        this.userId = comment.getUser().getId();
        this.text = comment.getText();
        this.userName = comment.getUser().getUserName();
        this.avatarId = comment.getUser().getAvatarId();
        this.createdAt = comment.getCreatedAt();
    }

}
