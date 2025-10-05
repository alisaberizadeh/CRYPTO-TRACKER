"use client"
import { FavoritesContext } from '@/context/FavoritesContext'
import Link from 'next/link'
import React, { useContext } from 'react'
import { CiSearch } from 'react-icons/ci'
import { FaHeart, FaRegHeart } from 'react-icons/fa6'

function Header() {
  const {favorites} = useContext(FavoritesContext)
  return (
    <header className="w-full bg-slate-950  px-6 py-3">

      <div className='container flex items-center justify-between m-auto'>
        <nav>
          <ul className="flex gap-6 text-gray-500 font-medium">
            <li>
              <Link href="/" className="hover:text-cyan-600 transition">
                HOME
              </Link>
            </li>
            <li>
              <Link href="/coins" className="hover:text-cyan-600 transition">
                COINS
              </Link>
            </li>
            <li>
              <Link href="/favorites"
                className="cursor-pointer flex justify-center items-centervrounded-tr-4l text-red-500"
              >
                <FaRegHeart className="text-center text-xl mr-1  text-red-500" /> {favorites.length}
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex-1 mx-8">
          <form action="/coins" className='bg-slate-950 flex items-center justify-between  rounded-full border border-slate-900'>
            <input
              type="text"
              placeholder="Search..."
              name='search'
              className="w-11/12 px-4 py-2 text-sm focus:outline-none outline-none border-none text-white" />
            <button className='w-1/12 cursor-pointer flex justify-center items-center text-xl text-white'><CiSearch /></button>
          </form>
        </div>


        <div className="text-2xl font-bold text-cyan-600">
          CRYPTO TRACKER
        </div>
      </div>


    </header>
  )
}

export default Header