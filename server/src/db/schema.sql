CREATE DATABASE IF NOT EXISTS podolog;
USE podolog;

CREATE TABLE IF NOT EXISTS `user` (
	`userId`	int	NOT NULL auto_increment,
	`email`	varchar(30)	UNIQUE NOT NULL,
	`password`	varchar(60)	NULL,
	`nickname`	varchar(40)	NOT NULL,
	`profile`	varchar(110) NULL,
	`role`	ENUM('user','admin') NOT NULL DEFAULT 'user', 
	`grape`	int	NOT NULL DEFAULT 0,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME, 
    `deletedAt` DATETIME,
    PRIMARY KEY (`userId`)
);

CREATE TABLE IF NOT EXISTS `grainId` (
	`grainId`	int	NOT NULL auto_increment,
    `userId`	int	NOT NULL,
	`grain`	int	NOT NULL DEFAULT 0,
    PRIMARY KEY (`grainId`, `userId`),
     FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `package` (
	`packageId`	int	NOT NULL auto_increment,
	`packageName`	varchar(40)	NOT NULL,
     PRIMARY KEY (`packageId`)
);

CREATE TABLE IF NOT EXISTS `user_package` (
	`userPackageId`	int	NOT NULL auto_increment,
	`userId`	int	NOT NULL,
	`packageId`	int	NOT NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME, 
    `deletedAt` DATETIME, 
    PRIMARY KEY (`userPackageId`,`userId`,`packageId`),
    FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`packageId`) REFERENCES `package` (`packageId`) ON DELETE NO ACTION ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `sticker` (
	`stickerId`	int	NOT NULL auto_increment,
	`packageId`	int	NOT NULL,
	`stickerName`	varchar(40)	NULL,
	`stickerImg`	varchar(110) NULL,
    PRIMARY KEY (`stickerId`,`packageId`),
    FOREIGN KEY (`packageId`) REFERENCES `package` (`packageId`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `book` (
	`bookId`	int	NOT NULL auto_increment,
	`bookName`	varchar(50)	NULL,
	`color`	varchar(10)	NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME, 
    `deletedAt` DATETIME, 
    PRIMARY KEY (`bookId`)
);

CREATE TABLE IF NOT EXISTS `user_book` (
	`userBookId`	int	NOT NULL auto_increment,
	`bookId`	int	NOT NULL,
	`userId`	int	NOT NULL,
    PRIMARY KEY (`userBookId`,`bookId`,`userId`),
    FOREIGN KEY (`bookId`) REFERENCES `book` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `diary` (
	`diaryId`	int	NOT NULL auto_increment,
	`bookId`	int	NOT NULL,
	`userId`	int	NOT NULL,
	`picture`	varchar(110) NULL,
	`title`	varchar(50)	NULL,
	`content`	varchar(600) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME, 
    `deletedAt` DATETIME,
    PRIMARY KEY (`diaryId`,`bookId`,`userId`),
    FOREIGN KEY (`bookId`) REFERENCES `book` (`bookId`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `comment` (
	`commentId`	int	NOT NULL auto_increment,
	`userId`	int	NOT NULL,
	`diaryId`	int	NOT NULL,
	`parentCommentId`	int	NOT NULL DEFAULT 0,
	`reply`	varchar(200) NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME, 
    `deletedAt` DATETIME,
    PRIMARY KEY (`commentId`,`userId`,`diaryId`),
    FOREIGN KEY (`diaryId`) REFERENCES `diary` (`diaryId`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`userId`) REFERENCES `user` (`userId`) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE IF NOT EXISTS `sticked_sticker` (
	`stickedStickerId`	int	NOT NULL auto_increment,
	`stickerId`	int	NOT NULL,
	`diaryId`	int	NOT NULL,
	`userId`	int	NOT NULL,
	`positionX`	int	NULL,
	`positionY`	int	NULL,
    `createdAt` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, 
    `updatedAt` DATETIME, 
    `deletedAt` DATETIME, 
    PRIMARY KEY (`stickedStickerId`,`stickerId`,`diaryId`,`userId`),
    FOREIGN KEY (`stickerId`) REFERENCES `sticker` (`stickerId`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`diaryId`) REFERENCES `diary` (`diaryId`) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (`userId`)  REFERENCES `user` (`userId`)  ON DELETE CASCADE ON UPDATE CASCADE
);
