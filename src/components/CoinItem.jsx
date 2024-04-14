import React, {useEffect, useState} from 'react';
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {Sparklines, SparklinesLine} from 'react-sparklines';
import {Link} from "react-router-dom";
import {UserAuth} from "../context/AuthContext";
import {db} from '../firebase'
import {arrayUnion, arrayRemove, doc, updateDoc, getDoc} from 'firebase/firestore'

function CoinItem({coin, error}) {
    const [savedCoin, setSavedCoin] = useState(false)
    const {user} = UserAuth();
    const coinPath = doc(db, 'users', `${user?.email}`);

    useEffect(() => {
        async function checkSavedCoin() {
            if (user?.email) {
                const userDoc = await getDoc(coinPath);
                const savedCoins = userDoc.data()?.watchList || [];
                setSavedCoin(savedCoins.some(saved => saved.id === coin.id));
            }
        }

        checkSavedCoin();
    }, [coin.id, coinPath, user?.email]);

    const deleteCoin = async (passedId) => {
        try {
            const userDoc = await getDoc(coinPath);
            const savedCoins = userDoc.data()?.watchList || [];
            const result = savedCoins.filter((item) => item.id !== passedId);
            const updatedCoins = result.map(item => item.id);
            await updateDoc(coinPath, {
                watchList: result
            })
            setSavedCoin(false)
        } catch (e) {
            console.error(e.message)
        }
    };

    const saveCoin = async () => {
        if (user?.email) {
            await updateDoc(coinPath, {
                watchList: arrayUnion({
                    id: coin.id,
                    name: coin.name,
                    image: coin.image,
                    rank: coin.market_cap_rank,
                    symbol: coin.symbol,
                }),
            });
            setSavedCoin(true);
        } else {
            alert('Please sign in to save coin to your watch list');
        }
    };

    const handleList = async (passedId) => {
        if (!savedCoin) {
            return await saveCoin();
        }
        if (savedCoin) {
            return await deleteCoin(passedId);
        }
    };


    return (
            error ? (<tr><td>error</td></tr>)
                :
                (<tr className={`h-[80px] border-b overflow-hidden`}>
                    <td onClick={() => handleList(coin.id)}>{savedCoin ? <AiFillStar/> :
                        <AiOutlineStar/>}</td>
                    <td>{coin.market_cap_rank}</td>
                    <td>
                        <Link to={`/coin/${coin.id}`}>
                            <div className={`flex flex-center`}>
                                <img className={`w-6 mr-2 rounded-full`} src={coin.image} alt={coin.id}/>
                                <p className={`hidden sm:table-cell`}>{coin.name}</p>
                            </div>
                        </Link>
                    </td>
                    <td>{coin.symbol.toUpperCase()}</td>
                    <td>${coin.current_price.toLocaleString()}</td>
                    <td>
                        {coin.price_change_percentage_24h > 0 ? (
                            <p className={`text-green-600`}>{coin.price_change_percentage_24h.toFixed(2)}%</p>
                        ) : (
                            <p className={`text-red-600`}>{coin.price_change_percentage_24h.toFixed(2)}%</p>
                        )}
                    </td>
                    <td className={`w-[180px] hidden md:table-cell`}>${coin.total_volume.toLocaleString()}</td>
                    <td className={`w-[180px] hidden sm:table-cell`}>${coin.market_cap.toLocaleString()}</td>
                    <td>
                        <Sparklines data={coin.sparkline_in_7d.price}>
                            <SparklinesLine color={`teal`}/>
                        </Sparklines>
                    </td>
                </tr>)



    );
}

export default CoinItem;


