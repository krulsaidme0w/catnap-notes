use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Default, Clone)]
pub struct Note {
    pub id: String,
    pub user_id: String,
    pub title: String,
    pub content: String,
}
