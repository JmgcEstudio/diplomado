import { where } from 'sequelize';
import {Task} from '../models/task.js'
async function getTasks(req,res,next) {
    const{userId}=req.user;

    try {
        const task = await Task.findAll({
            attributes:['id','name','done'],
            order:[['name','ASC']],
            where:{
                userId
            },
        });
      res.json(task);
    } catch (error) {
        next(error);
    }
    
}

async function createTask(req,res,next) {
     const{userId}=req.user;
     const{name}=req.body;
     try {
        const task = await Task.create({
            name,
            userId,
        });
       return res.json(task)
     } catch (error) {
        next(error);
     }
}

async function getTask(req,res,next) {
    const {id}=req.params;
    const{userId}=req.user;
    try {
        const task =await Task.findOne({
            attributes:['name','done'],
            where:{
                id,
                userId,
            },
        });
        if(!task) return res.status(400).json({message:'Task not foud'});
       return res.json(task);
    } catch (error) {
        next(error);
    }
}

async function updateTask(req,res,next) {
    const {id}=req.params;
    const {name}=req.body;
    const{userId}=req.user;
    try {
        const task = await Task.update(
            {
                name,
            },
            {
            where:{
                id,
                userId,
            },
        }
    );
        if(task[0]===0) return res.status(404).json({message:'Task not foud'});
      return  res.json(task);
    } catch (error) {
        next(error);
    }
}

async function taskDone(req,res,next) {
    const {id}=req.params;
    const{userId}=req.user;
     const {done}=req.body;

    try {
        const task = await Task.update(
            {
                done,
            },
            {
            where:{
                id,
                userId,
            },
        }
    );
    if(task===0) return res.status(404).json({message:'Task not found'});
       return res.json(task);
    } catch (error) {
        next(error);        
    } 
}

async function deleteTask(req,res,next){
    const {id}=req.params;
    const{userId}=req.user;
    try {
        const task = await Task.destroy({
            where:{
                id,
                userId,
            },
        });


    if(task===0) return res.status(404).json({message:'Tarea no encontrada.'});
       return res.json({message:'Tarea Eliminada.'});
    } catch (error) {
        next(error);        
    } 
}

export default {
    getTasks,
    createTask,
    getTask,
    updateTask,
    taskDone,
    deleteTask
};