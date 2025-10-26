import { createBrowserRouter } from "react-router-dom";
import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import UserManagment from "../pages/UserManagment";
import SignIn from "../pages/auth/SignIn";
import BooksManagment from "../pages/BooksManagment";
import LoansManagment from "../pages/LoansManagment";
import AddBook from "../pages/AddBook";
import Authors from "../pages/Authors";
import Genres from "../pages/Genres";
import CheckBook from "../pages/CheckBook";



export const router = createBrowserRouter([
    {
        element: <RootLayout />,
        children: [
            { path: 'UserManagment', element: <UserManagment /> },
            { path: 'BooksManagment', element: <BooksManagment /> },
            { path: 'LoansManagment', element: <LoansManagment /> },
            { path: 'CheckBook', element: <CheckBook /> },
            { path: 'AddBook', element: <AddBook /> },
            { path: 'Authors', element: <Authors /> },
            { path: 'Genres', element: <Genres /> },

        ],
    },
    {
        element: <AuthLayout />,
        children: [
            { index: true, element: <SignIn /> },
        ]
    },
    {
        path: "*",
        element: <h1>404 - Not Found</h1>,
    },
]);