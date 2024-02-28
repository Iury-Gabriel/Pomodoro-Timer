import MoreVertIcon from '@mui/icons-material/MoreVert';
import './styles.css'
import { useState } from 'react';

type Props = {
    id: number;
    task: string;
    done: boolean;
    onToggleDone: (id: number) => void;
}

export const Task = ({ id, task, done, onToggleDone }: Props) => {

    const [showSettings, setShowSettings] = useState(false);

    const handleToggleDone = () => {
        onToggleDone(id);
    };

    const handleSettingsClick = () => {
        setShowSettings(true);
    }

    return (
        <div className='task'>
            <div className='taskName'>
                <input type='checkbox' checked={done} onChange={handleToggleDone} />
                <p className={`taskText ${done ? 'done' : ''}`}>{task}</p>
            </div>
            <div className="moreIcon" onClick={handleSettingsClick}>
                <MoreVertIcon className='icon' />
            </div>

            {showSettings &&
                <div className='settings'>
                    <div className='settings-content'>
                        <h4>Em breve funcionalidades para as tasks, como apagar e etc</h4>
                        <button onClick={() => setShowSettings(false)}>Fechar</button>
                    </div>
                </div>
            }
        </div>
    )
}