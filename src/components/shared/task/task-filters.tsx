import { Button } from '@/components/ui'
import { setFilter, TaskFilterType, useTasksStore } from '@/store/tasks'
import React from 'react'
import { Container } from '../container'
import { cn } from '@/lib/utils'

interface Props {
	className?: string
}

const filters: Record<TaskFilterType, string> = {
	all: 'Все',
	active: 'Активные',
	completed: 'Завершенные',
}

export const TaskFilters: React.FC<Props> = ({ className }) => {
	const activeFilter = useTasksStore(state => state.filter)

	const handleFilterChange = (event: React.MouseEvent<HTMLButtonElement>) => {
		setFilter(event.currentTarget.value as TaskFilterType)
	}

	return (
		<Container className={className}>
			<div className='flex align-middle gap-3'>
				{Object.entries(filters).map(([key, value]) => (
					<Button
						key={key}
						className='cursor-pointer'
						variant={activeFilter === key ? 'default' : 'outline'}
						value={key}
						onClick={handleFilterChange}
					>
						{value}
					</Button>
				))}
			</div>
		</Container>
	)
}
