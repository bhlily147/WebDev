function load_books(path, tableId) {
    fetch(path)
        .then(response => response.json())
        .then(data => {
            const ma = document.getElementById("ma");
            const ten = document.getElementById("ten");
            const chiTiet = document.getElementById("chiTiet");

            ma.value = data.Ma;
            ten.value = data.Ten;

            function capNhat() {
                chiTiet.textContent = ma.value + " " + ten.value;
            }

            ma.addEventListener("input", capNhat);
            ten.addEventListener("input", capNhat);
            capNhat();

            data.Sachs.sort((a, b) => a.Trang - b.Trang);

            const tbody = document.querySelector("#" + tableId + " tbody");

            data.Sachs.forEach(sach => {
                const tr = document.createElement("tr");
                tr.innerHTML = `
                    <td>${sach.Ma}</td>
                    <td>${sach.Ten}</td>
                    <td>${sach.Trang}</td>
                `;
                tbody.appendChild(tr);
            });
        });
}