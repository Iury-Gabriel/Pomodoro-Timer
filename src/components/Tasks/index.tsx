import './styles.css';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddIcon from '@mui/icons-material/Add';
import { useReducer, useState } from 'react';
import { listReducer } from '../../reducers/listReducer';
import { Task } from '../Task';

export const Tasks = () => {
    const [taskInput, setTaskInput] = useState('');
    const [tasks, dispatch] = useReducer(listReducer, []);
    const [showModal, setShowModal] = useState(false);

    const handleToggleDone = (id: number) => {
        dispatch({
            type: 'toggleDone',
            payload: { id },
        });
    };

    const handleAddTask = () => {
        if (taskInput.trim() !== '') {
            dispatch({
                type: 'add',
                payload: {
                    text: taskInput
                }
            })
            setTaskInput('')
        }
    }

    const handleEditTask = (id: number, newText: string) => {
        dispatch({
            type: 'editText',
            payload: {
                id,
                newText,
            },
        });
    };

    const handleRemoveTask = (id: number) => {
        dispatch({
            type: 'remove',
            payload: {
                id,
            },
        });
    };

    const handleClearAll = () => {
        dispatch({
            type: 'clearAll',
        });
        setShowModal(false);
    };

    const handleClearDone = () => {
        dispatch({
            type: 'clearDone',
        });
        setShowModal(false);
    }

    const handleDoneAll = () => {
        dispatch({
            type: 'doneAll',
        });
        setShowModal(false);
    };

    return (
        <div className='tasks'>
            <div className="taskHeader">
                <h1>Tasks</h1>
                <div className="taskHeader--btn" onClick={() => setShowModal(true)}>
                    <MoreVertIcon className='more' />
                </div>
                {showModal && (
                    <div className='settings2'>
                        <div className='settings-content2'>
                            <button onClick={handleClearAll}>Excluir todas as tasks</button>
                            <button onClick={handleClearDone}>Excluir as tasks feitas</button>
                            <button onClick={handleDoneAll}>Marcar todas como feita</button>
                            <button onClick={() => setShowModal(false)}>Fechar</button>
                        </div>
                    </div>
                )}
            </div>
            <div className="taskArea">
                <input type="text" placeholder='Nome da tarefa' value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
                <div className='button' onClick={handleAddTask}>
                    <AddIcon className='add' />
                    <p>Adicionar</p>
                </div>
            </div>
            <div className="allTasks">
                {tasks.map(task => (
                    <Task
                        key={task.id}
                        id={task.id}
                        task={task.text}
                        done={task.done}
                        onToggleDone={handleToggleDone}
                        onEditTask={handleEditTask} // Passa a função de edição
                        onRemoveTask={handleRemoveTask} // Passa a função de remoção
                    />
                ))}
            </div>
        </div>
    );
}
