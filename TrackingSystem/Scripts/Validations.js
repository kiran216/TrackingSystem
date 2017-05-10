$(document).ready(function () {
    var usertxt;
    $("#UserName").blur(function () {
        
        var CheckExpression = /^[a-zA-Z.]*$/;
        usertxt = $("#UserName").val();
        if ($("#UserName").val() == "") {
            alert("UserName Field should not be  empty");
            return false;
        }
        else if (!CheckExpression.test(usertxt)) {
            alert("Enter Valid name");
            return false;
        }
    });
    $("#EmailID").blur(function () {
        var CheckExpression = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        usertxt = $("#EmailID").val();
        if ($("#EmailID").val() == "") {
            alert(" EmailID Field should not be empty ");
            return false;
        }
        else if (!CheckExpression.test(usertxt)) {
            alert("Enter Valid EmailID");
            return false;
        }
    });
    $("#Password").blur(function () {
        var CheckExpression = /^((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{4,20})/;
        usertxt = $("#Password").val();
        if ($("#Password").val() == "") {
            alert(" Password Field should not be  empty");
            return false;
        }
        else if (!CheckExpression.test(usertxt)) {
            alert("Password should contain aleast one small case, one capital case, a number and a symbol and atmost 20 characters");
            return false;
        }
    });
    $("#MobileNumber").blur(function () {
        var CheckExpression = /^(\+\d{1,3}[- ]?)?[789]\d{9}$/;
        usertxt = $("#MobileNumber").val();
        if ($("MobileNumber").val() == "") {
            alert("MobileNumber Field should not be  empty");
            return false;
        }
        else if (!CheckExpression.test(usertxt)) {
            alert("Enter Valid MobileNumber");
            return false;
        }
    });
});






