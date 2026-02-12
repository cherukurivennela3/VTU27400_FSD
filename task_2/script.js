const students = [
    { name: "Anita", dept: "CSE", date: "2023-07-12" },
    { name: "Rahul", dept: "ECE", date: "2022-05-20" },
    { name: "Priya", dept: "CSE", date: "2024-01-15" },
    { name: "Karthik", dept: "MECH", date: "2021-09-10" },
    { name: "Sneha", dept: "ECE", date: "2023-03-18" }
];

let filteredData = [...students];

const tableBody = document.querySelector("#studentTable tbody");
const deptFilter = document.getElementById("departmentFilter");
const sortNameBtn = document.getElementById("sortName");
const sortDateBtn = document.getElementById("sortDate");

function displayData(data) {
    tableBody.innerHTML = "";

    data.forEach(student => {
        const row = `<tr>
            <td>${student.name}</td>
            <td>${student.dept}</td>
            <td>${student.date}</td>
        </tr>`;
        tableBody.innerHTML += row;
    });

    updateCounts(data);
}

function sortByName() {
    filteredData.sort((a, b) => a.name.localeCompare(b.name));
    displayData(filteredData);
}

function sortByDate() {
    filteredData.sort((a, b) => new Date(a.date) - new Date(b.date));
    displayData(filteredData);
}

function filterData() {
    const dept = deptFilter.value;

    if (dept === "All") {
        filteredData = [...students];
    } else {
        filteredData = students.filter(s => s.dept === dept);
    }

    displayData(filteredData);
}

function updateCounts(data) {
    const counts = {};
    data.forEach(student => {
        counts[student.dept] = (counts[student.dept] || 0) + 1;
    });

    const list = document.getElementById("deptCounts");
    list.innerHTML = "";

    for (let dept in counts) {
        list.innerHTML += ⁠ <li>${dept}: ${counts[dept]}</li> ⁠;
    }
}

// Event Listeners
deptFilter.addEventListener("change", filterData);
sortNameBtn.addEventListener("click", sortByName);
sortDateBtn.addEventListener("click", sortByDate);

// Initial Load
displayData(students);
