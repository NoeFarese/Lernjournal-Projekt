package example.micronaut;

import example.micronaut.domain.Eintrag;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.Body;
import io.micronaut.http.annotation.Controller;
import io.micronaut.http.annotation.Delete;
import io.micronaut.http.annotation.Get;
import io.micronaut.http.annotation.Post;
import io.micronaut.http.annotation.Put;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import jakarta.persistence.PersistenceException;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.List;
import static io.micronaut.http.HttpHeaders.LOCATION;

@ExecuteOn(TaskExecutors.IO)  // <1>
@Controller("/eintrag")  // <2>
class EintragController {

    private final EintragRepository eintragRepository;

    EintragController(EintragRepository eintragRepository) { // <3>
        this.eintragRepository = eintragRepository;
    }

    @Get("/{id}") // <4>
    Eintrag show(Long id) {
        return eintragRepository
                .findById(id)
                .orElse(null); // <5>
    }

    @Get("/all") // <4>
    List<Eintrag> allListe() {
        return eintragRepository
                .findAll(new SortingAndOrderArguments(0, 1000000000, "", "asc"));
                // <5>
    }
    @Put // <6>
    HttpResponse<?> update(@Body @Valid EintragUpdateCommand command) { // <7>
        int numberOfEntitiesUpdated = eintragRepository.update(command.getId(), command.getTitel(), command.getText());

        return HttpResponse
                .noContent()
                .header(LOCATION, location(command.getId()).getPath()); // <8>
    }

    @Get(value = "/list{?args*}") // <9>-
    List<Eintrag> list(@Valid SortingAndOrderArguments args) {
        return eintragRepository.findAll(args);
    }

    @Post // <10>
    HttpResponse<Eintrag> save(@Body @Valid EintragSaveCommand cmd) {
        Eintrag eintrag = eintragRepository.save(cmd.getTitel(), cmd.getText());

        return HttpResponse
                .created(eintrag)
                .headers(headers -> headers.location(location(eintrag.getId())));
    }

    @Post("/ex") // <11>
    HttpResponse<Eintrag> saveExceptions(@Body @Valid EintragSaveCommand cmd) {
        try {
            Eintrag eintrag = eintragRepository.saveWithException(cmd.getTitel(), cmd.getText());
            return HttpResponse
                    .created(eintrag)
                    .headers(headers -> headers.location(location(eintrag.getId())));
        } catch(PersistenceException e) {
            return HttpResponse.noContent();
        }
    }

    @Delete("/{id}") // <12>
    HttpResponse<?> delete(Long id) {
        eintragRepository.deleteById(id);
        return HttpResponse.noContent();
    }

    private URI location(Long id) {
        return URI.create("/eintrag/" + id);
    }
}