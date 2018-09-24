/**
 * jQuery functions.js
 * @author: Arran Fletcher <mf@nygmarosebeauty.com>
 * @description: Dynamic UI functions and UI features
 * @requires: db-functions.js
 * 
 */
$(document).ready(function() {
    console.log("Document ready");
    
    // Add observers
    pageObserver();

    // Change view
    $("#page-view").change(function() {

        console.log("View changed");

        $("#card-grid").empty();

        console.log("New View " + $(this).val());

        switch( $(this).val() ) {

            case "List View":

                $("#card-grid").append('<!-- Card List --> \
                <ul class="list-group col-lg-12 col-sm-12 col-xs-12"> \
                  <li class="list-group-item" id="3"> \
                    <p class="list-quote-text">If you can change your mind you can change your life<br><em>William James</em></p> \
                    <small class="text-muted"> \
                        <a href="#0" class="delete-card" value="3">Delete <i class="fas fa-times"></i></a> \
                        &nbsp; \
                        <a href="#0" class="favourite-card">Favourite <i class="fas fa-star"></i></a> \
                    </small> \
                  </li> \
                  <li class="list-group-item" id="1"> \
                    <p>Integrity Builds Trust<img class="list-view-img clickableImg" style="align: left;" src="img/Integrity-Builds-Trust copy.jpg" alt="Placeholder Image"></p> \
                    <small class="text-muted"> \
                        <a href="#0" class="delete-card" value="1">Delete <i class="fas fa-times"></i></a> \
                        &nbsp; \
                        <a href="#0" class="favourite-card">Favourite <i class="fas fa-star"></i></a> \
                    </small> \
                  </li> \
                  <li class="list-group-item" id="2"> \
                    <p> \
                      This is a video \
                      <span> \
                        <video class="list-view-vid clickableVid" webkit-playsinline loop poster="img/video.svg"> \
                          <source src="video/The-Launch.mp4" type="video/mp4"> \
                          This browser doesn\'t support video format \
                        </video> \
                      </span> \
                    </p> \
                    <small class="text-muted"> \
                        <a href="#0" class="delete-card" value="1">Delete <i class="fas fa-times"></i></a> \
                        &nbsp; \
                        <a href="#0" class="favourite-card">Favourite <i class="fas fa-star"></i></a> \
                    </small> \
                </ul>');
                break;

            case "Card View":

                $("#card-grid").append(' \
                    <div class="col-lg-4 col-md-6 mb-4 card-view" id="3">\
                      <div class="card h-100"> \
                        <div class="quote-container"> \
                          <p class="card-quote-text">If you can change your mind you can change your life <br> <em>William James</em></p> \
                        </div> \
                        <div class="card-body"> \
                          <h4 class="card-title"> \
                            <a href="#0">Thought of the day</a> \
                          </h4> \
                          <p class="card-text">If you can change your mind you can change your life <br> <em>William James</em></p> \
                        </div> \
                        <div class="card-footer"> \
                          <small class="text-muted"> \
                            <a href="#0" class="delete-card" value="3">Delete <i class="fas fa-times"></i></a> \
                            &nbsp; \
                            <a href="#0" class="favourite-card">Favourite <i class="fas fa-star"></i></a> \
                          </small> \
                        </div> \
                      </div> \
                    </div> \
          \
                  <div class="col-lg-4 col-md-6 mb-4 card-view" id="1"> \
                    <div class="card h-100"> \
                      <img class="card-img-top clickableImg" src="img/Integrity-Builds-Trust copy.jpg" alt="Placeholder Image"> \
                      <div class="card-body"> \
                        <h4 class="card-title"> \
                          <a href="#0">Integrity Builds Trust</a> \
                        </h4> \
                      </div> \
                      <div class="card-footer"> \
                        <small class="text-muted"> \
                          <a href="#0" onClick("removecard(1);")  class="delete-card" value="1">Delete <i class="fas fa-times"></i></a> \
                          &nbsp; \
                          <a href="#0" class="favourite-card">Favourite <i class="fas fa-star"></i></a> \
                        </small> \
                      </div> \
                    </div> \
                  </div> \
          \
                  <div class="col-lg-4 col-md-6 mb-4 card-view" id="2"> \
                    <div class="card h-100"> \
                      <video class="video-container" autoplay webkit-playsinline loop poster="img/video.svg"> \
                        <source src="video/The-Launch.mp4" type="video/mp4"> \
                        This browser doesn\'t support video format \
                      </video> \
                      <div class="card-body"> \
                        <h4 class="card-title"> \
                          <a href="#0">Video Card</a> \
                        </h4> \
                        <p class="card-text">This is a demonstration of a video card</p> \
                      </div> \
                      <div class="card-footer"> \
                        <small class="text-muted"> \
                          <a href="#0" onClick("removecard(2);")  class="delete-card" value="2">Delete <i class="fas fa-times"></i></a> \
                          &nbsp; \
                          <a href="#0" class="favourite-card">Favourite <i class="fas fa-star"></i></a> \
                        </small> \
                      </div> \
                    </div> \
                  </div> \
          \
                  <div class="col-lg-4 col-md-6 mb-4 card-view" id="4"> \
                      <div class="card h-100"> \
                        <a href="#0"> \
                          <img class="card-img-top" src="http://placehold.it/700x400" alt="Link Thumbnail Image"> \
                        </a> \
                        <div class="card-body"> \
                          <h4 class="card-title"> \
                            <a href="#0">Link Card</a> \
                          </h4> \
                          <p class="card-text">This is a sample link card leading to a toolbox link.</p> \
                        </div> \
                        <div class="card-footer"> \
                          <small class="text-muted"> \
                            <a href="#0" onClick("removecard(4);")  class="delete-card" value="4">Delete <i class="fas fa-times"></i></a> \
                            &nbsp; \
                            <a href="#0" class="favourite-card">Favourite <i class="fas fa-star"></i></a> \
                          </small> \
                        </div> \
                      </div> \
                    </div>');
                break;

        }

        // Re-add observers
        pageObserver();
    });
});

