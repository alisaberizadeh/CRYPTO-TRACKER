"use client"
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';

type TFavoriteContext = {
  favorites: number[];
  handleFavorites: (id: number) => void;
};

export const FavoritesContext = createContext({} as TFavoriteContext);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('myFavorites');
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    }
  }, []);

  const handleFavorites = (id: number) => {
    const stored = localStorage.getItem('myFavorites');
    const favoritesArray: number[] = stored ? JSON.parse(stored) : [];

    if (!favorites.includes(id)) {
      favoritesArray.push(id);
      localStorage.setItem('myFavorites', JSON.stringify(favoritesArray));
      setFavorites(favoritesArray);
      toast.success('Added to your favorites!');
    } else {
      Swal.fire({
        title: "Remove from your favorites?",
        icon: "warning",
        showCancelButton: true,
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedFavorites = favoritesArray.filter(favId => favId !== id);
          localStorage.setItem('myFavorites', JSON.stringify(updatedFavorites));
          setFavorites(updatedFavorites);
          toast.success('Removed from your favorites!');
        }
      });
    }
  };

  return (
    <FavoritesContext.Provider value={{ favorites, handleFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
