package example.questionhub.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponse {
    private Long userId;
    private String userName;
    private int avatarId;
    private String about;
    private String accessToken;
    private String responseMessage;
}
