const SUPABASE_URL = 'https://kvshriqhqfmpnwzbcbie.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt2c2hyaXFocWZtcG53emJjYmllIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE4ODg3NTksImV4cCI6MjA4NzQ2NDc1OX0.rWPXA7T9EXzKV_M91ctgqUOO5oLHDLqsI4Ak9K1WKMk';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

const itemsPerPage = 8;
let currentPage = 1;
let currentFilter = 'all';
let currentSearch = '';
let allAlbums = [];

async function loadAlbums() {
    try {
        console.log('Loading albums...');
        
        const { data, error } = await supabase
            .from('albums')
            .select('*')
            .order('title', { ascending: true });

        console.log('Data:', data);
        console.log('Error:', error);

        if (error) throw error;
        
        if (!data || data.length === 0) {
            document.getElementById('albumsGrid').innerHTML = `
                <div class="no-results">
                    <h3>No albums found</h3>
                    <p>Table is empty - add albums in Supabase</p>
                </div>
            `;
            return;
        }
        
        allAlbums = data;
        displayAlbums(filterAlbums());
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('albumsGrid').innerHTML = `
            <div class="no-results">
                <h3>Error</h3>
                <p>${error.message}</p>
            </div>
        `;
    }
}

function displayAlbums(albumsToDisplay) {
    const grid = document.getElementById('albumsGrid');
    grid.innerHTML = '';

    if (albumsToDisplay.length === 0) {
        grid.innerHTML = `
            <div class="no-results">
                <h3>No albums found</h3>
                <p>Try adjusting your search or filter</p>
            </div>
        `;
        return;
    }

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedAlbums = albumsToDisplay.slice(startIndex, endIndex);

    paginatedAlbums.forEach(album => {
        const card = document.createElement('div');
        card.className = 'album-card';
        card.innerHTML = `
            <img src="${album.cover}" alt="${album.title}">
            <div class="album-info">
                <h3 class="album-title">${album.title}</h3>
                <p class="album-artist">${album.artist}</p>
                <span class="album-genre">${album.genre}</span>
            </div>
        `;
        grid.appendChild(card);
    });

    updatePagination(albumsToDisplay.length);
}

function filterAlbums() {
    let filtered = [...allAlbums];

    if (currentFilter !== 'all') {
        filtered = filtered.filter(album => album.genre === currentFilter);
    }

    if (currentSearch.trim() !== '') {
        const searchTerm = currentSearch.toLowerCase();
        filtered = filtered.filter(album => 
            album.title.toLowerCase().includes(searchTerm) ||
            album.artist.toLowerCase().includes(searchTerm) ||
            album.genre.toLowerCase().includes(searchTerm)
        );
    }

    return filtered;
}

function updatePagination(totalItems) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const pageInfo = document.getElementById('pageInfo');

    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages || totalPages === 0;
    pageInfo.textContent = `Page ${currentPage} of ${totalPages || 1}`;
}

function setupEventListeners() {
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    searchInput.addEventListener('input', (e) => {
        currentSearch = e.target.value;
        currentPage = 1;
        displayAlbums(filterAlbums());
    });

    searchBtn.addEventListener('click', () => {
        currentSearch = searchInput.value;
        currentPage = 1;
        displayAlbums(filterAlbums());
    });

    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            currentSearch = e.target.value;
            currentPage = 1;
            displayAlbums(filterAlbums());
        }
    });

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            currentPage = 1;
            displayAlbums(filterAlbums());
        });
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            displayAlbums(filterAlbums());
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filterAlbums().length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            displayAlbums(filterAlbums());
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    loadAlbums();
    setupEventListeners();
});