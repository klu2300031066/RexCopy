import { useState, useEffect } from 'react';

const useStreak = (storageKey) => {
    const [streak, setStreak] = useState(0);
    const [lastActiveDate, setLastActiveDate] = useState(null);

    // Initialize from LocalStorage
    useEffect(() => {
        const storedData = JSON.parse(localStorage.getItem(storageKey));
        if (storedData) {
            setStreak(storedData.streak || 0);
            setLastActiveDate(storedData.lastActiveDate || null);
        }
    }, [storageKey]);

    const updateStreak = () => {
        const today = new Date().toISOString().split('T')[0];

        // If no previous streak, start one
        if (!lastActiveDate) {
            const newStreak = 1;
            setStreak(newStreak);
            setLastActiveDate(today);
            localStorage.setItem(storageKey, JSON.stringify({ streak: newStreak, lastActiveDate: today }));
            return;
        }

        // If already updated today, do nothing
        if (lastActiveDate === today) {
            return;
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split('T')[0];

        let newStreak;

        if (lastActiveDate === yesterdayStr) {
            // Consecutive day
            newStreak = streak + 1;
        } else {
            // Missed a day or more (reset)
            newStreak = 1;
        }

        setStreak(newStreak);
        setLastActiveDate(today);
        localStorage.setItem(storageKey, JSON.stringify({ streak: newStreak, lastActiveDate: today }));
    };

    return { streak, updateStreak };
};

export default useStreak;
