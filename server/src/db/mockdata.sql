insert into user(email,password,nickname) values("test@test.com","$2b$10$oCYLyg.ukI6E9DfT4SAYl.vR7OB39S8OrqB5dRknx3C0cAjN5nUmO","test1");
insert into user(email,password,nickname) values("test2@test.com","$2b$10$oCYLyg.ukI6E9DfT4SAYl.vR7OB39S8OrqB5dRknx3C0cAjN5nUmO","test2");
insert into user(email,password,nickname) values("test3@test.com","$2b$10$oCYLyg.ukI6E9DfT4SAYl.vR7OB39S8OrqB5dRknx3C0cAjN5nUmO","test3");
insert into user(email,password,nickname) values("test4@test.com","$2b$10$oCYLyg.ukI6E9DfT4SAYl.vR7OB39S8OrqB5dRknx3C0cAjN5nUmO","test4");


insert into book(bookName,color) values("일기장1","000000");
insert into book(bookName,color) values("일기장2","008fff");
insert into book(bookName,color) values("일기장3","50e3c2");

insert into user_book(userId,bookId) values(1,1);
insert into user_book(userId,bookId) values(1,2);
insert into user_book(userId,bookId) values(1,3);
insert into user_book(userId,bookId) values(2,1);
insert into user_book(userId,bookId) values(2,2);
insert into user_book(userId,bookId) values(3,2);
insert into user_book(userId,bookId) values(3,3);
insert into user_book(userId,bookId) values(4,1);
insert into user_book(userId,bookId) values(4,3);

insert into invtt_code(bookId,invttCode) values(1,"12341234");
insert into invtt_code(bookId,invttCode) values(2,"1234qwer");
insert into invtt_code(bookId,invttCode) values(3,"1q2w3e4r");

insert into diary(bookId,userId,title,content) values(1,1,"테스트1","11111 내용 테스트 채우는중 테스트 11111");
insert into diary(bookId,userId,title,content) values(1,2,"테스트2","22222 내용 테스트 채우는중 테스트 22222");
insert into diary(bookId,userId,title,content) values(1,3,"테스트3","33333 내용 테스트 채우는중 테스트 33333");
insert into diary(bookId,userId,title,content) values(1,4,"테스트4","44444 내용 테스트 채우는중 테스트 44444");
insert into diary(bookId,userId,title,content) values(1,1,"테스트5","55555 내용 테스트 채우는중 테스트 55555");
insert into diary(bookId,userId,title,content) values(1,2,"테스트6","66666 내용 테스트 채우는중 테스트 66666");
insert into diary(bookId,userId,title,content) values(1,3,"테스트7","77777 내용 테스트 채우는중 테스트 77777");
insert into diary(bookId,userId,title,content) values(1,4,"테스트8","88888 내용 테스트 채우는중 테스트 88888");
insert into diary(bookId,userId,title,content) values(1,1,"테스트9","99999 내용 테스트 채우는중 테스트 99999");
insert into diary(bookId,userId,title,content) values(1,2,"테스트10","00000 내용 테스트 채우는중 테스트 00000");
insert into diary(bookId,userId,title,content) values(1,1,"테스트11","11111 내용 테스트 채우는중 테스트 11111");
insert into diary(bookId,userId,title,content) values(1,2,"테스트12","22222 내용 테스트 채우는중 테스트 22222");
insert into diary(bookId,userId,title,content) values(1,3,"테스트13","33333 내용 테스트 채우는중 테스트 33333");
insert into diary(bookId,userId,title,content) values(1,4,"테스트14","44444 내용 테스트 채우는중 테스트 44444");
insert into diary(bookId,userId,title,content) values(1,1,"테스트15","55555 내용 테스트 채우는중 테스트 55555");
insert into diary(bookId,userId,title,content) values(1,2,"테스트16","66666 내용 테스트 채우는중 테스트 66666");
insert into diary(bookId,userId,title,content) values(1,3,"테스트17","77777 내용 테스트 채우는중 테스트 77777");
insert into diary(bookId,userId,title,content) values(1,4,"테스트18","88888 내용 테스트 채우는중 테스트 88888");
insert into diary(bookId,userId,title,content) values(1,1,"테스트19","99999 내용 테스트 채우는중 테스트 99999");
insert into diary(bookId,userId,title,content) values(1,2,"테스트20","00000 내용 테스트 채우는중 테스트 00000");
insert into diary(bookId,userId,title,content) values(1,1,"테스트21","11111 내용 테스트 채우는중 테스트 11111");
insert into diary(bookId,userId,title,content) values(1,2,"테스트22","22222 내용 테스트 채우는중 테스트 22222");
insert into diary(bookId,userId,title,content) values(1,3,"테스트23","33333 내용 테스트 채우는중 테스트 33333");
insert into diary(bookId,userId,title,content) values(1,4,"테스트24","44444 내용 테스트 채우는중 테스트 44444");
insert into diary(bookId,userId,title,content) values(1,1,"테스트25","55555 내용 테스트 채우는중 테스트 55555");
insert into diary(bookId,userId,title,content) values(1,2,"테스트26","66666 내용 테스트 채우는중 테스트 66666");
insert into diary(bookId,userId,title,content) values(1,3,"테스트27","77777 내용 테스트 채우는중 테스트 77777");
insert into diary(bookId,userId,title,content) values(1,4,"테스트28","88888 내용 테스트 채우는중 테스트 88888");
insert into diary(bookId,userId,title,content) values(1,1,"테스트29","99999 내용 테스트 채우는중 테스트 99999");
insert into diary(bookId,userId,title,content) values(1,2,"테스트30","00000 내용 테스트 채우는중 테스트 00000");

insert into comment(userId,diaryId,parentCommentId,reply) values(1,30,0," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(2,30,1," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(3,30,1," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(4,30,0," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(1,30,0," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(2,30,0," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(3,30,6," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(4,30,6," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(1,30,6," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(2,30,6," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(1,30,0," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(2,29,0," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(3,29,0," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(4,29,0," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(1,29,13," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(2,29,13," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(3,29,0," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(4,29,14," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(1,29,0," 댓글 내용 채우는중 테스트 ");
insert into comment(userId,diaryId,parentCommentId,reply) values(2,29,0," 댓글 내용 채우는중 테스트 ");
