package example.micronaut;

import example.micronaut.domain.Eintrag;

import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.Optional;

public interface EintragRepository {

    Optional<Eintrag> findById(long id);

    Optional<Eintrag> findByAuthorId(int authorId);

    @Transactional // <4>
    int update(long id, @NotBlank String titel, @NotBlank String text);

    @Transactional
    Eintrag save( @NotBlank String titel, @NotBlank String text, int author_id);


    void deleteById(long id);

    List<Eintrag> findAll(@NotNull SortingAndOrderArguments args);

    @Transactional
    int findIdByEmail(String email);

    int update(long id, @NotBlank String titel);

    @Transactional // <4>
    Eintrag saveWithException(@NotBlank String titel, @NotBlank String text, int authorId);
}
