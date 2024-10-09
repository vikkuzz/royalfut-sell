const jsonfile = require("jsonfile");

// Чтение исходных файлов
const newTranslates = jsonfile.readFileSync("../../locales/nt.json");
const translates = jsonfile.readFileSync("../../locales/output.json");

const en1 = jsonfile.readFileSync("en.json");
const en2 = jsonfile.readFileSync("../../messages/en.json");

const ru1 = jsonfile.readFileSync("ru.json");
const ru2 = jsonfile.readFileSync("../../messages/ru.json");

const de1 = jsonfile.readFileSync("de.json");
const de2 = jsonfile.readFileSync("../../messages/de.json");

const ar1 = jsonfile.readFileSync("ar.json");
const ar2 = jsonfile.readFileSync("../../messages/ar.json");

const it1 = jsonfile.readFileSync("it.json");
const it2 = jsonfile.readFileSync("../../messages/it.json");

const es1 = jsonfile.readFileSync("es.json");
const es2 = jsonfile.readFileSync("../../messages/es.json");

const pt1 = jsonfile.readFileSync("pt.json");
const pt2 = jsonfile.readFileSync("../../messages/pt.json");

const tr1 = jsonfile.readFileSync("tr.json");
const tr2 = jsonfile.readFileSync("../../messages/tr.json");

const pl1 = jsonfile.readFileSync("pl.json");
const pl2 = jsonfile.readFileSync("../../messages/pl.json");

const zh1 = jsonfile.readFileSync("zh.json");
const zh2 = jsonfile.readFileSync("../../messages/zh.json");

const sv1 = jsonfile.readFileSync("sv.json");
const sv2 = jsonfile.readFileSync("../../messages/sv.json");

const nl1 = jsonfile.readFileSync("nl.json");
const nl2 = jsonfile.readFileSync("../../messages/nl.json");

const no1 = jsonfile.readFileSync("no.json");
const no2 = jsonfile.readFileSync("../../messages/no.json");

const fr1 = jsonfile.readFileSync("fr.json");
const fr2 = jsonfile.readFileSync("../../messages/fr.json");

// Перебираем все ключи из второго файла и добавляем их в объединенный объект
const mergeObjects = (obj1, obj2) => {
    for (let key in obj2) {
        if (typeof obj2[key] === "object" && !Array.isArray(obj2[key])) {
            if (!obj1[key]) {
                obj1[key] = {};
            }
            mergeObjects(obj1[key], obj2[key]);
        } else {
            if (!(key in obj1) || obj1[key] !== obj2[key]) {
                obj1[key] = obj2[key];
            }
        }
    }
};

function writeTranslations(obj, lang, result, keys, page) {
    result[page] = { ...result[page] };
    for (let i = 0; i <= keys.length; i++) {
        mergeObjects(result[page], { [keys[i]]: obj[lang][keys[i]] });
    }

    jsonfile.writeFileSync(`${lang}.json`, result, { spaces: 2 });
}

