var map;
var lat;
var lon;
var circle;
var marker;
var name;
var cordinates;
var position=0;
$(function () {

    setScreen(false);

    // Declare a proxy to reference the hub. 
    var chat = $.connection.chatHub;

    registerClientMethods(chat);

    // Start Hub
    $.connection.hub.start().done(function () {

        registerEvents(chat)

    });

});
function mapFunction(name) {
    setInterval(function () {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success);
        } else {
            alert("Geo Location is not supported on your current browser!");
        }

        function success(position) {
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            var city = position.coords.locality;

        }
        AddMarker(lat, lon,name);


    }, 5000);
    fencing(lat, lon);
}
function fencing(lat, lon) {
    map = new GMaps({
        el: '#map_canvas',
        lat: 12.830109,
        lng: 80.223332,
        zoom:9,
    });
    circle = map.drawCircle({
        lat: 12.830109,
        lng: 80.223332,
        radius: 1500,
        strokeColor: '#432070',
        strokeOpacity: 1,
        strokeWeight: 3,
        fillColor: '#432070',
        fillOpacity: 0.6
    });
}
function AddMarker(lat, lon,name) {
    map.removeMarkers();
    map.addMarker({
        lat: lat,
        title: name,
        lng: lon,
        draggable: true,
        fences: [circle],

        infoWindow: {
            content: "<b>" + name + "</b><br/> Latitude:" + lat + "<br /> Longitude:" + lon + ""
        },
        outside: function (m, f) {
            alert('This marker has been moved outside of its fence');
            position=1;
        }

        //inside: function(m,f){
        //    alert('this marker came into fence');
        // }
    });
    cordinates = { "Longitude": lon, "Latitude": lat, "Name": name,"Position":position };
    
    $.ajax({
        url: 'GeoFence',
        data: JSON.stringify(cordinates),
        type: 'Post',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            alert(data);
        }

    });

}
//function SavePosition(position)
//{
//    cordinates = { "Longitude": lon, "Latitude": lat, "Name": name,"Position"=1 };

//    $.ajax({
//        url: 'GeoFence',
//        data: JSON.stringify(cordinates),
//        type: 'Post',
//        contentType: 'application/json; charset=utf-8',
//        success: function (data) {
//            alert(data);
//        }

//    });
//}

function setScreen(isLogin) {

    if (!isLogin) {

        $("#divChat").hide();
        $("#divLogin").show();
    }
    else {

        $("#divChat").show();
        $("#divLogin").hide();
    }

}

function registerEvents(chat) {

    $("#btnStartChat").click(function () {

        name = $("#txtNickName").val();
        if (name.length > 0) {
            mapFunction(name);
            chat.server.connect(name);
        }
        else {
            alert("Please enter name");
        }

    });


    $('#btnSendMsg').click(function () {

        var msg = $("#txtMessage").val();
        if (msg.length > 0) {

            var userName = $('#hdUserName').val();
            chat.server.sendMessageToAll(userName, msg);
            $("#txtMessage").val('');
        }
    });


    $("#txtNickName").keypress(function (e) {
        if (e.which == 13) {
            $("#btnStartChat").click();
        }
    });

    $("#txtMessage").keypress(function (e) {
        if (e.which == 13) {
            $('#btnSendMsg').click();
        }
    });


}

