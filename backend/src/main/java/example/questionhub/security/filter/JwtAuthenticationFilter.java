package example.questionhub.security.filter;

import example.questionhub.security.service.CustomUserDetails;
import example.questionhub.security.service.CustomUserDetailsService;
import example.questionhub.security.util.JwtUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.logging.Logger;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private Logger logger = Logger.getLogger(JwtAuthenticationFilter.class.getName());
    private final JwtUtil jwtUtil;
    private final CustomUserDetailsService customUserDetailsService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, CustomUserDetailsService customUserDetailsService) {
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain) throws ServletException, IOException {

        // HTTP header kısmından Authorization header'ını al
        final String authHeader = request.getHeader("Authorization");

        // Header yoksa veya Bearer ile başlamıyorsa filtreyi geç ve devam et
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }
        // Token'nı çıkart
        final String jwt = authHeader.substring(7);

        // JWT token'dan userId'i çıkar
        final Long userId;
        try {
            userId = jwtUtil.extractUserId(jwt);
        } catch (Exception e) {
            logger.warning("Hata: " + e.getMessage());
            filterChain.doFilter(request, response);
            return;
        }

        // Kullanıcı id varsa VE sistemde henüz kimlik doğrulaması yapılmamışsa?
        if (userId != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            // JWT'yi doğrula
            if (jwtUtil.isTokenValid(jwt)) {
                // Bu user gerçekten DB'de var mı varsa getir ve Userdetails olarak yükle
                CustomUserDetails customUserDetails = (CustomUserDetails) customUserDetailsService.loadUserById(userId);
                // SecurityContext için bir Authentication nesnesini oluştur
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        customUserDetails, // UserDetails yerine bizim CustomUserDetails nesnemiz
                        null, // Şifreye JWT akışında ihtiyaç yok
                        customUserDetails.getAuthorities()
                );
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                // Security Context'e nesnemizi ekliyoruz
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        // Bir sonraki filtreye devam et
        filterChain.doFilter(request, response);
    }
}
