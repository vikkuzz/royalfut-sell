import flagLangs from "../../data-elements/countries";

const ISSERVER = typeof window === "undefined"; // чтоб не было ошибки на сервере об отсутствии локалстора
let currentLang = null;

if (!ISSERVER) {
    currentLang = flagLangs.filter(
        el => el.title.toLowerCase() === (window.navigator.language || "en")
    )[0];
    if (!currentLang) {
        currentLang = flagLangs[0];
    }
}

const initialState = {
    locale: { ...currentLang },
};

const royalfutLocaleReducer = (state = initialState, action) => {
    // let localState = null;
    switch (action.type) {
        case "CURRENT_LANG":
            let currentLang = flagLangs.filter(
                el => el.title.toLowerCase() === action.data.toLowerCase()
            )[0];
            if (!currentLang) {
                currentLang = flagLangs[0];
            }
            // if (!ISSERVER) {
            //     localStorage.setItem('locale', JSON.stringify(currentLang));
            // }
            // if (action.data.toLowerCase() === 'ar') {
            //     document.dir = 'rtl';
            //     document.querySelector('body').dir = 'rtl';
            // } else {
            //     document.dir = 'ltr';
            //     document.querySelector('body').dir = 'ltr';
            // }
            return { ...state, locale: currentLang };

        default:
            return { ...state };
    }
};
export default royalfutLocaleReducer;
