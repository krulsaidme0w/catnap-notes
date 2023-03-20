use super::error::RepositoryError;

pub type RepositoryResult<T> = Result<T, RepositoryError>;