const tagsOrder = [
    "seom",
    "seoh",
    "seo70",
    "seo71",
    "seo72",
    "mainblocks24",
    "coins_page27",
    "coins_page28",
    "coins_page29",
    "coins_page30",
    "coins_page31",
    "coins_page32",
    "coins_page33",
    "coins_page34",
    "coins_page35",
    "coins_page36",
    "coins_page37",
    "a0_1",
    "a0_2",
    "mainblocks27",
    "mainblocks28",
    "seo132",
    "seo133",
    "seo134",
    "seo135",
    "seo146",
    "seo1",
    "seo148",
    "coins_page15",
];
const tagsFaq = [
    "ab20",
    "ab21",
    "a57",
    "a101",
    "a117",
    "a31",
    "a32",
    "a33",
    "a34",
    "a35",
    "ab36",
    "a60",
    "a61",
    "a62",
    "a64",
    "a65",
    "a67",
    "a68",
    "a69",
    "a70",
    "a71",
    "a72",
    "a73",
    "a74",
    "a75",
    "a76",
    "a108",
    "a109",
    "a110",
    "a111",
    "a112",
    "a73",
    "a114",
    "a75",
    "a76",
    "a79",
    "a81",
    "a82",
    "a85",
    "a86",
    "a87",
    "a94",
    "a95",
    "a97",
    "a98",
    "a99",
    "a103",
    "a103_2",
    "a105",
    "a106",
    "a39",
    "a40",
    "a41",
    "a43",
    "a44",
    "a45",
    "a46",
    "a47",
    "a42",
    "a49",
    "a50",
    "a51",
    "a119",
    "a121",
    "a121_2",
    "a121_3",
    "a121_4",
    "a121_5",
    "ab21",
    "a30",
    "a38",
    "a42",
    "a48",
    "a52",
    "a53",
    "a54",
    "a55",
    "a57",
    "a58",
    "a63",
    "a66",
    "a77",
    "a80",
    "a84",
    "a93",
    "a96",
    "a101",
    "a102",
    "a104",
    "a107",
    "a117",
    "a118",
    "a120",
    "a122",
    "a123",
    "a124",
    "a125",
];
const tagsDelivery = [
    "a141",
    "a142",
    "a143",
    "a144",
    "a145",
    "a146",
    "a149_1",
    "a149_2",
    "a149_3",
    "a150",
    "a152_1",
    "a152_2",
    "a152_3",
    "a154",
    "a155_1",
    "a155_2",
    "a155_3",
    "a156",
    "a158_1",
    "a158_2",
    "a158_3",
    "a159",
    "a160",
    "a161_1",
    "a161_2",
    "a161_3",
    "a162",
    "a163",
    "a165",
    "a147",
    "a166",
    "a148",
    "a151",
    "a157",
    "a153",
];
const tagsPayments = ["seo149", "seo150", "seo151"];
const tagsTerms = [
    "modalSocialLoginCheck",
    "terms_text",
    "user_agreement",
    "termsa1",
    "termsa2",
    "termsa3",
];
const tagsPrivacy = ["privacya1", "privacya2"];
const tagsCookie = [
    "ab53",
    "ab54",
    "ab55",
    "ab56",
    "ab57",
    "ab58",
    "ab59",
    "ab60",
    "ab61",
    "ab62",
    "ab63",
    "ab64",
    "ab65",
    "ab66",
    "ab67",
    "ab68",
    "ab69",
    "ab70",
    "ab71",
    "ab72",
    "ab73",
    "ab74",
    "ab75",
    "ab76",
    "ab77",
    "ab78",
    "ab79",
];
const boostTags = [
    "aa5",
    "aa6",
    "via",
    "aa4",
    "seo211",
    "seo212",
    "seo213",
    "seo214",
];
const boostTags2 = ["pageAmountCoinsLabel", "pageMethodCardSoon"];
const messageTags = ["seo98", "wntwrng", "refresh"];
const modalTags = [
    "mainblocks10",
    "seo108",
    "a131",
    "seo103",
    "seo104",
    "a2",
    "a128",
    "a129",
    "a130",
    "seo107",
    "seo106",
    "seo105",
    "a12",
    "a1",
    "seo110",
    "seo111",
    "seo112",
    "seo113",
    "pl_upd53",
    "pl_upd54",
    "pl_upd55",
    "pl_upd56",
    "pl_upd57",
    "pl_upd58",
    "pl_upd42",
    "pl_upd43",
    "pl_upd45",
    "pl_upd46",
    "pl_upd37",
    "pl_upd38",
    "pl_upd39",
    "pl_upd40",
    "pl_upd44",
    "season",
    "pl_upd41",
];
const pl = ["pl_upd41"];
const m = ["modalSignSymbols8"];
const n = ["seo82"];
const nm = ["a36", "a37", "mainblocks11"];
const nnm = ["ab106"];
const loyaltyTags = [
    "pl_upd14",
    "pl_upd15",
    "pl_upd16",
    "pl_upd17",
    "pl_upd18",
    "pl_upd19",
    "pl_upd20",
    "pl_upd21",
    "pl_upd22",
    "pl_upd23",
    "pl_upd24",
    "pl_upd25",
];
const deliveryTags = [
    "a148",
    "ab2",
    "a151",
    "ab4",
    "a154",
    "ab6",
    "a157",
    "ab8",
    "a160",
    "ab10",
    "a163",
    "ab11",
];
const mainblocksTags = [
    "mainblocks0",
    "mainblocks1",
    "mainblocks2",
    "mainblocks3",
    "mainblocks4",
    "mainblocks5",
    "mainblocks6",
    "mainblocks7",
    "mainblocks8",
    "mainblocks9",
    "mainblocks10",
    "mainblocks11",
    "mainblocks12",
    "mainblocks13",
    "mainblocks14",
    "mainblocks15",
    "mainblocks16",
    "mainblocks17",
    "mainblocks18",
    "mainblocks19",
    "mainblocks20",
    "mainblocks21",
    "mainblocks22",
    "mainblocks23",
    "mainblocks24",
    "mainblocks25",
    "mainblocks26",
    "mainblocks27",
    "mainblocks28",
];

