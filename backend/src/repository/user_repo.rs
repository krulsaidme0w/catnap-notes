use async_trait::async_trait;
use sqlx::{Pool, Postgres};

use crate::model::{result::RepositoryResult, user::User};

#[async_trait]
pub trait UserRepository: Send + Sync {
    async fn create(&self, new_user: &User) -> RepositoryResult<User>;
    async fn get(&self, user_id: &str) -> RepositoryResult<User>;
    async fn delete(&self, user_id: &str) -> RepositoryResult<()>;
}

pub struct UserPostgresRepository {
    pub pool: Pool<Postgres>,
}

impl UserPostgresRepository {
    pub fn new(db: Pool<Postgres>) -> Self {
        UserPostgresRepository { pool: db }
    }
}

#[async_trait]
impl UserRepository for UserPostgresRepository {
    async fn create(&self, new_user: &User) -> RepositoryResult<User> {
        let result = sqlx::query_as!(
            User,
            r#"INSERT INTO catnap.user(id) VALUES($1) RETURNING id"#,
            new_user.id,
        )
        .fetch_one(&self.pool)
        .await
        .map_err(|e| sqlx::Error::from(e))?;
        Ok(result)
    }

    async fn get(&self, user_id: &str) -> RepositoryResult<User> {
        let result = sqlx::query_as!(User, r#"SELECT id FROM catnap.user WHERE id = $1"#, user_id,)
            .fetch_one(&self.pool)
            .await
            .map_err(|e| sqlx::Error::from(e))?;
        Ok(result)
    }

    async fn delete(&self, user_id: &str) -> RepositoryResult<()> {
        sqlx::query!(r#"DELETE FROM catnap.user WHERE id=$1"#, user_id,)
            .execute(&self.pool)
            .await
            .map_err(|e| sqlx::Error::from(e))?;
        Ok(())
    }
}
