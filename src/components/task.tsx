import { TrashIcon } from '@heroicons/react/24/outline'
import { ReactNode } from 'react'

import { Checkbox } from './ui/checkbox'

type TaskProps = {
  id: string
  text: string
  checked: boolean
  removeTask: (id: string) => void
  handleCheckState: (id: string) => void
}
export function Task({
  id,
  text,
  checked,
  removeTask,
  handleCheckState,
}: TaskProps) {
  return (
    <div className="flex w-full justify-between rounded-lg border-base-400 bg-base-500 p-4 text-base-100">
      <Checkbox
        id={id}
        className="mt-[6px] size-4 border-blue-light hover:border-blue-dark data-[state=checked]:border-none data-[state=checked]:bg-purple-dark data-[state=checked]:hover:bg-purple-light"
        onCheckedChange={() => handleCheckState(id)}
      />
      <label
        htmlFor={id}
        className={`mx-3 w-full ${checked ? 'text-base-300 line-through' : ''}`}
      >
        {text}
      </label>
      <TrashIcon
        className="box-content h-4 rounded-sm stroke-base-300 p-[6px] transition-colors hover:cursor-pointer hover:bg-base-400 hover:stroke-danger"
        onClick={() => removeTask(id)}
      />
    </div>
  )
}

type TaskContainerProps = {
  children: ReactNode
}
export function TaskContainer({ children }: TaskContainerProps) {
  return <div className="flex flex-col gap-3">{children}</div>
}