// Print quote card
function printCardQuote(id, quoteText, quoteAuthor, url = "#0") {
    if(id === null) {
        throw "Quote Card has empty ID.";
    }

    var html = '\
    <div class="col-lg-4 col-md-6 mb-4 card-view" id="' + id + '">\
        <div class="card h-100"> \
            <div class="quote-container"> \
                <p class="card-quote-text"> \
                    ' + quoteText + ' <br> <em>' + quoteAuthor + '</em> \
                </p> \
            </div> \
            <div class="card-body"> \
                <h4 class="card-title"> \
                    <a href="#0">Thought of the day</a> \
                </h4> \
                <p class="card-text"> \
                    ' + quoteText + ' <br> <em>' + quoteAuthor + '</em> \
                </p> \
            </div> \
            <div class="card-footer"> \
                <small class="text-muted"> \
                    <a href="#0" class="delete-card" value="' + id + '">Delete <i class="fas fa-times"></i></a> \
                    &nbsp; \
                    <a href="#0" class="favourite-card" value="' + id + '">Favourite <i class="fas fa-star"></i></a> \
                </small> \
            </div> \
        </div> \
    </div>';

    $("#card-grid").prepend(html);
};

// Print image card
function printCardImage(id, imageURL, imageAlt = "Fossickpoint Image", clickableURL = "#0", imageCaption) {
    if(id === null) {
        throw "Image card has empty ID.";
    }

    var html = ' \
    <div class="col-lg-4 col-md-6 mb-4 card-view" id="' + id + '"> \
        <div class="card h-100"> \
            <img class="card-img-top clickableImg" src="' + imageURL + '" alt="' + imageAlt + '"> \
            <div class="card-body"> \
                <h4 class="card-title"> \
                    <a href="' + clickableURL + '">' + imageCaption + '</a> \
                </h4> \
            </div> \
            <div class="card-footer"> \
                <small class="text-muted"> \
                    <a href="#0" class="delete-card" value="' + id + '">Delete <i class="fas fa-times"></i></a> \
                    &nbsp; \
                    <a href="#0" class="favourite-card"  value="' + id + '">Favourite <i class="fas fa-star"></i></a> \
                </small> \
            </div> \
        </div> \
    </div> \
    ';
    
    $("#card-grid").prepend(html);
};

