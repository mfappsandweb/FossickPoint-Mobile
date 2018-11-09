/**
 * jQuery functions.js
 * @author: Arran Fletcher <mf@nygmarosebeauty.com>
 * @description: Dynamic UI functions and UI features
 * @requires: db-functions.js
 * 
 */
 
var storage;
var currentUser;
var items;
var base_path = "";
 
$(document).ready(function() {
    console.log("Document ready");
    
	storage = window.localStorage;
	currentUser = storage.getItem('currentUser');
	initialSetup();

});

// Call the database to get the toolbox items.
function initialSetup() {
	
	var sql = "SELECT * FROM toolbox_items";
	
	$.post( "https://fossickpoint.com.au/fpapp/",
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
                    items = responseJSON.rows;
					buildToolbox();
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

function buildToolbox() {
	
	for(var i = 0; i<items.length; i++) {
		
		var type = items[i].type;
		// Build each card based on their type.
		switch(type) {
			
			case "quote":
				var caption = items[i].caption.split('|');
				var id = items[i].id;
				var url = items[i].url;
				var quote_text = caption[0];
				var quote_title = caption[1];
				printCardQuote(id, quote_text, quote_title, url);
				break;
				
			case "image":
				var id = items[i].id;
				var url = items[i].url;
				var caption = items[i].caption;
				printCardImage(id, url, "Placeholder Image", caption);
				break;
				
			case "video":
				var caption = items[i].caption.split('|');
				var id = items[i].id;
				var url = items[i].url;
				var vid_type = caption[0];
				var vid_title = caption[1];
				var vid_text = caption[2];
				printCardVideo(id, url, vid_type, vid_title, vid_text);
				break;
			
		}
		
	}
	
	// Add observers after the initial setup
    pageObserver();
	
}

// Print quote card
function printCardQuote(id, quoteText, quoteAuthor, imgURL) {
    if(id === null) {
        throw "Quote Card has empty ID.";
    }

    var html = '\
    <div class="col-lg-4 col-md-6 mb-4 card-view" id="' + id + '">\
        <div class="card h-100"> \
            <div id="daily-quote-' + id + '" class="quote-container"></div> \
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
                    <a href="#" class="share-card" value="' + id + '"><i class="fas fa-left"><span class="share-card"> Share</span></i></a> \
                    &nbsp; \
                    <a href="#0" class="favourite-card" value="' + id + '">Favourite <i class="fas fa-star"></i></a> \
                </small> \
            </div> \
        </div> \
    </div>';

    $("#card-grid").append(html);
	
	//Change the image for the daily quote
	$("#daily-quote-" + id).css('background-image', 'url("' + imgURL + '")');
};

// Print image card
function printCardImage(id, imageURL, imageAlt, imageCaption) {
    if(id === null) {
        throw "Image card has empty ID.";
    }
	

    var html = ' \
    <div class="col-lg-4 col-md-6 mb-4 card-view" id="' + id + '"> \
        <div class="card h-100"> \
            <img class="card-img-top clickableImg" src="' + imageURL + '" alt="' + imageAlt + '"> \
            <div class="card-body"> \
                <h4 class="card-title"> \
                    <a href="#">' + imageCaption + '</a> \
                </h4> \
            </div> \
            <div class="card-footer"> \
                <small class="text-muted"> \
                    <a href="#" class="share-card" value="' + id + '"><i class="fas fa-left"><span class="share-card"> Share</span></i></a> \
                    &nbsp; \
                    <a href="#" class="favourite-card"  value="' + id + '">Favourite <i class="fas fa-star"></i></a> \
                </small> \
            </div> \
        </div> \
    </div> \
    ';
    
    $("#card-grid").append(html);
};

// Print video card
function printCardVideo(id, videoURL, videoType, videoTitle, videoCaption) {
    if(id === null) {
        throw "Video card has empty ID.";
    }

	// Get the proper path to the resources
	
    var html = ' \
    <div class="col-lg-4 col-md-6 mb-4 card-view" id="' + id + '"> \
        <div class="card h-100"> \
            <video class="video-container clickableVid" autoplay webkit-playsinline loop poster="img/video.svg"> \
                <source src="vid/The-Launch.mp4" type="video/mp4"> \
                This browser doesn\'t support video format \
            </video> \
            <div class="card-body"> \
                <h4 class="card-title"> \
                    <a href="#">' + videoTitle + '</a> \
                </h4> \
                <p class="card-text">' + videoCaption + '</p> \
            </div> \
            <div class="card-footer"> \
                <small class="text-muted"> \
                    <a href="#" class="share-card" value="' + id + '"><i class="fas fa-left"><span class="share-card"> Share</span></i></a> \
                    &nbsp; \
                    <a href="#0" class="favourite-card" value="' + id + '">Favourite <i class="fas fa-star"></i></a> \
                </small> \
            </div> \
        </div> \
    </div> \
    ';
    
    $("#card-grid").append(html);
};

// Run all page observers
function pageObserver() {

	assignPageLinks();
    myImgObserver();
    myVidObserver();
	saveCardObserver();

};

// Assign navigation links
function assignPageLinks() {
	
	//Load to Home page
	$("#to-home").click(function() {
		loadURL("index.html");
	});
	
	//Load to Favourites page
	$("#to-favorites").click(function() {
		loadURL("favourites.html");
	});
	
	//Load to Plans page
	$("#to-plans").click(function() {
		loadURL("plans.html");
	});
	
	// To webpage (Will be used to link this account with the toolbox account later on)
	$("#to-link").click(function() {
		window.open("https://www.fossickpoint.com.au/");
	});
}


// Save card to 'Favourites'
function saveCardObserver() {
    $(".favourite-card").click(function(e) {
        console.log("Favourite card clicked");

        var saveCard = confirm("Add this item to favourites?");

        if(saveCard == true) {
            checkSavedItem( $(this).attr("value") );
        }
    });
};

// Check whether the item has been entered
function checkSavedItem(cardID) {
	
	var sql = "SELECT * FROM user_items WHERE userID = " + currentUser + " AND itemID = " + cardID;
	
	$.post( "https://fossickpoint.com.au/fpapp/",
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
                    if(responseJSON.rows)
						alert("Item already saved");
					else
						saveCardToDatabase(cardID);
                    break;
    
                case false:
                    alert("DATABASE ERROR");
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

// Save card with user info to database
function saveCardToDatabase(cardID) {
	
    var sql = "INSERT INTO user_items (userID, itemID) VALUES ('" + currentUser + "', '" + cardID + "')";
	
	$.post( "https://fossickpoint.com.au/fpapp/",
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
                    alert("Item saved to 'Favourites'")
                    break;
    
                case false:
                    alert("DATABASE ERROR");
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

// Change Cordova URL
function loadURL(url) {
    window.location.assign(url);
};