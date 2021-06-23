import React, {ChangeEvent, useState, KeyboardEvent} from "react";
import {FilterValuesType} from "./App";
import s from './StylesModule/Todolist.module.sass'

export type TasksType = {
    id: string
    title: string
    active: boolean
}

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTasks: (id: string) => void
    changeFilter: (valueFilter: FilterValuesType) => void
    addTask: (title: string) => void
    changeStatusTask: (taskId: string, status: boolean) => void
    filter: FilterValuesType
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
            props.addTask(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('error');
            return
        } else setError('')

        props.addTask(newTaskTitle);
        setNewTaskTitle('')
    }
    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (
        <div className={s.todolist}>
            <h3>{props.title}</h3>
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
                        props.removeTasks(t.id)
                    }
                    const changeStatus = (e: ChangeEvent<HTMLInputElement>) => {
                        console.log('want to change' + t.id + e.currentTarget.checked)
                        props.changeStatusTask(t.id, e.currentTarget.checked)
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

