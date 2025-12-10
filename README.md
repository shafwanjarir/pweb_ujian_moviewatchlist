# Movie Watchlist - CRUD Application

A full-stack movie watchlist application with PHP backend and React frontend.

## Tech Stack

- **Backend**: PHP 7.4+ with MySQL
- **Frontend**: React 18 with Vite
- **Database**: MySQL (via XAMPP)
- **Server**: Apache (via XAMPP)

## Prerequisites

- XAMPP installed and running
- Node.js 16+ and npm installed
- PHP 7.4+ (included with XAMPP)

## Setup Instructions

### 1. Database Setup

1. Start XAMPP and ensure Apache and MySQL are running
2. Open your browser and navigate to:
   ```
   http://localhost/pweb_moviewatchlist/backend/setup/create_database.php
   ```
3. This will create the `movie_watchlist` database and `movies` table

### 2. Backend Setup

1. Copy the `backend` folder to your XAMPP `htdocs` directory:
   ```
   C:\xampp\htdocs\pweb_moviewatchlist\backend\
   ```
2. Ensure the database credentials in `backend/api/config.php` match your XAMPP MySQL settings (default: root, no password)

### 3. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Update the API URL in the React components if needed:
   - Default: `http://localhost/pweb_moviewatchlist/backend/api/movies.php`
   - Edit in: `MovieList.jsx`, `MovieDetails.jsx`, `AddEditForm.jsx`

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Open your browser to:
   ```
   http://localhost:3000
   ```

## Project Structure

```
pweb_moviewatchlist/
├── backend/
│   ├── api/
│   │   ├── config.php          # Database configuration
│   │   └── movies.php          # CRUD API endpoints
│   └── setup/
│       └── create_database.php # Database setup script
├── frontend/
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── styles/            # CSS styles
│   │   └── App.jsx            # Main app component
│   └── package.json           # Node dependencies
└── README.md
```

## Features

- ✅ Create, Read, Update, Delete movies
- ✅ Movie details page with full information
- ✅ Search and filter movies
- ✅ Sort by title, rating, or date
- ✅ Toggle between poster and list view
- ✅ Add/edit reviews for movies
- ✅ Responsive, mobile-friendly design
- ✅ Cinematic theme inspired by Letterboxd/Netflix
- ✅ Secure PHP with prepared statements

## API Endpoints

- `GET /api/movies.php` - Get all movies
- `GET /api/movies.php?id={id}` - Get single movie
- `POST /api/movies.php` - Create new movie
- `PUT /api/movies.php` - Update movie
- `DELETE /api/movies.php` - Delete movie

## Database Schema

```sql
movies (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255),
  description TEXT,
  plot TEXT,
  actors TEXT,
  rating DECIMAL(3,1),
  reviews JSON,
  poster_url VARCHAR(500),
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

## Troubleshooting

### CORS Issues
If you encounter CORS errors, ensure the backend `config.php` has the correct CORS headers set.

### Database Connection
Verify MySQL is running in XAMPP and check credentials in `config.php`.

### API Not Found
Ensure the backend files are in the correct XAMPP htdocs path and Apache is running.

## Production Build

To build for production:

```bash
cd frontend
npm run build
```

The built files will be in `frontend/dist/` and can be served via Apache or any static file server.

## License

MIT

