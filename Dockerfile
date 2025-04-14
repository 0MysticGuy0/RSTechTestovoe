#build stage
FROM maven:3.8.5-openjdk-17 AS build
WORKDIR ./app
COPY . ./
RUN mvn clean package

#run stage
FROM maven:3.8.4-openjdk-17
WORKDIR /app

ARG jar_name=RSTECHtestovoe-1.0.jar
COPY --from=build /app/target/${jar_name} ./app.jar
CMD ["java", "-jar", "app.jar"]