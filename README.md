# catnap notes

## _simple note-taking application that allows users to create, edit, and delete notes_

### home page
<img src='https://github.com/krulsaidme0w/catnap-notes/blob/dev/frontend/src/assets/images/home.png?raw=true' width='1000'>

### login/register pages
<p align="middle">
  <img src='https://github.com/krulsaidme0w/catnap-notes/blob/dev/frontend/src/assets/images/login.png?raw=true' width='400'>
  <img src='https://github.com/krulsaidme0w/catnap-notes/blob/dev/frontend/src/assets/images/register.png?raw=true' width='400'>
</p>

### edit note
<p align="middle">
  <img src='https://github.com/krulsaidme0w/catnap-notes/blob/dev/frontend/src/assets/images/edit.png?raw=true' width='500'>
</p>

## features
- no email, phone number registration (no user data stored)
- login with one private key, which was autogenerated and which double hash will be stored in backend (no backend access to ANY user information)
- full data anonymity (encryption and decryption of notes using hash of private key only on the frontend, backend stores encrypted notes)

## frontend made using
- react + typescript
- sass / scss
- redux
- react router

## backend made using
- actix web
- sqlx
- psql

## how to run
- `git clone ...` the respository
- `cd backend/` - to backend
- `docker compose -f docker-compose.yml up -d` - run postgres in docker container
- `cargo run` - start backend server
- `cd frontend/` - to frontend
- `npm install` - install project dependencies
- `npm start` - start frontend server

> didnt care about envs in frontend, change api addr by hands in api.tsx file :)
