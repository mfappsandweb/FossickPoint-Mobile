/**
 * jQuery functions.js
 * @author: Arran Fletcher <mf@nygmarosebeauty.com>
 * @description: Dynamic UI functions and UI features
 * @requires: db-functions.js
 * 
 */

var storage;
var plan;
var tasks;
var planID;
var userID;
var registered;
var progress;
var date;
 
$(document).ready(function() {
    console.log("Document ready");

	storage = window.localStorage;
	planID = storage.getItem('planID');
	userID = storage.getItem('currentUser');
	initialSetup();
	assignPageLinks();
	
});

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

// Initial setup, calling from the 'toolbox' database.
// First, get the current plan's details;
function initialSetup() {
	
	var sql = "SELECT * FROM toolbox_plans WHERE id = " + planID;
	
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
                    plan = responseJSON.rows[0];
					getPlanTasks();
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

// Next, get the daily tasks for that plan.
function getPlanTasks() {
	
	var sql = "SELECT * FROM toolbox_daily_tasks WHERE planID = " + planID + " ORDER BY dayNum ASC";
	
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
                    tasks = responseJSON.rows;
					buildDetailPage();
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

function buildDetailPage() {
	
	var type = storage.getItem('planType');
	
	// Build the layouts according to the whether it's a 'version' from the 'toolbox' or 'user'
	switch(type) {
		
		case "user":
		
			userDetails();
			break;
			
		case "toolbox":

			checkUserPlans();
			break;
			
	}
	
}

/* ----- TOOLBOX PLAN DETAIL LAYOUT ----- */
/*  */

// Find whether the plan has already been registered to the user.
function checkUserPlans() {
	
	var sql = "SELECT * FROM user_plans WHERE planID = " + planID + " AND userID = " + userID;
	
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
					// Check whether the user has already started the plan.
					registered = responseJSON.rows;
					toolboxDetails();	
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

function toolboxDetails() {
	
	var btnType;
	
	// If there was an entry found, disable the option to add the plan.
	if (registered) {
		btnType = "btn-disabled";
	}
	else {
		btnType = "btn-primary";
	}
	
	// Build the default page.
	$("#plan-grid").empty();
	
	$("#plan-grid").append(' \
		<div id="plan-image" class="plan-image"></div> \
		<div class="plan-header"> \
		  <h1>' + plan.title + '</h1> \
		</div> \
		<div class="plan-sample"> \
		  <a id="sample">Sample Plan</a> \
		  <p>' + tasks.length + ' days</p> \
		</div>  \
		<div class="plan-header-2"> \
		  <p>' + plan.description + '</p> \
		</div> \
		<div class="plan-button"> \
		  <button id="start-plan" class="btn ' + btnType + ' btn-md">Begin Plan</button> \
		</div>');
		
	// Assign the img url stored with this plan
	$("#plan-image").css("background-image", "url(" + plan.imgURL + ")");
	
	// Assign listener to the 'sample' link, building the layout to showcase the daily tasks;
	$("#sample").click(function() {
		sampleDetails();
	});
	
	// Switch between the current button state
	switch(btnType) {
		
		case "btn-primary":
			// Assign the click listener for the button.
			$("#start-plan").click(function() {
				startPlan();
			});
			break;
			
		case "btn-disabled":
			// Edit the text to fit the current state.
			$("#start-plan").html("Already registered");
			break;
		
	}
	
}

function sampleDetails() {
	
	var btnType;
	
	// If there was an entry found, disable the option to add the plan.
	if (!registered) {
		btnType = "btn-primary";
	}
	else {
		btnType = "btn-disabled";
	}
	
	var daily_tasks_links = "";
	// Add the html taxt for the 'daily task' menu.
	for(var i=0; i<tasks.length; i++) {
		daily_tasks_links += '<div id="day-num-' + tasks[i].dayNum + '">Day ' + tasks[i].dayNum + '</div>';
	}
	
	// Build the default page.
	$("#plan-grid").empty();
	
	$("#plan-grid").append(' \
		<div id="plan-image" class="plan-image"></div> \
		<div class="plan-header"> \
		  <h1>' + plan.title + '</h1> \
		</div> \
		<div class="plan-sample"> \
		  <a id="sample">Description</a> \
		  <p>' + tasks.length + ' days</p> \
		</div>  \
		<div class="plan-menu">' + daily_tasks_links + '</div> \
		<div id="plan-list" class="plan-list"></div> \
		<div class="plan-button"> \
		  <button id="start-plan" class="btn ' + btnType + ' btn-md">Begin Plan</button> \
		</div>');
		
	// Assign the img url stored with this plan
	$("#plan-image").css("background-image", "url(" + plan.imgURL + ")");
	
	// Assign listener to the 'sample' link, reverting back to the default layout;
	$("#sample").click(function() {
		toolboxDetails();
	});
	
	// Assign listeners to the 'plan-menu' items.
	for(var i=0; i<tasks.length; i++) {
		$("#day-num-" + tasks[i].dayNum).click(function() {
			sampleList(this.id);
		});
	}
	
	// Switch between the current button state
	switch(btnType) {
		
		case "btn-primary":
			// Assign the click listener for the button.
			$("#start-plan").click(function() {
				startPlan();
			});
			break;
			
		case "btn-disabled":
			// Edit the text to fit the current state.
			$("#start-plan").html("Already registered");
			break;
		
	}
	
}

function sampleList(dayID) {
	
	// Split the items for each daily task.
	var dayIndex = dayID.slice(-1) - 1;
	var list = tasks[dayIndex].tasks;
	var items = list.split('|');
	
	// Rebuild the list.
	var itemHTML = "";
	for(var i = 0; i<items.length; i++) {
		itemHTML += '<div class="list-row"><div class="list-item-img"></div><p>' + items[i] + '</p></div>';
	}
	
	$("#plan-list").empty();
	$("#plan-list").append(itemHTML);
	
}

function startPlan() {
	
	var list = tasks[0].tasks;
	var items = list.split('|');
	progress = "1|";
	for(var i = 0; i<items.length; i++) {
		if(i == 0)
			progress += "0";
		else
			progress += ",0";
	}
	
	// Get current date
	date = new Date();
	date = date.getUTCFullYear() + '-' +
		('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
		('00' + date.getUTCDate()).slice(-2);
		
	var addPlan = confirm("Do you want to start this plan?");
	
	if(addPlan == true) {
		registerToDatabase();
	}
	
}

function registerToDatabase() {

	var sql = "INSERT INTO user_plans (userID, planID, dateStarted, currentProgress) VALUES ('" + userID + "','" + planID + "','" + date + "','" + progress + "')";
	
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
					alert("Plan registered!");
					loadURL("plans.html");
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

/* ----- USER PLAN DETAIL LAYOUT ----- */
/*  */
function userDetails() {
	
	var daily_tasks_links = "";
	// Add the html taxt for the 'daily task' menu.
	for(var i=0; i<tasks.length; i++) {
		daily_tasks_links += '<div id="day-num-' + tasks[i].dayNum + '">Day ' + tasks[i].dayNum + '</div>';
	}
	
	// Build the default page.
	$("#plan-grid").empty();
	
	$("#plan-grid").append(' \
		<div id="plan-image" class="plan-image"></div> \
		<div class="plan-header"> \
		  <h1>' + plan.title + '</h1> \
		</div> \
		<div class="plan-sample"> \
		  <a id="sample">Stop Plan?</a> \
		  <p>' + tasks.length + ' days</p> \
		</div>  \
		<div class="plan-menu">' + daily_tasks_links + '</div> \
		<div id="plan-list" class="plan-list"> \
		</div>');
		
	// Assign the img url stored with this plan
	$("#plan-image").css("background-image", "url(" + plan.imgURL + ")");
	
	// Assign listener to the 'sample' link, reverting back to the default layout;
	$("#sample").click(function() {	
	
		var removePlan = confirm("Do you want to top this plan? Your progress will be lost.");
	
		if(removePlan == true) {
			removeFromDatabase();
		}
	});
	
	// Assign listeners to the 'plan-menu' items.
	for(var i=0; i<tasks.length; i++) {
		$("#day-num-" + tasks[i].dayNum).click(function() {
			sampleList(this.id);
		});
	}
	
}

function removeFromDatabase() {

	var sql = "DELETE FROM user_plans WHERE userID = " + userID + " AND planID = " + planID;
	
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
					alert("Plan stopped.");
					loadURL("plans.html");
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