"use client"
import { FavoritesContext } from '@/context/FavoritesContext'
import Link from 'next/link'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { CiCircleRemove, CiLink, CiTrash } from 'react-icons/ci'
import { FaHeart } from 'react-icons/fa'
import { ICoin } from '../lib/types'
import { toast } from 'react-toastify'
import { FaAngleRight, FaLink, FaRegHeart } from 'react-icons/fa6'
import TableCoins from '../components/tableCoins/TableCoins'
import Skeleton from '@mui/material/Skeleton'

function Page() {
    const { favorites, handleFavorites } = useContext(FavoritesContext)
    const [coins, setCoins] = useState<ICoin[]>([]);

    const fetchData = async (start: number) => {
        try {
            const res = await fetch(`/api/coins?start=${start}&limit=5000`);
            const data = await res.json();

            if (data && data.data) {
                const myCoins: ICoin[] = data.data;
                const finalCoins = myCoins.filter(coin =>
                    favorites.includes(coin.id)
                );

                setCoins(finalCoins)

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
            toast.success('Information updated.');

        }, 30000);

        return () => clearInterval(interval);
    }, [favorites]);



    return (
        <div className="overflow-x-auto bg-none my-5">

            <div className="w-full flex  my-6  items-center">
                <Link href="/" className="text-gray-500">Home</Link>
                <FaAngleRight className="mx-2 text-gray-500" />
                <Link className="text-cyan-600 flex items-center" href="/favorites">Favorites <FaHeart className='ml-1' /></Link>


            </div>

            <div className="w-full grid grid-cols-6 gap-10">

                <div className="col-span-6">
                    {coins && coins.length > 0 && (
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
                                        <td className="px-4 py-3 border border-gray-800  text-gray-300">{item.date_added.slice(0, 10)}</td>
                                        <td className=" border border-gray-800  text-gray-300">
                                            <button className="text-xl cursor-pointer" onClick={() => handleFavorites(item.id)}>{favorites.includes(item.id) ? <FaHeart className="text-red-600" /> : <FaRegHeart />}</button>
                                        </td>
                                    </tr>
                                ))}
                            </TableCoins>


                        </>
                    )}
                    {coins && coins.length < 1 && (
                        Array.from({ length: 7 }).map((_, i) => (
                            <Skeleton key={i} variant="rectangular" className='mt-3 rounded-sm' width="100%" height={40} />
                        ))
                    )}
                </div>
            </div>






        </div>
    )
}

export default Page