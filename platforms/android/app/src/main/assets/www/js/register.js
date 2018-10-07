/**
 * jQuery functions.js
 * @author: Arran Fletcher <mf@nygmarosebeauty.com>
 * @description: Dynamic UI functions and UI features
 * @requires: db-functions.js
 * 
 */
 
$(document).ready(function() {
    initialSetup();
});

// Run all page observers
function initialSetup() {
    registerReturnObserver();
    registerObserver();
};

// Check registration return button
function registerReturnObserver() {
    $("#register-return").click(function() {
        loadURL("login.html");
    });
};

// Check registration form
function registerObserver() {
    $("#register-form").submit(function() {
        validateRegister($("#username").val(), $("#email").val(), $("#password").val());
    });
};

// Validate registration form
function validateRegister(user, email, pw) {
	
	// Validate entered Email
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(re.test(String(email).toLowerCase())) {
        var emailValid = true;
    }
    else {
        alert("Please enter a valid email");
        return;
    }

    // Validate entered username
    if(String(user).length <= 51 && String(user).length > 5) {
        var userValid = true;
    }
    else {
        alert("A valid Username must have a length between 6 to 50");
        return;
    }

    // Validate entered password
	if(String(pw).length <= 51 && String(pw).length > 5) {
        var passwordValid = true;
    }
    else {
        alert("A valid Password must have a length between 6 to 50");
        return;
    }

    var values = '\'' + String(email) + '\', \'' + String(user) + '\', \'' + String(pw) + '\'';
    var sql = '\
        INSERT INTO fossickpoint_mobile_users(email, username, password) \
        VALUES (' + String(values) + ');';

    $.post( "https://fossickpoint-toolbox-web-server.tk/",
    {
        query: sql
    },
    function(response)
    {
        // Try to parse response as JSON
        try {
            var responseJSON = JSON.parse(response);
            switch(responseJSON.response) {
                case true:
                    alert("Successfully registered!");
                    loadURL("login.html");
                    break;
    
                case false:
                    alert("DATABASE ERROR: Please check connection and try again later.");
                    console.log(responseJSON.error);
                    break;
            }
        }
        catch(e) {
            alert("DATA ERROR");
            console.log(response);
            return;
        }
    });		
}

// Change Cordova URL
function loadURL(url) {
    window.location.assign(url);
};