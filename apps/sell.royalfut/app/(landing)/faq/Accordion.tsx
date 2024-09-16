/* eslint-disable max-lines */
"use client";

import { FAQAccordion } from "@royalfut/components";
import Link from "next/link";

const AccordionQuestions = () => {
    return (
        <FAQAccordion.Root type="multiple">
            <h2 className="text-bold text-4xl pb-2">
                Selling Coins via Comfort Trade
            </h2>
            <FAQAccordion.Item value="item-1">
                <FAQAccordion.Trigger>
                    How does Comfort Trade work?
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            To sell coins via Comfort Trade, we need to log into
                            your account on the Web App and transfer the coins.
                            To ensure the process goes smoothly, please ensure
                            your account information is 100% correct.
                        </span>
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>

            <FAQAccordion.Item value="item-2">
                <FAQAccordion.Trigger>
                    What do I need to know about Comfort Trade?
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        <ul className="leading-tight text-white-60 text-base font-medium list-inside list-disc">
                            <li>
                                You need to provide your Web App email and
                                password (along with 6 Backup Codes).
                            </li>
                            <li>
                                Your account MUST have gained access to the
                                Transfer Market on the FUT Web App.
                            </li>
                            <li>
                                Please DO NOT log in to your FUT account on any
                                other devices/consoles during the transfer.
                            </li>
                            <li>
                                Your account will be returned safely after we
                                transfer the coins.
                            </li>
                            <li>
                                The minimum amount of coins we accept is 100,000
                                coins.
                            </li>
                        </ul>
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-3">
                <FAQAccordion.Trigger>
                    How do I get EA/Origin Backup Codes?
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        <ul className="leading-tight text-white-60 text-base font-medium list-inside list-decimal">
                            <li>
                                Log on to{" "}
                                <Link href={"https://www.origin.com"}>
                                    www.origin.com
                                </Link>{" "}
                                with your Web App email and password.
                            </li>
                            <li>
                                Click “Account Settings,” then choose
                                “Security.” Ensure your Login Verification
                                Status is “On.”
                            </li>
                            <li>
                                Click “View” to get the Backup Codes. Ensure the
                                backup codes you submit are all unused. You can
                                also click “Create New Codes” if they are all
                                used.
                            </li>
                        </ul>
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-4">
                <FAQAccordion.Trigger>
                    What should I do to prepare my club for the coin transfer?
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        <ul className="leading-tight text-white-60 text-base font-medium list-inside list-disc">
                            <li>
                                Ensure there are at least 5,000 coins on your
                                FUT club balance.
                            </li>
                            <li>
                                While the coin transfer is in process, please
                                log out from FIFA Ultimate Team mode and do not
                                use the FUT Companion or FUT Web App.
                            </li>
                            <li>
                                Assign a default FUT club (only if you have more
                                than one club on your account).
                            </li>
                            <li>
                                For new players, unlock access to the transfer
                                market to use the coin transfer.
                            </li>
                            <li>
                                Your backup codes can be found here: EA
                                Security. Use the same login details for both
                                the EA portal and the ROYALFUT website.
                            </li>
                        </ul>
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-5">
                <FAQAccordion.Trigger>
                    When can I log back into my account?
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            You can check the status on the Order History page.
                            When the status is Transfer Completed, Available,
                            you can log back into your account.
                        </span>
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>

            <h2 className="text-bold text-4xl pt-8 pb-2">
                Payment and Withdrawal
            </h2>

            <FAQAccordion.Item value="item-6">
                <FAQAccordion.Trigger>
                    How do I get payment after selling?
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        <ul className="leading-tight text-white-60 text-base font-medium list-inside list-decimal">
                            <li>
                                We will use the account according to the time
                                you choose when submitting.
                            </li>
                            <li>
                                After the account is used up, we will review and
                                check the used account, usually taking 24-48
                                hours.
                            </li>
                            <li>
                                Once the review is completed, the corresponding
                                amount will be sent to the Available Balance.
                                You can proceed with the withdrawal if the
                                amount reaches the minimum withdrawal amount.
                            </li>
                            <li>
                                Click the &quot;Withdraw&quot; button on the
                                &quot;Sell Record-Comfort Trade&quot; page to
                                access the withdrawal page, where you can see
                                the handling fees corresponding to different
                                payment methods. You can also modify payment
                                information if there are any issues.
                            </li>
                            <li>
                                If you are certain there are no problems, you
                                can withdraw at this time. After clicking the
                                withdrawal button, you cannot modify any
                                information. If the withdrawal is successful, a
                                pop-up window will notify you.
                            </li>
                            <li>
                                Returning to the Comfort Trade page, you will
                                see the corresponding amount displayed under
                                &quot;Payment in progress&quot;. Normally, we
                                will complete the payout within 3 days after you
                                submit the withdrawal request.
                            </li>
                            <li>
                                If you have any questions after withdrawing,
                                please contact customer service in time before
                                payment. Otherwise, we will not assume any
                                responsibility.
                            </li>
                        </ul>
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-7">
                <FAQAccordion.Trigger>
                    Which payment methods do you offer?
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        <ul className="leading-tight text-white-60 text-base font-medium list-inside list-disc">
                            <li>Visa/MasterCard</li>
                            <li>Cryptocurrencies</li>
                        </ul>
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-8">
                <FAQAccordion.Trigger>
                    How long do I have to wait until I get my payment?
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            Payment will be sent within 1-3 days after you
                            submit the withdrawal request. (In some cases, such
                            as holidays, it might be delayed.)
                        </span>
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
            <FAQAccordion.Item value="item-9">
                <FAQAccordion.Trigger>
                    Still have questions?
                </FAQAccordion.Trigger>
                <FAQAccordion.Content>
                    <div>
                        <span className="text-white-60 text-base font-medium leading-tight">
                            If you have any further questions or need
                            assistance, please contact our 24/7 support via Live
                            Chat, WhatsApp, email, or Instagram Direct.
                        </span>
                    </div>
                </FAQAccordion.Content>
            </FAQAccordion.Item>
        </FAQAccordion.Root>
    );
};

export default AccordionQuestions;
