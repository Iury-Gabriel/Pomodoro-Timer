import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Pomodoro } from './components/Pomodoro';
import { ShortBreak } from './components/ShortBreak';
import { LongBreak } from './components/LongBreak';
import { Context } from './contexts/context';

function App() {
  const context = useContext(Context);

  const notificarPomodoro = () => {
    if ('Notification' in window) {

      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Pomodoro concluído!', {
            body: 'Seu tempo de Pomodoro terminou. Hora de fazer uma pausa!',
          });
        }
      });
    }
  };

  const notificarBreak = () => {
    if ('Notification' in window) {

      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('Pausa concluído!', {
            body: 'Seu tempo de pausa terminou. Hora de voltar para o Pomodoro',
          });
        }
      });
    }
  };


  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [breaks, setBreaks] = useState(0);

  const [selectedButton, setSelectedButton] = useState('Pomodoro');
  const [isRunning, setIsRunning] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = (buttonName: string) => {
    setSelectedButton(buttonName);
    if (buttonName === 'Pomodoro') {
      setMinutes(context.Pomodoro);
      setSeconds(0);
      setIsRunning(false);
    }
    if (buttonName === 'Short_Break') {
      setMinutes(context.ShortBreak);
      setSeconds(0);
      setIsRunning(false);
    }
    if (buttonName === 'Long_Break') {
      setMinutes(context.LongBreak);
      setSeconds(0);
      setIsRunning(false);
    }
  };

  useEffect(() => {
    if (selectedButton === 'Pomodoro') {
      setMinutes(context.Pomodoro);
    } else if (selectedButton === 'Short_Break') {
      setMinutes(context.ShortBreak);
    } else if (selectedButton === 'Long_Break') {
      setMinutes(context.LongBreak);
    }

    setSeconds(0);
    setIsRunning(false);
  }, [context, selectedButton]);

  useEffect(() => {
    if (isRunning) {
      const timer = setInterval(() => {
        setSeconds(prevSeconds => {
          if (prevSeconds === 0) {
            setMinutes(prevMinutes => {
              if (prevMinutes === 0) {
                setBreaks(prevBreaks => prevBreaks + 1);
                if (selectedButton === 'Pomodoro') {
                  notificarPomodoro();
                  if (breaks === 4) {
                    setSelectedButton('Long_Break')
                    clearInterval(timer);
                    setIsRunning(false)
                    setMinutes(context.LongBreak);
                    setSeconds(0);
                    return 0;
                  } else {
                    setSelectedButton('Short_Break')
                    clearInterval(timer);
                    setIsRunning(false)
                    setMinutes(context.ShortBreak);
                    setSeconds(0);
                    return 0;
                  }
                } else {
                  notificarBreak();
                  setSelectedButton('Pomodoro')
                  clearInterval(timer);
                  setIsRunning(false)
                  setMinutes(context.Pomodoro);
                  setSeconds(0);
                  return 0;
                }
              }
              return prevMinutes - 1;
            });
            return 59;
          }
          return prevSeconds - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [isRunning]);

  return (
    <div className={`App ${selectedButton}`}>

      <div className="containerHeader">
        <div className="leftSide">
          <h1>Pomodoro</h1>
          <img src='../../../public/assets/istockphoto-1031925314-612x612.jpg' alt="" />
        </div>
        <div className="rightSide">
          <button onClick={() => setShowModal(true)}>Configurações</button>
        </div>
      </div>

      {showModal &&
        <div className="modal-overlay">
          <div className='modal'>
            <div className='modal-content'>
              <h2>Configurações</h2>
              <hr />
              <div className="config">
                <h4>TIMER</h4>
                <h5>Time (minutes)</h5>
                <div className="timers">
                  <div className="timer">
                    <label htmlFor="pomodoro">Pomodoro</label>
                    <input
                      id="pomodoro"
                      type="number"
                      name="pomodoro"
                      min="1"
                      max="60"
                      required
                      value={String(context.Pomodoro)}
                      onChange={(e) => context.setPomodoro(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="timer">
                    <label htmlFor="shortbreak"> Short Break</label>
                    <input
                      id="shortbreak"
                      type="number"
                      name="shortbreak"
                      min="1"
                      max="60"
                      required
                      value={String(context.ShortBreak)}
                      onChange={(e) => context.setShortBreak(parseInt(e.target.value))}
                    />
                  </div>
                  <div className="timer">
                    <label htmlFor="longbreak">Long Break</label>
                    <input
                      id="longbreak"
                      type="number"
                      name="longbreak"
                      min="1"
                      max="60"
                      required
                      value={String(context.LongBreak)}
                      onChange={(e) => context.setLongBreak(parseInt(e.target.value))}
                    />
                  </div>

                </div>
              </div>
              <button onClick={() => setShowModal(false)}>Fechar</button>
            </div>
          </div>
        </div>
      }

      <div className='container'>
        <div className="elements">
          <div className="area-buttons">
            <button
              onClick={() => handleButtonClick('Pomodoro')}
              className={selectedButton === 'Pomodoro' ? 'active' : 'btn'}
            >
              Pomodoro
            </button>
            <button
              onClick={() => handleButtonClick('Short_Break')}
              className={selectedButton === 'Short_Break' ? 'active' : 'btn'}
            >
              Pausa
            </button>
            <button
              onClick={() => handleButtonClick('Long_Break')}
              className={selectedButton === 'Long_Break' ? 'active' : 'btn'}
            >
              Pausa longa
            </button>
          </div>
          <div className="timer">
            {selectedButton === 'Pomodoro' && <Pomodoro minutes={minutes} seconds={seconds} />}
            {selectedButton === 'Short_Break' && <ShortBreak minutes={minutes} seconds={seconds} />}
            {selectedButton === 'Long_Break' && <LongBreak minutes={minutes} seconds={seconds} />}
          </div>
          <div className="button">
            {isRunning ? (
              <button className={`c${selectedButton}`} onClick={() => setIsRunning(false)}>PAUSAR</button>
            ) : (
              <button className={`c${selectedButton}`} onClick={() => setIsRunning(true)}>COMEÇAR</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
