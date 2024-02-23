import React, { useEffect, useState } from 'react';
import './styles.css';

type Props = {
    minutes: number;
    seconds: number;
}

export const ShortBreak = ({ minutes, seconds }: Props) => {

    return (
        <div>
            <h1>{minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
        </div>
    );
};
