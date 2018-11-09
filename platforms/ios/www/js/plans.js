/**
 * jQuery plans.js
 * @author: Caleb CHAN
 * @description: Function for the 'plans' page. Dynamically build the page depending on the current
 *               and user.
 * 
 */

var all_plans;
var user_plans;
var currentUser;
var storage;
 
$(document).ready(function() {
    console.log("Document ready");

	// Default view
	initialSetup();
	
});

// Handler to switch between the two views
function listSelector(val) {

    $("#card-grid").empty();

    switch(val) {

        case "Browse Plans":

            buildPlanPage();
            break;

        case "User Plans":

				// Only build the table if there are entries.
            if(user_plans)
				buildUserTable();
            break;

    }
	
}

function initialSetup() {
	storage = window.localStorage;
	currentUser = storage.getItem('currentUser');
	getAllPlans();
	assignPageLinks();
}

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

function assignListeners() {
	//Assign listener to 'plans' page top menu
	$("#change-user").click(function() {
		var val = this.innerHTML;
		
		//Change the 'selected menu item' color scheme
		$(this).css("background-color", "#c1282d") //Background color
		$(this).css("color", "#ffffff") //Text color
		$("#change-toolbox").css("background-color", "#ffffff");
		$("#change-toolbox").css("color", "#000000");
		
		listSelector(val);
	});
	$("#change-toolbox").click(function() {
		var val = this.innerHTML;
		
		//Change the 'selected menu item' color scheme
		$(this).css("background-color", "#c1282d") //Background color
		$(this).css("color", "#ffffff") //Text color
		$("#change-user").css("background-color", "#ffffff");
		$("#change-user").css("color", "#000000");
		
		listSelector(val);
	});
}

// Get all plans
function getAllPlans() {
	
	var sql = "SELECT * FROM toolbox_plans";
	
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
                    all_plans = responseJSON.rows;
					getUserPlans();
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

// Get user plans
function getUserPlans() {
	
	var sql = "SELECT * FROM user_plans WHERE userID = " + currentUser;
	
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
                    user_plans = responseJSON.rows;
					if(user_plans)
						buildUserTable();
					assignListeners(); //Initial setup for listeners after loading from the database
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

// Build 'toolbox plans' page
function buildPlanPage() {
	
	// Build each entry for each plan
	for(var i = 0; i < all_plans.length; i++) {
		var id = all_plans[i].id;
		var title = all_plans[i].title;
		var desc = all_plans[i].description;
		var imgURL = all_plans[i].imgURL;
		
		$("#card-grid").append(' \
		<div class="col-lg-4 col-md-6 mb-4 card-view">\
          <div class="card h-100" id="' + id + '"> \
            <div id="container-' + id + '" class="quote-container"> \
              <p class="card-quote-text"></p> \
            </div> \
            <div class="card-body"> \
			  <h4 class="card-title"> \
				<a href="#0">' + title + '</a> \
              </h4> \
			  <p class="card-text">' + desc + '</p> \
            </div> \
		  </div> \
		</div>');
		
		$("#container-" + id).css('background-image', 'url("' + imgURL + '")');
		
		// Assign listener
		$("#" + String(id)).click(function() {
			var _id = this.id;
			loadToDetails('toolbox', _id, 'plan-details.html');
		});
			
	}
	
}

function buildUserTable() {
	
	var arr = new Array();
	
	for(var i = 0; i < user_plans.length; i++) {
		arr.push(user_plans[i].planID);
	}
	
	for(var i = 0; i < all_plans.length; i++) {
		var plan_ID = all_plans[i].id;
		
		// Build the table if there are any entries.
		if(arr.includes(plan_ID)) {
			var id = all_plans[i].id;		
			var title = all_plans[i].title;
			var desc = all_plans[i].description;
			var imgURL = all_plans[i].imgURL;
		
			$("#card-grid").append(' \
			  <div class="col-lg-4 col-md-6 mb-4 card-view">\
				<div class="card h-100" id="' + id + '"> \
				  <div id="container-' + id + '" class="quote-container"> \
					<p class="card-quote-text"></p> \
				  </div> \
				  <div class="card-body"> \
					<h4 class="card-title"> \
					  <a href="#0">' + title + '</a> \
					</h4> \
					<p class="card-text">' + desc + '</p> \
				  </div> \
				</div> \
			  </div>');
			  
			$("#container-" + id).css("background-image", "url(" + imgURL + ")");
			
			// Assign listener
			$("#" + String(id)).click(function() {
				var _id = this.id;
				loadToDetails('user', _id, 'plan-details.html');
			});
		}
	}
	
	assignListeners(); //Initial setup for listeners after loading from the database
	
}

// Store the data and load to the page.
function loadToDetails(type, id, url) {
	
	storage.setItem('planType', type);
	storage.setItem('planID', id);
	loadURL(url);
	
}

// Change Cordova URL
function loadURL(url) {
    window.location.assign(url);
};