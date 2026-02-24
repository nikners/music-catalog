-- Create albums table
CREATE TABLE albums (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    genre TEXT NOT NULL,
    year INTEGER,
    cover TEXT
);

-- Enable Row Level Security
ALTER TABLE albums ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Allow public read" ON albums
    FOR SELECT
    TO public
    USING (true);

-- Insert sample albums
INSERT INTO albums (title, artist, genre, year, cover) VALUES
('Thriller', 'Michael Jackson', 'pop', 1982, 'https://via.placeholder.com/300/667eea/ffffff?text=Thriller'),
('Back in Black', 'AC/DC', 'rock', 1980, 'https://via.placeholder.com/300/764ba2/ffffff?text=Back+in+Black'),
('The Dark Side of the Moon', 'Pink Floyd', 'rock', 1973, 'https://via.placeholder.com/300/f093fb/ffffff?text=Dark+Side'),
('Kind of Blue', 'Miles Davis', 'jazz', 1959, 'https://via.placeholder.com/300/f5576c/ffffff?text=Kind+of+Blue'),
('The Four Seasons', 'Antonio Vivaldi', 'classical', 1725, 'https://via.placeholder.com/300/4facfe/ffffff?text=Four+Seasons'),
('Bad', 'Michael Jackson', 'pop', 1987, 'https://via.placeholder.com/300/667eea/ffffff?text=Bad'),
('Stairway to Heaven', 'Led Zeppelin', 'rock', 1971, 'https://via.placeholder.com/300/764ba2/ffffff?text=Stairway'),
('A Love Supreme', 'John Coltrane', 'jazz', 1965, 'https://via.placeholder.com/300/f093fb/ffffff?text=A+Love+Supreme'),
('Symphony No. 5', 'Beethoven', 'classical', 1808, 'https://via.placeholder.com/300/f5576c/ffffff?text=Symphony+5'),
('Like a Virgin', 'Madonna', 'pop', 1984, 'https://via.placeholder.com/300/667eea/ffffff?text=Like+a+Virgin'),
('Hotel California', 'Eagles', 'rock', 1976, 'https://via.placeholder.com/300/764ba2/ffffff?text=Hotel+California'),
('Take Five', 'Dave Brubeck', 'jazz', 1959, 'https://via.placeholder.com/300/f093fb/ffffff?text=Take+Five'),
('The Planets', 'Gustav Holst', 'classical', 1918, 'https://via.placeholder.com/300/f5576c/ffffff?text=The+Planets'),
('Purple Rain', 'Prince', 'pop', 1984, 'https://via.placeholder.com/300/667eea/ffffff?text=Purple+Rain'),
('Born to Run', 'Bruce Springsteen', 'rock', 1975, 'https://via.placeholder.com/300/764ba2/ffffff?text=Born+to+Run'),
('Blue Train', 'John Coltrane', 'jazz', 1957, 'https://via.placeholder.com/300/f093fb/ffffff?text=Blue+Train'),
('Clair de Lune', 'Claude Debussy', 'classical', 1905, 'https://via.placeholder.com/300/f5576c/ffffff?text=Clair+de+Lune'),
('Billie Jean', 'Michael Jackson', 'pop', 1983, 'https://via.placeholder.com/300/667eea/ffffff?text=Billie+Jean'),
('Led Zeppelin IV', 'Led Zeppelin', 'rock', 1971, 'https://via.placeholder.com/300/764ba2/ffffff?text=Led+Zeppelin+IV'),
('So What', 'Miles Davis', 'jazz', 1959, 'https://via.placeholder.com/300/f093fb/ffffff?text=So+What'),
('Ride of the Valkyries', 'Richard Wagner', 'classical', 1856, 'https://via.placeholder.com/300/f5576c/ffffff?text=Valkyries'),
('True Blue', 'Madonna', 'pop', 1986, 'https://via.placeholder.com/300/667eea/ffffff?text=True+Blue'),
('Appetite for Destruction', 'Guns N'' Roses', 'rock', 1987, 'https://via.placeholder.com/300/764ba2/ffffff?text=Appetite'),
('Time Out', 'The Dave Brubeck Quartet', 'jazz', 1959, 'https://via.placeholder.com/300/f093fb/ffffff?text=Time+Out');