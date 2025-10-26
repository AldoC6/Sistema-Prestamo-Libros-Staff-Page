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
import { PrivateRoute } from "../components/PrivateRoute";

export const router = createBrowserRouter([
    {
        element: <AuthLayout />,
        children: [
            { index: true, element: <SignIn /> },
        ],
    },
    {
        element: <RootLayout />,
        children: [
            {
                path: 'UserManagment',
                element: (
                    <PrivateRoute>
                        <UserManagment />
                    </PrivateRoute>
                ),
            },
            {
                path: 'BooksManagment',
                element: (
                    <PrivateRoute>
                        <BooksManagment />
                    </PrivateRoute>
                ),
            },
            {
                path: 'LoansManagment',
                element: (
                    <PrivateRoute>
                        <LoansManagment />
                    </PrivateRoute>
                ),
            },
            {
                path: 'CheckBook',
                element: (
                    <PrivateRoute>
                        <CheckBook />
                    </PrivateRoute>
                ),
            },
            {
                path: 'AddBook',
                element: (
                    <PrivateRoute>
                        <AddBook />
                    </PrivateRoute>
                ),
            },
            {
                path: 'Authors',
                element: (
                    <PrivateRoute>
                        <Authors />
                    </PrivateRoute>
                ),
            },
            {
                path: 'Genres',
                element: (
                    <PrivateRoute>
                        <Genres />
                    </PrivateRoute>
                ),
            },
        ],
    },
    {
        path: "*",
        element: <h1>404 - Not Found</h1>,
    },
]);
