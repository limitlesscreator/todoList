import {FilterValuesType, TasksStateType, TodolistType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

export type RemoveTaskActionType = {
    type: "REMOVE-TASK"
    todolistId: string
    taskId: string
}
export type AddTaskActionType = {
    type: "ADD-TASK"
    newTodolistTitle: string
    todolistId: string
}

export type ChangeTaskStatusType = {
    type: "CHANGE-TASK-STATUS",
    todolistId: string
    taskId: string
    active: boolean
}
export type ChangeTaskTitleType = {
    type: "CHANGE-TASK-TITLE",
    todolistId: string
    taskId: string
    title: string
}

type ActionsType =
    RemoveTaskActionType
    | AddTaskActionType
    | ChangeTaskStatusType
    | ChangeTaskTitleType
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            const copyState = {...state}
            const todolist = copyState[action.todolistId]
            const filteredTasks = todolist.filter(t => t.id !== action.taskId)
            copyState[action.todolistId] = filteredTasks
            return copyState

        }
        case "ADD-TASK": {
            const copyState = {...state}
            const tasks = copyState[action.todolistId]
            const newTask = {title: action.newTodolistTitle, id: action.todolistId, active: false}
            const newTasks = [newTask, ...tasks]
            copyState[action.todolistId] = newTasks
            return copyState
        }
        case "CHANGE-TASK-STATUS": {
            const copyState = {...state}
            const tasks = copyState[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.active = action.active
            }
            return copyState
        }
        case "CHANGE-TASK-TITLE": {
            const copyState = {...state}
            const tasks = copyState[action.todolistId]
            const task = tasks.find(t => t.id === action.taskId)
            if (task) {
                task.title = action.title
            }
            return copyState
        }
        case "ADD-TODOLIST": {
            const copyState = {...state}
            copyState[action.todolistId] = []
            return copyState
        }
        case "REMOVE-TODOLIST": {
            const copyState = {...state}
            delete copyState[action.id]
            return copyState
        }
    }
}

export const removeTaskAC = (taskId: string, todolistId: string): RemoveTaskActionType => {
    return {type: "REMOVE-TASK", taskId: taskId, todolistId: todolistId}
}

export const addTaskAC = (todolistId: string, newTodolistTitle: string): AddTaskActionType => {
    return {type: "ADD-TASK", todolistId: todolistId, newTodolistTitle: newTodolistTitle}
}

export const changeTaskStatusAC = (taskId: string, active: boolean, todolistId: string): ChangeTaskStatusType => {
    return {type: "CHANGE-TASK-STATUS", todolistId: todolistId, active: active, taskId: taskId}
}

export const changeTaskTitleAC = (taskId: string, title: string, todolistId: string): ChangeTaskTitleType => {
    return {type: "CHANGE-TASK-TITLE", todolistId: todolistId, title: title, taskId: taskId}
}