const deliveryStepsTags = [
    "process",
    "ab90",
    "ab82",
    "ab83",
    "ab84",
    "ab85",
    "ab86",
    "ab88",
    "ab89",
];
const asd = [
    "ab91",
    "ab113",
    "aa0_1",

    // 'card_title_1',
    // 'card_title_2',
    // 'card_title_3',
    // 'card_title_4',
    // 'card_text_1',
    // 'card_text_2',
    // 'card_text_3',
    // 'card_text_4',
    // 'orderNow',
];
const cookieTags = ["newcookies", "newcookieslink", "okay"];
const prTags = [
    "seo179",
    "seo180",
    "seo196",
    "seo193",
    "seo194",
    "seo191",
    "seo192",
    "seo189",
    "seo190",
    "seo187",
    "seo188",
    "seo184",
    "seo185",
    "seo171",
    "seo172",
    "seo158",
    "seo159",
    "pl_upd79",
    "pl_upd78",
    "pl_upd80",
    "pl_upd81",

    "coins_page1",
    "coins_page2",
    "seo169",
    "seo170",
    "seo181",
    "seo182",
    "seo174",
    "ab18",
    "seo95",
    "coins_page6",
    "coins_page7",
];
const prfix = ["pl_upd84"];

writeTranslations(newTranslates, "en", en1, prfix, "profile");
writeTranslations(newTranslates, "ar", ar1, prfix, "profile");
writeTranslations(newTranslates, "de", de1, prfix, "profile");
writeTranslations(newTranslates, "es", es1, prfix, "profile");
writeTranslations(newTranslates, "fr", fr1, prfix, "profile");
writeTranslations(newTranslates, "it", it1, prfix, "profile");
writeTranslations(newTranslates, "nl", nl1, prfix, "profile");
writeTranslations(newTranslates, "no", no1, prfix, "profile");
writeTranslations(newTranslates, "pl", pl1, prfix, "profile");
writeTranslations(newTranslates, "pt", pt1, prfix, "profile");
writeTranslations(newTranslates, "ru", ru1, prfix, "profile");
writeTranslations(newTranslates, "sv", sv1, prfix, "profile");
writeTranslations(newTranslates, "tr", tr1, prfix, "profile");
writeTranslations(newTranslates, "zh", zh1, prfix, "profile");

mergeObjects(en1, en2);
mergeObjects(ru1, ru2);
mergeObjects(de1, de2);
mergeObjects(ar1, ar2);
mergeObjects(it1, it2);
mergeObjects(es1, es2);
mergeObjects(pt1, pt2);
mergeObjects(tr1, tr2);
mergeObjects(pl1, pl2);
mergeObjects(zh1, zh2);
mergeObjects(sv1, sv2);
mergeObjects(nl1, nl2);
mergeObjects(no1, no2);
mergeObjects(fr1, fr2);

// Запись объединенных данных в новый файл
jsonfile.writeFileSync('en.json', en1, { spaces: 2 });
jsonfile.writeFileSync('ru.json', ru1, { spaces: 2 });
jsonfile.writeFileSync('de.json', de1, { spaces: 2 });
jsonfile.writeFileSync('ar.json', ar1, { spaces: 2 });
jsonfile.writeFileSync('it.json', it1, { spaces: 2 });
jsonfile.writeFileSync('es.json', es1, { spaces: 2 });
jsonfile.writeFileSync('pt.json', pt1, { spaces: 2 });
jsonfile.writeFileSync('tr.json', tr1, { spaces: 2 });
jsonfile.writeFileSync('pl.json', pl1, { spaces: 2 });
jsonfile.writeFileSync('zh.json', zh1, { spaces: 2 });
jsonfile.writeFileSync('sv.json', sv1, { spaces: 2 });
jsonfile.writeFileSync('nl.json', nl1, { spaces: 2 });
jsonfile.writeFileSync('no.json', no1, { spaces: 2 });
jsonfile.writeFileSync('fr.json', fr1, { spaces: 2 });

// node merge-json.js
// open the terminal in this folder, then write 'node merge-json.js' -> you are add new translations from ../../messages
