# -------------------------------------------------------------
# Stage 1: Build Java 21 / Spring Boot 3.3 REST API
# -------------------------------------------------------------
FROM maven:3.9.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# backend ディレクトリからソースコードをコピー
COPY backend/pom.xml ./pom.xml
COPY backend/src ./src

# テストをスキップしてビルド実行
RUN mvn clean package -DskipTests

# -------------------------------------------------------------
# Stage 2: Runtime (軽量 JRE 21 Alpine)
# -------------------------------------------------------------
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# H2 Database ファイル永続化用ディレクトリ
RUN mkdir -p /app/data

# ビルドした JAR ファイルを配置
COPY --from=builder /app/target/*.jar /app/app.jar

# Render 用環境変数
ENV PORT=8080
ENV SPRING_PROFILES_ACTIVE=prod

EXPOSE 8080

# 512MB RAM 無料枠での OOM 停止を防止する最適化 JVM 引数
# -XX:+UseSerialGC: 低メモリ環境向けGC
# -XX:MaxRAMPercentage=75.0: メモリ上限を約380MBに制御
ENTRYPOINT ["java", "-XX:+UseSerialGC", "-XX:MaxRAMPercentage=75.0", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/app.jar"]
