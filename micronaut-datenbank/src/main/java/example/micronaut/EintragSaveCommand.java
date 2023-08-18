package example.micronaut;

import io.micronaut.serde.annotation.Serdeable;

import jakarta.validation.constraints.NotBlank;

@Serdeable // <1>
public class EintragSaveCommand {

    @NotBlank
    private String titel;

    @NotBlank
    private String text;

    public EintragSaveCommand(String titel, String text) {
        this.titel = titel;
        this.setText(text);
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
