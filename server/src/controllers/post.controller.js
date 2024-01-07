const pool = require("../db")
const utils = require("../utils");

const postQueries = require('../database/post.queries');
// const { response } = require("express");
// const { post } = require("../routes/post.route");



addNewPost = async (request, response) => {

    try {

        const {
            title,
            content,
            description,
            teacher_creator_id,
            grade_teacher_creator_id,
            admin_creator_id,
            imageUrl,
            likesCount
        } = request.body;

        const id = utils.generateRandomString(40)

        if (title == undefined) return response.status(500).send("title not provided!")
        if (content == undefined) return response.status(500).send("content not provided!")
        if (description == undefined) return response.status(500).send("description not provided!")


        await pool.query(postQueries.addNewPostQuery,
            [id, content, title, teacher_creator_id, grade_teacher_creator_id, admin_creator_id, description, imageUrl, likesCount]);

        return response.status(200).json('Post added successfully!')
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }

};


likePost = async (request, response) => {

    try {
        console.log(request.body);

        // const id = request.body?.data.id;
        const postId = request.body?.data.postId;
        const studentId = request.body?.data.studentId;
        const parentId = request.body?.data.parentId;
        const teacherId = request.body?.data.teacherId;
        const gradeTeacherId = request.body?.data.gradeTeacherId;
        const adminId = request.body?.data.adminId;
        let likes = request.body?.data.likesCount;


        // console.log(likes);

        console.log('Old likes ' + likes);

        likes = likes == 0 ? 1 : 0;

        console.log('New likes ' + likes);

        console.log(postId);

        if (!postId) {
            return response.status(500).json({
                message: "post id should be provided in request body",
            });
        }

        await pool.query(postQueries.likePost, [postId, studentId, parentId, teacherId, gradeTeacherId, adminId, likes]);

        // if (rows.length < 1) {
        //     return response.status(500).send(`Post with id: ${postId} not found`);
        // }

        if (likes == 1) {
            return response.status(200).json("Successfully liked post");
        } else {
            return response.status(200).json("Successfully unliked post");
        }

    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}



checkIfLiked = async (request, response) => {

    try {

        const postId = request.body?.data?.postId;
        const studentId = request.body?.data?.studentId;
        const parentId = request.body?.data?.parentId;
        const teacherId = request.body?.data?.teacherId;
        const gradeTeacherId = request.body?.data?.gradeTeacherId;
        const adminId = request.body?.data?.adminId;
        // const hasLiked = request.body?.data?.likes;

        console.log('request body' + postId + ' ' + studentId)

        // console.log(hasLiked);

        //1 - liked


        if (!postId) {
            return response.status(500).json({
                message: "post id should be provided in request body",
            });
        }

        const rows = await pool.query(postQueries.checkIfLiked, [postId, studentId, parentId, teacherId, gradeTeacherId, adminId]);




        const likes = rows.rows[0].likes;

        if (rows.length < 1 || likes == 0) {
            //post is not already liked
            return response.status(200).json("0");
        }

        await pool.query(postQueries.deleteLikeQuery, [postId, studentId, parentId, teacherId, gradeTeacherId, adminId]);

        return response.status(200).json("1")

    }
    catch (err) {
        console.error(err.message)
    }

}


getLikes = async (request, response) => {

    try {

        const id = request.body.data.id;

        console.log('ID' + id);

        const { rows } = await pool.query(postQueries.getLikes, [id]);
        return response.status(200).json(rows);

    } catch (err) {
        console.error(err.message)
    }

};

getAllPosts = async (request, response) => {
    try {

        let { rows } = await pool.query(postQueries.getAllPostsQuery);

        return response.status(200).json(rows);
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }

};

openPost = async (request, response) => {

    try {
        const id = request.body?.id;
        if (!id) {
            return response.status(500).json({
                message: "post id should be provided in request body",
            });
        }

        const { rows } = await pool.query(postQueries.openPost, [id]);

        if (rows.length < 1) {
            return response.status(500).send(`Post with id: ${id} not found`);
        }

        return response.status(200).json(rows[0])

    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


addComment = async (request, response) => {
    try {

        console.log(request.body.data);

        const {
            postId,
            text,
            teacher_creator_id,
            grade_teacher_creator_id,
            admin_creator_id,
            student_creator_id,
            parent_id

        } = request.body.data;

        const commentId = utils.generateRandomString(40)

        if (postId == undefined) return response.status(500).send("post id not provided!")
        if (text == undefined) return response.status(500).send("text not provided!")


        console.log(postId);

        await pool.query(postQueries.addCommentQuery,
            [commentId, text, admin_creator_id, teacher_creator_id, grade_teacher_creator_id, parent_id, student_creator_id]);


        await pool.query(postQueries.addCommentToPostQuery,
            [postId, commentId]);


        return response.status(200).json('Comment added successfully!')
    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}


getCommentsForAPost = async (request, response) => {

    try {
        const id = request.body.data.postId;

        const { rows } = await pool.query(postQueries.getCommentsForAPostQuery, [id]);
        return response.status(200).json(rows);

    } catch (err) {
        console.error(err.message)
    }

};


deletePost = async (request, response) => {

    try {
        const id = request.body.data.postId;

        await pool.query(postQueries.deletePostFromPostLikes, [id]);
        await pool.query(postQueries.deleteComments, [id]);
        await pool.query(postQueries.deletePost, [id]);



        return response.status(200).json("");

    } catch (err) {
        console.error(err.message)
    }
}

module.exports = {
    addNewPost,
    getAllPosts,
    openPost,
    likePost,
    checkIfLiked,
    getLikes,
    addComment,
    getCommentsForAPost,
    deletePost
};
