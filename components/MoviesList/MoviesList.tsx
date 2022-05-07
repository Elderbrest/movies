import React from 'react'
import { Movie } from "../../types"
import Card from '../Card'

interface CardProps {
  movies: Movie[];
  categoryId: string;
  handleSelectMovies: (id: string, categoryId: string) => void;
  activeMovie?: { id: string; categoryId: string }
}

const MoviesList = ({ movies, categoryId, activeMovie, handleSelectMovies }: CardProps): JSX.Element => (
  <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 xs:grid-cols-1 gap-8">
    {movies.map(movie => (
      <Card
        handleSelectMovies={handleSelectMovies}
        key={movie.id}
        categoryId={categoryId}
        id={movie.id}
        photoUrL={movie.photoUrL}
        title={movie.title}
        isSelected={movie.id === activeMovie?.id}
      />
    ))}
  </div>
)

export default MoviesList
