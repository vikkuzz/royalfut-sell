"use client";

import { useAuthListener, useRouteChangeUIListener } from "@royalfut/hooks";
import { useMount } from "@lilib/hooks";

const Watcher = () => {
    useRouteChangeUIListener();
    const { subscribe } = useAuthListener();

    useMount(() => {
        subscribe();
    });

    return null;
};

export default Watcher;
