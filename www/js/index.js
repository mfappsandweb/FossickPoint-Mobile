/**
 * index.js
 * @author: Deakin University Team 17
 * @description: Local SQLite DB functions 
 * @license:
 * 
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

		// Open local SQLite Database
		function connectToDatabase() {

			// Support for browser and Android/iOS
			if (window.cordova.platformId === 'browser') var database = window.openDatabase('fossick', '1.0', 'Fossick DB', 512000);
			else var database = window.sqlitePlugin.openDatabase({name: 'fossick.db', location: 'default', androidDatabaseImplementation: 2});

			// Return DB
			return database;
		};
		
		// Call the database.
		var db = connectToDatabase();
		
		/** 
		 * The code below is for populating the database. For this build version, quotes are hardcoded in.
		 * In future build versions, the quotes will be taken from an external source (e.g. backend server, txt file, etc).
		 * For this build, the database will be reset and repopulated on each build.
		 */

		db.transaction(function(tr) {
		
			// Reset the table.
			tr.executeSql('DROP TABLE IF EXISTS DailyQuotes');

			// Create the table
			tr.executeSql('CREATE TABLE IF NOT EXISTS DailyQuotes (id, quote, author)');
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [1, 'If you an change your mind, you can change your life.', 'William James']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [2, 'It is our choices that show what we truly are, far more than our abilities.', 'J. K. Rowling']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [3, 'It\'s not the failures that define us so much as how we respond.', 'Shane Parrish']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [4, 'Never let success get to your head, and never let failure get to your heart.', 'Drake']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [5, 'Wherever you are, be all there.', 'Jim Elliot']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [6, 'Imagination is more important than knowledge. Knowledge is limited. Imagination encircles the world.', 'Albert Einstein']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [7, 'If you focus on what you left behind, then how can you see what lies ahead?', 'Chef Gusteau, \'Ratatouille\'']);
			tr.executeSql('INSERT INTO DailyQuotes VALUES (?,?,?)', [8, 'Be mindful of the future, but not at the expense of the moment.', 'Qui-Gon - The Phantom Menace']);
		
		}, function(error) {
			alert("SQLite Storage Error: " + error.message);
		}, function() {
			alert("SQLite Storage Initialise Transactions Successful");
		});

		// Open DB for second transaction
		db = connectToDatabase();

		db.transaction(function(tr) {

			//Print out the count for testing
			tr.executeSql("SELECT count(*) AS mycount FROM DailyQuotes", [], function(tr, rs) {
				alert('Got count result: ' + rs.rows.item(0).mycount);
			}, function(tr, error) {
				alert("DB Check Error: " + error.message);
			});

		}, function(error) {
			alert("SQLite Storage Error: " + error.message);
		}, function() {
			alert("SQLite Storage DB Check Transactions Successful");
		});	
    }
};

app.initialize();