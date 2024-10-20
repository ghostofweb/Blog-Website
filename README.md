# Saffron Stories
[click here to view website](https://saffron-stories.vercel.app/)
Saffron Stories is a blog website where users can sign in, create, edit, and delete blogs. Users can also view blogs created by others, fostering a platform for shared stories and ideas.

## Features

- **Authentication**: Users can sign up, log in, and log out using a secure authentication system provided by Appwrite.
- **Blog Management**: Create, edit, and delete personal blogs.
- **View Blogs**: Users can explore blogs created by others.
- **Responsive UI**: The website adapts to various screen sizes, offering a seamless experience on desktops, tablets, and smartphones.

## Tech Stack

### Frontend  

- **React.js**: JavaScript library for building user interfaces.
- **@reduxjs/toolkit** and **react-redux**: For state management.
- **react-router-dom**: For routing between different pages.
- **react-hook-form**: For handling form validation and inputs.
- **@tinymce/tinymce-react**: Rich text editor for blog creation.
- **html-react-parser**: To parse and render HTML strings.

### Backend

- **Appwrite**: Backend-as-a-service (BaaS) used for authentication, database, file uploads, and custom queries.

### Environment Variables (Vite)
Environment variables are managed in `config.js` using Vite's syntax. Example:

```js
export const config = {
  APP_NAME: import.meta.env.VITE_ANYAPP_NAME,
  API_KEY: import.meta.env.VITE_API_KEY,
  // Other environment variables
};
```
![Alt text](./Screenshot%202024-10-09%20225510.png)
![Alt text](./Screenshot%202024-10-09%20225534.png)
![Alt text](./Screenshot%202024-10-09%20225549.png)
![Alt text](./Screenshot%202024-10-09%20225603.png)
![Alt text](./Screenshot%202024-10-09%20225639.png)


### A Heartfelt Thanks to [Hitesh Choudhary](https://github.com/hiteshchoudhary) Sir

I would like to express my sincere gratitude to Hitesh Choudhary Sir for his invaluable guidance in React development. His dedication to helping students and sharing his knowledge has been instrumental in shaping my journey as a developer. Thank you for inspiring us to reach new heights!


