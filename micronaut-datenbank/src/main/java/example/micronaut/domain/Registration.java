package example.micronaut.domain;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

import static jakarta.persistence.GenerationType.AUTO;

@Serdeable
@Entity
@Table(name = "registrationen")
public class Registration {
    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    @NotNull
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @NotNull
    @Column(name = "password", nullable = true, unique = false, length = 1000000000)
    private String password;

    public Registration() {}

    public Registration(@NotNull String email, String password) {
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() { return password; }

    public void setPassword(String text) { this.password = text; }

    @Override
    public String toString() {
        return "Registration{" +
                "id=" + id +
                ", email='" + email +
                ", password='" + password + '\'' +
                '}';
    }
}
