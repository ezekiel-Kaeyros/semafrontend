import { fiftyNineSeconds, padVar, twentyFourHours, zero } from "./constants";

export const countdownTimer = (): any => {
    let hours = twentyFourHours;
    let minutes = zero;
    let seconds = zero;

    const formatTime = (value: any) => {
        return value.toString().padStart(padVar, '0');
    };

    const timer = setInterval(() => {
        if (seconds > zero) {
            seconds--;
        } else {
            if (minutes > zero) {
                minutes--;
                seconds = fiftyNineSeconds;
            } else {
                if (hours > zero) {
                    hours--;
                    minutes = fiftyNineSeconds;
                    seconds = fiftyNineSeconds;
                } else {
                    clearInterval(timer);
                    console.log('Timer has reached 00:00:00');
                }
            }
        }

        const formattedTime = `${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`;
        console.log(formattedTime);
    }, 1000);

    return timer
}