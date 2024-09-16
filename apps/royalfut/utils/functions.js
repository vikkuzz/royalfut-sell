// export function tremor(el) {
//     let interval = setInterval(() => {
//         el.style.transform = 'translateX(5px)';
//         el.style.transition = 'all .10s';
//         setTimeout(() => {
//             el.style.transform = 'translateX(0px)';
//         }, 100);
//     }, 200);
//     setTimeout(() => {
//         clearInterval(interval);
//         console.log('clear');
//     }, 2500);
// }

export async function getTranslatesFromCsv(newTranslates) {
    const response = await fetch("data/03_05_24.csv");
    const reader = response.body.getReader();
    const result = await reader.read(); // raw array
    const decoder = new TextDecoder("utf-8");
    const csv = decoder.decode(result.value);
    let table = csvJSON(csv);
    for (let key in table) {
        console.log(table[key]);
        table[key] = { ...table[key], ...newTranslates[key] };
    }
    console.log(table);
}

export function objectWithoutProperties(obj, keys) {
    let target = {};
    for (let i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
    }
    console.log(target);
    return target;
}

export function getSecondsBetweenDates(dateString) {
    // Преобразуем строку с датой в объект Date
    const dateObject = new Date(dateString);

    // Получаем текущую дату и время
    const currentDate = new Date();

    // Вычисляем разницу в миллисекундах
    const diffInMilliseconds = currentDate - dateObject;

    // Преобразуем разницу в секунды
    const diffInSeconds = Math.round(diffInMilliseconds / 1000);

    return diffInSeconds;
}

export function getPriceCustomPoints(
    points,
    priceOnePointUsd,
    stockCurrencyPrice,
    stockUsdPrice
) {
    const priceOnePointCurrency =
        (stockCurrencyPrice / stockUsdPrice) * priceOnePointUsd; // цена в текущей валюте за 1 балл
    return priceOnePointCurrency * points;
}

export function getPriceWithDiscount(stateOrderPrice, promoDisc) {
    let priceOrder = stateOrderPrice - (stateOrderPrice * promoDisc) / 100;
    return priceOrder;
}

export function getPriceValue(
    coins,
    priceCurrentCurrency,
    priceUsd,
    userLoyaltyPercent,
    discount = null
) {
    let priceValue = priceUsd * coins * userLoyaltyPercent; // размер кешбэка в долларах

    let pointsValue = Math.floor(priceValue * 10); // количество баллов в зависимости от уровня лояльности

    if (discount) {
        pointsValue = Math.floor(
            (priceValue - priceValue * (discount / 100)) * 10
        );
        console.log(pointsValue);
    }

    priceValue = pointsValue / 10; // округленная цена за округленные баллы

    let result = (priceCurrentCurrency / priceUsd) * 0.1 * pointsValue;

    if (!result) {
        result = 0;
    }

    let dotPriceIndex = String(result).indexOf(".");

    result = String(result).slice(0, dotPriceIndex + 3);

    return result;
}

export function getPoints(price, disk, percent) {
    if (disk) {
        let priceUsdPromoUsed = price - price * (disk / 100);
        let cashUsdPrice = priceUsdPromoUsed * (percent / 100);
        let pointsValueAfterPromo = Math.floor(cashUsdPrice * 10); // кол-во баллов которые начисляем

        return pointsValueAfterPromo;
    } else {
        let cashUsdPrice = price * (percent / 100);
        let pointsValueAfterPromo = Math.floor(cashUsdPrice * 10); // кол-во баллов которые начисляем

        return pointsValueAfterPromo;
    }
}

