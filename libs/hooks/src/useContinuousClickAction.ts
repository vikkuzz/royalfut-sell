"use client";

import { useEffect, useRef, useCallback } from "react";

type ActionCallback = () => void;

export const useContinuousClickAction = (
    callback: ActionCallback,
    interval = 300,
): {
    onMouseDown: () => void;
    onMouseUp: () => void;
    onMouseLeave: () => void;
    onTouchStart: () => void;
    onClick: () => void;
    onTouchEnd: () => void;
} => {
    const timeoutRef = useRef<number | null>(null);

    const startAction = useCallback(() => {
        timeoutRef.current = window.setInterval(callback, interval);
    }, [callback, interval]);

    const endAction = useCallback(() => {
        if (timeoutRef.current) {
            clearInterval(timeoutRef.current);
            timeoutRef.current = null;
        }
    }, []);

    const handleMouseDown = useCallback(() => {
        startAction();
    }, [startAction]);

    const handleMouseUp = useCallback(() => {
        endAction();
    }, [endAction]);

    const handleMouseLeave = useCallback(() => {
        endAction();
    }, [endAction]);

    const handleTouchStart = useCallback(() => {
        startAction();
    }, [startAction]);

    const handleTouchEnd = useCallback(() => {
        endAction();
    }, [endAction]);

    useEffect(() => {
        // Cleanup function to clear interval on unmount
        return () => {
            if (timeoutRef.current) {
                clearInterval(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, []);

    return {
        onMouseDown: handleMouseDown,
        onMouseUp: handleMouseUp,
        onMouseLeave: handleMouseLeave,
        onTouchStart: handleTouchStart,
        onTouchEnd: handleTouchEnd,
        onClick: callback,
    };
};
