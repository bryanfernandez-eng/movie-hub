import React from 'react'

function MovieCard({movie}) {
  return (
    <div className='container flex flex-col p-3 bg-slate-900 justify-center items-center rounded-md gap-2'>
      <img src={"https://image.tmdb.org/t/p/original/" + movie.poster_path} className="object-cover w-50 h-72 cursor-pointer rounded-md" alt=""/>
      <p>{movie.title}</p>
    </div>
  )
}

export default MovieCard
