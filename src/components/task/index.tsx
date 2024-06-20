/* eslint-disable prettier/prettier */
import { TaskInfo } from '@/stores/taskStore';
import seedrandom from 'seedrandom';
import "./style.css"

interface TaskProps {
	task: TaskInfo;
	isDone: boolean;
}

function generateVividColor(seed: number) {
	const rng = seedrandom(seed.toString());
  
	const choices = [0, 255];
	const r = choices[Math.floor(rng() * choices.length)];
	const g = choices[Math.floor(rng() * choices.length)];
	const b = choices[Math.floor(rng() * choices.length)];

	if (r === 0 && g === 0 && b === 0) {
	  const index = Math.floor(rng() * 3);
	  if (index === 0) {
		return `#ff${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}50`;
	  } else if (index === 1) {
		return `#${r.toString(16).padStart(2, '0')}ff${b.toString(16).padStart(2, '0')}50`;
	  } else {
		return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}ff50`;
	  }
	}
  
	return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}50`;
  }

export default function Task({ task, isDone }: TaskProps) {
	const borderColor = generateVividColor(task.taskGroup);

	return (
		<li className={!isDone ? "todo-task-container" : "done-task-container"} 
			style={{ borderColor: borderColor, borderWidth: '3px', borderStyle: 'solid' }}>
			<div className='task-container'>
				<div>{task.task}</div>
				{task.priority > 0 ? (
					<div className='task-priority'>{task.priority}</div>
				) : null}
			</div>
		</li>);
}
