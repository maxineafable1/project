package com.liftts.backend.services.implementations;

import com.liftts.backend.services.EmailService;
import com.resend.Resend;
import com.resend.services.emails.model.SendEmailRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailServiceImplementation implements EmailService {
//    private final JavaMailSender mailSender;
    private final Resend resend;

    @Override
    public void sendVerificationEmail(String to, String link) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(to);
//        message.setSubject("Verification Email");
//        message.setText("Click the link below to verify your email.\n" + link);
//        mailSender.send(message);

        String html = """
                <div>
                    <h2>Email Verification</h2>
                    <a href="%s">Click here to verify your email address</a>
                    <p>If you didn't request this email, you can safely ignore it. :)</p>
                    <div>— Liftts</div>
                </div>
                """.formatted(link);

        SendEmailRequest sendEmailRequest = SendEmailRequest.builder()
                .from("Liftts <verify@liftts.app>")
                .to(to)
                .subject("Email Verification")
                .html(html)
                .build();

        try {
            resend.emails().send(sendEmailRequest);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
