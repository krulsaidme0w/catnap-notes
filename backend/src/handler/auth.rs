use actix_web::web;

use crate::{service::user_service::{UserServiceTrait}, model::{user::User, error::ApiError}};

pub async fn register(
    user_service: web::Data<dyn UserServiceTrait>, post_data: web::Json<User>,
) -> Result<(), ApiError> {
    user_service.register(post_data.into_inner().into()).await?;
    Ok(())
}

pub async fn login(
    user_service: web::Data<dyn UserServiceTrait>, post_data: web::Json<&str>,
) -> Result<(), ApiError> {
    user_service.login(post_data.into_inner()).await?;
    Ok(())
}
