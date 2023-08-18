package example.micronaut;

import example.micronaut.domain.Eintrag;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

public interface EintragRepository {

    Optional<Eintrag> findById(long id);


    @Transactional // <4>
    int update(long id, @NotBlank String titel, @NotBlank String text);

    @Transactional
        // <4>
    Eintrag save(@NotBlank String titel, @NotBlank String text);

    void deleteById(long id);

    List<Eintrag> findAll(@NotNull SortingAndOrderArguments args);

    int update(long id, @NotBlank String titel);

    @Transactional // <4>
    Eintrag saveWithException(@NotBlank String titel, @NotBlank String text);
}
