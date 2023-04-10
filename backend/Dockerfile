FROM rust:1.67

WORKDIR /app

ENV SQLX_OFFLINE true

COPY .env .
COPY Cargo.toml .
COPY sqlx-data.json .
COPY migrations ./migrations
COPY src ./src

RUN cargo build --release

EXPOSE 8080

CMD ["./target/release/backend"]
