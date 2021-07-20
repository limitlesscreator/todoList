import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import s from "./StylesModule/Todolist.module.sass";
import {Button, IconButton, TextField} from "@material-ui/core";
import {AddSharp} from "@material-ui/icons";

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
        <TextField
            label={'title'}
            error={!!error}
            variant={"outlined"}
            value={newTaskTitle}
            onChange={onNewTitleChangeHandler}
            onKeyPress={onKeyPressHandler}
            helperText={error}/>
        <IconButton onClick={addTask} >
            <AddSharp/>
        </IconButton>
    </div>

}