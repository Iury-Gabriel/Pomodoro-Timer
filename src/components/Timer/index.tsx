import './styles.css';

type Props = {
    minutes: number;
    seconds: number;
}

export const Timer = ({ minutes, seconds }: Props) => {

    return (
        <div>
            <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
        </div>
    );
};
