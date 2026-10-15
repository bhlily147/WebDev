/**
 * Đây là hàm load_employees,
 * dùng để load dữ liệu từ dataset vào table hiển thị dataset
 * @param {*} datasets - dữ liệu dataset
 * @param {*} tbemployees - id của table hiển thị dataset
 */
function load_employees(datasets, tbemployees) {
    tbemployees = document.getElementById(tbemployees);
    var xhr = new XMLHttpRequest();
    xhr.open("GET", datasets, true);
    xhr.send();
    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var xmlDoc = xhr.responseXML;
            var employees = xmlDoc.getElementsByTagName("employee");
            // Lấy droplist
            var cbtitle = document.getElementById("cbtitle");
            // Xóa dữ liệu cũ trong droplist
            cbtitle.innerHTML = "";
            // Tạo option mặc định
            var option = document.createElement("option");
            option.value = "";
            option.innerHTML = "Chọn Title";
            cbtitle.appendChild(option);
            // Gom nhóm title không trùng nhau
            var titles = [];
            for (var i = 0; i < employees.length; i++) {
                var employee = employees[i];
                var title = employee.getAttribute("title");
                if (!titles.includes(title)) {
                    titles.push(title);
                    var option = document.createElement("option");
                    option.value = title;
                    option.innerHTML = title;
                    cbtitle.appendChild(option);
                }
            }
            // Khi chọn title, hiển thị danh sách employee tương ứng
            cbtitle.onchange = function () {
                tbemployees.innerHTML = "";
                var titleSelected = cbtitle.value;
                for (var i = 0; i < employees.length; i++) {
                    var employee = employees[i];
                    var title = employee.getAttribute("title");
                    if (title == titleSelected) {
                        var id = employee.getAttribute("id");
                        var name = employee.getElementsByTagName("name")[0].childNodes[0].nodeValue;
                        var phone = employee.getElementsByTagName("phone")[0].childNodes[0].nodeValue;
                        var tr = document.createElement("tr");
                        var tdid = document.createElement("td");
                        tdid.innerHTML = id;
                        var tdname = document.createElement("td");
                        tdname.innerHTML = name;
                        var tdphone = document.createElement("td");
                        tdphone.innerHTML = phone;
                        tr.appendChild(tdid);
                        tr.appendChild(tdname);
                        tr.appendChild(tdphone);
                        tbemployees.appendChild(tr);
                    }
                }
            };
        }
    };
}