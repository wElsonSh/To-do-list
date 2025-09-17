import styles from "@/styles/sections/Tasks.module.scss";
import { useEffect, useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { MdDelete } from "react-icons/md";
export function Tasks({ tasks, handleRemoveTask, handleCompleteTask }) {

    const [hiddenTaskId, setHiddenTaskId] = useState(null)

    useEffect(() => {
        setHiddenTaskId(null)
    }, [tasks])

    return (
        <section className={styles.tasks}>
            <div className={styles.tasks_container}>
                {tasks.length == 0 ? (
                    <h1>There's nothing here yet</h1>
                ) : (
                    tasks.map(task => (
                        <div
                            style={{ backgroundColor: task.completed ? '#555' : 'transparent', pointerEvents: task.completed ? 'none' : 'all' }}

                            className={styles.task_container}
                            key={task.id}
                            title={`${task.title}`}>

                            <div className={styles.task_text_container}
                                onClick={() => setHiddenTaskId(hiddenTaskId === task.id ? null : task.id)}>
                                <h3> {task.title}</h3>
                            </div>
                            <div className={styles.task_func_container}>
                                <div
                                    style={{ right: hiddenTaskId === task.id ? '0' : '5rem' }}
                                    className={styles.task_set_container}>
                                    <MdDelete
                                        className={styles.del_btn}
                                        onClick={() => handleRemoveTask(task.id)} />
                                </div>
                                <div
                                    style={{ right: hiddenTaskId === task.id ? '-5rem' : '0' }}
                                    className={styles.task_btns_container}>
                                    <div
                                        className={styles.task_checkbox_container}
                                        onClick={() => handleCompleteTask(task.id)}
                                    >
                                        <IoCloseOutline className={styles.task_checkbox_close_icon} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    ))
                )}
                {/* {tasks.map(task => (
                    <div className={styles.task_container} key={task.id}>
                        <div className={styles.task_text_container}>
                            <h3>{task.id}: {task.title}</h3>
                        </div>
                        <div className={styles.task_checkbox_container}></div>
                    </div>
                ))} */}
            </div>
        </section >
    );
}

