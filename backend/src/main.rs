use std::sync::Arc;
use actix_web::{App, middleware::Logger, web};
use dotenv::dotenv;
use sqlx::postgres::PgPoolOptions;

use backend::{repository::user_repo::{UserPostgresRepository}, service::user_service::UserService, handler::auth::{register, login}};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let database_url = std::env::var("DATABASE_URL").unwrap();

    let pool = PgPoolOptions::new()
        .max_connections(50)
        .connect(&database_url)
        .await.unwrap();

    sqlx::migrate!().run(&pool).await.unwrap();

    let user_repo = Arc::new(
        UserPostgresRepository::new(pool)
    );

    let user_service = Arc::new(
        UserService::new(user_repo)
    );

    App::new()
        .app_data(web::Data::from(user_service))
        .wrap(Logger::default())
        .service(
            web::scope("/auth")
                .route("/register", web::post().to(register))
                .route("/login", web::post().to(login))
        )
}
