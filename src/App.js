import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserContext from "./contexts/UserContext.js";
import SignUpPage from "./pages/SignUpPage/SignUpPage.js";
import SignInPage from "./pages/SignInPage/SignInPage.js";
import TransactionsPage from "./pages/TransactionsPage/TransactionsPage.js";

export default function App() {
    const [authToken, setAuthToken] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [username, setUsername] = useState("");

    console.log(authToken);
    console.log(username);
    console.log(transactions);

    return (
        <UserContext.Provider
            value={{
                authToken,
                setAuthToken,
                transactions,
                setTransactions,
                username,
                setUsername
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TransactionsPage />} />
                    <Route path="/signup" element={<SignUpPage />} />
                    <Route path="/signin" element={<SignInPage />} />
                </Routes>
            </BrowserRouter>
        </UserContext.Provider>
    );
}