/* eslint-disable max-lines */
"use client";

import { forwardRef } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import Link from "next/link";
import { CrossSimpleIcon } from "@royalfut/icons";
import { cn } from "@royalfut/utils";

import type { ElementRef, ComponentPropsWithoutRef } from "react";

const AccordionItem = forwardRef<
    ElementRef<typeof Accordion.Item>,
    ComponentPropsWithoutRef<typeof Accordion.Item>
>(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Item
        className={cn(
            "mt-4 overflow-hidden first:mt-0 focus-within:relative focus-within:z-10 rounded-3xl border border-white-10",
            className
        )}
        {...props}
        ref={forwardedRef}>
        {children}
    </Accordion.Item>
));
AccordionItem.displayName = Accordion.Item.displayName;

const AccordionTrigger = forwardRef<
    ElementRef<typeof Accordion.Trigger>,
    ComponentPropsWithoutRef<typeof Accordion.Trigger>
>(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Header className="flex">
        <Accordion.Trigger
            className={cn(
                "text-white group flex flex-1 cursor-default items-center p-2 justify-between bg-black-1  text-2xl font-bold leading-none outline-none",
                className
            )}
            {...props}
            ref={forwardedRef}>
            <div className="w-full h-full group-hover:bg-white/5 text-left transition-colors duration-300 flex rounded-2xl px-6 py-4 justify-between items-center">
                {children}
                <CrossSimpleIcon className="text-white group-data-[state=open]:rotate-[315deg] transition-transform duration-500 w-8 h-8" />
            </div>
            {/* <ChevronDownIcon
          className="text-violet10 ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180"
          aria-hidden
        /> */}
        </Accordion.Trigger>
    </Accordion.Header>
));
AccordionTrigger.displayName = Accordion.Trigger.displayName;

const AccordionContent = forwardRef<
    ElementRef<typeof Accordion.Content>,
    ComponentPropsWithoutRef<typeof Accordion.Content>
>(({ children, className, ...props }, forwardedRef) => (
    <Accordion.Content
        className={cn(
            "text-white-60 bg-black-1 data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-base font-medium",
            className
        )}
        {...props}
        ref={forwardedRef}>
        <div className="pt-1.5 pb-4 px-8">{children}</div>
    </Accordion.Content>
));
AccordionContent.displayName = Accordion.Content.displayName;

const AccordionQuestions = () => {
    return (
        <Accordion.Root className="w-full rounded-md" type="multiple">
            <AccordionItem value="item-1">
                <AccordionTrigger>
                    Why should I choose ROYALFUT?
                </AccordionTrigger>
                <AccordionContent>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            The ROYALFUT customer is always guaranteed the
                            following:
                            <br />
                        </span>
                        <ul className="[--style-disc-t:0.625rem] leading-tight text-white-60 text-base font-medium list-style-disc-centerd">
                            <li>Prices lower than any of the competitors</li>
                            <li>
                                Security for your account and a full refund if
                                the coins are not delivered
                            </li>
                            <li>Minimal shipping time for FIFA 23 Coins</li>
                            <li>
                                24/7 support via Live Chat, WhatsApp, email or
                                Instagram Direct.
                            </li>
                        </ul>
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
                <AccordionTrigger>
                    How do I change my EA account details on the website?
                </AccordionTrigger>
                <AccordionContent>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            Using the phone:
                            <br />
                        </span>
                        <ul className="leading-tight text-white-60 text-base font-medium list-inside list-decimal">
                            <li>
                                Open the menu on the right by tapping the three
                                bar button.
                            </li>
                            <li>
                                Tap at your nickname. If there is no nickname,
                                please log in to your ROYALFUT account.
                            </li>
                            <li>
                                At the bottom of your profile page you will see
                                the EA account data entry form.
                            </li>
                        </ul>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            Using the desktop device:
                            <br />
                        </span>
                        <ul className="leading-tight text-white-60 text-base font-medium list-inside list-decimal">
                            <li>
                                Click at your nickname in the upper right corner
                                of the screen. If there is no nickname, please
                                log in to your ROYALFUT account.
                            </li>
                            <li>
                                At the bottom of your profile page you will see
                                the EA account data entry form.
                            </li>
                        </ul>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger>
                    What should I do to prepare my club to money transfer?
                </AccordionTrigger>
                <AccordionContent>
                    <div>
                        <ul className="[--style-disc-t:0.625rem] leading-tight text-white-60 text-base font-medium list-style-disc-centerd">
                            <li>
                                There must be at least 5000 coins on your FUT
                                club balance
                            </li>
                            <li>
                                While money transfer is in process please log
                                out from FIFA Ultimate Team mode and do not use
                                FUT Companion or FUT Web App.
                            </li>
                            <li>
                                You should assign a default FUT club (only in
                                case you have more than one club on account)
                            </li>
                            <li>
                                For new players! Unlock the access to the
                                transfer market so you could use the coin
                                transfer.
                            </li>
                            <li>
                                Your backup codes can be found on the following
                                link{" "}
                                <a
                                    href="https://myaccount.ea.com/cp-ui/security/index"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-white underline">
                                    https://myaccount.ea.com/cp-ui/security/index
                                </a>
                                .{" "}
                                <span className="text-white">
                                    Please keep in mind that you should use the
                                    same login details for both EA portal and
                                </span>{" "}
                                <Link
                                    href="https://royalfut.com/"
                                    target="_blank"
                                    className="text-white underline">
                                    https://royalfut.com/
                                </Link>{" "}
                                website.
                            </li>
                        </ul>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
                <AccordionTrigger>
                    How do I use the ROYALFUT coupon?
                </AccordionTrigger>
                <AccordionContent>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            You can apply the coupon at the checkout stage. Each
                            coupon offers a different discount. After you apply
                            the coupon, the cost of your purchase will be
                            adjusted automatically.
                        </span>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
                <AccordionTrigger>
                    Is purchasing coins at ROYALFUT.COM safe?
                </AccordionTrigger>
                <AccordionContent>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            Yes, it is completely safe. After more than 5000
                            orders successfully completed using our delivery
                            algorithms, no user has ever encountered a FUT club
                            ban or reset.
                            <br />
                            We also use reliable third-party payment systems to
                            accept payments on the website. Our current partners
                            like PayPal or PayApp use encryption to guarantee
                            100% safety of your payments.
                        </span>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
                <AccordionTrigger>
                    Which countries ROYALFUT operates in?
                </AccordionTrigger>
                <AccordionContent>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            We deliver the coins to FUT players worldwide.
                        </span>
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
                <AccordionTrigger>
                    Do you buy coins from users?
                </AccordionTrigger>
                <AccordionContent>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            Not at the moment. We will update the topic if the
                            situation changes.
                        </span>
                    </div>
                </AccordionContent>
            </AccordionItem>
        </Accordion.Root>
    );
};

export default AccordionQuestions;
