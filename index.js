let users = [];
let currentpage = 1;
let itemsperpage = 10;
let totalpage =0
async function fetchdata() {
  try {
    const response = await fetch("https://dummyapi.online/api/users");
    const data = await response.json();
    users = data;
    console.log("Fetched Users:", users);

    rendertopage(currentpage);
  } catch (error) {
    console.log("Error fetching data:", error);
  }
}

function rendertopage(page) {
  const tableBody = document
    .getElementById("user_table")
    .querySelector("tbody");
  tableBody.innerHTML = "";

  const startindex = (page - 1) * itemsperpage;
  const endindex = startindex + itemsperpage;
  const pagination = users.slice(startindex, endindex);

  pagination.forEach((user) => {
    const row = document.createElement("tr");
    row.innerHTML = `<td>${user.id}</td>
                    <td>${user.name}</td>
                    <td>${user.username}</td>   
                    <td>${user.email}</td>
                    <td>${user.address.street}, ${user.address.city},${user.address.state},${user.address.zipcode}</td>`;
    tableBody.appendChild(row);
  });
  document.getElementById("current-page").innerHTML = currentpage;
  updatebtn()
}

function nextPage() {
     totalpage = Math.ceil(users.length / itemsperpage);
  if (currentpage < totalpage) {
    currentpage++;
  }
  rendertopage(currentpage);
}

function prevPage() {
  if (currentpage > 1) {
    currentpage--;
  }

  rendertopage(currentpage);
}

function updatebtn(){
    document.getElementById("prev-btn").disabled = currentpage === 1;
    document.getElementById("next-btn").disabled = currentpage === totalpage
}
document.getElementById("next-btn").addEventListener("click", () => {
  nextPage();
});
document.getElementById("prev-btn").addEventListener("click", () => {
  prevPage();
});

fetchdata();
