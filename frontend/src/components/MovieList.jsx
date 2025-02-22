import React from 'react'
import MovieCard from './MovieCard'

function MovieList({movies}) {
  return (
    <div className='grid grid-cols-4 gap-2'>
      {movies.map((movie, index) => (
        <MovieCard movie={movie} key={index}/>
      ))}
    </div>
  )
}

export default MovieList
