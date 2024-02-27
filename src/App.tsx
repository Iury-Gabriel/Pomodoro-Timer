import { useState } from 'react';
import './App.css';
import { Header } from './components/Header';
import { Configs } from './components/Configs';
import { Main } from './components/Main';

function App() {

  const [showModal, setShowModal] = useState(false);
  const [selectedButton, setSelectedButton] = useState('Pomodoro');

  return (
    <div className={`App ${selectedButton}`}>

      <Header setShowModal={setShowModal} />

      {showModal &&
        <Configs setShowModal={setShowModal} />
      }

      <Main selectedButton={selectedButton} setSelectedButton={setSelectedButton} />

      
    </div>
  );
}

export default App;
