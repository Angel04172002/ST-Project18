const addNewPostQuery = `   
    insert into post
    values ($1, $2, $3, $4, $5, $6, $7, $8, $9)
`;

const getAllPostsQuery = `  
    select * from post
`;


const getPostsFromStudent = `   
select pt.*
from student s 
left join teachers_grades_divisions_subjects tgds 
on s.grade_id = tgds.teacher_grade_id and
   s.grade_division_id = tgds.teacher_grade_division_id
left join grade_teachers_grades_divisions_subjects gtgds 
on s.grade_id = gtgds.grade_teacher_grade_id and
   s.grade_division_id = gtgds.grade_teacher_grade_division_id
join post pt
on pt.teacher_creator_id = tgds.teacher_id 
or pt.grade_teacher_creator_id = gtgds.grade_teacher_id
and pt.admin_creator_id = '890e0f59-1c4f-4552-8a83-b7d1e5e92770'
where s.id = $1
`;

const getPostsFromParent = `    

select pt.*
from student s 
left join teachers_grades_divisions_subjects tgds 
on s.grade_id = tgds.teacher_grade_id and
   s.grade_division_id = tgds.teacher_grade_division_id
left join grade_teachers_grades_divisions_subjects gtgds 
on s.grade_id = gtgds.grade_teacher_grade_id and
   s.grade_division_id = gtgds.grade_teacher_grade_division_id
join post pt
on pt.teacher_creator_id = tgds.teacher_id 
or pt.grade_teacher_creator_id = gtgds.grade_teacher_id
and pt.admin_creator_id = '890e0f59-1c4f-4552-8a83-b7d1e5e92770'
where s.parent_id = $1

`;


const openPost = ` 
   select * from post
   where id = $1
`;

const likePost = ` 
insert into post_likes values
($1, $2, $3, $4, $5, $6, $7)
ON CONFLICT (post_id) DO UPDATE SET likes = $7 WHERE post_likes.post_id = $1
and post_likes.student_id = $2 or post_likes.parent_id = $3 or post_likes.teacher_id = $4 or post_likes.grade_teacher_id = $5 or post_likes.admin_id = $6
`;


const checkIfLiked = `  

select * from post_likes
where post_id = $1 and (student_id = $2 or parent_id = $3 or teacher_id = $4 or grade_teacher_id = $5 or admin_id = $6)

`;


const getLikes = `
   select * from post_likes
   where post_id = $1
`;

const deleteLikeQuery = `  

   delete from post_likes
   where post_likes.post_id = $1
   and post_likes.student_id = $2 or post_likes.parent_id = $3 or post_likes.teacher_id = $4 or post_likes.grade_teacher_id = $5 or post_likes.admin_id = $6


`;

//post id, comment id, text, admin, teacher, gradeteacher, parent, student
const addCommentToPostQuery = `  
insert into posts_comments
values ($1, $2);
`;

const addCommentQuery = `  
   insert into comment
   values ($1, $2, $3, $4,  $5, $6, $7);
`;

//post id
const getCommentsForAPostQuery = `  
   
   select c.* from posts_comments pc
   join comment c
   on pc.comment_id = c.id
   where pc.post_id = $1

`;



const deletePostFromPostLikes = ` 
   delete from post_likes
   where post_likes.post_id = $1
`;

const deletePost = ` 
   delete from post
   where post.id = $1
`;


const deleteComments = `   
   delete from posts_comments
   where posts_comments.post_id = $1
`;


module.exports = {
   addNewPostQuery,
   getAllPostsQuery,
   getPostsFromStudent,
   getPostsFromParent,
   openPost,
   likePost,
   checkIfLiked,
   getLikes,
   deleteLikeQuery,
   addCommentQuery,
   getAllPostsQuery,
   addCommentToPostQuery,
   getCommentsForAPostQuery,
   deletePost,
   deletePostFromPostLikes,
   deleteComments
};













