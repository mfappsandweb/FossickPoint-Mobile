# Select Database
USE fossickpoint_toolbox;

# Insert Toolbox Plans Data
INSERT INTO toolbox_plans (title, description, imgURL) VALUES ('Lesson 100 Series - Starting out', 'To help get you started with this feature, this plan contains simple daily task for you to complete.', './img/text-background/fossickpoint-img-3.jpg');
INSERT INTO toolbox_plans (title, description, imgURL) VALUES ('Lesson 200 Series - Getting accustomed', 'A higher level plan for accustomed users. Contains a weekly amount of daily tasks to complete.', './img/text-background/sebastian-muller-52-unsplash.jpg');
INSERT INTO toolbox_plans (title, description, imgURL) VALUES ('Getting started with Individual Growth', 'Live with confidence, purpose and meaning. Improve relationships and gain skills employers are desperately looking for! Get started with this simple plan and start improving.', './img/text-background/fossickpoint-img-1.jpg');
INSERT INTO toolbox_plans (title, description, imgURL) VALUES ('Workplace Culture & Wellbeing', "As advances in technology usher us into the future, the nature of work and the skills required will need to change. But in what direction?  How do we prepare? Some clues are found in the workplace 'issues' we face today: Bullying, stress, disengagement...But there's hope! You can deal with the issues now and lay the foundations for the future workplace.", './img/text-background/fossickpoint-img-2.jpg');

# Insert Toolbox Daily Task Data
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('1', '1', "Read 'Lesson 101' document|Watch 'Lesson 101' video|Look at 'Lesson 101' image");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('1', '2', "Read 'Lesson 102.1' document|Read 'Lesson 102.2' document|Watch 'Lesson 102' video|Look at 'Lesson 102' image");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('1', '3', "Watch 'Lesson 103' video|Read 'Lesson 103' document");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('2', '1', "Read 'Lesson 201' document|Look at 'Lesson 201' image");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('2', '2', "Watch 'Lesson 202.1' video|Watch 'Lesson 202.2' video|Watch 'Lesson 202.3' video");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('2', '3', "Read 'Lesson 203' document|Read 'Lesson 204.1' document|Read 'Lesson 204.2' document|Look at 'Lesson 204' image");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('2', '4', "Read 'Lesson 205' document|Watch 'Lesson 205' video|Look at 'Lesson 205' image");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('2', '5', "Watch 'Lesson 206' video|Look at 'Lesson 206' image|Watch 'Lesson 207' video|Look at 'Lesson 207' image");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('3', '1', "Read 'Starting your Personal Development' document|Watch 'Personal Development' video");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('3', '2', "Watch 'Development Workshop pt.1' video|Look at 'Personal Values' image");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('3', '3', "Watch 'Development Topics pt.1' video|Watch 'Development Topics pt.2' video|Look at 'Developing Yourself' image");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('3', '4', "Watch 'Development Workshop pt.2' video|Watch 'Personal Goals' video|Read 'Development: What Next?' document");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('4', '1', "Watch 'A look into Workplace Culture' video|Look at 'Workplace Issues' image");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('4', '2', "Watch 'Culture Assessment and Strategies pt.1' video|Watch at 'Workplace Communication pt.1' video");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('4', '3', "Watch 'Culture Assessment and Strategies pt.2' video|Watch at 'Workplace Communication pt.2' video");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('4', '4', "Watch 'Culture Assessment and Strategies pt.3' video|Watch at 'Workplace Communication pt.3' video");
INSERT INTO toolbox_daily_tasks (planID, dayNum, tasks) VALUES ('4', '5', "Read 'Personal Wellbeing' video|Look at 'Maintain your Wellbeing' image");

# Insert Toolbox Cards
INSERT INTO toolbox_items (type, caption, url) VALUES ('quote', 'If you change your mind, you can change your life.|William James', './img/text-background/If_You_can_Change_your_mind.jpg');
INSERT INTO toolbox_items (type, caption, url) VALUES ('image', 'Deep Q', 'img/text-background/Deep_Q_Dehumanise.jpg');
INSERT INTO toolbox_items (type, caption, url) VALUES ('image', 'Confidence', 'img/text-background/Feeling_Confident.jpg');
INSERT INTO toolbox_items (type, caption, url) VALUES ('image', 'Gratitude', 'img/text-background/Gratitude.jpg');
INSERT INTO toolbox_items (type, caption, url) VALUES ('image', 'Integrity', 'img/text-background/Integrity-Builds-Trust.jpg');
INSERT INTO toolbox_items (type, caption, url) VALUES ('image', 'Trust', 'img/text-background/Learning_to_trust.jpg');
INSERT INTO toolbox_items (type, caption, url) VALUES ('image', 'Hope', 'img/text-background/Restoring_Hope.jpg');
INSERT INTO toolbox_items (type, caption, url) VALUES ('video', "video/mp4|Launch towards the stars|Aim for the stars - Like you're a rocket.", 'video/The-Launch.mp4');