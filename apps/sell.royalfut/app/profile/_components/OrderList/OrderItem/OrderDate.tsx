"use client";
import React, { useEffect, useState } from "react";

interface IOrderDate {
    createdAt: string;
    hours?: boolean;
}

const OrderDate = ({ createdAt, hours }: IOrderDate) => {
    const [day, setDay] = useState<string | undefined>();
    const [time, setTime] = useState<string | undefined>();

    function AddZero(num: number) {
        return num >= 0 && num < 10 ? `0${num}` : `${num}`;
    }
    useEffect(() => {
        const now = new Date();
        const date = [
            AddZero(now.getMonth() + 1),
            AddZero(now.getDate()),
            now.getFullYear(),
        ].join("/");
        const date2 = [
            AddZero(now.getMonth() + 1),
            AddZero(now.getDate() - 1),
            now.getFullYear(),
        ].join("/");

        const dateParse = new Date(createdAt);

        let formattedDate = `${(dateParse.getMonth() + 1).toString().padStart(2, "0")}/${dateParse.getDate().toString().padStart(2, "0")}/${dateParse.getFullYear()}`;
        if (formattedDate === date) {
            formattedDate = "Today";
        }

        if (formattedDate === date2) {
            formattedDate = "Yesterday";
        }

        const timePart = createdAt
            .substring(createdAt.lastIndexOf("T") + 1)
            .split(".")[0];
        if (timePart) {
            setTime(timePart);
        }
        setDay(formattedDate);
    }, [createdAt]);
    return (
        <div className="flex gap-2 items-center opacity-20">
            {day}
            {hours && `, ${time}`}
            {!hours && <div className="w-full border-y"></div>}
        </div>
    );
};

export default OrderDate;
