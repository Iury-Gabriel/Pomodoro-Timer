import MoreVertIcon from '@mui/icons-material/MoreVert';
import './styles.css'

type Props = {
    id: number;
    task: string;
    done: boolean;
    onToggleDone: (id: number) => void;
}

export const Task = ({ id, task, done, onToggleDone }: Props) => {

    const handleToggleDone = () => {
        onToggleDone(id);
    };

    return (
        <div className='task'>
            <div className='taskName'>
                <input type='checkbox' checked={done} onChange={handleToggleDone} />
                <p className={`taskText ${done ? 'done' : ''}`}>{task}</p>
            </div>
            <div className="moreIcon">
                <MoreVertIcon className='icon' />
            </div>
        </div>
    )
}