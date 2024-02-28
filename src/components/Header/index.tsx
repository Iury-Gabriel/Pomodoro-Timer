

export const Header = ({ setShowModal }: { setShowModal: (value: boolean) => void }) => {
    return (
        <div className="header">
            <div className="containerHeader">
                <div className="leftSide">
                    <h1>Pomodoro - Fase Beta</h1>
                    <img src='../../../public/assets/istockphoto-1031925314-612x612.jpg' alt="" />
                </div>
                <div className="rightSide">
                    <button onClick={() => setShowModal(true)}>Configurações</button>
                </div>
            </div>
        </div>
    );
}