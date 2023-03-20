// use std::sync::Arc;

// use sqlx::{Postgres, Pool};

// use crate::{service::user_service::{UserServiceTrait, UserService}, repository::user_repo::UserPostgresRepository};

// pub struct Container {
//     pub user_service: Arc<dyn UserServiceTrait>,
// }

// impl Container {
//     pub fn new() -> Self {
//         let user_repo = Arc::new(
//             UserPostgresRepository::new(pool)
//         );

//         let user_service = Arc::new(
//             UserService::new(user_repo)
//         );

//         Container { user_service }
//     }
// }

// impl Default for Container {
//     fn default() -> Self {
//         Self::new()
//     }
// }
