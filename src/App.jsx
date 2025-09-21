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
  // ? JSON.parse делает так чтобы наш JSON файл "парсился" в обычный массив

  useEffect(() => {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
  }, [tasks])
  // ? здесь мы говорим что каждый раз когда происходит изменение в нашем массиве то мы снова передаем уже изменённый массив в localStorage чтобы была синхронизация
  // конектим localStorage и массив


  // создаем часы и удаление элементов в 00:00
  const [time, setTime] = useState(new Date())
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000)

    return () => clearInterval(timer)
  }, [])
  // создаем часы и удаление элементов в 00:00

  useEffect(() => {
    for (var i = 0; i in tasks; i++) {
      let timeDay = time.getDay()
      if (timeDay != tasks[i].addTime) {
        setTasks(prev => prev.filter(task => task.addTime == timeDay))
      }
    }
  }, [time])
  // ф-ии для взаимодействия с массивом 
  const handleRemoveTask = (removeTaskId) => {
    setTasks(prev => prev.filter(task => task.id !== removeTaskId))
  }
  // ? prev => это так называемое функционально обновление состояния, если говорить простыми словами то эта штука просто говорит о том что мы берем предыдущее состояние нажего состояния и изменяем его, в данном случае фильтруем все элементы и исключаем из них те, чей id сходится с полученным

  const handleCompleteTask = (completedTaskId) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === completedTaskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  // ? здесь мы создаем новый массив на основе старого(prev.map(task =>) после чего мы говорим - если id нашего элемента массива === completedTaskId то мы возвращаем все теже значения задачи кроме completed, его мы инвертируем в противоположное, то есть true, в противном же случае просто не трогаем этот элемент

  const handlePushTask = (newTask) => {
    let newTaskAdd = {
      id: tasks.length + 1,
      title: newTask.trim(),
      completed: false,
      addTime: new Date().getDay()
    }
    var newTaskTrim = newTask.trim()
    var newTaskArr = newTaskTrim.split('')

    if (newTaskArr == 0) {
      console.log("Error")
    } else {
      setTasks(prev => [...prev, newTaskAdd])
    }
  }

  // ? здесь все таже фигня, мы задаем новое состояние на основании старого, новое состояние - это старое + newTaskAdd
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