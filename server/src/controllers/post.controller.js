const pool = require("../db")
const utils = require("../utils");

const postQueries = require('../database/post.queries');
const { response } = require("express");
const { post } = require("../routes/post.route");



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

        const id = request.body?.id;
        const postId = request.body?.postId;
        const studentId = request.body?.studentId;
        const parentId = request.body?.parentId;
        const teacherId = request.body?.teacherId;
        const gradeTeacherId = request.body?.gradeTeacherId;
        const adminId = request.body?.adminId;
        const likes = request.body?.likesCount;


        if (!id) {
            return response.status(500).json({
                message: "post id should be provided in request body",
            });
        }

        const { rows } = await pool.query(postQueries.likePost, [postId, studentId, parentId, teacherId, adminId, gradeTeacherId, likes]);

        if (rows.length < 1) {
            return response.status(500).send(`Post with id: ${id} not found`);
        }

        return response.status(200).json("Successfully liked post");

    }
    catch (err) {
        console.error(err.message)
        response.status(500).send(err.message)
    }
}



checkIfLiked = async (request, response) => {
    try {
        const postId = request.body?.postId;
        const studentId = request.body?.studentId;
        const parentId = request.body?.parentId;
        const teacherId = request.body?.teacherId;
        const gradeTeacherId = request.body?.gradeTeacherId;
        const adminId = request.body?.adminId;

        if (!postId) {
            return response.status(500).json({
                message: "post id should be provided in request body",
            });
        }

        const { rows } = await pool.query(postQueries.checkIfLiked, [postId, studentId, parentId, teacherId, gradeTeacherId, adminId]);

        if (rows.length < 1) {
            return response.status(500).send(`Post with id: ${id} not found`);
        }

        return response.status(200).json(rows[0])

    }
    catch (err) {
        console.error(err.message)
        
}



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

module.exports = {
    addNewPost,
    getAllPosts,
    openPost,
    likePost,
    checkIfLiked
}

