package example.micronaut;

import io.micronaut.serde.annotation.Serdeable;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

@Serdeable // <1>
public class EintragSaveCommand {

    @NotBlank
    private String titel;

    @NotBlank
    private String text;

    @NotNull
    private int author_id;

    public EintragSaveCommand(String titel, String text, int author_id) {
        this.titel = titel;
        this.setText(text);
        this.author_id = author_id;
    }

    public String getTitel() {
        return titel;
    }

    public void setTitel(String titel) {
        this.titel = titel;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public int getAuthor_id(){ return author_id; }
}
