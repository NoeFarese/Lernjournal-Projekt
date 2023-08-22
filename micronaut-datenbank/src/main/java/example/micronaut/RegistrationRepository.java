package example.micronaut;

import example.micronaut.domain.Eintrag;
import example.micronaut.domain.Registration;
import io.micronaut.data.annotation.Repository;
import io.micronaut.transaction.annotation.ReadOnly;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

import java.util.List;
import java.util.Optional;

public interface RegistrationRepository {


    @Transactional
        // <4>
    int update(long id, @NotBlank String email, @NotBlank String password);

    @ReadOnly
        // <3>
    Optional<Registration> findById(long id);

    String findByEmail(String email);

    boolean findByUser(String email, String password);
    @Transactional
        // <4>
    Registration save(@NotBlank String email, @NotBlank String password);

    void deleteById(long id);

    List<Registration> findAll(@NotNull SortingAndOrderArguments args);

    int update(long id, @NotBlank String password);

    @Transactional // <4>
    Repository saveWithException(@NotBlank String email, @NotBlank String password);
}
