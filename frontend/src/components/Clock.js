import { useEffect, useState } from 'react';

const Clock = ({ time, onTimeUp }) => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            // Update minutes and seconds
            // time = time * 60;
            const minutes = Math.floor(time/60);
            const seconds = (time) % 60;
            setMinutes(minutes);
            setSeconds(seconds);

            // Decrement time by 1 second
            time -= 1;
            // Clear interval when time reaches 0
            if (time === 0) {
                clearInterval(interval);
                // Call onTimeUp function when time reaches 0
                if (typeof onTimeUp === 'function') {
                    onTimeUp();
                }
            }
            // Clear interval when time reaches 0
            // if (time < 0) clearInterval(interval);
        }, 1000);

        return () => clearInterval(interval);
    }, [time]);

    // Add leading zeros if needed
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return (
        <span className="countdown font-mono text-3xl py-3">
            <span style={{ '--value': formattedMinutes }}></span>m 
            <span style={{ '--value': formattedSeconds }}></span>s
        </span>
    );
};

export default Clock;
