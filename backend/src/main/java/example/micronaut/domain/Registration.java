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

    @NotNull
    @Column(name = "isAdmin", nullable = true, unique = false)
    private boolean isAdmin;

    public Registration() {}

    public Registration(@NotNull String email, String password, boolean isAdmin) {
        this.email = email;
        this.password = password;
        this.isAdmin = isAdmin;
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

    public boolean getIsAdmin() { return isAdmin; }

    public void setIsAdmin(boolean isAdmin) { this.isAdmin = isAdmin; }

    @Override
    public String toString() {
        return "Registration{" +
                "id=" + id +
                ", email='" + email +
                ", password='" + password +
                ", isAdmin='" + isAdmin + '\'' +
                '}';
    }
}
