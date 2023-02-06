DELIMITER $$
 
CREATE TRIGGER delete_nobody_book
AFTER DELETE ON user_book
FOR EACH ROW 
BEGIN
IF not exists(select * from user_book where bookId = old.bookId ) THEN
 delete from book WHERE book.bookId = old.bookId;
 END IF;
END $$

CREATE TRIGGER insert_diary_up_grain
AFTER INSERT ON diary
FOR EACH ROW 
BEGIN
DECLARE a int;
select grain into a from user_grain where user_grain.userId = new.userId;
IF a >= 7 THEN
	UPDATE user_grain SET grain = grain - 7 WHERE user_grain.userId = new.userId;
    UPDATE user SET grape = grape + 1 WHERE user.userId = new.userId;
ELSE 
	UPDATE user_grain SET grain = grain + 3 WHERE user_grain.userId = new.userId;
 END IF;
END $$

CREATE TRIGGER insert_comment_up_grain
AFTER INSERT ON comment
FOR EACH ROW 
BEGIN
DECLARE a int;
select grain into a from user_grain where user_grain.userId = new.userId;
IF a >= 9 THEN
	UPDATE user_grain SET grain = grain - 9 WHERE user_grain.userId = new.userId;
    UPDATE user SET grape = grape + 1 WHERE user.userId = new.userId;
ELSE 
	UPDATE user_grain SET grain = grain + 1 WHERE user_grain.userId = new.userId;
 END IF;
END $$

CREATE TRIGGER delete_diary_down_grain
BEFORE DELETE ON diary
FOR EACH ROW 
BEGIN
DECLARE a int;
select grain into a from user_grain where user_grain.userId = old.userId;
IF a < 3 THEN
	UPDATE user_grain SET grain = 0 WHERE user_grain.userId = old.userId;
ELSE 
	UPDATE user_grain SET grain = grain - 3 WHERE user_grain.userId = old.userId;
 END IF;
END $$

CREATE TRIGGER delete_comment_down_grain
BEFORE DELETE ON comment
FOR EACH ROW 
BEGIN
DECLARE a int;
select grain into a from user_grain where user_grain.userId = old.userId;
IF a < 1 THEN
	UPDATE user_grain SET grain = 0 WHERE user_grain.userId = old.userId;
ELSE 
	UPDATE user_grain SET grain = grain - 1 WHERE user_grain.userId = old.userId;
 END IF;
END $$

DELIMITER ;
