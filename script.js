// Load JSON data and populate the table
document.addEventListener('DOMContentLoaded', function () {
    fetch('highest_grossing_films_export.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector('#filmTable tbody');
            data.forEach(film => {
                const row = document.createElement('tr');

                // Create cells for each column
                const titleCell = document.createElement('td');
                titleCell.textContent = film['Film Title'];
                row.appendChild(titleCell);

                const yearCell = document.createElement('td');
                yearCell.textContent = film['Release Year'];
                row.appendChild(yearCell);

                const directorCell = document.createElement('td');
                directorCell.textContent = film['Director(s)'].join(', ');
                row.appendChild(directorCell);

                const revenueCell = document.createElement('td');
                revenueCell.textContent = film['Box Office Revenue'];
                row.appendChild(revenueCell);

                const countryCell = document.createElement('td');
                countryCell.textContent = film['Country of Origin'];
                row.appendChild(countryCell);

                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error('Error loading JSON:', error));
});

// Filter table based on search input
function filterTable() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#filmTable tbody tr');

    rows.forEach(row => {
        const title = row.cells[0].textContent.toLowerCase();
        if (title.includes(input)) {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });
}

// Sort table by column index (1-based)
function sortTable(columnIndex) {
    const table = document.getElementById('filmTable');
    const rows = Array.from(table.rows).slice(1); // Exclude header row

    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex - 1].textContent;
        const cellB = rowB.cells[columnIndex - 1].textContent;

        if (!isNaN(cellA) && !isNaN(cellB)) {
            return cellA - cellB; // Numeric sort
        }
        return cellA.localeCompare(cellB); // String sort
    });

    // Append sorted rows back to the table
    const tbody = table.tBodies[0];
    rows.forEach(row => tbody.appendChild(row));
}