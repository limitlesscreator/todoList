import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import s from './StylesModule/Todolist.module.sass'

export type TasksType = {
    id: string
    title: string
    active: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TasksType>
    removeTasks: (id: string,todolistId: string) => void
    changeFilter: (valueFilter: FilterValuesType, todolistId : string) => void
    addTask: (title: string,todolistId: string) => void
    changeStatusTask: (taskId: string, status: boolean,todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
}

export function Todolist(props: PropsType) {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState('')

    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (newTaskTitle.trim() === '') {
                setError('error');
                return
            }
            props.addTask(newTaskTitle,props.id);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('error');
            return
        } else setError('')

        props.addTask(newTaskTitle,props.id);
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => props.changeFilter('all',props.id)
    const onActiveClickHandler = () => props.changeFilter('active',props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed',props.id)
    const removeTodolist = () => {
        props.removeTodolist(props.id)
    }

    return (
        <div className={s.todolist}>
            <h3>{props.title}<button onClick={removeTodolist}>x</button></h3>
            <div>
                <input
                    className={error ? s.error : ''}
                    type="text"
                    value={newTaskTitle}
                    onChange={onNewTitleChangeHandler}
                    onKeyPress={onKeyPressHandler}/>
                <button onClick={addTask}>+</button>
                {error && <div className={s.errorText}>Title is required</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onRemoveHandler = () => {
                        props.removeTasks(t.id,props.id)
                    }
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        console.log('want to change' + t.id + e.currentTarget.checked)
                        props.changeStatusTask(t.id, e.currentTarget.checked,props.id)
                    }

                    return <li key={t.id}><input type="checkbox" checked={t.active} onChange={changeStatus}/>
                        <span>{t.title}</span>
                        <button onClick={(onRemoveHandler)}>X</button>
                    </li>
                })
                }
            </ul>
            <div className={s.filterButtons}>
                <button onClick={onAllClickHandler} className={props.filter === 'all' ? s.selectButton : ''}>All</button>
                <button onClick={onActiveClickHandler}  className={props.filter === 'active' ? s.selectButton : ''}>Active</button>
                <button onClick={onCompletedClickHandler}  className={props.filter === 'completed' ? s.selectButton : ''}>Completed</button>
            </div>
        </div>
    )
}
