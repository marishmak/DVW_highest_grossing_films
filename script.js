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
        let cellA = rowA.cells[columnIndex - 1].textContent.trim();
        let cellB = rowB.cells[columnIndex - 1].textContent.trim();

        // Handle Release Year (numeric sort)
        if (columnIndex === 2) { // Column index 2 corresponds to "Release Year"
            return parseInt(cellA, 10) - parseInt(cellB, 10);
        }

        // Handle Box Office Revenue (numeric sort)
        if (columnIndex === 4) { // Column index 4 corresponds to "Box Office Revenue"
            // Remove non-numeric characters (e.g., "$", ",") and convert to numbers
            const revenueA = parseFloat(cellA.replace(/[^0-9.-]+/g, ""));
            const revenueB = parseFloat(cellB.replace(/[^0-9.-]+/g, ""));
            return revenueA - revenueB;
        }

        // Default to string comparison for other columns
        return cellA.localeCompare(cellB);
    });

    // Append sorted rows back to the table
    const tbody = table.tBodies[0];
    rows.forEach(row => tbody.appendChild(row));
}
