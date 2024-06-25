"use client";

import { useAuthListener, useRouteChangeListener } from "@royalfut/hooks";
import { useMount } from "@lilib/hooks";

const Watcher = () => {
    useRouteChangeListener();
    const { subscribe } = useAuthListener();

    useMount(() => {
        subscribe();
    });

    return null;
};

export default Watcher;
