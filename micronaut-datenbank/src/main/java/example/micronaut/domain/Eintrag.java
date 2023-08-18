package example.micronaut.domain;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import static jakarta.persistence.GenerationType.AUTO;

@Serdeable
@Entity
@Table(name = "eintraege")
public class Eintrag {

    @Id
    @GeneratedValue(strategy = AUTO)
    private Long id;

    @NotNull
    @Column(name = "titel", nullable = false, unique = true)
    private String titel;

   @NotNull
    @Column(name = "text", nullable = true, unique = false, length = 1000000000)
    private String text;

    public Eintrag() {}

    public Eintrag(@NotNull String titel, String text) {
        this.titel = titel;
        this.text = text;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String name) {
        this.titel = name;
    }

    public String getText() { return text; }

    public void setText(String text) { this.text = text; }

    @Override
    public String toString() {
        return "Eintrag{" +
            "id=" + id +
            ", titel='" + titel +
            ", text='" + text + '\'' +
            '}';
    }
}