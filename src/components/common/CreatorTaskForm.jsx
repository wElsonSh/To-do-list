import styles from "@/styles/common/CreatorTaskForm.module.scss";
import { useState } from "react";

export function CreatorTaskForm({ handleCloseTasks, isOpen, handlePushTask }) {

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
    return (
        <div
            style={{ top: `${isOpen ? '0' : '-100'}vh` }}
            className={styles.tasks_creator}>
            <div className={styles.tasks_creator_container}>
                <div className={styles.tasks_creator_title} onClick={handleClose}>
                    <h1>Create new task</h1>
                </div>
                <div className={styles.tasks_creator_form}>
                    <div className={styles.tasks_creator_form_inputs_container}>
                        <input
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