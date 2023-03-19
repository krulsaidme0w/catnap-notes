use dotenv::dotenv;
use sqlx::postgres::PgPoolOptions;

use backend::{repository::user_repo::{UserPostgresRepository, UserRepository}, model::user::User};

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    dotenv().ok();

    let database_url = std::env::var("DATABASE_URL").unwrap();

    let pool = PgPoolOptions::new()
        .max_connections(50)
        .connect(&database_url)
        .await.unwrap();

    sqlx::migrate!().run(&pool).await.unwrap();

    let user_repo = UserPostgresRepository::new(pool);
    let user = user_repo.create(&User{id: "asd".to_string()}).await.unwrap();
    user_repo.delete("asd").await.unwrap();

    dbg!(user);

    Ok(())
}
