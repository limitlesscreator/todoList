import React, {} from "react";
import {FilterValuesType} from "./App";

export type TasksType = {
    id: number
    title: string
    active: boolean
}

type PropsType = {
    title: string
    tasks: Array<TasksType>
    removeTasks: (id: number) => void
    changeFilter: (valueFilter : FilterValuesType) => void
}

export function Todolist(props: PropsType) {

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input type="text"/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map(t => <li><input type="checkbox" checked={t.active}/>
                    <span>{t.title}</span>
                    <button onClick={ () => {props.removeTasks(t.id)}}>X</button>
                </li>)}
            </ul>
            <div>
                <button onClick={ () => {props.changeFilter('all')}}>All</button>
                <button onClick={ () => {props.changeFilter('active')}}>Active</button>
                <button onClick={ () => {props.changeFilter('completed')}}>Completed</button>
            </div>
        </div>
    )
}

