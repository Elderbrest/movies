import type { NextPage } from 'next'
import React, { useState, useEffect, useCallback, useMemo } from 'react'
import Head from 'next/head'
import { Category } from '../types'
import MoviesList from "../components/MoviesList";
import Modal from '../components/Modal';

const Home: NextPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedMovies, setSelectedMovies] = useState<{id: string, categoryId: string}[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSelectMovies = useCallback((id: string, categoryId: string) => {
    const isSameCategory = selectedMovies.some(item => item.categoryId === categoryId);
    const isSameId = selectedMovies.some(item => item.id === id);

    if (isSameId) {
      // Deselect movie if choose already selected
      setSelectedMovies(state => state.filter(item => item.id !== id))
    } else if (isSameCategory) {
      //Reselect movie in category, i.e. deselect all movies in particular category and select new one
      setSelectedMovies(state => [...state.filter(item => item.categoryId != categoryId), { id, categoryId }])
    } else {
      setSelectedMovies(state => [...state, { id, categoryId }])
    }
  }, [selectedMovies]);

  const moviesForReport = useMemo(() => {
    return selectedMovies.reduce((acc: any[], movie) => {
      const category = categories.find(item => item.id === movie.categoryId);
      const selectedMovie = category?.items.find(item => item.id === movie.id)

      return [...acc, { ...selectedMovie, category: category?.title }];
    }, [])
  }, [categories, selectedMovies]);

  useEffect(() => {
    setError(null);

    fetch('http://localhost:3000/api/ballots')
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then(({ items }) => {
        setCategories(items);
      })
      .catch(error => {
        console.error('Fetch api error: ', error);
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, []);

  return (
    <div className="flex flex-col items-center h-full bg-blue-dark">
      <Head>
        <title>Take Home Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <section className="container h-full">
        <h1 className="text-3xl font-bold text-center pt-12">
          Awards 2022
        </h1>
        {isLoading ?
          <h4 className="text-2xl py-10 text-center">Loading...</h4> : (
          <div>
            {categories.length > 0 && categories.map(category => (
              <div key={category.id}>
                <h2 className="text-2xl font-bold border-b-2 border-white mt-16 mb-4">
                  {category.title}
                </h2>
                <MoviesList
                  handleSelectMovies={handleSelectMovies}
                  movies={category.items}
                  categoryId={category.id}
                  activeMovie={selectedMovies.find(item => item.categoryId === category.id)}
                />
              </div>
            ))}
          </div>
        )}
        {error && (
          <div>Oops, something happened with the app: {error}</div>
        )}
      </section>

      <footer className="py-10">
        <button
          type="button"
          className={`
          font-medium rounded-lg text-xl px-10 py-5 text-center mr-2 mb-2 bg-normal-green hover:bg-light-green
          transition-all ease-in duration-200
        `}
          onClick={handleOpenModal}
        >
          Submit Ballot
        </button>
      </footer>
      <Modal isOpen={showModal} onClose={handleCloseModal}>
        {moviesForReport.map(item => (
          <p className="font-bold" key={item.id}>{item.title} | {item.category}</p>
        ))}
      </Modal>
    </div>
  )
}

export default Home
