import { useContext } from "react";
import { Context } from "../../contexts/context";


export const Configs = ({ setShowModal }: { setShowModal: (value: boolean) => void }) => {
    const context = useContext(Context);

    return (
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
    )
}