use async_trait::async_trait;
use std::sync::Arc;

use crate::{
    model::{error::CommonError, note::Note},
    repository::{note_repo::NoteRepository},
};

#[async_trait]
pub trait NoteServiceTrait: Send + Sync {
    async fn add(&self, note: &Note) -> Result<Note, CommonError>;
    async fn get_all(&self, user_id: &str) -> Result<Vec<Note>, CommonError>;
    async fn update(&self, updated_note: &Note) -> Result<Note, CommonError>;
    async fn delete(&self, note_id: &str) -> Result<(), CommonError>;
}

pub struct NoteService {
    pub repo: Arc<dyn NoteRepository>,
}

impl NoteService {
    pub fn new(repo: Arc<dyn NoteRepository>) -> Self {
        NoteService { repo }
    }
}

#[async_trait]
impl NoteServiceTrait for NoteService {
    async fn add(&self, note: &Note) -> Result<Note, CommonError> {
        let note = self.repo.add(note).await.map_err(|err| err.into())?;
        Ok(note)
    }

    async fn get_all(&self, user_id: &str) -> Result<Vec<Note>, CommonError> {
        let notes = self.repo.get_all(user_id).await.map_err(|err| err.into())?;
        Ok(notes)
    }

    async fn update(&self, updated_note: &Note) -> Result<Note, CommonError> {
        let note = self
            .repo
            .update(updated_note)
            .await
            .map_err(|err| err.into())?;
        Ok(note)
    }

    async fn delete(&self, note_id: &str) -> Result<(), CommonError> {
        self.repo.delete(note_id).await.map_err(|err| err.into())?;
        Ok(())
    }
}
