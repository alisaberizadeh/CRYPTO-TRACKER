'use client'
import { IInfoCoin, IQuotes } from '@/app/lib/types';
import React, { useEffect, useState } from 'react'
import { FaArrowUp, FaArrowDown, FaExternalLinkAlt } from 'react-icons/fa'

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function Page({ params }: PageProps) {
  const { id } = React.use(params);

  const [info, setinfo] = useState<IInfoCoin | null>();
  const [quotes, setquotes] = useState<IQuotes | null>()

  const fetchData = async () => {
    try {
      const res = await fetch(`/api/info?id=${id}`);
      const data = await res.json();
      if (data && data.data) {
        setinfo(data.data[id]);
      } else {
        setinfo(null);
      }
    } catch (error) {
      console.error("Error fetching coins:", error);
      setinfo(null);
    }
  };

  const fetchDataQuotes = async () => {
    try {
      const res = await fetch(`/api/quotes?id=${id}`);
      const data = await res.json();
      if (data && data.data) {
        setquotes(data.data[id]);
        console.log(data.data[id]);
      } else {
        setquotes(null);
      }
    } catch (error) {
      console.error("Error fetching coins:", error);
      setquotes(null);
    }
  };

  useEffect(() => {
    setquotes(null);
    setinfo(null);
    fetchData();
    fetchDataQuotes()
  }, [id]);

  return (
    <div className="min-h-screen text-white p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img src={info?.logo} alt={info?.name} className="w-24 h-24 rounded-full border-4 border-yellow-400 shadow-lg" />
          <div>
            <h1 className="text-5xl font-extrabold">{info?.name}</h1>
            <span className="text-gray-300 text-xl uppercase">{info?.symbol}</span>
          </div>
        </div>
        <a href="" target="_blank" className="mt-4 md:mt-0 flex items-center gap-2 text-yellow-400 font-bold hover:underline">
          Official Website <FaExternalLinkAlt />
        </a>
      </div>

      {/* Description */}
      <p className="mb-8 bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 text-gray-300">{info?.description}</p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="p-6 rounded-2xl shadow-2xl border border-gray-700 bg-gradient-to-r from-yellow-500 to-yellow-400 transform transition hover:scale-105">
          <h3 className="text-gray-200 font-semibold">Price</h3>
          <p className="text-2xl font-bold mt-2">${quotes?.quote?.USD?.price.toLocaleString(undefined, { minimumFractionDigits: 6, maximumFractionDigits: 6 })}</p>
        </div>
        <div className="p-6 rounded-2xl shadow-2xl border border-gray-700 bg-gradient-to-r from-blue-500 to-blue-400 transform transition hover:scale-105">
          <h3 className="text-gray-200 font-semibold">Market Cap</h3>
          <p className="text-2xl font-bold mt-2">${quotes?.quote?.USD?.market_cap.toLocaleString()}</p>
        </div>
        <div className="p-6 rounded-2xl shadow-2xl border border-gray-700 bg-gradient-to-r from-purple-500 to-purple-400 transform transition hover:scale-105">
          <h3 className="text-gray-200 font-semibold">Volume (24h)</h3>
          <p className="text-2xl font-bold mt-2">${quotes?.quote?.USD?.volume_24h.toLocaleString()}</p>
        </div>
        <div className="p-6 rounded-2xl shadow-2xl border border-gray-700 bg-gradient-to-r from-green-500 to-green-400 transform transition hover:scale-105">
          <h3 className="text-gray-200 font-semibold">Date Added</h3>
          <p className="text-2xl font-bold mt-2">{info?.date_added}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

        <div
          className={`p-6 rounded-2xl shadow-2xl border border-gray-700 transform transition hover:scale-105 ${(quotes?.quote?.USD?.percent_change_1h ?? 0) >= 0 ? 'bg-green-900/40' : 'bg-red-900/40'
            }`}
        >
          <h3 className="text-gray-200 font-semibold">24h Change</h3>
          <div className="flex items-center gap-2 mt-2">
            {(quotes?.quote?.USD?.percent_change_1h ?? 0) >= 0 ? (
              <FaArrowUp className="text-green-400" />
            ) : (
              <FaArrowDown className="text-red-400" />
            )}
            <span
              className={`text-2xl font-bold ${(quotes?.quote?.USD?.percent_change_1h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
            >
              {(quotes?.quote?.USD?.percent_change_1h ?? 0).toFixed(2)}%
            </span>
          </div>
        </div>

        <div
          className={`p-6 rounded-2xl shadow-2xl border border-gray-700 transform transition hover:scale-105 ${(quotes?.quote?.USD?.percent_change_24h ?? 0) >= 0 ? 'bg-green-900/40' : 'bg-red-900/40'
            }`}
        >
          <h3 className="text-gray-200 font-semibold">24h Change</h3>
          <div className="flex items-center gap-2 mt-2">
            {(quotes?.quote?.USD?.percent_change_24h ?? 0) >= 0 ? (
              <FaArrowUp className="text-green-400" />
            ) : (
              <FaArrowDown className="text-red-400" />
            )}
            <span
              className={`text-2xl font-bold ${(quotes?.quote?.USD?.percent_change_24h ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
            >
              {(quotes?.quote?.USD?.percent_change_24h ?? 0).toFixed(2)}%
            </span>
          </div>
        </div>

        <div
          className={`p-6 rounded-2xl shadow-2xl border border-gray-700 transform transition hover:scale-105 ${(quotes?.quote?.USD?.percent_change_7d ?? 0) >= 0 ? 'bg-green-900/40' : 'bg-red-900/40'
            }`}
        >
          <h3 className="text-gray-200 font-semibold">7d Change</h3>
          <div className="flex items-center gap-2 mt-2">
            {(quotes?.quote?.USD?.percent_change_7d ?? 0) >= 0 ? (
              <FaArrowUp className="text-green-400" />
            ) : (
              <FaArrowDown className="text-red-400" />
            )}
            <span
              className={`text-2xl font-bold ${(quotes?.quote?.USD?.percent_change_7d ?? 0) >= 0 ? 'text-green-400' : 'text-red-400'
                }`}
            >
              {(quotes?.quote?.USD?.percent_change_7d ?? 0).toFixed(2)}%
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
