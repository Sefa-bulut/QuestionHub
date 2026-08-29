package example.questionhub.security.util;

import example.questionhub.entities.User;
import example.questionhub.security.service.CustomUserDetails;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.logging.Logger;

@Component
public class JwtUtil {
    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.access-token-expiration}")
    private long jwtExpiration;

    private Logger logger = Logger.getLogger(JwtUtil.class.getName());

    // Generate Token
    public String generateToken(User user) {
        return Jwts.builder()
                .claim("userName", user.getUserName()) // Ekstra bilgiler (rol, name, email vb.)
                .subject(user.getId().toString()) // Token kimin adına üretildi?
                .issuedAt(new Date(System.currentTimeMillis())) // Üretildiği zaman
                .expiration(new Date(System.currentTimeMillis() + jwtExpiration)) // Bitiş zamanı
                .signWith(getSignInKey()) // Gizli anahtar ile imzala
                .compact();
    }

    // Validate Token
    public boolean isTokenValid(String token) {
        try {
            extractAllClaims(token); // İmza veya süre hatalıysa Exception fırlatır
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            logger.warning("Geçersiz veya süresi dolmuş token: " + e.getMessage());
            return false;
        }
    }

    public Long extractUserId(String token) {
        return Long.valueOf(extractAllClaims(token).getSubject());
    }

    public String extractUserName(String token) {
        return extractAllClaims(token).get("userName", String.class);
    }

    // Yardımcı metotlar (PARSING & EXTRACTION)
    private Claims extractAllClaims(String token) {
        return Jwts.parser()
                .verifyWith(getSignInKey()) // İmza doğru değilse burada bir Exception fırlatılır
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    private SecretKey getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
