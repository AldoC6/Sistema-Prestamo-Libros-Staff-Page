import { Outlet } from "react-router-dom";
import { Nav } from "../components/ui/Nav";

export default function RootLayout() {
    return (
        <div className="app">
            <Nav />
            <main className="container">
                <Outlet />
            </main>
        </div>
    );
}
