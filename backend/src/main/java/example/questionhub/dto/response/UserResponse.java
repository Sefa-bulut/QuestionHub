package example.questionhub.dto.response;

import example.questionhub.entities.User;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserResponse {
    private Long id;
    private String userName;
    private int avatarId;
    private String about;

    public UserResponse(User user) {
        this.id = user.getId();
        this.userName = user.getUserName();
        this.avatarId = user.getAvatarId();
        this.about = user.getAbout();
    }

}
