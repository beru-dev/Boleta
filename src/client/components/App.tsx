import React from "react";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GlobalStyles from "./GlobalStyles";
import Dashboard from "../pages/Dashboard";
import CreateTicket from "../pages/CreateTicket";
import Admin from "../pages/Admin";
import Login from "../pages/Login";
import Ticket from "../pages/Ticket";
import Project from "../pages/Project";
import Header from "./Header";
import Nav from "./Nav";
import Footer from "./Footer";

const App: React.FC = () => {

    return (
        <Router>
            <Provider store={store}>
                <GlobalStyles />
                <Header />
                <Nav />
                <main>
                    <Routes>
                        <Route path="/" element={<Dashboard />} />
                        <Route path="/create" element={<CreateTicket />} />
                        <Route path="/admin" element={<Admin />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/ticket/:ticketID" element={<Ticket />} />
                        <Route path="/project/:projectID" element={<Project />} />
                    </Routes>
                </main>
                <Footer />
            </Provider>
        </Router>
    )
}

export default App;