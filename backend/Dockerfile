FROM maven:latest AS build

WORKDIR /app

COPY . .

RUN ls

RUN mvn clean package

FROM openjdk:18.0.2

COPY --from=build /app/target/backend.jar /app/

WORKDIR /app

EXPOSE 8080

CMD ["java", "-jar", "backend.jar"]
