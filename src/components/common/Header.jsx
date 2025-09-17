import styles from "@/styles/common/Header.module.scss";
import { FaPlus } from "react-icons/fa6";

import { CreatorTaskForm } from "@/components/common/CreatorTaskForm";
import { useEffect, useState } from "react";

export function Header({ handlePushTask }) {
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

    return (
        <header className={styles.header}>
            <CreatorTaskForm
                isOpen={isTCOpen}
                handleCloseTasks={handleCloseTasks}
                handlePushTask={handlePushTask}
            />
            <div className={styles.header_container}>
                <div className={styles.header__logo}>
                    <h1>Hello wElson217</h1>
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