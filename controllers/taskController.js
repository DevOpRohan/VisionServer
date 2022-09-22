'use strict';

const firebase = require('../db');
const Task = require('../models/task');
const firestore = firebase.firestore();



const addTask = async (req, res, next) => {
    try {
        const data = req.body;
        //add createdAt date in data
        data.createdAt = new Date();
        await firestore.collection('tasks').add(data);
        res.send('Record saved successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const getTasks = async (req, res, next) => {
    try {
        const tasks = await firestore.collection('tasks');
        const data = await tasks.get();
        const tasksArray = [];
        if (data.empty) {
            res.status(404).send('No task record found');
        } else {
            data.forEach(doc => {
                const task = new Task(
                    doc.id,
                    doc.data().description,
                    doc.data().category,
                    doc.data().dueDate,
                    doc.data().createdAt
                );
                tasksArray.push(task);
            });
            console.log(tasksArray);
            res.send(tasksArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const getTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const task = await firestore.collection('tasks').doc(id);
        const data = await task.get();
        if (!data.exists) {
            res.status(404).send('Task with the given ID not found');
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const task =  await firestore.collection('tasks').doc(id);
        //change createdAt date in data
        data.createdAt = new Date();
        await task.update(data);
        res.send('Task record updated successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteTask = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('tasks').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addTask,
    getTasks,
    getTask,
    updateTask,
    deleteTask,
}