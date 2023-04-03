use actix_web::{http::header, web, HttpResponse, Result};

use crate::{
    model::{error::{ApiError}, user::User},
    service::user_service::UserServiceTrait,
};

pub async fn register(
    user_service: web::Data<dyn UserServiceTrait>,
    post_data: web::Json<User>,
) -> Result<HttpResponse, ApiError> {
    user_service.register(post_data.into_inner().into()).await?;

    Ok(HttpResponse::Ok()
        .finish())
}

pub async fn login(
    user_service: web::Data<dyn UserServiceTrait>,
    post_data: web::Json<User>,
) -> Result<HttpResponse, ApiError> {
    user_service.login(&post_data.clone().id).await?;
    Ok(HttpResponse::Ok()
        .append_header((header::AUTHORIZATION, post_data.clone().id))
        .finish())
}
