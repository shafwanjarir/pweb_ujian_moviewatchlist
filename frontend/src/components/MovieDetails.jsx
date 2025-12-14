import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import AddEditForm from './AddEditForm'
import './../styles/App.css'

const API_URL = 'http://localhost/pweb_ujian_moviewatchlist/backend/api/movies.php'

function MovieDetails() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [movie, setMovie] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [showEditForm, setShowEditForm] = useState(false)
  const [newReview, setNewReview] = useState('')

  useEffect(() => {
    fetchMovie()
  }, [id])

  const fetchMovie = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${API_URL}?id=${id}`)
      setMovie(response.data)
    } catch (err) {
      setError('Movie not found')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleAddReview = async () => {
    if (!newReview.trim()) return

    const reviews = Array.isArray(movie.reviews) ? [...movie.reviews] : []
    reviews.push({
      text: newReview,
      date: new Date().toISOString()
    })

    try {
      const updatedMovie = {
        ...movie,
        reviews: reviews
      }
      await axios.put(API_URL, updatedMovie)
      setMovie(updatedMovie)
      setNewReview('')
    } catch (err) {
      alert('Failed to add review')
      console.error(err)
    }
  }

  const handleDeleteReview = async (index) => {
    const reviews = Array.isArray(movie.reviews) ? [...movie.reviews] : []
    reviews.splice(index, 1)

    try {
      const updatedMovie = {
        ...movie,
        reviews: reviews
      }
      await axios.put(API_URL, updatedMovie)
      setMovie(updatedMovie)
    } catch (err) {
      alert('Failed to delete review')
      console.error(err)
    }
  }

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this movie?')) return

    try {
      await axios.delete(API_URL, { data: { id: movie.id } })
      navigate('/')
    } catch (err) {
      alert('Failed to delete movie')
      console.error(err)
    }
  }

  if (loading) {
    return <div className="loading">Loading movie details...</div>
  }

  if (error || !movie) {
    return (
      <div className="error-container">
        <div className="error">{error || 'Movie not found'}</div>
        <button className="btn-primary" onClick={() => navigate('/')}>
          Back to Watchlist
        </button>
      </div>
    )
  }

  const reviews = Array.isArray(movie.reviews) ? movie.reviews : []

  return (
    <div className="movie-details-container">
      <button className="btn-back" onClick={() => navigate('/')}>
        ← Back to Watchlist
      </button>

      {showEditForm ? (
        <AddEditForm
          movie={movie}
          onClose={() => setShowEditForm(false)}
          onSave={() => {
            setShowEditForm(false)
            fetchMovie()
          }}
        />
      ) : (
        <>
          <div className="movie-details-header">
            <div
              className="movie-details-poster"
              style={{
                backgroundImage: movie.poster_url
                  ? `url(${movie.poster_url})`
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
              }}
            >
              {!movie.poster_url && (
                <div className="poster-placeholder-large">
                  {movie.title.charAt(0)}
                </div>
              )}
            </div>
            <div className="movie-details-info">
              <h1 className="movie-details-title">{movie.title}</h1>
              <div className="movie-rating-large">⭐ {movie.rating}/10</div>
              <p className="movie-description">{movie.description}</p>
              <div className="movie-actions-details">
                <button className="btn-primary" onClick={() => setShowEditForm(true)}>
                  Edit Movie
                </button>
                <button className="btn-delete" onClick={handleDelete}>
                  Delete Movie
                </button>
              </div>
            </div>
          </div>

          <div className="movie-details-content">
            <section className="movie-section">
              <h2>Plot Summary</h2>
              <p>{movie.plot || 'No plot summary available.'}</p>
            </section>

            <section className="movie-section">
              <h2>Cast</h2>
              <div className="actors-list">
                {movie.actors ? movie.actors.split(',').map((actor, idx) => (
                  <span key={idx} className="actor-tag">{actor.trim()}</span>
                )) : <p>No cast information available.</p>}
              </div>
            </section>

            <section className="movie-section">
              <h2>Reviews & Ulasan</h2>
              <div className="reviews-section">
                <div className="add-review">
                  <textarea
                    value={newReview}
                    onChange={(e) => setNewReview(e.target.value)}
                    placeholder="Write your review..."
                    rows="3"
                  />
                  <button className="btn-primary" onClick={handleAddReview}>
                    Add Review
                  </button>
                </div>
                <div className="reviews-list">
                  {reviews.length === 0 ? (
                    <p className="no-reviews">No reviews yet. Be the first to review!</p>
                  ) : (
                    reviews.map((review, idx) => (
                      <div key={idx} className="review-item">
                        <p>{review.text}</p>
                        <div className="review-meta">
                          <span>{new Date(review.date).toLocaleDateString()}</span>
                          <button
                            className="btn-delete-small"
                            onClick={() => handleDeleteReview(idx)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </section>
          </div>
        </>
      )}
    </div>
  )
}

export default MovieDetails

