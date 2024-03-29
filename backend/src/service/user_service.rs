use async_trait::async_trait;
use std::sync::Arc;

use crate::{
    model::{error::CommonError, user::User},
    repository::user_repo::UserRepository,
};

#[async_trait]
pub trait UserServiceTrait: Send + Sync {
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
}

#[async_trait]
impl UserServiceTrait for UserService {
    async fn login(&self, user_id: &str) -> Result<(), CommonError> {
        self.repo.get(user_id).await.map_err(|err| err.into())?;
        Ok(())
    }

    async fn register(&self, user: User) -> Result<(), CommonError> {
        if user.id.len() != 64 {
            return Err(CommonError {
                message: "Bad private key length".to_owned(),
                code: 400,
            });
        };

        self.repo.create(&user).await.map_err(|err| err.into())?;
        Ok(())
    }
}
