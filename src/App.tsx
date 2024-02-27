import React, { useContext, useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Pomodoro } from './components/Pomodoro';
import { ShortBreak } from './components/ShortBreak';
import { LongBreak } from './components/LongBreak';
import { Context } from './contexts/context';
import { Header } from './components/Header';
import { Configs } from './components/Configs';
import { notificarBreak, notificarPomodoro } from './helpers';

function App() {
  const context = useContext(Context);

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

      <Header setShowModal={setShowModal} />

      {showModal &&
        <Configs setShowModal={setShowModal} />
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
