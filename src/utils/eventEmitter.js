class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, listener) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(listener);
    }

    off(event, listener) {
        if (!this.events[event]) return;

        this.events[event] = this.events[event].filter(l => l !== listener);
    }

    emit(event, ...args) {
        if (!this.events[event]) return;

        this.events[event].forEach(listener => listener(...args));
    }
}

import { useEffect } from 'react';

export const useEventListener = (eventName, handler, element = window) => {
    useEffect(() => {
        if (!element || !element.addEventListener) return;

        element.addEventListener(eventName, handler);

        return () => {
            element.removeEventListener(eventName, handler);
        };
    }, [eventName, handler, element]);
};

export default EventEmitter;