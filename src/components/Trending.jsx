import React, { useState, useEffect } from 'react';
import axios from "axios";
function Trending(props) {
    const [trending, setTrending] = useState([]);
    const url = `http://api.coingecko.com/api/v3/search/trending`;

    useEffect(() => {
        axios.get(url).then((response) => {
            setTrending(response.data.coins);
        })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    }, [url])

    return (
        <div className={`rounded-div my-12 py-8 text-primary`}>
            <h1 className={`text-2xl font-bold py-4`}>Trending Coins</h1>
            <div className={`grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4`}>
                {trending.map((coin) => (
                    <div className={`rounded-div flex justify-between p-4 hover: scale-105 ease-in-out duration-300`} key={coin.item.coin_id}>
                        <div className={`flex w-full items-center justify-between`}>
                            <div className={`flex`}>
                                <img className={`mr-4 rounded-full aspect-square`} src={coin.item.small} alt={coin.item.name} />
                                <div className={`break-all`}>
                                    <p className={`font-bold truncate`}>{coin.item.name}</p>
                                    <p>{coin.item.symbol}</p>
                                </div>
                            </div>
                            <div className={`flex items-center`}>
                                <img className={`w-4 mr-2`} src={`https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579`} alt={`btc`} />
                                <p>{coin.item.price_btc.toFixed(7)} btc</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Trending;