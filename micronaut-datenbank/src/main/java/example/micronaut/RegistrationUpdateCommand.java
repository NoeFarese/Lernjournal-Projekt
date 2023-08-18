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

    public RegistrationUpdateCommand(long id, String email, String password){
        this.id = id;
        this.setEmail(email);
        this.setPassword(password);
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
}
