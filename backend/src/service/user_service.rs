use async_trait::async_trait;
use std::sync::Arc;

use crate::{
    model::{error::CommonError, user::User},
    repository::user_repo::UserRepository,
};

#[async_trait]
pub trait UserServiceTrait {
    async fn login(&self, user_id: &str) -> Result<(), CommonError>;
    async fn register(&self, user: User) -> Result<(), CommonError>;
}

pub struct UserService {
    pub repo: Arc<dyn UserRepository>,
}

impl UserService {
    pub fn new(repo: Arc<dyn UserRepository>) -> Self {
        UserService { repo }
    }

    pub async fn login(&self, user_id: &str) -> Result<(), CommonError> {
        self.repo.get(user_id).await.map_err(|err| err.into())?;
        Ok(())
    }

    pub async fn register(&self, user: User) -> Result<(), CommonError> {
        self.repo.create(&user).await.map_err(|err| err.into())?;
        Ok(())
    }
}
