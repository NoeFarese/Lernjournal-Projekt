package example.micronaut;

import example.micronaut.domain.Eintrag;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.micronaut.scheduling.TaskExecutors;
import io.micronaut.scheduling.annotation.ExecuteOn;
import io.micronaut.transaction.annotation.Transactional;
import jakarta.inject.Inject;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceException;
import jakarta.validation.Valid;
import java.net.URI;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import static io.micronaut.http.HttpHeaders.LOCATION;

@ExecuteOn(TaskExecutors.IO)
@Controller("/eintrag")
class EintragController {

    private final EintragRepository eintragRepository;

    EintragController(EintragRepository eintragRepository) {
        this.eintragRepository = eintragRepository;
    }

    @Get("/{id}")
    Eintrag show(Long id) {
        return eintragRepository
                .findById(id)
                .orElse(null);
    }

    @Get("/findId/{email}")
    int findId(String email){
        return (eintragRepository.findIdByEmail(email));
    }

    @Get("/getEintraege/{authorId}")
    List<Eintrag> list(int authorId) {
        return eintragRepository.findByAuthorId(authorId);
    }

    @Get("/getEintraegeByEmail/{email}")
    List<Eintrag> list(String email) {
        int authorId = eintragRepository.findIdByEmail(email);
        return eintragRepository.findByAuthorId(authorId);
    }

    @Get("/all")
    List<Eintrag> allListe() {
        return eintragRepository
                .findAll(new SortingAndOrderArguments(0, 1000000000, "", "asc"));

    }

    @Put
    HttpResponse<?> update(@Body @Valid EintragUpdateCommand command) {
        int numberOfEntitiesUpdated = eintragRepository.update(command.getId(), command.getTitel(), command.getText());

        return HttpResponse
                .noContent()
                .header(LOCATION, location(command.getId()).getPath());
    }

    @Post
    HttpResponse<Eintrag> save(@Body @Valid EintragSaveCommand cmd) {
        Eintrag eintrag = eintragRepository.save(cmd.getTitel(), cmd.getText(), cmd.getAuthor_id());
        System.out.println(eintrag);
        return HttpResponse
                .created(eintrag)
                .headers(headers -> headers.location(location(eintrag.getId())));
    }

    @Post("/ex")
    HttpResponse<Eintrag> saveExceptions(@Body @Valid EintragSaveCommand cmd) {
        try {
            Eintrag eintrag = eintragRepository.saveWithException(cmd.getTitel(), cmd.getText(), cmd.getAuthor_id());
            return HttpResponse
                    .created(eintrag)
                    .headers(headers -> headers.location(location(eintrag.getId())));
        } catch(PersistenceException e) {
            return HttpResponse.noContent();
        }
    }

    @Delete("/{id}")
    HttpResponse<?> delete(Long id) {
        eintragRepository.deleteById(id);
        return HttpResponse.noContent();
    }

    private URI location(Long id) {
        return URI.create("/eintrag/" + id);
    }

    @Inject
    private EntityManager entityManager;

    @Get("/getEintraege/{authorId}/count")
    @Transactional
    public Long getAnzahlEintraege(@PathVariable Long authorId) {
        String query = "SELECT COUNT(e) FROM Eintrag e WHERE e.author_id = :authorId";
        return entityManager.createQuery(query, Long.class)
                .setParameter("authorId", authorId)
                .getSingleResult();
    }
}