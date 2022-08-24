$(document).ready(function() {
    // gán các sự kiện cho các element:
    initEvents();
})

/**
 * Tạo các sự kiện
 * Author: NVMANH ()
 */
function initEvents() {
    // Gán sự kiện click cho button thêm mới nhân viên:
    var btnAdd = document.getElementById("btnAdd");

    btnAdd.addEventListener("click", function() {
        // Hiển thị form nhập thông tin chi tin chi tiết:
        document.getElementById("dlgEmployeeDetail").style.display = "block";
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

function checkEmailFormat(email) {
    count++;
    console.log(count);
    const re =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    return email.match(re);
}