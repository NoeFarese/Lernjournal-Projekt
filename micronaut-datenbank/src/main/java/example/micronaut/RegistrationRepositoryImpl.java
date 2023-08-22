package example.micronaut;

import example.micronaut.domain.Registration;
import io.micronaut.data.annotation.Repository;
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

@Singleton
public class RegistrationRepositoryImpl implements RegistrationRepository {
    private static final List<String> VALID_PROPERTY_NAMES = Arrays.asList("id", "email", "passwort");
    private EntityManager entityManager;  // <2>
    private ApplicationConfiguration applicationConfiguration;

    public RegistrationRepositoryImpl(EntityManager entityManager, ApplicationConfiguration applicationConfiguration) {
        this.entityManager = entityManager;
        this.applicationConfiguration = applicationConfiguration;
    }

    @Override
    @ReadOnly // <3>
    public Optional<Registration> findById(long id) {
        return Optional.ofNullable(entityManager.find(Registration.class, id));
    }

    @Override
    @Transactional
    public String findByEmail(String email) {
        String qlString = "SELECT g FROM Registration as g WHERE g.email = :email";
        TypedQuery<Registration> query = entityManager.createQuery(qlString, Registration.class);
        query.setParameter("email", email);

        try {
            return query.getSingleResult().getEmail();
        } catch (Exception e) {
            return null;
        }
    }


    @Override
    @Transactional
    public boolean findByUser(String email, String password){
        String qlString = "SELECT g FROM Registration as g WHERE g.email = :email AND g.password = :password";
        TypedQuery<Registration> query = entityManager.createQuery(qlString, Registration.class);
        query.setParameter("email", email);
        query.setParameter("password", password);

        try {
            return query.getSingleResult().getEmail() != null || query.getSingleResult().getPassword() != null;
        } catch(Exception e){
            return false;
        }
    }

    @Override
    @Transactional // <4>
    public Registration save(@NotBlank String email, @NotBlank String passwort) {
        Registration registration = new Registration(email, passwort);
        entityManager.persist(registration);
        return registration;
    }

    @Override
    @Transactional // <4>
    public void deleteById(long id) {
        findById(id).ifPresent(entityManager::remove);
    }

    @ReadOnly // <3>
    public List<Registration> findAll(@NotNull SortingAndOrderArguments args) {
        String qlString = "SELECT g FROM Registration as g";
        if (args.order() != null && args.sort() != null && VALID_PROPERTY_NAMES.contains(args.sort())) {
            qlString += " ORDER BY g." + args.sort() + ' ' + args.order().toLowerCase();
        }
        TypedQuery<Registration> query = entityManager.createQuery(qlString, Registration.class);
        query.setMaxResults(args.max() != null ? args.max() : applicationConfiguration.getMax());
        if (args.offset() != null) {
            query.setFirstResult(args.offset());
        }
        return query.getResultList();
    }

    @Override
    public int update(long id, String email) {
        return 0;
    }

    @Override
    @Transactional // <4>
    public int update(long id, @NotBlank String email, @NotBlank String password) {
        return entityManager.createQuery("UPDATE Registration g SET email = :email, password = :passwort where id = :id")
                .setParameter("email", email)
                .setParameter("passwort", password)
                .setParameter("id", id)
                .executeUpdate();
    }


    @Override
    @Transactional // <4>
    public Repository saveWithException(@NotBlank String email, @NotBlank String passwort) {
        save(email, passwort);
        throw new PersistenceException();
    }
}
