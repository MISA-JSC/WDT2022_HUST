$(document).ready(function() {
    // gán các sự kiện cho các element:
    initEvents();

    // Load dữ liệu:

    console.log("START!!!!");
    loadData();
    console.log("Finish!!!!");
})

var employeeId = null;
var formMode = "add";
/**
 * Thực hiện load dữ liệu lên table
 * Author: NVMANH (26/08/2022)
 */
function loadData() {
    // Gọi api thực hiện lấy dữ liệu:
    console.log("CALL AJAX !!!!");
    $.ajax({
        type: "GET",
        async: false,
        url: "https://cukcuk.manhnv.net/api/v1/Employees",
        success: function(res) {
            console.log("GET DATA DONE !!!!");
            $("table#tbEmployeeList tbody").empty();
            // Xử lý dữ liệu từng đối tượng:
            var sort = 1;
            let ths = $("table#tbEmployeeList thead th");
            debugger
            for (const emp of res) {
                // duyệt từng cột trong tiêu đề:
                var trElement = $('<tr></tr>');
                for (const th of ths) {
                    debugger
                    // Lấy ra propValue tương ứng với các cột:
                    const propValue = $(th).attr("propValue");

                    const format = $(th).attr("format");
                    // Lấy giá trị tương ứng với tên của propValue trong đối tượng:
                    let value = null;
                    if (propValue == "Sort")
                        value = sort
                    else
                        value = emp[propValue];
                    let classAlign = "";
                    switch (format) {
                        case "date":
                            value = formatDate(value);
                            classAlign = "text-align--center";
                            break;
                        case "money":
                            value = Math.round(Math.random(100) * 1000000);
                            value = formatMoney(value);
                            classAlign = "text-align--right";
                            break;
                        default:
                            break;
                    }

                    // Tạo thHTML:
                    let thHTML = `<td class='${classAlign}'>${value||""}</td>`;

                    // Đẩy vào trHMTL:
                    trElement.append(thHTML);
                }
                sort++;
                $(trElement).data("id", emp.EmployeeId);
                $(trElement).data("entity", emp);
                $("table#tbEmployeeList tbody").append(trElement)
                    // // Lấy các thông tin cần thiết:
                    // const employeeCode = emp.EmployeeCode;
                    // const fullName = emp.FullName;

                // // Thông tin ngày sinh:
                // let dateOfBirth = emp.DateOfBirth;
                // dateOfBirth = formatDate(dateOfBirth);

                // // Định dạng lại hiển thị ngày sinh:
                // const genderName = emp.GenderName;
                // const email = emp.Email;
                // const phoneNumber = emp.PhoneNumber;
                // const departmentName = emp.DepartmentName;
                // const positionName = emp.PositionName;
                // const identityNumber = emp.IdentityNumber;
                // let identityDate = emp.IdentityDate;
                // identityDate = formatDate(identityDate);
                // const identityPlace = emp.IdentityPlace;
                // // Tiền lương:
                // let salary = Math.round(Math.random(100) * 1000000);
                // // Định dạng hiển thị tiền:
                // salary = formatMoney(salary);

                // let workStatus = emp.WorkStatus;
                // switch (workStatus) {
                //     case 1:
                //         workStatus = "Đang làm việc";
                //         break;
                //     default:
                //         workStatus = "";
                //         break;
                // }
                // // Build thành các tr HTML tương ứng:
                // let trHTML = `<tr>
                //                 <td>${sort}</td>
                //                 <td>${employeeCode||""}</td>
                //                 <td>${fullName||""}</td>
                //                 <td class="text-align--center">${dateOfBirth||""}</td>
                //                 <td>${genderName||""}</td>
                //                 <td>${phoneNumber||""}</td>
                //                 <td>${email||""}</td>
                //                 <td>${identityNumber||""}</td>
                //                 <td>${identityDate||""}</td>
                //                 <td>${identityPlace||""}</td>
                //                 <td>${positionName||""}</td>
                //                 <td>${departmentName||""}</td>
                //                 <td class="text-align--right">${salary||""}</td>
                //                 <td>${workStatus||""}</td>
                //             </tr>`;
                // sort++;

                // // Thực hiện append các tr HTML vào tbody của table:
                // $("table#tbEmployeeList tbody").append(trHTML);
            }
        },
        error: function(res) {
            console.log(res);
        }
    });
}

/**
 * Định dạng hiển thị ngày tháng năm
 * @param {Date} date 
 * @returns 
 * Author: NVMANH (26/08/2022)
 */
