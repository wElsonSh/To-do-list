import styles from "@/styles/common/Header.module.scss";
import { FaPlus } from "react-icons/fa6";

import { CreatorTaskForm } from "@/components/common/CreatorTaskForm";
import { useEffect, useState } from "react";

export function Header({ handlePushTask, time }) {


    // формат для часов, не знаю как это работает
    const formatClock = (date) => {
        return date.toLocaleTimeString('re-RU', {
            hour: '2-digit',
            minute: '2-digit',
            second: undefined,
            hout12: false
        })
    }
    // формат для часов, не знаю как это работает

    // отслеживаем открытие модального окна TasksCreator
    const [isTCOpen, setTCOpen] = useState(false)
    const handleCloseTasks = (childeState) => {
        setTCOpen(childeState)
    }

    useEffect(() => {
        if (isTCOpen) {
            document.body.style.overflowY = "hidden"
        } else {
            document.body.style.overflowY = "unset"
        }
        return () => {
            document.body.style.overflowY = "unset"
        }
    }, [isTCOpen])
    // отслеживаем открытие модального окна TasksCreator


    return (
        <header className={styles.header}>
            <CreatorTaskForm
                isOpen={isTCOpen}
                handleCloseTasks={handleCloseTasks}
                handlePushTask={handlePushTask}
            />
            <div className={styles.header_container}>
                <div className={styles.header__clock}>
                    <h1>Ma tasks</h1>
                </div>
                <div
                    onClick={() => { setTCOpen(!isTCOpen) }}
                    className={styles.header_container__create_task_btn} >
                    <div className={styles.header_container__create_task_icon}>
                        <FaPlus />
                    </div>
                </div>
            </div>
        </header>
    );
}