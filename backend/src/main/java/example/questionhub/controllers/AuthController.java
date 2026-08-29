package example.questionhub.controllers;

import example.questionhub.dto.request.LoginUserRequest;
import example.questionhub.dto.request.RefreshTokenRequest;
import example.questionhub.dto.request.RegisterUserRequest;
import example.questionhub.dto.response.AuthResponse;
import example.questionhub.dto.response.RefreshTokenResponse;
import example.questionhub.services.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginUserRequest loginUserRequest) {
        return authService.login(loginUserRequest);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterUserRequest registerUserRequest) {
        try {
            AuthResponse result = authService.register(registerUserRequest);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(result);
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new AuthResponse(null, null,
                            0, null, null,
                            null, e.getMessage()));
        }
    }

    @PostMapping("/refresh")
    public RefreshTokenResponse refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.refreshToken(refreshTokenRequest);
    }

    @PostMapping("/logout")
    public String logoutUser(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        return authService.logoutUser(refreshTokenRequest);
    }

}
