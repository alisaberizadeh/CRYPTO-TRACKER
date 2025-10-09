"use client";
import { ICoin } from "@/app/lib/types";
import React, { useContext, useEffect, useState } from "react";
import { FaHeart, FaLeftLong, FaLink, FaRegHeart, FaRightLong } from "react-icons/fa6";
import { useSearchParams, useRouter } from "next/navigation";
import 'react-loading-skeleton/dist/skeleton.css';
import Link from "next/link";
import { toast } from "react-toastify";
import { FaAngleRight } from "react-icons/fa";
import TableCoins from "../tableCoins/TableCoins";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Skeleton from "@mui/material/Skeleton";
import { FavoritesContext } from "@/context/FavoritesContext";
function CoinsList() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [coins, setCoins] = useState<ICoin[]>([]);
    const [total_pages, setTotalPages] = useState(0);
    const page = parseInt(searchParams.get("page") || "1");
    const startConis = (page - 1) * 50 + 1;
    const search = searchParams.get("search") || null;
    const [searchError, setsearchError] = useState<string | null>(null)
    const [sort_dir, setsort_dir] = useState<string | undefined>()
    const [sort, setsort] = useState<string | undefined>()

    const {favorites,handleFavorites} = useContext(FavoritesContext)

    const fetchData = async (start: number) => {
        try {
            const res = await fetch(`/api/coins?start=${start}${sort_dir ? `&sort_dir=${sort_dir}` : ""}${sort ? `&sort=${sort}` : ""}`);
            const data = await res.json();

            if (data && data.data) {
                if (search) {
                    const filteredCoins = data.data.filter((coin: ICoin) =>
                        coin.name.toLowerCase().includes(search.toLowerCase())
                    )
                    if (filteredCoins.length > 0) {
                        setCoins(filteredCoins);
                    }
                    else {
                        setsearchError("The search result is empty !!!")
                    }


                }
                else {
                    setCoins(data.data);
                    const totalCount = data.status?.total_count ?? 0;
                    setTotalPages(Math.ceil(totalCount / 50));
                }


            } else {
                setCoins([]);
                setTotalPages(0);
            }
        } catch (error) {
            console.error("Error fetching coins:", error);
            setCoins([]);
            setTotalPages(0);
        }
    };

    useEffect(() => {
        setCoins([]);
        setsearchError(null);
        fetchData(startConis);

        const interval = setInterval(() => {
            fetchData(startConis);
            toast.success('Information updated.');

        }, 30000);

        return () => clearInterval(interval);
    }, [page, startConis, search, sort_dir, sort]);

    const goToPage = (newPage: number) => {
        router.push(`?page=${newPage}`);
    };


    return (
        <div className="overflow-x-auto bg-none my-5">

            <div className="w-full flex  my-6  items-center">
                <Link href="/" className="text-gray-500">Home</Link>
                <FaAngleRight className="mx-2 text-gray-500" />
                <Link className="text-cyan-600" href="/coins">Coins</Link>
                {search && (
                    <>
                        <FaAngleRight className="mx-2" />
                        <span className="text-cyan-600">Search by : {search}</span>
                    </>
                )}

            </div>

            <div className="w-full grid grid-cols-6 gap-10">
                {!search && (
                    <div className="col-span-1">
                        <Select
                            key={`sort_dir_${sort_dir ?? "reset"}`}
                            value={sort_dir}
                            onValueChange={(value) => {
                                setsort_dir(value);
                                setsort(undefined);
                            }}
                        >
                            <SelectTrigger className="w-full  bg-slate-950 border text-white border-slate-800 ">
                                <SelectValue placeholder="Sort by Market Cap" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="desc">DESC</SelectItem>
                                <SelectItem value="asc">ASC</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select
                            key={`sort_${sort ?? "reset"}`}
                            value={sort}
                            onValueChange={(value) => {
                                setsort(value);
                                setsort_dir(undefined);
                            }}
                        >
                            <SelectTrigger className="w-full text-white bg-slate-950 border border-slate-800 mt-3">
                                <SelectValue placeholder="Advanced Sort" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="date_added">Date Added</SelectItem>
                                <SelectItem value="price">Price</SelectItem>
                                <SelectItem value="volume_24h">Volume 24h</SelectItem>
                                <SelectItem value="volume_7d">Volume 7d</SelectItem>
                                <SelectItem value="volume_30d">Volume 30d</SelectItem>
                                <SelectItem value="percent_change_1h">% Change 1h</SelectItem>
                                <SelectItem value="percent_change_24h">% Change 24h</SelectItem>
                                <SelectItem value="percent_change_7d">% Change 7d</SelectItem>
                            </SelectContent>
                        </Select>



                    </div>
                )}
                <div className={search ? "col-span-6" : "col-span-5"}>
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
                                        <td className="px-4 border border-gray-800  text-gray-300">
                                            <button className="text-xl cursor-pointer" onClick={()=>handleFavorites(item.id)}>{favorites.includes(item.id) ? <FaHeart className="text-red-600" /> : <FaRegHeart />}</button>
                                        </td>
                                </tr>
                                ))}
                            </TableCoins>

                            {!search && (
                                <div className="flex justify-center gap-4 mt-6">
                                    <button disabled={page <= 1} onClick={() => goToPage(page - 1)} className="px-4 py-2 bg-violet-800 text-white rounded disabled:opacity-50 cursor-pointer">
                                        <FaLeftLong />
                                    </button>
                                    <span className="text-violet-800 flex items-center">{page} / {total_pages}</span>
                                    <button disabled={page >= total_pages} onClick={() => goToPage(page + 1)} className="px-4 py-2 bg-violet-800 text-white rounded disabled:opacity-50 cursor-pointer">
                                        <FaRightLong />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                    {!searchError && coins && coins.length < 1 && (
                        Array.from({ length: 20 }).map((_, i) => (
                            <Skeleton key={i} variant="rectangular" className='mt-3 rounded-sm' width="100%" height={40} />
                        ))
                    )}
                </div>
            </div>



            {searchError && (
                <div className="py-5 text-center">
                    <h1 className="text-center text-lg mb-5 text-white">{searchError}</h1>
                    <Link href="/coins" className=" px-3 py-2 bg-gradient-to-r from-cyan-500 via-cyan-600 to-cyan-700 hover:bg-gradient-to-br text-white rounded disabled:opacity-50 cursor-pointer">
                        Go to Coins Page
                    </Link>
                </div>
            )}


        </div>
    );
}

export default CoinsList;
