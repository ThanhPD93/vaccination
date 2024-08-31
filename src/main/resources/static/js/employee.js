function search(page) {
    const query = document.getElementById('searchInput').value;
    const currentPageSize = parseInt(document.getElementById("dropdownMenuButton").innerHTML, 10);

    fetch(`/employee/getEmployeesBySearchWithPagination?searchInput=${encodeURIComponent(query)}&page=${page}&size=${currentPageSize}`)

        .then(response => response.json())
        .then(employees => {
            const tableBody = document.getElementById('employee-list-content');
            tableBody.innerHTML = '';

            employees.content.forEach(employee => {
                const row = document.createElement('tr');

                row.innerHTML = `
                    <td class="text-center"><input type="checkbox"></td>
                    <td>${employee.employeeId}</td>
                    <td>${employee.employeeName}</td>
                    <td>${employee.dateOfBirth}</td>
                    <td>${employee.gender}</td>
                    <td>${employee.phone}</td>
                    <td>${employee.address}</td>
                    <td class="text-center"><img src="${employee.image}" alt="image" style="height: 30px; width: 45px"></td>
                `;
                tableBody.appendChild(row);
            });
            updatePaginationControls(employees.number, employees.totalPages, currentPageSize, employees.totalElements);
        })
        .catch(error => console.error('Error fetching employee data:', error));
}

function findAllEmployeeWithPagination(page, pageSize) {
    fetch(`/employee/findAllWithPagination?page=${page}&size=${pageSize}`)
        .then(response => response.json()) // Page<Employee>
        // List<Employee>, employees.forEach
        // Page<Employee>, employees.content (return List<Employee>), employees.totalPages, employees.number
        .then(employees => {
            document.getElementById('employee-list-content').innerHTML = "";
            employees.content.forEach(employee => {
                document.getElementById("employee-list-content").innerHTML +=`
                    <tr>
                        <td class="text-center"><input type="checkbox"></td>
                        <td>${employee.employeeId}</td>
                        <td>${employee.employeeName}</td>
                        <td>${employee.dateOfBirth}</td>
                        <td>${employee.gender}</td>
                        <td>${employee.phone}</td>
                        <td>${employee.address}</td>
                        <td class="text-center">
                            <img src="${employee.image}" alt="image" style="height: 30px; width: 45px">
                        </td>
                    </tr>
                `;
            });
            updatePaginationControls(employees.number, employees.totalPages, pageSize, employees.totalElements);

        })
        .catch(error => console.error('Error fetching list of employees', error));
}

function updatePaginationControls(currentPage, totalPages, pageSize, totalElements) {
	// pagination comments(showing ... to ... of ...)
	document.getElementById("start-entry").innerHTML = currentPage === 0 ? 1 : currentPage * pageSize + 1;
	document.getElementById("end-entry").innerHTML = currentPage === totalPages - 1 ? totalElements : (currentPage + 1) * pageSize;
	document.getElementById("total-entries").innerHTML = totalElements;

	// pagination buttons
    const paginationContainer = document.getElementById("page-buttons");

    let pageButtons = '';
    if (currentPage > 0) {
        pageButtons += `<button onclick="findAllEmployeeWithPagination(${currentPage - 1}, ${pageSize})">&lt;&lt;</button>`;
    } else {
        pageButtons += `<button disabled>&lt;&lt;</button>`;
    }

    for (let i = 0; i < totalPages; i++) {
        if (i === currentPage) {
            pageButtons += `<button disabled>${i + 1}</button>`;
        } else {
            pageButtons += `<button onclick="findAllEmployeeWithPagination(${i},${pageSize})">${i + 1}</button>`;
        }
    }

    if (currentPage < totalPages - 1) {
        pageButtons += `<button onclick="findAllEmployeeWithPagination(${currentPage + 1},${pageSize})">&gt;&gt;</button>`;
    } else {
        pageButtons += `<button disabled>&gt;&gt;</button>`;
    }
    paginationContainer.innerHTML = pageButtons;
    document.getElementById("dropdownMenuButton").innerHTML = pageSize;
}
