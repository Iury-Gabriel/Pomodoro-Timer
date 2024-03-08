import MoreVertIcon from '@mui/icons-material/MoreVert';
import './styles.css';
import { useState } from 'react';

type Props = {
    id: number;
    task: string;
    done: boolean;
    onToggleDone: (id: number) => void;
    onEditTask: (id: number, newText: string) => void; // Adicionamos a propriedade de edição
    onRemoveTask: (id: number) => void; // Adicionamos a propriedade de remoção
};

export const Task = ({ id, task, done, onToggleDone, onEditTask, onRemoveTask }: Props) => {
    const [showSettings, setShowSettings] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [editedTask, setEditedTask] = useState(task);

    const handleToggleDone = () => {
        onToggleDone(id);
    };

    const handleSettingsClick = () => {
        setShowSettings(true);
    };

    const handleEditButton = () => {
        setShowEditModal(true);
        setShowSettings(false)
    };

    const handleSaveEdit = () => {
        onEditTask(id, editedTask);
        setShowEditModal(false);
        setShowSettings(false);
    };

    const handleRemoveButton = () => {
        onRemoveTask(id);
        setShowSettings(false);
    };

    return (
        <div className='task'>
            <div className='taskName'>
                <input type='checkbox' checked={done} onChange={handleToggleDone} />
                <p className={`taskText ${done ? 'done' : ''}`}>{task}</p>
            </div>
            <div className="moreIcon" onClick={handleSettingsClick}>
                <MoreVertIcon className='icon' />
            </div>

            {showSettings && (
                <div className='settings'>
                    <div className='settings-content'>
                        <button onClick={handleEditButton}>Editar</button>
                        <button onClick={handleRemoveButton}>Excluir</button>
                        <button onClick={() => setShowSettings(false)}>Fechar</button>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className='edit-modal'>
                    <div className='edit-modal-content'>
                        <input
                            type='text'
                            value={editedTask}
                            onChange={(e) => setEditedTask(e.target.value)}
                        />
                        <button onClick={handleSaveEdit}>Salvar</button>
                    </div>
                </div>
            )}
        </div>
    );
};
