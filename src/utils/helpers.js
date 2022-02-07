import { userApi } from "./api";

import isEmpty from 'lodash/isEmpty';
import lscache from 'lscache';

import { getUserData, setUserData } from "./storage";

export const hasSession = () => {
    if (isEmpty(lscache)) {
        return false;
    }

    const userData = getUserData();
    if (isEmpty(userData)) {
        userApi().then((res) => {
            const userData = res.data;

            setUserData(userData);

            return true;
        }).catch((e) => {
            return false;
        })
    } else {
        return true;
    }
}


export function listenToCustomEvent(event, callback) {
    try {
        if (typeof document !== 'undefined' && document != null) {
            document.documentElement.addEventListener(event, callback);
        }

    } catch (error) {
        console.log(`Error in listening to ${event} custom event: `, error);
    }
}

export function unListenToCustomEvent(event, callback) {
    try {
        if (typeof document !== 'undefined' && document != null) {
            document.documentElement.removeEventListener(event, callback);
        }

    } catch (error) {
        console.log(` Error in unListening to ${event} custom event: `, error);
    }
}


export function dispatchCustomEvent(eventName, eventDetails = {}) {
    if (typeof document !== 'undefined' && document != null) {
        const temp = document.documentElement;

        temp.dispatchEvent(new CustomEvent(eventName, { detail: eventDetails }));
    }
}