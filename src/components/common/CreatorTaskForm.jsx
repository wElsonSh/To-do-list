import styles from "@/styles/common/CreatorTaskForm.module.scss";
import { useEffect, useState } from "react";

export function CreatorTaskForm({ handleCloseTasks, isOpen, handlePushTask }) {

    const [isFocuse, setIsFocuse] = useState(false)
    // помещаем в состояние наш таск 
    const [inputTitleValue, setInputTitleValue] = useState('')
    // помещаем в состояние наш таск 

    // колбеки
    const handleTitleInputChange = (event) => {
        setInputTitleValue(event.target.value)
    }
    const handleClickCreateTask = () => {
        handlePushTask(inputTitleValue)
        handleCloseTasks(!isOpen)
        setInputTitleValue('')
    }


    const handleClose = () => {
        handleCloseTasks(!isOpen)
    }
    // колбеки

    useEffect(() => {
        const handleKeyboardClick = (event) => {

            if (event.key == 'Escape') {
                handleCloseTasks(false)
            }
            if (event.key == 'Enter') {
                handlePushTask(inputTitleValue)
                setInputTitleValue('')
            }
        }

        document.addEventListener("keydown", handleKeyboardClick)

        return () => {
            document.removeEventListener("keydown", handleKeyboardClick)
        }

    })
    return (
        <div
            style={{ top: `${isOpen ? '0' : '-100'}vh` }}
            className={styles.tasks_creator}>
            <div
                style={{ marginTop: isFocuse ? '10rem' : '15rem' }}
                className={styles.tasks_creator_container}>
                <div className={styles.tasks_creator_title} onClick={handleClose}>
                    <h1>Click to close</h1>
                </div>
                <div className={styles.tasks_creator_form}>
                    <div className={styles.tasks_creator_form_inputs_container}>
                        <input
                            onFocus={() => { setIsFocuse(true) }}
                            onBlur={() => { setIsFocuse(false) }}
                            type="text"
                            value={inputTitleValue}
                            onChange={handleTitleInputChange}
                            className={styles.tasks_creator_form_input}
                            placeholder="Task title:" />
                        <button
                            onClick={handleClickCreateTask}
                            className={styles.tasks_creator_form_btn}><h3>Create task</h3></button>
                    </div>
                </div>
            </div>
        </div>
    );
}