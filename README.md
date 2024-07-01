# Places Management Backoffice

This project is the backoffice for managing the Places API. It is built with React and TypeScript.

## Features

- **Places Management**: CRUD operations for managing places.
- **Recommendations Management**: CRUD operations for managing recommendations.
- **Categories Management**: CRUD operations for managing categories.
- **Users Management**: CRUD operations for managing users.
- **Comments Management**: CRUD operations for managing comments on places.
- **Authentication**: Admin login and user management.

## Technologies Used

- **React**: Library for building user interfaces.
- **TypeScript**: Superset of JavaScript that adds static typing.
- **React Router**: Library for routing in React.
- **Redux**: Library for state management.
- **Axios**: HTTP client for making API requests.
- **Styled Components**: Library for styling React components.

## Requirements

- Node.js (v14 or higher)
- npm (v6 or higher)

## Installation

1. Clone this repository:
    ```sh
    git clone https://github.com/Queirel/react.git
    cd your-repo-front
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory with the necessary configuration. You can base it on the `.env.example` file.

4. Start the application:
    ```sh
    npm start
    ```

5. The application will be available at `http://localhost:3000`.

## Project Structure

src/
├── components/ # Reusable components
├── pages/ # Application pages
├── redux/ # Redux configuration and slices
├── services/ # Services for API communication
├── styles/ # Global style files
├── App.tsx # Main application component
├── index.tsx # Application entry point
└── routes.tsx # Application route configuration

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

## Contributing

If you want to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/new-feature`).
3. Make your changes and commit them (`git commit -am 'Add new feature'`).
4. Push your changes to GitHub (`git push origin feature/new-feature`).
5. Open a Pull Request.

## Contact

For any inquiries or suggestions, you can contact me at [federicoqueirel@hotmail.com].
Make sure to adjust the environment variables, repository name, and any other specific details for your project.