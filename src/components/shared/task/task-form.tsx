import { addNewTask } from '@/store/tasks'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input,
} from '../../ui'
import { Container } from '../container'

interface Props {
	className?: string
}

const formSchema = z.object({
	task: z.string().min(5, {
		message: 'Название не может быть меньше 5 символов',
	}),
})

export const TaskForm: React.FC<Props> = ({ className }) => {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			task: '',
		},
	})

	const onSubmit = (values: z.infer<typeof formSchema>) => {
		addNewTask(values.task)
		form.reset()
	}

	return (
		<Container className={className}>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<FormField
						control={form.control}
						name='task'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Новая задача</FormLabel>
								<FormControl>
									<Input placeholder='Название задачи' {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button className='mt-3 cursor-pointer' type='submit'>
						Добавить
					</Button>
				</form>
			</Form>
		</Container>
	)
}
