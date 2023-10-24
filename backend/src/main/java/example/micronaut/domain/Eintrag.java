package example.micronaut.domain;

import io.micronaut.serde.annotation.Serdeable;
import jakarta.persistence.*;
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
    @Column(name = "titel", nullable = false, length = 40)
    private String titel;

    @NotNull
    @Column(name = "text", nullable = true, unique = false, length = 1000000000)
    private String text;

    @Column(name = "author_id", nullable = false, unique = false)
    private int author_id;

    public Eintrag() {
    }

    public Eintrag(@NotNull String titel, String text, int author_id) {
        this.titel = titel;
        this.text = text;
        this.author_id = author_id;
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

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public void setAuthor_id(int authorId) {
        this.author_id = authorId;
    }

    public int getAuthor_id() {
        return author_id;
    }

    @Override
    public String toString() {
        return "Eintrag{" +
                "id=" + id +
                ", titel='" + titel +
                ", text='" + text + '\'' +
                '}';
    }
}