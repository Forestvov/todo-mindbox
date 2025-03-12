import { deleteTask, toggleChecked, useFilteredTasks } from '@/store/tasks'
import React from 'react'
import { Container } from '../container'
import { TaskItem } from './task-item'

interface Props {
	className?: string
}

export const TaskList: React.FC<Props> = ({ className }) => {
	const filteredTasks = useFilteredTasks()

	return (
		<Container className={className}>
			{filteredTasks.length === 0 ? (
				<div className='text-gray-400'>Задач пока нет</div>
			) : (
				filteredTasks.map(task => (
					<TaskItem
						key={task.id}
						{...task}
						onToggle={toggleChecked}
						onDelete={deleteTask}
					/>
				))
			)}
		</Container>
	)
}
