use async_trait::async_trait;
use sqlx::{Pool, Postgres};

use crate::model::{note::Note, result::RepositoryResult};

#[async_trait]
pub trait NoteRepository: Send + Sync {
    async fn add(&self, note: &Note) -> RepositoryResult<Note>;
    async fn get_all(&self, user_id: &str) -> RepositoryResult<Vec<Note>>;
    async fn update(&self, updated_note: &Note) -> RepositoryResult<Note>;
    async fn delete(&self, note_id: &str) -> RepositoryResult<()>;
}

pub struct NotePostgresRepository {
    pub pool: Pool<Postgres>,
}

impl NotePostgresRepository {
    pub fn new(db: Pool<Postgres>) -> Self {
        NotePostgresRepository { pool: db }
    }
}

#[async_trait]
impl NoteRepository for NotePostgresRepository {
    async fn add(&self, note: &Note) -> RepositoryResult<Note> {
        let result = sqlx::query_as!(
            Note,
            r#"INSERT INTO catnap.note (user_id, title, content) VALUES ($1, $2, $3) RETURNING *"#,
            note.user_id,
            note.title,
            note.content,
        )
        .fetch_one(&self.pool)
        .await
        .map_err(|e| sqlx::Error::from(e))?;
        Ok(result)
    }

    async fn get_all(&self, user_id: &str) -> RepositoryResult<Vec<Note>> {
        let result = sqlx::query_as!(
            Note,
            r#"SELECT * FROM catnap.note WHERE user_id = $1"#,
            user_id,
        )
        .fetch_all(&self.pool)
        .await
        .map_err(|e| sqlx::Error::from(e))?;
        Ok(result)
    }

    async fn update(&self, updated_note: &Note) -> RepositoryResult<Note> {
        let result = sqlx::query_as!(
            Note,
            r#"UPDATE catnap.note SET title = $1, content = $2 WHERE id = $3 RETURNING *"#,
            updated_note.title,
            updated_note.content,
            updated_note.id
        )
        .fetch_one(&self.pool)
        .await
        .map_err(|e| sqlx::Error::from(e))?;
        Ok(result)
    }

    async fn delete(&self, note_id: &str) -> RepositoryResult<()> {
        sqlx::query!(r#"DELETE FROM catnap.note WHERE id = $1"#, note_id,)
            .execute(&self.pool)
            .await
            .map_err(|e| sqlx::Error::from(e))?;
        Ok(())
    }
}
