/**
 * jQuery functions.js
 * @author: Arran Fletcher <mf@nygmarosebeauty.com>
 * @description: Dynamic UI functions and UI features
 * @requires: db-functions.js
 * 
 */
 
var storage; //For Local storage
 
$(document).ready(function() {
    initialSetup();
});

// Run all page observers
function initialSetup() {
	storage = window.localStorage;
    registrationPageObserver();
    loginObserver();
};

// Check register button
function registrationPageObserver() {
    $("#make-user").click(function() {
        loadURL("register.html");
    });
};

// Check login form
function loginObserver() {
    $("#login-form").submit(function() {
        //Validate whether entered details match
        if($("#email").val() === "") {
            alert("Please enter a valid username.");
            return;
        }
        if($("#password").val() === "") {
            alert("Please enter a valid password.");
            return;
        }
        validateLoginForm($("#email").val(), $("#password").val());
    });
};

// Validate entered user details
function validateLoginForm(email, pw) {
    console.log("Validating login form");

    // Check user exists with correct information
    var sql = '\
        SELECT id \
        FROM fossickpoint_mobile_users \
        WHERE email = \'' + String(email) + '\' \
        AND password = \'' + String(pw)  + '\'; \
    ';

    console.log("POSTing login info");

    $.post( "https://fossickpoint-toolbox-web-server.tk/",
    {
        query: sql
    },
    function(response)
	{
        console.log("Login POST response");

		// Try to parse response as JSON
        try {
            var responseJSON = JSON.parse(response);
            validateLogin(responseJSON);
        }
        catch(e) {
            console.log(e);
            alert("DATA ERROR");
            console.log(response);
            return;
        }
    });
};

// Validate database results
function validateLogin(data) {
    console.log("Validating login response");
    console.log(data);

    switch(data.response) {
        case false:
            alert("DATABASE ERROR: Please check connection and try again later.");
            console.log(data.error);
            break;

        case true:
            if(data.rows !== null) {
                var id = data.rows[0]["id"];
                // Save the current userID.
				storage.setItem('currentUser', id);
                loadURL("index.html");
            }
            else {
                alert("ERROR: Entered details are incorrect. Please try again.");
            }
            break;
    }
};

// Change Cordova URL
function loadURL(url) {
    window.location.assign(url);
};