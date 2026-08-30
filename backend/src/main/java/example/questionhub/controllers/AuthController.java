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
    public ResponseEntity<AuthResponse> login(@RequestBody LoginUserRequest loginUserRequest) {
        AuthResponse result = authService.login(loginUserRequest);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterUserRequest registerUserRequest) {
        AuthResponse result = authService.register(registerUserRequest);
        return ResponseEntity.status(HttpStatus.CREATED).body(result);
    }

    @PostMapping("/refresh")
    public ResponseEntity<RefreshTokenResponse> refreshToken(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        RefreshTokenResponse result = authService.refreshToken(refreshTokenRequest);
        return ResponseEntity.ok(result);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logoutUser(@RequestBody RefreshTokenRequest refreshTokenRequest) {
        String result = authService.logoutUser(refreshTokenRequest);
        return ResponseEntity.ok(result);
    }

}
