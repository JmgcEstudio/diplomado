
import { DataTypes } from "sequelize";
import { sequelize } from "../database/database.js";
import { Status } from "../constants/index.js";
import { Task } from "./task.js";
import { encriptar } from "../common/bcrypt.js";


export const User = sequelize.define('users',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement:true
    },
    username:{
        type:DataTypes.STRING,
        allowNull: false,
        unique: {
            args: true,
            msg: 'Username already exists'
        },
        validate:{
            notNull:{
                msg:'Username is required'
            }
        }
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notNull:{
                msg:'Password is required'
            }
        }
    },
    status:{
        type: DataTypes.STRING,
        allowNull:false,
        defaultValue:Status.ACTIVE,
        validate:{
            isIn:{
                args:[[Status.ACTIVE,Status.INACTIVE]],
                msg: `Status must be ${Status.ACTIVE} or ${Status.INACTIVE}`
            },
        },
    },
});

User.hasMany(Task);
Task.belongsTo(User);

User.beforeCreate(async(user)=>{
    try{
        user.password = await encriptar(user.password);
    }catch(error){
       // logger.error(error.message);
        next(error);
    }
});
  
User.beforeUpdate(async(user)=>{
    try{
        user.password = await encriptar(user.password);
    }catch(error){
       // logger.error(error.message);
        next(error);
    }
});


/*
User.hasMany(Task,{
    foreignKey:'userId',
    sourceKey: 'id'
})

Task.belongsTo(User, {
    foreignKey: 'userId',
    targetKey:'id'
})
*/

    