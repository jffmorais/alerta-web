import React, { useState, useEffect } from 'react';
import './style.css';

export default function Timer({ emitido }) {

    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [counter, setCounter] = useState(0);

    useEffect(() => {
        let intervalId;

        if (emitido.active) {
            intervalId = setInterval(() => {
                const secondCounter = counter % 60;
                const minuteCounter = Math.floor(counter / 60);

                const computedSecond = String(secondCounter).length === 1 ? `0${secondCounter}` : secondCounter;
                const computedMinute = String(minuteCounter).length === 1 ? `0${minuteCounter}` : minuteCounter;

                setSecond(computedSecond);
                setMinute(computedMinute);

                setCounter(counter => counter + 1);
            }, 1000)
        }

        return () => clearInterval(intervalId);
    }, [counter])

    return (
        <div className="timer">
            <span>{minute}</span>
            <span>:</span>
            <span>{second}</span>
        </div>
    )
}