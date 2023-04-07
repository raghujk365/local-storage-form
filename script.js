const inputForm = document.getElementById("input-form");
const dataTableBody = document.querySelector("#data-table tbody");
const filterSelect = document.getElementById("filter");

// Load saved data from local storage on page load
window.onload = () => {
  const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  savedData.forEach((item) => addRowToTable(item));
};

// Handle form submission
inputForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = inputForm.elements.name.value;
  const height = inputForm.elements.height.value;
  const weight = inputForm.elements.weight.value;
  const age = inputForm.elements.age.value;
  const data = { name, height, weight, age };
  addRowToTable(data);
  saveDataToLocalStorage(data);
  inputForm.reset();
});

// Add a new row to the table
function addRowToTable(data) {
  const newRow = dataTableBody.insertRow();
  newRow.insertCell().textContent = data.name;
  newRow.insertCell().textContent = data.height;
  newRow.insertCell().textContent = data.weight;
  newRow.insertCell().textContent = data.age;
  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";
  deleteButton.addEventListener("click", () => deleteRowFromTable(newRow));
  newRow.insertCell().appendChild(deleteButton);
}

// Delete a row from the table
function deleteRowFromTable(row) {
  row.remove();
  const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  const index = savedData.findIndex((item) => item.name === row.cells[0].textContent);
  savedData.splice(index, 1);
  localStorage.setItem("savedData", JSON.stringify(savedData));
}

// Save data to local storage
function saveDataToLocalStorage(data) {
  const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  savedData.push(data);
  localStorage.setItem("savedData", JSON.stringify(savedData));
}

// Handle filter select change
filterSelect.addEventListener("change", () => {
  const savedData = JSON.parse(localStorage.getItem("savedData")) || [];
  const selectedFilter = filterSelect.value;
  let sortedData = savedData;
  if (selectedFilter !== "all") {
    if (selectedFilter === "age" || selectedFilter === "weight") {
      sortedData = savedData.sort((a, b) => a[selectedFilter] - b[selectedFilter]);
    } else {
      sortedData = savedData.sort((a, b) => (a[selectedFilter] > b[selectedFilter] ? 1 : -1));
    }
  }
  dataTableBody.innerHTML = "";
  sortedData.forEach((item) => addRowToTable(item));
});
