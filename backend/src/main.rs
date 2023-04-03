use actix_cors::Cors;
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
    handler::{auth::{login, register}, note::{add_note, update_note, delete_note, get_notes}},
    repository::{
        note_repo::{NotePostgresRepository, NoteRepository},
        user_repo::{UserPostgresRepository, UserRepository},
    },
    service::{user_service::{UserService, UserServiceTrait}, note_service::{NoteServiceTrait, NoteService}},
};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    std::env::set_var("RUST_LOG", "debug");
    env_logger::init();

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

    let user_repo: Arc<dyn UserRepository> = Arc::new(UserPostgresRepository::new(pool.clone()));
    let note_repo: Arc<dyn NoteRepository> = Arc::new(NotePostgresRepository::new(pool));

    let user_service: Arc<dyn UserServiceTrait> = Arc::new(UserService::new(user_repo));
    let note_service: Arc<dyn NoteServiceTrait> = Arc::new(NoteService::new(note_repo));

    let server = HttpServer::new(move || create_app(user_service.clone(), note_service.clone())).bind((ip, port))?;

    server.run().await
}

pub fn create_app(
    user_service: Arc<dyn UserServiceTrait>,
    note_service: Arc<dyn NoteServiceTrait>,
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
        .wrap(Cors::permissive())
        .wrap(Logger::default())
        .app_data(web::Data::from(user_service.clone()))
        .app_data(web::Data::from(note_service.clone()))
        .service(
            web::scope("/auth")
                .route("/register", web::post().to(register))
                .route("/login", web::post().to(login)),
        )
        .service(
            web::scope("/note")
                .route("/add", web::post().to(add_note))
                .route("/update", web::post().to(update_note))
                .route("/delete", web::delete().to(delete_note))
                .route("/get_all", web::get().to(get_notes)), 
        )
}
