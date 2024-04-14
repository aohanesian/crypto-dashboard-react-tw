import React, {useEffect, useState} from "react";
import {ThemeProvider} from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import {Route, Routes} from "react-router-dom";
import Home from "./routes/Home";
import Signin from "./routes/Signin";
import Signup from "./routes/Signup";
import Account from "./routes/Account";
import CoinPage from "./routes/CoinPage";
import axios from "axios";
import CoinItem from "./components/CoinItem";
import Footer from "./components/Footer";
import {AuthContextProvider} from "./context/AuthContext";
import 'react-loading-skeleton/dist/skeleton.css'
//TODO: remove coin from watchList from dashboard
function App() {
    const [coins, setCoins] = useState([]);
    const [error, setError] = useState(``)
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true&locale=en`

    useEffect(() => {
        axios.get(url).then((response) => {
            setCoins(response.data);
        })
            .catch((error) => {
                console.error("Error fetching data:", error.message);
            });
    }, [url]);


    return (
        <ThemeProvider>
            <AuthContextProvider>
                <Navbar/>
                <Routes>
                    <Route path={`/`} element={<Home coins={coins} error={error}/>}/>
                    <Route path={`/signin`} element={<Signin/>}/>
                    <Route path={`/signup`} element={<Signup/>}/>
                    <Route path={`/account`} element={<Account/>}/>
                    <Route path={`/coin/:coinId`} element={<CoinPage/>}>
                        <Route path={`:coinId`}/>
                    </Route>
                </Routes>
                <Footer/>
            </AuthContextProvider>
        </ThemeProvider>
    );
}

export default App;
