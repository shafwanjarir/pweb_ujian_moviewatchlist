import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Toolbar from './Toolbar'
import AddEditForm from './AddEditForm'
import './../styles/App.css'

const API_URL = 'http://localhost/pweb_ujian_moviewatchlist/backend/api/movies.php'

function MovieList() {
  const [movies, setMovies] = useState([])
  const [filteredMovies, setFilteredMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('date')
  const [viewMode, setViewMode] = useState('poster') // 'poster' or 'list'
  const [showForm, setShowForm] = useState(false)
  const [editingMovie, setEditingMovie] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    fetchMovies()
  }, [])

  useEffect(() => {
    filterAndSortMovies()
  }, [movies, searchTerm, sortBy])

  const fetchMovies = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API_URL)
      setMovies(response.data)
      setFilteredMovies(response.data)
    } catch (err) {
      setError('Failed to load movies. Please check if the backend is running.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortMovies = () => {
    let filtered = [...movies]

    // Search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase()
      filtered = filtered.filter(movie =>
        (movie.title || '').toLowerCase().includes(term) ||
        (movie.actors || '').toLowerCase().includes(term) ||
        (movie.description || '').toLowerCase().includes(term)
      )
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title-asc':
          return a.title.localeCompare(b.title)
        case 'title-desc':
          return b.title.localeCompare(a.title)
        case 'rating-high':
          return b.rating - a.rating
        case 'rating-low':
          return a.rating - b.rating
        case 'date':
        default:
          return b.id - a.id
      }
    })

    setFilteredMovies(filtered)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return

    try {
      await axios.delete(API_URL, { data: { id } })
      fetchMovies()
    } catch (err) {
      alert('Failed to delete movie')
      console.error(err)
    }
  }

  const handleEdit = (movie) => {
    setEditingMovie(movie)
    setShowForm(true)
  }

  const handleFormClose = () => {
    setShowForm(false)
    setEditingMovie(null)
    fetchMovies()
  }

  if (loading) {
    return <div className="loading">Loading movies...</div>
  }

  if (error) {
    return <div className="error">{error}</div>
  }

  return (
    <div className="movie-list-container">
      <header className="header">
        <h1 className="header-title">My Movie Watchlist</h1>
      </header>

      <Toolbar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        sortBy={sortBy}
        onSortChange={setSortBy}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        onAddClick={() => setShowForm(true)}
      />

      {showForm && (
        <AddEditForm
          movie={editingMovie}
          onClose={handleFormClose}
          onSave={handleFormClose}
        />
      )}

      <div className={`movies-grid ${viewMode === 'list' ? 'list-mode' : 'poster-mode'}`}>
        {filteredMovies.length === 0 ? (
          <div className="empty-state">
            <p>No movies found. Add your first movie to get started!</p>
          </div>
        ) : (
          filteredMovies.map(movie => (
            <div key={movie.id} className={`movie-card ${viewMode}`}>
              <div
                className="movie-poster"
                onClick={() => navigate(`/movie/${movie.id}`)}
                style={{
                  backgroundImage: movie.poster_url
                    ? `url(${movie.poster_url})`
                    : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                }}
              >
                {!movie.poster_url && (
                  <div className="poster-placeholder">
                    {movie.title.charAt(0)}
                  </div>
                )}
                <div className="movie-overlay">
                  <h3 className="movie-title-overlay">{movie.title}</h3>
                  <div className="movie-rating-overlay">⭐ {movie.rating}/10</div>
                </div>
              </div>

              {viewMode === 'list' && (
                <div className="movie-list-details">
                  <h3 onClick={() => navigate(`/movie/${movie.id}`)}>{movie.title}</h3>
                  <p className="movie-description-preview">{movie.description}</p>
                  <div className="movie-meta">
                    <span>⭐ {movie.rating}/10</span>
                    <span>👥 {movie.actors}</span>
                  </div>
                </div>
              )}

              <div className="movie-actions">
                <button className="btn-edit" onClick={() => handleEdit(movie)}>
                  Edit
                </button>
                <button className="btn-delete" onClick={() => handleDelete(movie.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default MovieList