function registerClientMethods(chat) {

    // Calls when user successfully logged in
    chat.client.onConnected = function (id, userName, allUsers, messages) {

        setScreen(true);

        $('#hdId').val(id);
        $('#hdUserName').val(userName);
        $('#spanUser').html(userName);

        // Add All Users
        for (i = 0; i < allUsers.length; i++) {

            AddUser(chat, allUsers[i].ConnectionId, allUsers[i].UserName);
        }

        // Add Existing Messages
        for (i = 0; i < messages.length; i++) {

            AddMessage(messages[i].UserName, messages[i].Message);
        }


    }

    // On New User Connected
    chat.client.onNewUserConnected = function (id, name) {

        AddUser(chat, id, name);
    }


    // On User Disconnected
    chat.client.onUserDisconnected = function (id, userName) {

        $('#' + id).remove();

        var ctrId = 'private_' + id;
        $('#' + ctrId).remove();


        var disc = $('<div class="disconnect">"' + userName + '" logged off.</div>');

        $(disc).hide();
        $('#divusers').prepend(disc);
        $(disc).fadeIn(200).delay(2000).fadeOut(200);

    }

    chat.client.messageReceived = function (userName, message) {

        AddMessage(userName, message);
    }
    chat.client.sendPrivateMessage = function (windowId, fromUserName, message) {

        var ctrId = 'private_' + windowId;


        if ($('#' + ctrId).length == 0) {

            createPrivateChatWindow(chat, windowId, ctrId, fromUserName);

        }

        $('#' + ctrId).find('#divMessage').append('<div class="message"><span class="userName">' + fromUserName + '</span>: ' + message + '</div>');

        // set scrollbar
        var height = $('#' + ctrId).find('#divMessage')[0].scrollHeight;
        $('#' + ctrId).find('#divMessage').scrollTop(height);

    }

}

function AddUser(chat, id, name) {

    var userId = $('#hdId').val();

    var code = "";

    if (userId == id) {

        code = $('<div class="loginUser">' + name + "</div>");

    }
    else {

        code = $('<a id="' + id + '" class="user" >' + name + '<a>');

        $(code).dblclick(function () {

            var id = $(this).attr('id');

            if (userId != id)
                OpenPrivateChatWindow(chat, id, name);

        });
    }

    $("#divusers").append(code);

}

function AddMessage(userName, message) {
    $('#divChatWindow').append('<div class="message"><span class="userName">' + userName + '</span>: ' + message + '</div>');

    var height = $('#divChatWindow')[0].scrollHeight;
    $('#divChatWindow').scrollTop(height);
}

function OpenPrivateChatWindow(chat, id, userName) {

    var ctrId = 'private_' + id;

    if ($('#' + ctrId).length > 0) return;

    createPrivateChatWindow(chat, id, ctrId, userName);

}

function createPrivateChatWindow(chat, userId, ctrId, userName) {

    var div = '<div id="' + ctrId + '" class="ui-widget-content draggable" rel="0">' +
               '<div class="header">' +
                  '<div  style="float:right;">' +
                      '<img id="imgDelete"  style="cursor:pointer;" src="/TrackingSystem/Images/Delete.jpg"/>' +
                   '</div>' +

                   '<span class="selText" rel="0">' + userName + '</span>' +
               '</div>' +
               '<div id="divMessage" class="messageArea">' +

               '</div>' +
               '<div class="buttonBar">' +
                  '<input id="txtPrivateMessage" class="msgText" type="text"   />' +
                  '<input id="btnSendMessage" class="submitButton button" type="button" value="Send"   />' +
               '</div>' +
            '</div>';

    var $div = $(div);

    // DELETE BUTTON IMAGE
    $div.find('#imgDelete').click(function () {
        $('#' + ctrId).remove();
    });

    // Send Button event
    $div.find("#btnSendMessage").click(function () {

        $textBox = $div.find("#txtPrivateMessage");
        var msg = $textBox.val();
        if (msg.length > 0) {

            chat.server.sendPrivateMessage(userId, msg);
            $textBox.val('');
        }
    });

    // Text Box event
    $div.find("#txtPrivateMessage").keypress(function (e) {
        if (e.which == 13) {
            $div.find("#btnSendMessage").click();
        }
    });

    AddDivToContainer($div);

}

function AddDivToContainer($div) {
    $('#divContainer').prepend($div);

    $div.draggable({

        handle: ".header",
        stop: function () {

        }
    });

    $div.resizable({
        stop: function () {

        }
    });

}