export function getOrderDate(dateString) {
    let date = new Date(dateString);

    let month = String(date.getMonth() + 1).padStart(2, "0");
    let day = String(date.getDate()).padStart(2, "0");
    let year = date.getFullYear();

    let hours = String(date.getHours()).padStart(2, "0");
    let minutes = String(date.getMinutes()).padStart(2, "0");
    let seconds = String(date.getSeconds()).padStart(2, "0");

    let formattedDate = `${month}/${day}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
}

export function deleteCookie(name) {
    setCookie(name, "", {
        "max-age": -1,
    });
}

export function getCookie(name) {
    let matches = document.cookie.match(
        new RegExp(
            "(?:^|; )" +
                name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
                "=([^;]*)"
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, options = {}) {
    options = {
        path: "/",
        // при необходимости добавьте другие значения по умолчанию
        ...options,
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie =
        encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}

export function findObjectWithMaxHeight(objects) {
    let maxHeight = objects[0].height;
    let maxHeightObject = objects[0];

    for (let i = 1; i < objects.length; i++) {
        if (objects[i].height > maxHeight) {
            maxHeight = objects[i].height;
            maxHeightObject = objects[i];
        }
    }

    return maxHeightObject;
}

export function getSum(sum) {
    if (sum < 100000) {
        return 10000;
    } else if (sum >= 100000 && sum < 300000) {
        return 10000;
    } else if (sum >= 300000 && sum < 500000) {
        return 20000;
    } else if (sum >= 500000 && sum < 1000000) {
        return 50000;
    } else if (sum >= 1000000 && sum < 3000000) {
        return 100000;
    } else if (sum >= 3000000 && sum < 6000000) {
        return 500000;
    } else if (sum >= 6000000 && sum <= 999999999) {
        return 1000000;
    }
}
export function getInputValue(value) {
    if (+value <= 100000 || value.length == 0) {
        return 1;
    } else if (+value > 100000 && +value <= 1000000) {
        return +value / 100000;
    } else if (+value > 1000000 && +value <= 4000000) {
        return (+value - 1000000) / 250000 + 10;
    } else if (+value > 4000000 && +value <= 10000000) {
        return (+value - 4000000) / 1000000 + 22;
    } else if (+value > 10000000 && +value <= 30000000) {
        return (+value - 10000000) / 2000000 + 28;
    } else {
        return 38;
    }
}
export function getCoinsValue(inputValue) {
    if (+inputValue <= 10) {
        return +inputValue * 100000;
    } else if (+inputValue > 10 && +inputValue <= 22) {
        return (+inputValue - 10) * 250000 + 1000000;
    } else if (+inputValue > 22 && +inputValue <= 28) {
        return (+inputValue - 22) * 1000000 + 4000000;
    } else if (+inputValue > 28 && +inputValue <= 38) {
        return (+inputValue - 28) * 2000000 + 10000000;
    } else {
        return 30000000;
    }
}
export function preventDefault(e) {
    e.preventDefault();
}

export function disableScroll() {
    window.addEventListener("DOMMouseScroll", preventDefault, false);
    window.addEventListener("wheel", preventDefault, { passive: false });
    window.addEventListener("mousewheel", preventDefault, {
        passive: false,
    });
}

export function enableScroll() {
    window.removeEventListener("DOMMouseScroll", preventDefault, false);
    window.removeEventListener("wheel", preventDefault, { passive: false });
    window.removeEventListener("mousewheel", preventDefault, {
        passive: false,
    });
}

export function getCoef(currency, method, platform, data) {
    let currentPlatform = platform == "ps4" ? 1 : 0;
    if (platform === "pc") {
        currentPlatform = 2;
    }
    const coef =
        data[method.toLowerCase() === "easy" ? 0 : 1].data[currentPlatform]
            .pricePerCurrencyMap[`${currency}`];
    return coef;
}

export function getDiscCoef(coef, percentDiscount) {
    let currentCoef = 1;

    if (percentDiscount > 1) {
        currentCoef = coef - (coef / 100) * percentDiscount;
    } else {
        currentCoef = coef;
    }

    return currentCoef;
}
export function getPrice(platform, method, coins, currency, data) {
    let currentPlatform = platform?.ps === true ? "ps4" : "xbox";
    if (platform?.pc === true) {
        currentPlatform = "pc";
    }
    let currentMethod = method?.easy === true ? "easy" : "manual";
    let currentCurrency = currency?.title;
    let currentCoef = getCoef(
        currentCurrency,
        currentMethod,
        currentPlatform,
        data
    );
    let currentPrice = coins * currentCoef;
    // let priceWithD = (currentCoef - (currentCoef / 100) * percentDisc) * coins;

    return currentPrice;
}

export function findClosestObject(array, targetSum) {
    let closestObject = null;
    let minDifference = Infinity;

    for (let i = 0; i < array.length; i++) {
        const currentDifference = Math.abs(array[i].limitSumCoins - +targetSum);

        if (currentDifference < minDifference) {
            minDifference = currentDifference;
            closestObject = array[i];
        }
    }

    return closestObject;
}

export function getDiscount(arr, value) {
    let percentDisc = 1;
    let result = arr.filter(el => el.limitSumCoins <= value);

    if (result.length > 0) {
        result = result[result.length - 1];
        percentDisc = result?.discountPercent;
    }
    return percentDisc;
}

export function bodyFixPosition() {
    setTimeout(function () {
        /* Ставим необходимую задержку, чтобы не было «конфликта» в случае, если функция фиксации вызывается сразу после расфиксации (расфиксация отменяет действия расфиксации из-за одновременного действия) */

        if (!document.body.hasAttribute("data-body-scroll-fix")) {
            // Получаем позицию прокрутки
            let scrollPosition =
                window.pageYOffset || document.documentElement.scrollTop;
            // Ставим нужные стили
            document.body.setAttribute("data-body-scroll-fix", scrollPosition); // Cтавим атрибут со значением прокрутки
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            document.body.style.top = "-" + scrollPosition + "px";
            document.body.style.left = "0";
            document.body.style.width = "100%";
        }
    }, 15); /* Можно задержку ещё меньше, но у меня работало хорошо именно с этим значением на всех устройствах и браузерах */
}

// 2. Расфиксация <body>
export function bodyUnfixPosition() {
    if (document.body.hasAttribute("data-body-scroll-fix")) {
        // Получаем позицию прокрутки из атрибута
        let scrollPosition = document.body.getAttribute("data-body-scroll-fix");
        // console.log('unfix');
        // Удаляем атрибут
        document.body.removeAttribute("data-body-scroll-fix");

        // Удаляем ненужные стили
        document.body.style.overflow = "";
        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.width = "";

        // Прокручиваем страницу на полученное из атрибута значение
        window.scroll(0, scrollPosition);
    }
}
export const getDeliveryTime = (amount, method, platform, short = false) => {
    if (amount >= 1000 && amount <= 299999) {
        if (method === "easy") {
            if (platform === "ps4") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["15", "30"],
                    translates: "m",
                };
            } else if (platform === "xbox") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["15", "30"],
                    translates: "m",
                };
            } else if (platform === "pc") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["15", "30"],
                    translates: "m",
                };
            }
        } else if (method === "manual") {
            if (platform === "ps4") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["25", "35"],
                    translates: "m",
                };
            } else if (platform === "xbox") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["25", "35"],
                    translates: "m",
                };
            } else if (platform === "pc") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["25", "35"],
                    translates: "m",
                };
            }
        }
    } else if (amount >= 300000 && amount <= 799999) {
        if (method === "easy") {
            if (platform === "ps4") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["30", "50"],
                    translates: "m",
                };
            } else if (platform === "xbox") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["30", "50"],
                    translates: "m",
                };
            } else if (platform === "pc") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["30", "50"],
                    translates: "m",
                };
            }
        } else if (method === "manual") {
            if (platform === "ps4") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["35", "55"],
                    translates: "m",
                };
            } else if (platform === "xbox") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["35", "55"],
                    translates: "m",
                };
            } else if (platform === "pc") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["35", "55"],
                    translates: "m",
                };
            }
        }
    } else if (amount >= 800000 && amount <= 1499999) {
        if (method === "easy") {
            if (platform === "ps4") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["50", "80"],
                    translates: "m",
                };
            } else if (platform === "xbox") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["50", "80"],
                    translates: "m",
                };
            } else if (platform === "pc") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["50", "80"],
                    translates: "m",
                };
            }
        } else if (method === "manual") {
            if (platform === "ps4") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["1", "1.5"],
                    translates: "h",
                };
            } else if (platform === "xbox") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["1", "1.5"],
                    translates: "h",
                };
            } else if (platform === "pc") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["1", "1.5"],
                    translates: "h",
                };
            }
        }
    } else if (amount >= 1500000 && amount <= 2999999) {
        if (method === "easy") {
            if (platform === "ps4") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["1.5", "3"],
                    translates: "h",
                };
            } else if (platform === "xbox") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["1.5", "3"],
                    translates: "h",
                };
            } else if (platform === "pc") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["1.5", "3"],
                    translates: "h",
                };
            }
        } else if (method === "manual") {
            if (platform === "ps4") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["1.5", "3"],
                    translates: "h",
                };
            } else if (platform === "xbox") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["1.5", "3"],
                    translates: "h",
                };
            } else if (platform === "pc") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["1.5", "3"],
                    translates: "h",
                };
            }
        }
    } else if (amount >= 3000000 && amount <= 4999999) {
        if (method === "easy") {
            if (platform === "ps4") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["3", "5"],
                    translates: "h",
                };
            } else if (platform === "xbox") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["3", "5"],
                    translates: "h",
                };
            } else if (platform === "pc") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["3", "5"],
                    translates: "h",
                };
            }
        } else if (method === "manual") {
            if (platform === "ps4") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["3", "5"],
                    translates: "h",
                };
            } else if (platform === "xbox") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["3", "5"],
                    translates: "h",
                };
            } else if (platform === "pc") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["3", "5"],
                    translates: "h",
                };
            }
        }
    } else if (amount >= 5000000 && amount <= 1000000000) {
        if (method === "easy") {
            if (platform === "ps4") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["5", "10"],
                    translates: "h",
                };
            } else if (platform === "xbox") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["5", "10"],
                    translates: "h",
                };
            } else if (platform === "pc") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["5", "10"],
                    translates: "h",
                };
            }
        } else if (method === "manual") {
            if (platform === "ps4") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["5", "10"],
                    translates: "h",
                };
            } else if (platform === "xbox") {
                return {
                    type: `deliveryHours${short ? "Short" : ""}`,
                    time: ["5", "10"],
                    translates: "h",
                };
            } else if (platform === "pc") {
                return {
                    type: `deliveryMinutes${short ? "Short" : ""}`,
                    time: ["5", "10"],
                    translates: "h",
                };
            }
        }
    }
};
export function getCoords(elem) {
    // crossbrowser version
    let box = elem.getBoundingClientRect();
    let body = document.body;
    let docEl = document.documentElement;
    let scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    let scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;
    let clientTop = docEl.clientTop || body.clientTop || 0;
    let clientLeft = docEl.clientLeft || body.clientLeft || 0;
    let top = box.top + scrollTop - clientTop;
    let left = box.left + scrollLeft - clientLeft;
    return { top: Math.round(top), left: Math.round(left) };
}

export function horizontalScroll(event) {
    const delta = Math.max(
        -1,
        Math.min(1, event.nativeEvent.wheelDelta || -event.nativeEvent.detail)
    );
    event.currentTarget.scrollLeft -= delta * 150;
    event.preventDefault;
}
export function tremor(el) {
    let interval = setInterval(() => {
        el.style.transform = "translateX(5px)";
        el.style.transition = "all .10s";
        setTimeout(() => {
            el.style.transform = "translateX(0px)";
        }, 100);
    }, 200);
    setTimeout(() => {
        clearInterval(interval);
    }, 2500);
}
export function csvJSON(csv) {
    let lines = csv.split(",&end");

    let result = [];
    let headers = lines[0].split(",&?,");

    for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(",&?,");

        for (let j = 0; j < headers.length; j++) {
            obj[headers[j]] = currentline[j];
        }

        result.push(obj);
    }
    let tres = {};
    for (let j = 0; j < result.length; j++) {
        for (let key in result[j]) {
            if (key.includes("no")) {
                tres.no = {
                    ...tres.no,
                    ["may_upd" + j]: result[j][key]
                        ? result[j][key]
                              .replace(/"\\|"|\r/g, "")
                              .replace(/\n/g, "")
                        : "",
                };
            } else {
                tres[key] = {
                    ...tres[key],
                    ["may_upd" + j]: result[j][key]
                        ? result[j][key]
                              .replace(/"\\|"|\r/g, "")
                              .replace(/\n/g, "")
                        : "",
                };
            }
        }
    }

    return tres; // JavaScript object
    // return JSON.stringify(result); //JSON
}
export function getParams(url) {
    const params = url.split(/[?&]/);
    const paramObj = {};

    params.forEach(param => {
        const [key, value] = param.split("=");
        paramObj[key] = value?.replace(/[#%].*/g, "");
    });
    return paramObj;
}

export function animateValue(ref, start, duration) {
    function linear(duration, range, current) {
        return ((duration * 2) / Math.pow(range, 2)) * current;
    }
    function quadratic(duration, range, current) {
        return ((duration * 3) / Math.pow(range, 3)) * Math.pow(current, 2);
    }
    function constant(duration, range, current) {
        return duration / range;
    }
    let end = parseInt(ref?.current?.textContent, 10);
    let range = end - start;
    let current = start;
    let increment = end > start ? 1 : -1;
    let obj = ref?.current;
    let startTime = new Date();
    let offset = 1;
    let remainderTime = 0;

    if (obj) {
        let step = function () {
            current += increment;
            obj.innerHTML = current;

            if (current != end) {
                setTimeout(step, constant(duration, range, current));
            }
        };

        setTimeout(step, constant(duration, range, start));
    }
}
