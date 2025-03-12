import { Checkbox } from '@/components/ui'
import { cn } from '@/lib/utils'
import { ITask } from '@/model/task.model'
import { Trash2 } from 'lucide-react'
import React from 'react'

interface Props extends ITask {
	className?: string
	onToggle: (id: number) => void
	onDelete: (id: number) => void
}

export const TaskItem: React.FC<Props> = React.memo(
	({ id, className, name, checked, onToggle, onDelete }) => {
		return (
			<div
				className={cn(
					'flex items-center gap-2 border-1 p-3 not-first:mt-2',
					checked && 'opacity-50',
					className
				)}
			>
				<Checkbox
					className='cursor-pointer'
					checked={checked}
					onClick={() => onToggle(id)}
				/>
				{name}
				<Trash2
					className='cursor-pointer ml-auto text-gray-400'
					size={15}
					onClick={() => onDelete(id)}
				/>
			</div>
		)
	}
)
