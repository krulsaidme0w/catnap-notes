use std::error::Error;

use crate::{model::user::User, repository::user_repo::UserRepository};

pub struct UserService {
    pub repo: Box<dyn UserRepository>,
}

impl UserService {
    pub fn new(repo: Box<dyn UserRepository>) -> Self {
        UserService { repo }
    }

    pub fn login(user: User) -> Result<(), Box<dyn Error>> {
        Ok(())
    }

}
