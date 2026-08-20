package example.questionhub.dto.request;

import lombok.Data;

@Data
public class UpdateUserRequest {
    private int avatarId;
    private String about;
}
