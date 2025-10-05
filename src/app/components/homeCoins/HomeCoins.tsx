"use client"
import { ICoin } from '@/app/lib/types';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Skeleton from '@mui/material/Skeleton';
import { FaHeart, FaLink, FaPlus, FaRegHeart } from 'react-icons/fa6';
import Link from 'next/link';
import TableCoins from '../tableCoins/TableCoins';
import { FavoritesContext } from '@/context/FavoritesContext';

function HomeCoins() {

    const [coins, setCoins] = useState<ICoin[]>([]);
    const { favorites, handleFavorites } = useContext(FavoritesContext)

    const fetchData = async (start: number) => {
        try {
            const res = await fetch(`/api/coins?start=${start}`);
            const data = await res.json();

            if (data && data.data) {
                setCoins(data.data);
            } else {
                setCoins([]);
            }
        } catch (error) {
            console.error("Error fetching coins:", error);
            setCoins([]);
        }
    };

    useEffect(() => {
        setCoins([]);
        fetchData(1);

        const interval = setInterval(() => {
            fetchData(1);
            console.log("Coins updated");
            toast.success('Information updated.');

        }, 30000);

        return () => clearInterval(interval);
    }, []);




    return (
        <div className="overflow-x-auto mt-6 bg-none my-5">
            {coins.length > 0 && (
                <>
                    <TableCoins>
                        {coins.map((item, index) => (
                            <tr key={index} className="text-center hover:bg-slate-950 transition">
                                <td className="px-4 py-3 border border-gray-800 bg-slate-800 text-gray-100">{index + 1}</td>
                                <td className="px-4 py-3 border border-gray-800 text-white bg-slate-900 font-semibold flex items-center gap-2 justify-center">
                                    <Link href={`/coins/${item.id}`} className="flex items-center"><FaLink className="mr-1 text-sm" /> {item.name}</Link>
                                </td>
                                <td className="px-4 py-3 border border-gray-800 uppercase text-gray-300">{item.symbol}</td>
                                <td className="px-4 py-3 border border-gray-800 font-bold text-gray-300">
                                    ${item.quote.USD.price.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 })}
                                </td>
                                <td className={`px-4 py-3 border border-gray-800 font-bold ${item.quote.USD.percent_change_1h < 0 ? "text-red-600" : "text-green-500"}`}>
                                    {item.quote.USD.percent_change_1h.toFixed(2)}%
                                </td>
                                <td className={`px-4 py-3 border border-gray-800 font-bold ${item.quote.USD.percent_change_24h < 0 ? "text-red-600" : "text-green-500"}`}>
                                    {item.quote.USD.percent_change_24h.toFixed(2)}%
                                </td>
                                <td className={`px-4 py-3 border border-gray-800 font-bold ${item.quote.USD.percent_change_7d < 0 ? "text-red-600" : "text-green-500"}`}>
                                    {item.quote.USD.percent_change_7d.toFixed(2)}%
                                </td>
                                <td className="px-4 py-3 border border-gray-800  text-gray-300">${Math.round(item.quote.USD.market_cap).toLocaleString()}</td>
                                <td className="px-4 py-3 border border-gray-800  text-gray-300">${Math.round(item.quote.USD.volume_24h).toLocaleString()}</td>
                                <td className="px-4 py-3 border border-gray-800  text-gray-300">{item.date_added.slice(0, 10)}</td>
                                <td className="px-4 border border-gray-800  text-gray-300">
                                    <button className="text-xl cursor-pointer" onClick={() => handleFavorites(item.id)}>{favorites.includes(item.id) ? <FaHeart className="text-red-600" /> : <FaRegHeart />}</button>
                                </td>
                            </tr>
                        ))}
                    </TableCoins>
                    <div className="flex justify-center gap-4 mt-6">
                        <Link href="/coins" className="px-4 py-2 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br text-white rounded disabled:opacity-50 cursor-pointer flex items-center">
                            See More Coins <FaPlus className='ml-2' />
                        </Link>

                    </div>
                </>
            )}

            {coins && coins.length < 1 && (
                Array.from({ length: 20 }).map((_, i) => (
                    <Skeleton key={i} variant="rectangular" className='mt-3 rounded-sm' width="100%" height={40} />
                ))
            )}

        </div>
    );
}

export default HomeCoins