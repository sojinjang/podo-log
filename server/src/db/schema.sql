CREATE DATABASE IF NOT EXISTS podolog;
USE podolog;

CREATE TABLE IF NOT EXISTS `user` (
	`userId`	bigint	NOT NULL auto_increment,
	`email`	varchar(30) Null ,
	`password`	varchar(60)	NULL,
	`nickname`	varchar(40)	NOT NULL,
	`profile`	varchar(110) NULL,
	`role`	ENUM('user','admin') NOT NULL DEFAULT 'user', 
	`grape`	int	NOT NULL DEFAULT 0,
    `snsId` int NOT NULL DEFAULT 0,
    `provider` varchar(20) NOT NULL DEFAULT 'local',
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    `deletedAt` DATETIME,
    PRIMARY KEY (`userId`)
);

CREATE TABLE IF NOT EXISTS `grainId` (
	`grainId`	bigint	NOT NULL auto_increment,
    `userId`	bigint	NOT NULL,
	`grain`	int	NOT NULL DEFAULT 0,
    PRIMARY KEY (`grainId`, `userId`),
     FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `package` (
	`packageId`	bigint	NOT NULL auto_increment,
	`packageName`	varchar(40)	NOT NULL,
     PRIMARY KEY (`packageId`)
);

CREATE TABLE IF NOT EXISTS `user_package` (
	`userPackageId`	bigint	NOT NULL auto_increment,
	`userId`	bigint	NOT NULL,
	`packageId`	bigint	NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    `deletedAt` DATETIME, 
    PRIMARY KEY (`userPackageId`,`userId`,`packageId`),
    FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`packageId`) REFERENCES `package` (`packageId`) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `sticker` (
	`stickerId`	bigint	NOT NULL auto_increment,
	`packageId`	bigint	NOT NULL,
	`stickerName`	varchar(40)	NULL,
	`stickerImg`	varchar(110) NULL,
    PRIMARY KEY (`stickerId`,`packageId`),
    FOREIGN KEY (`packageId`) REFERENCES `package` (`packageId`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `book` (
	`bookId`	bigint	NOT NULL auto_increment,
	`bookName`	varchar(50)	NOT NULL DEFAULT '이름없음',
	`color`	varchar(10)	NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    `deletedAt` DATETIME, 
    PRIMARY KEY (`bookId`)
);

CREATE TABLE IF NOT EXISTS `user_book` (
	`userBookId`	bigint	NOT NULL auto_increment,
	`bookId`	bigint	NOT NULL,
	`userId`	bigint	NOT NULL,
    PRIMARY KEY (`userBookId`,`bookId`,`userId`),
    FOREIGN KEY (`bookId`) REFERENCES `book` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `diary` (
	`diaryId`	bigint	NOT NULL auto_increment,
	`bookId`	bigint	NOT NULL,
	`userId`	bigint	NOT NULL,
	`picture`	varchar(110) NULL,
	`title`	varchar(50)	NULL,
	`content`	varchar(600) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    `deletedAt` DATETIME,
    PRIMARY KEY (`diaryId`,`bookId`,`userId`),
    FOREIGN KEY (`bookId`) REFERENCES `book` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `comment` (
	`commentId`	bigint	NOT NULL auto_increment,
	`userId`	bigint	NOT NULL,
	`diaryId`	bigint	NOT NULL,
	`parentCommentId`	int	NOT NULL DEFAULT 0,
	`reply`	varchar(200) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    `deletedAt` DATETIME,
    PRIMARY KEY (`commentId`,`userId`,`diaryId`),
    FOREIGN KEY (`diaryId`) REFERENCES `diary` (`diaryId`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `sticked_sticker` (
	`stickedStickerId`	bigint	NOT NULL auto_increment,
	`stickerId`	bigint	NOT NULL,
	`diaryId`	bigint	NOT NULL,
	`userId`	bigint	NOT NULL,
	`positionX`	int	NULL,
	`positionY`	int	NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
    `deletedAt` DATETIME, 
    PRIMARY KEY (`stickedStickerId`,`stickerId`,`diaryId`,`userId`),
    FOREIGN KEY (`stickerId`) REFERENCES `sticker` (`stickerId`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`diaryId`) REFERENCES `diary` (`diaryId`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`userId`)  REFERENCES `user` (`userId`)  ON DELETE CASCADE ON UPDATE CASCADE
);

DELIMITER $$
 
CREATE TRIGGER delete_nobody_book
AFTER DELETE ON user_book
FOR EACH ROW 
BEGIN
IF not exists(select * from user_book where bookId = old.bookId ) THEN
 delete from book WHERE book.bookId = old.bookId;
 END IF;
END $$;

DELIMITER ;