import React from 'react'
import './../styles/App.css'

function Toolbar({ searchTerm, onSearchChange, sortBy, onSortChange, viewMode, onViewModeChange, onAddClick }) {
  return (
    <div className="toolbar">
      <div className="toolbar-left">
        <input
          type="text"
          className="search-input"
          placeholder="Search movies..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="toolbar-right">
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="title-asc">Title (A-Z)</option>
          <option value="title-desc">Title (Z-A)</option>
          <option value="rating-high">Rating (High-Low)</option>
          <option value="rating-low">Rating (Low-High)</option>
        </select>
        <div className="view-mode-toggle">
          <button
            className={`view-mode-btn ${viewMode === 'poster' ? 'active' : ''}`}
            onClick={() => onViewModeChange('poster')}
            title="Poster Mode"
          >
            🎬
          </button>
          <button
            className={`view-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => onViewModeChange('list')}
            title="List Mode"
          >
            📋
          </button>
        </div>
        <button className="btn-primary" onClick={onAddClick}>
          + Add Movie
        </button>
      </div>
    </div>
  )
}

export default Toolbar

