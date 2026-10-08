import { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { BriefingTime, DEFAULT_BRIEFING_TIME } from './briefingTime';
import { loadBriefingTime, saveBriefingTime } from './storage';

type SettingsContextValue = {
    briefingTime: BriefingTime;
    setBriefingTime: (hour: number, minute: number) => void;
    loaded: boolean;
};

const SettingsContext = createContext<SettingsContextValue | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
    const [briefingTime, setTime] = useState<BriefingTime>(DEFAULT_BRIEFING_TIME);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        loadBriefingTime().then((saved) => {
            setTime(saved);
            setLoaded(true);
        });
    }, []);

    useEffect(() => {
        if (loaded) saveBriefingTime(briefingTime);
    }, [briefingTime, loaded]);

    const value: SettingsContextValue = {
        briefingTime,
        setBriefingTime: (hour, minute) => setTime({ hour, minute }),
        loaded,
    };

    return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): SettingsContextValue {
    const ctx = useContext(SettingsContext);
    if (!ctx) throw new Error('useSettings must be used inside SettingsProvider');
    return ctx;
}