function formatDate(date) {
    try {
        debugger
        if (date) {
            date = new Date(date);

            // Lấy ra ngày:
            dateValue = date.getDate();
            dateValue = dateValue < 10 ? `0${dateValue}` : dateValue;

            // lấy ra tháng:
            let month = date.getMonth() + 1;
            month = month < 10 ? `0${month}` : month;

            // lấy ra năm:
            let year = date.getFullYear();

            return `${dateValue}/${month}/${year}`;
        } else {
            return "";
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Định dạng hiển thị tiền VND
 * @param {Number} money 
 */
function formatMoney(money) {
    try {
        money = new Intl.NumberFormat('vn-VI', { style: 'currency', currency: 'VND' }).format(money);
        return money;
    } catch (error) {
        console.log(error);
    }
}
/**
 * Tạo các sự kiện
 * Author: NVMANH ()
 */
function initEvents() {
    $("#btnDelete").click(function() {
        $("#dlgDialog3").show();
    });

    $("#btnOk").click(function() {
        // Gọi api thực hiện xóa:
        debugger
        $.ajax({
            type: "DELETE",
            url: "https://cukcuk.manhnv.net/api/v1/employees/" + employeeId,
            success: function(response) {
                $("#dlgDialog3").hide();
                // Load lại dữ liệu:
                loadData();
            }
        });
    });
    $("#btnSave").click(saveData);

    $(document).on('dblclick', 'table#tbEmployeeList tbody tr', function() {
        formMode = "edit";
        // Hiển thị form:
        $("#dlgEmployeeDetail").show();

        // Focus vào ô input đầu tiên:
        $("#dlgEmployeeDetail input")[0].focus();

        // Binding dữ liệu tương ứng với bản ghi vừa chọn:
        let data = $(this).data('entity');
        employeeId = $(this).data('id');

        // Duyệt tất cả các input:
        let inputs = $("#dlgEmployeeDetail input, #dlgEmployeeDetail select, #dlgEmployeeDetail textarea");
        debugger
        for (const input of inputs) {
            // Đọc thông tin propValue:
            const propValue = $(input).attr("propValue");
            if (propValue) {
                let value = data[propValue];
                input.value = value;
            }
        }
    });

    $(document).on('click', 'table#tbEmployeeList tbody tr', function() {
        // Xóa tất cả các trạng thái được chọn của các dòng dữ liệu khác:
        $(this).siblings().removeClass('row-selected');
        // In đậm dòng được chọn:
        this.classList.add("row-selected");
        employeeId = $(this).data('id');
    });
    // Gán sự kiện click cho button thêm mới nhân viên:
    var btnAdd = document.getElementById("btnAdd");

    btnAdd.addEventListener("click", function() {
        formMode = "add";
        // Hiển thị form nhập thông tin chi tin chi tiết:
        document.getElementById("dlgEmployeeDetail").style.display = "block";
        $('input').val(null);
        $('textarea').val(null);
        // Lấy mã nhân viên mới:
        $.ajax({
            url: "https://cukcuk.manhnv.net/api/v1/Employees/NewEmployeeCode",
            method: "GET",
            success: function(newEmployeeCode) {
                $("#txtEmployeeCode").val(newEmployeeCode);
                $("#txtEmployeeCode").focus();
            }
        });
    })

    $("#btnAdd").click(function() {
        // Hiển thị form
        $("#dlgEmployeeDetail").show();

        // Focus vào ô nhập liệu đầu tiên:
        debugger
        $('#dlgEmployeeDetail input')[0].focus();
    })

    $(".dialog__button--close").click(function() {
        debugger;
        // Ẩn dialog tương ứng với button close hiện tại:
        // this.parentElement.parentElement.style.display = "none";
        $(this).parents(".dialog").hide();
    })


    // Nhấn đúp chuột vào 1 dòng dữ liệu (tr) thì hiển thị form chi tiết thông tin nhân viên:

    // Nhấn button xóa thì hiển thị cảnh báo xóa.

    // Nhấn button Refresh thì load lại dữ liệu:

    // Thực hiện validate dữ liệu khi nhập liệu vào các ô input bắt buộc nhập:



    // $("#txtEmployeeCode").blur(function(e) {
    //     var value = document.getElementById("txtEmployeeCode").value;
    //     debugger
    //     if (value == '') {
    //         $("#txtEmployeeCode").addClass("input--error");
    //         $("#txtEmployeeCode").attr('title', "Thông tin này không được phép để trống");
    //     } else {
    //         $("#txtEmployeeCode").removeClass("input--error");
    //         $("#txtEmployeeCode").removeAttr('title');
    //     }
    //     console.log("KEY UP");
    // });

    // $("#txtFullName").blur(function(e) {
    //     var value = document.getElementById("txtFullName").value;
    //     debugger
    //     if (value == '') {
    //         $("#txtFullName").addClass("input--error");
    //         $("#txtFullName").attr('title', "Thông tin này không được phép để trống");
    //     } else {
    //         $("#txtFullName").removeClass("input--error");
    //         $("#txtFullName").removeAttr('title');
    //     }
    //     console.log("KEY UP");
    // });

    $('input[nvmanh]').blur(function() {
        // Lấy ra value:
        var value = this.value;
        // Kiểm tra value:
        if (!value) {
            // ĐẶt trạng thái tương ứng:
            // Nếu value rỗng hoặc null thì hiển thị trạng thái lỗi:
            $(this).addClass("input--error");
            $(this).attr('title', "Thông tin này không được phép để trống");
        } else {
            // Nếu có value thì bỏ cảnh báo lỗi:
            $(this).removeClass("input--error");
            $(this).removeAttr('title');
        }
    })

    $('input[type=email]').blur(function() {
        // Kiểm tra email:
        var email = this.value;
        var isEmail = checkEmailFormat(email);
        if (!isEmail) {
            console.log("Email KHÔNG đúng định dạng");
            $(this).addClass("input--error");
            $(this).attr('title', "Email không đúng định dạng.");
        } else {
            console.log("Email đúng định dạng");
            $(this).removeClass("input--error");
            $(this).removeAttr('title', "Email không đúng định dạng.");
        }
    })


    //keydown, keyup, keypress
}
var count = 0;

function saveData() {
    // Thu thập dữ liệu:
    let inputs = $("#dlgEmployeeDetail input, #dlgEmployeeDetail select, #dlgEmployeeDetail textarea");
    debugger
    var employee = {};
    console.log("Đối tượng Employee trước khi build");
    console.log(employee);
    // build object:
    for (const input of inputs) {
        // Đọc thông tin propValue:
        const propValue = $(input).attr("propValue");
        // Lấy ra value:
        if (propValue) {
            let value = input.value;
            employee[propValue] = value;
        }
    }
    console.log("Đối tượng Employee trước khi build");
    console.log(employee);
    // Gọi api thực hiện cất dữ liệu:
    if (formMode == "edit") {
        $.ajax({
            type: "PUT",
            url: "https://cukcuk.manhnv.net/api/v1/Employees/" + employeeId,
            data: JSON.stringify(employee),
            dataType: "json",
            contentType: "application/json",
            success: function(response) {
                alert("Sửa dữ liệu thành công!");
                // load lại dữ liệu:
                loadData();
                // Ẩn form chi tiết:
                $("#dlgEmployeeDetail").hide();

            }
        });
    } else {
        $.ajax({
            type: "POST",
            url: "https://cukcuk.manhnv.net/api/v1/Employees",
            data: JSON.stringify(employee),
            dataType: "json",
            contentType: "application/json",
            success: function(response) {
                alert("Thêm mới dữ liệu thành công!");
                // load lại dữ liệu:
                loadData();
                // Ẩn form chi tiết:
                $("#dlgEmployeeDetail").hide();

            }
        });
    }


}

function checkEmailFormat(email) {
    count++;
    console.log(count);
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return email.match(re);
}

// Đối tượng trong javascript
var obj_JS = {
    EmployeeCode: "NV001",
    FullName: "Nguyễn Văn Mạnh",
    DateOfBirth: new Date(),
    getName: function() {

    },
    Address: null,
}

// JSON Object:
var obj_JSON = {
    "EmployeeCode": "NV001",
    "FullName": "Nguyễn Văn Mạnh",
    "DateOfBirth": "2020-10-10",
    "Address": null
}

//1. Tên của property phải nằm trong cặp ký tự ""
//2. Không được chứa function
//3. Không được phép có dấu , ở property cuối cùng
//4. Không được nhận value là undefined

// JSON String
// Là một chuỗi nhưng có quy tắc: 
// VD: var jsonString = `{"EmployeeCode":"NV0001","FullName":"Nguyễn Văn Mạnh","DateOfBirth": null}`