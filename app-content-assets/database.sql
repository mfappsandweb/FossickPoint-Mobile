# Create Main Database
CREATE DATABASE IF NOT EXISTS fossickpoint_toolbox;
USE fossickpoint_toolbox;

# Create tables and structure
CREATE TABLE IF NOT EXISTS fossickpoint_mobile_users (id INT(12) AUTO_INCREMENT PRIMARY KEY, email VARCHAR(255) UNIQUE, username VARCHAR(255), password VARCHAR(255));
CREATE TABLE IF NOT EXISTS toolbox_plans (id INT(15) AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, imgURL TEXT);
CREATE TABLE IF NOT EXISTS toolbox_daily_tasks (id INT(15) AUTO_INCREMENT PRIMARY KEY, planID INT(15), dayNum INT(2), tasks TEXT);
CREATE TABLE IF NOT EXISTS user_plans (id INT(15) AUTO_INCREMENT PRIMARY KEY, userID INT(15), planID INT(15), dateStarted DATE, currentProgress TEXT);
CREATE TABLE IF NOT EXISTS toolbox_items (id INT(15) AUTO_INCREMENT PRIMARY KEY, type VARCHAR(255), caption TEXT, url TEXT);
CREATE TABLE IF NOT EXISTS user_items (id INT(15) AUTO_INCREMENT PRIMARY KEY, userID INT(15), itemID INT(15));