// Print video card
function printCardVideo(id, videoURL, videoType, videoTitle, videoCaption, clickableURL = "#0") {
    if(id === null) {
        throw "Video card has empty ID.";
    }

    var html = ' \
    <div class="col-lg-4 col-md-6 mb-4 card-view" id="' + id + '"> \
        <div class="card h-100"> \
            <video class="video-container" autoplay webkit-playsinline loop poster="img/video.svg"> \
                <source src="' + videoURL + '" type="' + videoType + '"> \
                This browser doesn\'t support video format \
            </video> \
            <div class="card-body"> \
                <h4 class="card-title"> \
                    <a href="' + clickableURL + '">' + videoTitle + '</a> \
                </h4> \
                <p class="card-text">' + videoCaption + '</p> \
            </div> \
            <div class="card-footer"> \
                <small class="text-muted"> \
                    <a href="#0" class="delete-card" value="' + id + '">Delete <i class="fas fa-times"></i></a> \
                    &nbsp; \
                    <a href="#0" class="favourite-card" value="' + id + '">Favourite <i class="fas fa-star"></i></a> \
                </small> \
            </div> \
        </div> \
    </div> \
    ';
    
    $("#card-grid").prepend(html);
};

// Print weblink preview
function printLinkPreview(id, imageURL, imageAlt = "Thumbnail Image", clickableURL = "#0", linkTitle, linkCaption) {
    if(id === null) {
        throw "Link preview card has empty ID.";
    }

    var html = ' \
    <div class="col-lg-4 col-md-6 mb-4 card-view" id="' + id + '"> \
        <div class="card h-100"> \
            <a href="' + clickableURL + '"> \
                <img class="card-img-top" src="' + imageURL + '" alt="' + imageAlt + '"> \
            </a> \
            <div class="card-body"> \
                <h4 class="card-title"> \
                    <a href="' + clickableURL + '">' + linkTitle + '</a> \
                </h4> \
                <p class="card-text">' + linkCaption + '</p> \
            </div> \
            <div class="card-footer"> \
                <small class="text-muted"> \
                    <a href="#0" class="delete-card" value="' + id + '">Delete <i class="fas fa-times"></i></a> \
                    &nbsp; \
                    <a href="#0" class="favourite-card" value="' + id + '">Favourite <i class="fas fa-star"></i></a> \
                </small> \
            </div> \
        </div> \
    </div> \
    ';
    
    $("#card-grid").prepend(html);
}

// Run all page observers
function pageObserver() {

    removeCardObserver();
    myImgObserver();
    myVidObserver();
    registrationPageObserver();
    registerReturnObserver();
    loginObserver();
    registerObserver();

};

// Check register button
function registrationPageObserver() {
    $("#make-user").click(function() {
        loadURL("register.html");
    });
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

// Remove deleted card
function removeCardObserver() {
    $(".delete-card").click(function(e) {
        console.log("Remove card clicked");

        var deleteCard = confirm("Delete this item?");

        if(deleteCard == true) {
            $('#' + $(this).attr("value") ).hide();
        }
    });
};

// Display image lightbox
function myImgObserver() {
  $(".clickableImg").click(function() {

      console.log("Image tapped. Source " + $(this).attr("src"));

      $('nav').before(" \
          <div id='myModal'> \
              <img id='myModalImg' src='"+ $(this).attr("src") +"'> \
          </div>\
      ");

      $("#myModal").show();
      modalObserver();
  });
};

// Video lightbox
function myVidObserver() {
    $(".clickableVid").click(function() {

        var src = $(this).find("source").attr("src");
        var type = $(this).find("source").attr("type");

        console.log("Clicked video.\nSource: " + src + "\nType: " + type);

        $('nav').before(" \
            <div id='myModal'> \
                <video id='myModalImg' autoplay webkit-playsinline loop> \
                    <source src=" + src + " type=" + type + ">  \
                    This browser doesn't support video format \
                </video> \
            </div> \
        ");

        $("#myModal").show();
        modalObserver();
    });
};

// Close lightbox when no longer needed
function modalObserver() 
{
    $("#myModal").click(function() {
        console.log("Closing image");
        $("#myModal").remove();
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
                // TODO: Set session cookie for login before loading index
                loadURL("index.html");
            }
            else {
                alert("ERROR: Entered details are incorrect. Please try again.");
            }
            break;
    }
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