"use client"
import React from 'react'
import Header from '../header/Header'
import { ToastContainer } from 'react-toastify'
import { FavoritesProvider } from '@/context/FavoritesContext'

function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div>
            <FavoritesProvider>
                <Header />
                <div className="container m-auto">
                    <ToastContainer
                        position="bottom-center"
                        autoClose={5000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                    {children}

                </div>
            </FavoritesProvider>
        </div>
    )
}

export default MainLayout