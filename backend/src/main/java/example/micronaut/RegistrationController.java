package example.micronaut;

import example.micronaut.domain.Registration;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.HttpStatus;
import io.micronaut.http.annotation.*;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import static io.micronaut.http.HttpHeaders.LOCATION;

@ExecuteOn(TaskExecutors.IO)
@Controller("/registration")
public class RegistrationController {
    private final RegistrationRepository registrationRepository;

    RegistrationController(RegistrationRepository registrationRepository) { this.registrationRepository = registrationRepository;}

    @Get("/{id}") // <4>
    Registration show(Long id) {
        return registrationRepository
                .findById(id)
                .orElse(null);
    }

    @Get("/{email}/exists")
    boolean show (@PathVariable String email) {
        return registrationRepository.findByEmail(email) != null;
    }


    @Get("/userExists")
    boolean show(@QueryValue("email") String email, @QueryValue("password") String password) {
        return registrationRepository.findByUser(email, password);
    }

    @Get("/all")
    List<Registration> allListe() {
        return registrationRepository
                .findAll(new SortingAndOrderArguments(0, 1000000000, "", "asc"));
    }
    @Put
    HttpResponse<?> update(@Body @Valid RegistrationUpdateCommand command) {
        int numberOfEntitiesUpdated = registrationRepository.update(command.getId(), command.getEmail(), command.getPassword());

        return HttpResponse
                .noContent()
                .header(LOCATION, location(command.getId()).getPath());
    }

    @Get(value = "/list{?args*}")
    List<Registration> list(@Valid SortingAndOrderArguments args) {
        return registrationRepository.findAll(args);
    }

    @Post
    HttpResponse<Registration> save(@Body @Valid RegistrationSaveCommand cmd) {
       Registration registration = registrationRepository.save(cmd.getEmail(), cmd.getPassword());

        return HttpResponse
                .created(registration)
                .headers(headers -> headers.location(location(registration.getId())));
    }


    @Delete("/{id}")
    HttpResponse<?> delete(Long id) {
        registrationRepository.deleteById(id);
        return HttpResponse.noContent();
    }

    private URI location(Long id) {
        return URI.create("/eintrag/" + id);
    }
}