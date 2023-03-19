use std::error::Error;
use async_trait::async_trait;
use sqlx::{Pool, Postgres};

use crate::model::user::User;

#[async_trait]
pub trait UserRepository: Send + Sync {
    async fn create(&self, new_user: &User) -> Result<User, Box<dyn Error>>;
    async fn get(&self, user_id: &str) -> Result<User, Box<dyn Error>>;
    async fn delete(&self, user_id: &str) -> Result<(), Box<dyn Error>>;
}

pub struct UserPostgresRepository {
    pub pool: Pool<Postgres>
}

impl UserPostgresRepository {
    pub fn new(db: Pool<Postgres>) -> Self {
        UserPostgresRepository { pool: db }
    }
}

#[async_trait]
impl UserRepository for UserPostgresRepository {
    
    async fn create(&self, new_user: &User) -> Result<User, Box<dyn Error>> {
        let result = sqlx::query_as!(
            User,
            r#"INSERT INTO catnap.user(id) VALUES($1) RETURNING id"#,
            new_user.id,
        )
        .fetch_one(&self.pool)
        .await;

        match result {
            Ok(user) => {
                Ok(user)
            }
            Err(err) => {
                Err(Box::new(err))
            }
        }

    }

    async fn get(&self, user_id: &str) -> Result<User, Box<dyn Error>> {
        let result = sqlx::query_as!(
            User,
            r#"SELECT id FROM catnap.user WHERE id = $1"#,
            user_id,
        )
        .fetch_one(&self.pool)
        .await;

        match result {
            Ok(user) => {
                Ok(user)
            }
            Err(err) => {
                Err(Box::new(err))
            }
        }
    }

    async fn delete(&self, user_id: &str) -> Result<(), Box<dyn Error>> {
        let result = sqlx::query!(
            r#"DELETE FROM catnap.user WHERE id=$1"#,
           user_id,
        )
        .execute(&self.pool)
        .await;

        match result {
            Ok(_) => {
                Ok(())
            }
            Err(err) => {
                Err(Box::new(err))
            }
        }
    }
}
