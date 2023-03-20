use actix_web::{
    body::MessageBody,
    dev::{ServiceFactory, ServiceRequest, ServiceResponse},
    middleware::Logger,
    web, App, Error, HttpServer,
};
use dotenv::dotenv;
use sqlx::postgres::PgPoolOptions;
use std::sync::Arc;

use backend::{
    handler::auth::{login, register},
    repository::user_repo::UserPostgresRepository,
    service::user_service::UserService,
};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let ip = std::env::var("IP").unwrap();
    let port = std::env::var("PORT").unwrap().parse::<u16>().unwrap();
    let database_url = std::env::var("DATABASE_URL").unwrap();

    let pool = PgPoolOptions::new()
        .max_connections(50)
        .connect(&database_url)
        .await
        .unwrap();

    sqlx::migrate!().run(&pool).await.unwrap();

    let user_repo = Arc::new(UserPostgresRepository::new(pool));

    let user_service = Arc::new(UserService::new(user_repo));

    let server = HttpServer::new(move || create_app(user_service.clone())).bind((ip, port))?;

    server.run().await
}

pub fn create_app(
    user_service: Arc<UserService>,
) -> App<
    impl ServiceFactory<
        ServiceRequest,
        Response = ServiceResponse<impl MessageBody>,
        Config = (),
        InitError = (),
        Error = Error,
    >,
> {
    App::new()
        .app_data(web::Data::from(user_service))
        .wrap(Logger::default())
        .service(
            web::scope("/auth")
                .route("/register", web::post().to(register))
                .route("/login", web::post().to(login)),
        )
}
