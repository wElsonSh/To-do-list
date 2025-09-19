import { Header } from "@/components/common/Header";
import { Tasks } from "@/components/sections/Tasks";
import '@/styles/main/fonts.scss';
import '@/styles/main/index.scss';
import { useEffect, useState } from "react";
export function App() {
  // конектим localStorage и массив
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
  // конектим localStorage и массив


  // создаем часы и удаление элементов в 00:00
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    if (time.getHours() == 0 && time.getMinutes() == 0 && time.getSeconds() == 0) {
      setTasks(prev => [])
    }
  }, [time])

  // создаем часы и удаление элементов в 00:00

  // ф-ии для взаимодействия с массивом 
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
  // ф-ии для взаимодействия с массивом 

  return (
    <>
      <Header
        time={time}
        handlePushTask={handlePushTask} />
      <Tasks
        tasks={tasks}
        handleRemoveTask={handleRemoveTask} handleCompleteTask={handleCompleteTask} />
    </>
  );
}