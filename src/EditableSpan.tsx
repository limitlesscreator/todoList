import React, {ChangeEvent, useState} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: EditableSpanPropsType) {
    let [editMode,setEditMode] = useState(false)
    let [title,setTitle] = useState('')

    const onChangeTitleHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const activateEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }
    const activateViewMode = () => {
        setEditMode(false)
        props.onChange(title)
    }


    return editMode
        ? <input value={title} onBlur={activateViewMode} autoFocus onChange={onChangeTitleHandler}/>
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
}