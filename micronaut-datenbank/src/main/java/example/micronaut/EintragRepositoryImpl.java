package example.micronaut;

import example.micronaut.domain.Eintrag;
import io.micronaut.transaction.annotation.ReadOnly;
import jakarta.inject.Singleton;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceException;
import jakarta.persistence.TypedQuery;
import jakarta.transaction.Transactional;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@Singleton // <1>
public class EintragRepositoryImpl implements EintragRepository {
    private static final List<String> VALID_PROPERTY_NAMES = Arrays.asList("id", "titel", "text");
    private final EntityManager entityManager;  // <2>
    private final ApplicationConfiguration applicationConfiguration;

    public EintragRepositoryImpl(EntityManager entityManager, ApplicationConfiguration applicationConfiguration) {
        this.entityManager = entityManager;
        this.applicationConfiguration = applicationConfiguration;
    }

    @Override
    @ReadOnly // <3>
    public Optional<Eintrag> findById(long id) {
        return Optional.ofNullable(entityManager.find(Eintrag.class, id));
    }

    @Override
    @Transactional // <4>
    public Eintrag save(@NotBlank String titel, @NotBlank String text) {
        Eintrag eintrag = new Eintrag(titel, text);
        entityManager.persist(eintrag);
        return eintrag;
    }

    @Override
    @Transactional // <4>
    public void deleteById(long id) {
        findById(id).ifPresent(entityManager::remove);
    }

    @ReadOnly // <3>
    public List<Eintrag> findAll(@NotNull SortingAndOrderArguments args) {
        String qlString = "SELECT g FROM Eintrag as g";
        if (args.order() != null && args.sort() != null && VALID_PROPERTY_NAMES.contains(args.sort())) {
            qlString += " ORDER BY g." + args.sort() + ' ' + args.order().toLowerCase();
        }
        TypedQuery<Eintrag> query = entityManager.createQuery(qlString, Eintrag.class);
        query.setMaxResults(args.max() != null ? args.max() : applicationConfiguration.getMax());
        if (args.offset() != null) {
            query.setFirstResult(args.offset());
        }
        return query.getResultList();
    }

    @Override
    public int update(long id, String name) {
        return 0;
    }

    @Override
    @Transactional // <4>
    public int update(long id, @NotBlank String titel, @NotBlank String text) {
        return entityManager.createQuery("UPDATE Eintrag g SET titel = :titel, text = :text where id = :id")
                .setParameter("titel", titel)
                .setParameter("text", text)
                .setParameter("id", id)
                .executeUpdate();
    }


    @Override
    @Transactional // <4>
    public Eintrag saveWithException(@NotBlank String titel, @NotBlank String text) {
        save(titel, text);
        throw new PersistenceException();
    }
}