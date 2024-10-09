"use client";

import { isBrowser } from "../is";

type TMessageCallback = (event: MessageEvent<any>) => void | Promise<void>;

class SafeBroadcastChannel {
    private channelName: string;
    private channel: BroadcastChannel | null;
    private listeners: Set<TMessageCallback>;
    private onLocalStorageMessage: TMessageCallback | null = null;

    constructor(
        channelName: string,
        api: "broadcast" | "storage" = "broadcast"
    ) {
        this.channelName = channelName;
        this.listeners = new Set();

        if (isBrowser()) {
            if ("BroadcastChannel" in window && api !== "storage") {
                this.channel = new BroadcastChannel(channelName);
            } else {
                // Polyfill using localStorage
                this.channel = null;
                this.initLocalStoragePolyfill();
            }
        } else {
            this.channel = null;
        }
    }

    private initLocalStoragePolyfill() {
        window.addEventListener(
            "storage",
            this.localStorageListener.bind(this)
        );
    }

    /**
     * @description Listener for localStorage changes (polyfill behavior)
     */
    private localStorageListener(event: StorageEvent) {
        if (event.key === this.channelName && event.newValue) {
            const data = JSON.parse(event.newValue);
            this.listeners.forEach(listener =>
                listener({ data } as MessageEvent<any>)
            );
            // if (this.onLocalStorageMessage) {
            //   this.onLocalStorageMessage({ data });
            // }
        }
    }

    /**
     * @description Send a message using either BroadcastChannel or localStorage
     */
    postMessage(message: any) {
        if (this.channel) {
            this.channel.postMessage(message);
        } else {
            localStorage.setItem(this.channelName, JSON.stringify(message));
            setTimeout(() => localStorage.removeItem(this.channelName), 100);
        }
    }

    close() {
        if (this.channel) {
            this.channel.close();
        } else {
            window.removeEventListener("storage", this.localStorageListener);
        }
    }

    addEventListener(callback: TMessageCallback) {
        this.listeners.add(callback);

        if (this.channel) {
            this.channel.onmessage = event => {
                this.listeners.forEach(listener => listener(event));
            };
        }
    }

    removeEventListener(callback: TMessageCallback) {
        this.listeners.delete(callback);

        if (this.channel && this.listeners.size === 0) {
            this.channel.onmessage = null;
        }
    }

    set onmessage(callback: TMessageCallback | null) {
        if (this.channel) {
            this.channel.onmessage = callback || null;
        } else {
            this.onLocalStorageMessage = callback;
        }
    }

    get onmessage(): TMessageCallback | BroadcastChannel["onmessage"] {
        return this.channel
            ? this.channel.onmessage
            : this.onLocalStorageMessage;
    }
}

export default SafeBroadcastChannel;
