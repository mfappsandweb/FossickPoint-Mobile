/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
		document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);		
    },
	
	// Once the device is ready, it is safe to call device APIs.
	onDeviceReady: function() {
        
        
	  //  ------ Call local SQLite Database ------  //
	  
        // Call the database.
		var db = null;
		db = window.sqlitePlugin.openDatabase({
			name: 'fossick.db',
            location: 'default',
            androidDatabaseImplementation: 2
        });
		
		db.transaction(function(tr) {
		
		  /* The code below is for populating the database. For this build version, it quotes are hardcoded in.
		   * In future build versions, the quotes will be taken from an external source (e.g. backend server, txt file, etc).
		   * For this build, the database will be reset and repopulated on each build.
		   */
		  
          // Daily Quotes Table
		  
			// Reset the table.
			tr.executeSql('DROP TABLE IF EXISTS DailyQuotes');
			// Create the table, if it exists.
			tr.executeSql('CREATE TABLE IF NOT EXISTS DailyQuotes (id, quote, author)');
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [1, 'If you an change your mind, you can change your life.', 'William James']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [2, 'It is our choices that show what we truly are, far more than our abilities.', 'J. K. Rowling']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [3, 'It\'s not the failures that define us so much as how we respond.', 'Shane Parrish']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [4, 'Never let success get to your head, and never let failure get to your heart.', 'Drake']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [5, 'Wherever you are, be all there.', 'Jim Elliot']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [6, 'Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.', 'Albert Einstein']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [7, 'If you focus on what you left behind, then how can you see what lies ahead?', 'Chef Gusteau, \'Ratatouille\'']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [8, 'Be mindful of the future, but not at the expense of the moment.', 'Qui-Gon - The Phantom Menace']);
			//Print out the count for testing
			tr.executeSql("SELECT count(*) AS mycount FROM DailyQuotes", [], function(tr, rs) {
				alert('Got count result: ' + rs.rows.item(0).mycount);
			});
			
		});
		
    
        /* TODO: Add login/register in later versions
	    //  ------ Changing forms ------  //
		
		// Set event listeners to each <a> link.
        document.querySelector(".message-register").addEventListener("click", toLogin, false);
		document.querySelector(".message-login").addEventListener("click", toRegister, false);
		
		// Get each form.
		var login_form = document.querySelector(".login-form");
		var register_form = document.querySelector(".register-form");
		
		// Switches the current 'Register Form' with the 'Login Form'.
		function toLogin() {
			register_form.setAttribute('style', 'display:none;');
			login_form.setAttribute('style', 'display:block;');
		}
		
		// Switches the current 'Login Form' with the 'Register Form'.
		function toRegister() {
			register_form.setAttribute('style', 'display:block;');
			login_form.setAttribute('style', 'display:none;');
		}
		
		
	  //  ------ Registering ------  //

		// Get the data from the register form.
		var register_name = document.getElementById("register-name");
		var register_password = document.getElementById("register-password");
		var register_email = document.getElementById("register-email");
		register_form.querySelector(".button").addEventListener("click", registerUser, false);
		
		function registerUser() {
			window.alert(register_name.value);
		}
	  
	  //  ------ Login ------  //
	  
		var login_name = document.getElementById("login-name");
		var login_password = document.getElementById("login-password");
		login_form.querySelector(".button").addEventListener("click", loginUser, false);
		
		function loginUser() {
			window.alert(login_name.value); //This work; it pulls the value out individually
        }
        
        */
		
		
    }

};

app.initialize();