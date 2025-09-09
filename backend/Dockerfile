FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the JAR file
COPY target/kanboard-api-*.jar app.jar

# Expose port
EXPOSE 8080

# Set production profile as default
ENV SPRING_PROFILES_ACTIVE=prod

# Add health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:8080/api/actuator/health || exit 1

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
