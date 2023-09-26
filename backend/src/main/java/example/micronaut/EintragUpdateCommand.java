package example.micronaut;

import io.micronaut.serde.annotation.Serdeable;

import jakarta.validation.constraints.NotBlank;

@Serdeable
public class EintragUpdateCommand {

    private long id;

    @NotBlank
    private String titel;

    @NotBlank
    private String text;

    public EintragUpdateCommand(long id, String titel, String text) {
        this.id = id;
        this.titel = titel;
        this.setText(text);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
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
}
