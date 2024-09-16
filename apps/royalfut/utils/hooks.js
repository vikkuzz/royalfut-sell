import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { usePathname } from "next/navigation";

export function useSse() {
    const token = useSelector(state => state.royalfutReducer.user.token);
    const pathname = usePathname();
    let count = 0;

    const [message, setMessage] = useState(null);

    useMemo(() => {
        if (token) {
            const source = new EventSource(
                `https://test-royalfut.com/newapi/sse/${token}`
            );

            const fetchData = async source => {
                source.onmessage = function (event) {
                    let mess = JSON.parse(event.data);
                    switch (mess.messageType) {
                        case 1:
                            {
                                setMessage(count++);
                            }
                            break;
                    }
                };
            };

            fetchData(source);
        }

        return () => {
            source.close();
        };
    }, [token, pathname]);

    return message;
}

export function useOutsideAlerter(ref, component, classHidden) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (ref.current && !ref.current.contains(event.target)) {
                component.current.classList.add(classHidden);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
}

export function useOutsideClick(component, classHidden) {
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                component.current &&
                !component.current.contains(event.target)
            ) {
                component.current.classList.add(classHidden);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [component]);
}

export function useApplePayButton(orderId, currency, price, ref) {
    let urlForOrder = "https://royalfut.com";
    const userToken = useSelector(state => state.royalfutReducer.user.token);
    const statePayment = useSelector(
        state => state.royalfutReducer.paymentMethod
    );
    const ISSERVER = typeof window === "undefined";

    let consoleBlock = null;

    if (!ISSERVER) {
        consoleBlock = document.getElementById("consoleBlock");
    }

    useEffect(() => {
        if (typeof ApplePaySession === "undefined") {
            if (consoleBlock) {
                consoleBlock.innerHTML = "apple pay session is undefined";
            }

            return;
        } else if (statePayment == "apple") {
            if (consoleBlock) {
                consoleBlock.innerHTML = "apple pay session in progress";
            }
            const request = {
                countryCode: "CY",
                currencyCode: currency,
                merchantCapabilities: ["supports3DS"],
                supportedNetworks: ["visa", "masterCard", "amex", "discover"],
                total: {
                    label: "royalfut.com",
                    type: "final",
                    amount: price,
                },
            };

            const session = new ApplePaySession(3, request);
            session.onvalidatemerchant = event => {
                // console.log('onvalidatemerchant', event.validationURL);
                let url = `${urlForOrder}/prepay/appletoken`;
                let data = JSON.stringify({
                    url: event.validationURL,
                });

                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${userToken}`,
                    },
                    body: data,
                })
                    .then(res => res.json())
                    .then(merchantSession => {
                        // console.log('getMerchantSession',merchantSession)
                        session.completeMerchantValidation(
                            JSON.parse(merchantSession)
                        );
                    })
                    .catch(err => {
                        console.error("Error fetching merchant session", err);
                    });
            };
            session.onpaymentmethodselected = event => {
                // console.log('onpaymentmethodselected')

                const update = {
                    newTotal: {
                        label: "Paying for gaming service",
                        amount: price,
                    },
                };
                session.completePaymentMethodSelection(update);
            };

            session.onpaymentauthorized = event => {
                // console.log('onpaymentauthorized', event.payment);

                url = `${urlForOrder}/${orderId}/prepay/applepay`;
                let result = {};

                let data = JSON.stringify({
                    data: event.payment,
                });

                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Token ${userToken}`,
                    },
                    body: data,
                })
                    .then(res => res.json())
                    .then(res => {
                        // console.log(res);
                        result = {
                            status: ApplePaySession.STATUS_SUCCESS,
                        };
                        session.completePayment(result);
                    })
                    .catch(err => {
                        console.error("Error fetching merchant session", err);
                    });
            };

            session.oncancel = event => {
                //	console.log('oncancel ',event);
            };
            session.begin();
        }
    }, [ref, statePayment]);
}

function getWindowDimensions() {
    const ISSERVER = typeof window === "undefined";
    if (!ISSERVER) {
        const { innerWidth: width, innerHeight: height } = window;
        return {
            width,
            height,
        };
    } else return { innerWidth: 0, innerHeight: 0 };
}

export function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
        getWindowDimensions()
    );

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return windowDimensions;
}
