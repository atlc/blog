DROP DATABASE blogs;
CREATE DATABASE blogs;
USE blogs;


DROP TABLE Authors;
CREATE TABLE Authors (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64) NOT NULL,
    email VARCHAR(64) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO Authors (name, email) VALUES
	('Andrew Cartwright', 'andrew@example.io'),
    ('Prospectin Pete', 'pete@prospectorsonly.com'),
    ("Steve d'Pirate", 'aaarrrgh@sevenseas.org'),
    ('(The) Carl Weathers', 'cweathers@actorsguild.ca')
;

DROP TABLE Blogs;
CREATE TABLE Blogs (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR(256) NOT NULL,
	content TEXT NOT NULL,
	authorid INT NOT NULL,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (authorid) REFERENCES Authors(id)
);
INSERT INTO Blogs (title, content, authorid) VALUES
	('My Journey Through Covalence: Coding While Listening to 90s Alt', "Shakedown 1979, cool kids never have the time === On a live wire right up off the street === You and I should meet === June bug skipping like a stone === With the headlights pointed at the dawn === We were sure we'd never see an end to it all === And I don't even care to shake these zipper blues === And we don't know just where our bones will rest === To dust I guess === Forgotten and absorbed into the earth below", 1),
    ('Yours, Mines, and Ours: Budget Prospecting While Listening to 90s Alt', "In my eyes, indisposed === In disguises no one knows === Hides the face, lies the snake === In the sun, in my disgrace === Boiling heat, summer stench === 'Neath the black the sky looks dead === Call my name through the cream === And I'll hear you scream again === Black hole sun === Won't you come === And wash away the rain === Black hole sun === Won't you come === Won't you come (won't you come)", 2),
    ("A Harrowin' Tale o' th' High Seas!", "Prow scuttle parrel provost Sail ho shrouds spirits boom mizzenmast yardarm. Pinnace holystone mizzenmast quarter crow's nest nipperkin grog yardarm hempen halter furl. Swab barque interloper chantey doubloon starboard grog black jack gangway rutters. Deadlights jack lad schooner scallywag dance the hempen jig carouser broadside cable strike colors. Bring a spring upon her cable holystone blow the man down spanker Shiver me timbers to go on account lookout wherry doubloon chase. Belay yo-ho-ho keelhaul squiffy black spot yardarm spyglass sheet transom heave to.", 3),
    ("Culinary Tips from an Actor's Perspective", "Whoa, whoa, whoa. There's still plenty of meat on that bone. Now you take this home, throw it in a pot, add some broth, a potato. Baby, you've got a stew going...  Let me tell you a little story about acting. I was doing this Showtime movie, Hot Ice with Anne Archer, never once touched my per diem. I'd go to Craft Service, get some raw veggies, bacon, Cup-A-Soup... baby, I got a stew going.", 4),
    ('How Much Do I Charge For Acting Classes?', 'Check this out. $1100 is exactly what I charge for acting classes.', 4) 
;

DROP TABLE Tags;
CREATE TABLE Tags (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(64) NOT NULL UNIQUE,
	created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
INSERT INTO Tags (name) VALUES ('coding'), ('90s alt rock'), ('mysql'), ('react js'), ('node js'), ('Birmingham, AL'), ('gold prospecting'), ('sailing'), ('acting'), ('cooking'), ('Carl Weathers'), ('Arrested Development');

DROP TABLE BlogTags;
CREATE TABLE BlogTags (
	blogid INT NOT NULL,
    tagid INT NOT NULL,
    FOREIGN KEY (blogid) REFERENCES Blogs(id),
    FOREIGN KEY (tagid) REFERENCES Tags(id),
    PRIMARY KEY (blogid, tagid)
);
INSERT INTO BlogTags (blogid, tagid) VALUES
    (1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 6),
    (2, 1), (2, 2), (2, 3), (2, 4), (2, 5), (2, 7),
    (3, 8),
    (4, 10), (4, 11), (4, 12),
    (5, 9), (5, 10), (5, 11)
;



delimiter //
	CREATE PROCEDURE spBlogTags(blogid int)
		BEGIN
			SELECT 
				b.blogid as BlogID, t.id as TagID, t.name as Tag 
			FROM BlogTags b
			JOIN Tags t on b.tagid = t.id WHERE b.blogid = blogid;
END//

delimiter ;

-- DROP PROCEDURE spBlogTags;
-- CALL spBlogTags(4);
