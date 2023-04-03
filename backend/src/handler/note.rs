use actix_web::{http::header, HttpResponse, Result, HttpRequest, web};
use serde::{Serialize, Deserialize};

use crate::{
    model::{error::{ApiError, CommonError}, note::Note},
    service::note_service::NoteServiceTrait,
};

#[derive(Serialize, Deserialize, Debug, Default, Clone)]
pub struct AddNoteRequest {
    pub title: String,
    pub content: String,
}

#[derive(Serialize, Deserialize, Debug, Default, Clone)]
pub struct UpdateNoteRequest {
    pub id: String,
    pub title: String,
    pub content: String,
}

#[derive(Serialize, Deserialize, Debug, Default, Clone)]
pub struct DeleteNoteRequest {
    pub id: String,
}

pub async fn add_note(
    note_service: web::Data<dyn NoteServiceTrait>,
    post_data: web::Json<AddNoteRequest>,
    request: HttpRequest,
) -> Result<HttpResponse, ApiError> {
    let header = request.headers().get(header::AUTHORIZATION).ok_or(ApiError::from(CommonError {
        message: "no auth header".to_owned(),
        code: 400
    }))?;

    let user_id = match header.to_str() {
        Ok(str)  => str,
        Err(_e) => return Err(ApiError::from(CommonError {
            message: "bad header".to_owned(),
            code: 400
        })),
    };


    let note = Note {
        id: "".to_owned(),
        user_id: user_id.to_owned(),
        title: post_data.clone().title,
        content: post_data.clone().content,
    };

    let added_note = note_service.add(&note).await?;

    Ok(HttpResponse::Ok().json(added_note))
}

pub async fn get_notes(
    note_service: web::Data<dyn NoteServiceTrait>,
    request: HttpRequest,
) -> Result<HttpResponse, ApiError> {
    let header = request.headers().get(header::AUTHORIZATION).ok_or(ApiError::from(CommonError {
        message: "no auth header".to_owned(),
        code: 400
    }))?;

    let user_id = match header.to_str() {
        Ok(str)  => str,
        Err(_e) => return Err(ApiError::from(CommonError {
            message: "bad header".to_owned(),
            code: 400
        })),
    };

    let notes = note_service.get_all(user_id).await?;

    Ok(HttpResponse::Ok()
        .json(notes))
}

pub async fn update_note(
    note_service: web::Data<dyn NoteServiceTrait>,
    post_data: web::Json<UpdateNoteRequest>,
    request: HttpRequest,
) -> Result<HttpResponse, ApiError> {
    let header = request.headers().get(header::AUTHORIZATION).ok_or(ApiError::from(CommonError {
        message: "no auth header".to_owned(),
        code: 400
    }))?;

    let user_id = match header.to_str() {
        Ok(str)  => str,
        Err(_e) => return Err(ApiError::from(CommonError {
            message: "bad header".to_owned(),
            code: 400
        })),
    };

    let note = Note {
        id: post_data.clone().id,
        user_id: user_id.to_owned(),
        title: post_data.clone().title,
        content: post_data.clone().content,
    };

    let updated_note = note_service.update(&note).await?;

    Ok(HttpResponse::Ok()
        .json(updated_note))
}

pub async fn delete_note(
    note_service: web::Data<dyn NoteServiceTrait>,
    post_data: web::Json<DeleteNoteRequest>,
    request: HttpRequest,
) -> Result<HttpResponse, ApiError> {
    let header = request.headers().get(header::AUTHORIZATION).ok_or(ApiError::from(CommonError {
        message: "no auth header".to_owned(),
        code: 400
    }))?;

    match header.to_str() {
        Ok(str)  => str,
        Err(_e) => return Err(ApiError::from(CommonError {
            message: "bad header".to_owned(),
            code: 400
        })),
    };

    note_service.delete(&post_data.id).await?;

    Ok(HttpResponse::Ok()
        .finish())
}
