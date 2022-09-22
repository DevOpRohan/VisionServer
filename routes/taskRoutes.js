const express = require('express');
const {addTask, getTasks, getTask, updateTask, deleteTask, ai} = require('../controllers/taskController');

const router = express.Router();

router.post('/addTask', addTask);
router.get('/tasks', getTasks);
router.get('/task/:id', getTask);
router.put('/updateTask/:id', updateTask);
router.delete('/deleteTask/:id', deleteTask);


module.exports = {
    routes: router
}
