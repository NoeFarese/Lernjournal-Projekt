package example.micronaut;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;

@Serdeable
public class RegistrationSaveCommand {
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    private boolean isAdmin;

    public RegistrationSaveCommand(String email, String password, boolean isAdmin){
        this.setEmail(email);
        this.setPassword(password);
        this.setIsAdmin(isAdmin);
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean getIsAdmin() { return isAdmin; }

    public void setIsAdmin(boolean isAdmin) { this.isAdmin = isAdmin; }
}
