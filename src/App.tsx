import { ClipboardIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'

import todoLogo from '../public/Logo.svg'
import { Task, TaskContainer } from './components/task'
import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

type TaskProps = {
  id: string
  text: string
  checked: boolean
}
export function App() {
  const [taskText, setTaskText] = useState('')
  const [tasks, setTasks] = useState<TaskProps[]>([])

  function createTask() {
    setTasks([
      ...tasks,
      { id: Date.now().toString(), text: taskText, checked: false },
    ])
  }

  function deleteTask(id: string) {
    setTasks(() => tasks.filter((task) => task.id !== id))
  }

  function handleCheckState(id: string) {
    const changedTask = tasks.map((task) => {
      if (task.id === id) return { ...task, checked: !task.checked }
      return task
    })

    setTasks(changedTask)
  }

  const tasksCompleted = tasks.filter(({ checked }) => checked).length

  return (
    <main className="h-dvh bg-base-600">
      <section className="flex h-52 flex-col items-center justify-center bg-base-700">
        <img src={todoLogo} alt="logo com foguete e a frase TODO" />
        <div className="absolute mx-auto mt-52 flex w-[736px] items-center justify-between">
          <Input
            className="inline h-[54px] w-[638px] border-base-700 bg-base-500 px-4 text-base-100 placeholder:text-base-300 focus:border-purple-dark focus-visible:ring-offset-0"
            placeholder="Adicione uma nova tarefa"
            value={taskText}
            onChange={(e) => setTaskText(e.target.value)}
          />
          <Button
            type="button"
            className="h-[52px] w-[90px] bg-blue-dark text-sm text-base-100 hover:bg-blue-light"
            onClick={createTask}
          >
            Criar
            <PlusCircleIcon className="ml-2 size-4 text-base-100" />
          </Button>
        </div>
      </section>

      <section className="mx-auto mt-[91px] flex min-h-72 w-[736px] flex-col gap-6">
        <div className="flex justify-between">
          <p className="text-sm font-bold text-blue-light">
            Tarefas criadas{' '}
            <span className="rounded-full bg-base-400 px-3 py-1">
              {tasks.length}
            </span>
          </p>
          <p className="text-sm font-bold text-purple-light">
            Concluídas{' '}
            <span className="rounded-full bg-base-400 px-3 py-1">
              {tasksCompleted === 0
                ? 0
                : `${tasksCompleted} de ${tasks.length}`}
            </span>
          </p>
        </div>

        {tasks.length !== 0 ? (
          <TaskContainer>
            {tasks?.map(({ id, text, checked }) => (
              <Task
                key={id}
                id={id}
                text={text}
                checked={checked}
                removeTask={deleteTask}
                handleCheckState={handleCheckState}
              />
            ))}
          </TaskContainer>
        ) : (
          <div className="flex min-h-[244px] flex-col items-center justify-center gap-3 border-t border-t-base-400">
            <p className="text-base text-base-300">
              <ClipboardIcon className="mx-auto size-14" />
              <strong>Você ainda não tem tarefas cadastradas</strong>
              <br />
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>
        )}
      </section>
    </main>
  )
}
