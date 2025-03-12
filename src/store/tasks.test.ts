import { beforeEach, describe, expect, it } from 'vitest'
import {
	addNewTask,
	deleteTask,
	setFilter,
	toggleChecked,
	useTasksStore,
} from './tasks'

describe('Task functions', () => {
	beforeEach(() => {
		useTasksStore.setState({ tasks: [], maxId: 0, filter: 'all' })
	})

	it('should add a new task', () => {
		addNewTask('Test task')
		const tasks = useTasksStore.getState().tasks
		expect(tasks).toHaveLength(1)
		expect(tasks[0]).toEqual({ name: 'Test task', id: 1, checked: false })
	})

	it('should toggle task checked status', () => {
		addNewTask('Test task')
		toggleChecked(1)
		const tasks = useTasksStore.getState().tasks
		expect(tasks[0].checked).toBe(true)
	})

	it('should delete a task', () => {
		addNewTask('Test task')
		deleteTask(1)
		const tasks = useTasksStore.getState().tasks
		expect(tasks).toHaveLength(0)
	})

	it('should set filter', () => {
		setFilter('active')
		const filter = useTasksStore.getState().filter
		expect(filter).toBe('active')
	})
})

// Переписал хук useFilteredTasks в функцию и написал тесты.
const getFilteredTasks = state => {
	const tasks = state.tasks
	const filter = state.filter

	const filteredTasks = tasks.filter(task => {
		if (filter === 'all') return task
		if (filter === 'active') return !task.checked
		if (filter === 'completed') return task.checked
	})

	return filteredTasks
}

describe('getFilteredTasks', () => {
	it('should return all tasks when filter is "all"', () => {
		const state = {
			tasks: [
				{ name: 'Test task 1', id: 1, checked: false },
				{ name: 'Test task 2', id: 2, checked: true },
			],
			filter: 'all',
		}

		const filteredTasks = getFilteredTasks(state)
		expect(filteredTasks).toHaveLength(2)
		expect(filteredTasks).toEqual([
			{ name: 'Test task 1', id: 1, checked: false },
			{ name: 'Test task 2', id: 2, checked: true },
		])
	})

	it('should return active tasks when filter is "active"', () => {
		const state = {
			tasks: [
				{ name: 'Test task 1', id: 1, checked: false },
				{ name: 'Test task 2', id: 2, checked: true },
			],
			filter: 'active',
		}

		const filteredTasks = getFilteredTasks(state)
		expect(filteredTasks).toHaveLength(1)
		expect(filteredTasks).toEqual([
			{ name: 'Test task 1', id: 1, checked: false },
		])
	})

	it('should return completed tasks when filter is "completed"', () => {
		const state = {
			tasks: [
				{ name: 'Test task 1', id: 1, checked: false },
				{ name: 'Test task 2', id: 2, checked: true },
			],
			filter: 'completed',
		}

		const filteredTasks = getFilteredTasks(state)
		expect(filteredTasks).toHaveLength(1)
		expect(filteredTasks).toEqual([
			{ name: 'Test task 2', id: 2, checked: true },
		])
	})
})
