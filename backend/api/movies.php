<?php
require_once 'config.php';

$method = $_SERVER['REQUEST_METHOD'];
$conn = getConnection();

// Helper function to process movie data (decode JSON reviews)
function processMovieData($row) {
    if (isset($row['reviews']) && $row['reviews'] !== null) {
        if (is_string($row['reviews'])) {
            $decoded = json_decode($row['reviews'], true);
            $row['reviews'] = $decoded !== null ? $decoded : [];
        } elseif (!is_array($row['reviews'])) {
            $row['reviews'] = [];
        }
    } else {
        $row['reviews'] = [];
    }
    return $row;
}

switch ($method) {
    case 'GET':
        // Get all movies or single movie
        if (isset($_GET['id'])) {
            $id = intval($_GET['id']);
            $stmt = $conn->prepare("SELECT * FROM movies WHERE id = ?");
            $stmt->bind_param("i", $id);
            $stmt->execute();
            $result = $stmt->get_result();
            
            if ($result->num_rows > 0) {
                $movie = $result->fetch_assoc();
                echo json_encode(processMovieData($movie));
            } else {
                http_response_code(404);
                echo json_encode(['error' => 'Movie not found']);
            }
            $stmt->close();
        } else {
            $result = $conn->query("SELECT * FROM movies ORDER BY id DESC");
            $movies = [];
            while ($row = $result->fetch_assoc()) {
                $movies[] = processMovieData($row);
            }
            echo json_encode($movies);
        }
        break;
        
    case 'POST':
        // Add new movie
        $data = json_decode(file_get_contents('php://input'), true);
        
        $title = $data['title'] ?? '';
        $description = $data['description'] ?? '';
        $plot = $data['plot'] ?? '';
        $actors = $data['actors'] ?? '';
        $rating = floatval($data['rating'] ?? 0);
        $reviews = json_encode($data['reviews'] ?? []);
        $poster_url = $data['poster_url'] ?? '';
        
        $stmt = $conn->prepare("INSERT INTO movies (title, description, plot, actors, rating, reviews, poster_url) VALUES (?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssdss", $title, $description, $plot, $actors, $rating, $reviews, $poster_url);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'id' => $conn->insert_id]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to add movie']);
        }
        $stmt->close();
        break;
        
    case 'PUT':
        // Update movie
        $data = json_decode(file_get_contents('php://input'), true);
        $id = intval($data['id']);
        
        $title = $data['title'] ?? '';
        $description = $data['description'] ?? '';
        $plot = $data['plot'] ?? '';
        $actors = $data['actors'] ?? '';
        $rating = floatval($data['rating'] ?? 0);
        $reviews = json_encode($data['reviews'] ?? []);
        $poster_url = $data['poster_url'] ?? '';
        
        $stmt = $conn->prepare("UPDATE movies SET title=?, description=?, plot=?, actors=?, rating=?, reviews=?, poster_url=? WHERE id=?");
        $stmt->bind_param("ssssdssi", $title, $description, $plot, $actors, $rating, $reviews, $poster_url, $id);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to update movie']);
        }
        $stmt->close();
        break;
        
    case 'DELETE':
        // Delete movie
        $data = json_decode(file_get_contents('php://input'), true);
        $id = intval($data['id']);
        
        $stmt = $conn->prepare("DELETE FROM movies WHERE id = ?");
        $stmt->bind_param("i", $id);
        
        if ($stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to delete movie']);
        }
        $stmt->close();
        break;
        
    default:
        http_response_code(405);
        echo json_encode(['error' => 'Method not allowed']);
}

$conn->close();
?>

