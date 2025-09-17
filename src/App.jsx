import { Header } from "@/components/common/Header";
import { Tasks } from "@/components/sections/Tasks";
import '@/styles/main/fonts.scss';
import '@/styles/main/index.scss';
import { useEffect, useState } from "react";
export function App() {
  const [tasks, setTasks] = useState(() => {
    try {
      const raw = localStorage.getItem('myTasks')
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  })

  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
  }, [tasks])

  const handleRemoveTask = (removeTaskId) => {
    setTasks(prev => prev.filter(task => task.id !== removeTaskId))
  }

  const handleCompleteTask = (completedTaskId) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === completedTaskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  const handlePushTask = (newTask) => {
    let newTaskAdd = {
      id: tasks.length + 1,
      title: newTask.trim(),
      completed: false
    }
    var newTaskTrim = newTask.trim()
    var newTaskArr = newTaskTrim.split('')

    if (newTaskArr == 0) {
      console.log("Error")
    } else {
      setTasks(prev => [...prev, newTaskAdd])
    }
  }

  return (
    <>
      <Header handlePushTask={handlePushTask} />
      <Tasks
        tasks={tasks}
        handleRemoveTask={handleRemoveTask} handleCompleteTask={handleCompleteTask} />
    </>
  );
}