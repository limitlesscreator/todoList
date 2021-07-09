import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./StylesModule/Todolist.module.sass";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}

export function AddItemForm(props: AddItemFormPropsType) {
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
            props.addItem(newTaskTitle);
            setNewTaskTitle('')
        }
    }
    const addTask = () => {
        if (newTaskTitle.trim() === '') {
            setError('error');
            return
        } else setError('')

        props.addItem(newTaskTitle);
        setNewTaskTitle('')
    }
    return <div>
        <input
            className={error ? s.error : ''}
            type="text"
            value={newTaskTitle}
            onChange={onNewTitleChangeHandler}
            onKeyPress={onKeyPressHandler}/>
        <button onClick={addTask}>+</button>
        {error && <div className={s.errorText}>Title is required</div>}
    </div>

}