import { TaskFilters, TaskForm, TaskList } from './components/shared'

function App() {
	return (
		<main className='min-h-screen'>
			<TaskForm className='pt-32 pb-20' />
			<TaskFilters className='mb-10' />
			<TaskList />
		</main>
	)
}

export default App
