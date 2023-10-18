package example.micronaut;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.validation.constraints.NotBlank;

@Serdeable
public class RegistrationUpdateCommand {

    private long id;

    @NotBlank
    private String email;

    @NotBlank
    private String password;
    private boolean isAdmin = false;

    public RegistrationUpdateCommand(long id, String email, String password, boolean isAdmin){
        this.id = id;
        this.setEmail(email);
        this.setPassword(password);
        this.setIsAdmin(isAdmin);
    }

    public long getId() { return id; }

    public void setId(long id){ this.id = id;}

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
