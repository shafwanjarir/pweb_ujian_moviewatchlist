import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './../styles/App.css'

const API_URL = 'http://localhost/pweb_ujian_moviewatchlist/backend/api/movies.php'

function AddEditForm({ movie, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    plot: '',
    actors: '',
    rating: 0,
    poster_url: '',
    reviews: []
  })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (movie) {
      const reviews = Array.isArray(movie.reviews) ? movie.reviews : []
      setFormData({
        title: movie.title || '',
        description: movie.description || '',
        plot: movie.plot || '',
        actors: movie.actors || '',
        rating: movie.rating || 0,
        poster_url: movie.poster_url || '',
        reviews: reviews
      })
    } else {
      // Reset form when adding new movie
      setFormData({
        title: '',
        description: '',
        plot: '',
        actors: '',
        rating: 0,
        poster_url: '',
        reviews: []
      })
    }
  }, [movie])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'rating' ? parseFloat(value) || 0 : value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (movie) {
        // Update
        await axios.put(API_URL, { ...formData, id: movie.id })
      } else {
        // Create
        await axios.post(API_URL, formData)
      }
      onSave()
    } catch (err) {
      alert('Failed to save movie')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{movie ? 'Edit Movie' : 'Add New Movie'}</h2>
          <button className="btn-close" onClick={onClose}>×</button>
        </div>
        <form onSubmit={handleSubmit} className="movie-form">
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
            />
          </div>
          <div className="form-group">
            <label>Plot Summary</label>
            <textarea
              name="plot"
              value={formData.plot}
              onChange={handleChange}
              rows="4"
            />
          </div>
          <div className="form-group">
            <label>Actors (comma-separated)</label>
            <input
              type="text"
              name="actors"
              value={formData.actors}
              onChange={handleChange}
              placeholder="e.g., Actor 1, Actor 2, Actor 3"
            />
          </div>
          <div className="form-group">
            <label>Rating (0-10)</label>
            <input
              type="number"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              min="0"
              max="10"
              step="0.1"
            />
          </div>
          <div className="form-group">
            <label>Poster URL</label>
            <input
              type="url"
              name="poster_url"
              value={formData.poster_url}
              onChange={handleChange}
              placeholder="https://example.com/poster.jpg"
            />
          </div>
          <div className="form-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Saving...' : (movie ? 'Update' : 'Add')}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddEditForm

