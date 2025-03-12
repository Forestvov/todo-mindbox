import { ITask } from '@/model/task.model'
import { create } from 'zustand'

export type TaskFilterType = 'all' | 'active' | 'completed'

export interface State {
	tasks: ITask[]
	maxId: number
	filter: TaskFilterType
}

export const useTasksStore = create<State>(() => ({
	tasks: [],
	maxId: 0,
	filter: 'all',
}))

export const addNewTask = (name: string) =>
	useTasksStore.setState(prevState => {
		const newId: number = prevState.maxId + 1
		const taskWithId: ITask = { name, id: newId, checked: false }

		return { tasks: [...prevState.tasks, taskWithId], maxId: newId }
	})

export const toggleChecked = (taskId: number) =>
	useTasksStore.setState(prevState => ({
		tasks: prevState.tasks.map(task =>
			task.id === taskId ? { ...task, checked: !task.checked } : task
		),
	}))

export const deleteTask = (taskId: number) =>
	useTasksStore.setState(prevState => ({
		tasks: prevState.tasks.filter(task => task.id !== taskId),
	}))

export const setFilter = (filter: TaskFilterType) =>
	useTasksStore.setState({ filter })

export const useFilteredTasks = () => {
	const tasks = useTasksStore(state => state.tasks)
	const filter = useTasksStore(state => state.filter)

	const filteredTasks = tasks.filter(task => {
		if (filter === 'all') return task
		if (filter === 'active') return !task.checked
		if (filter === 'completed') return task.checked
	})

	return filteredTasks
}
