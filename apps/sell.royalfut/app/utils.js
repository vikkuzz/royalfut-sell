import React from "react";
import styles from "../app/(info)/blog/[post]/page.module.scss";
let count = 0;

export async function getTranslatesFromCsv(posts) {
    const response = await fetch("/data/ultra_final.csv");
    const reader = response.body.getReader();
    const result = await reader.read(); // raw array
    const decoder = new TextDecoder("utf-8");
    const csv = decoder.decode(result.value);
    let table = csvJSON(csv);

    // Проверяем совпадения по полю slug
    const slugsInTable = new Set(table.map((item) => item.slug)); // Собираем slugs из table
    // const matchedPosts = posts.filter((post) => slugsInTable.has(post.slug)); // Находим совпадения в posts

    // Если нужно вывести совпадающие элементы
    // console.log('Массив с совпадениями:', matchedPosts);

    // Если нужно объединить и удалить дубликаты на основании slug
    const uniquePosts = [
        ...table,
        ...posts.filter((post) => !slugsInTable.has(post.slug)),
    ];

    console.log("Массив без дубликатов:", uniquePosts);
}

export function csvJSON(csv) {
    let lines = csv.split(",&end");
    if (lines.length < 2) return [];
    let headers = lines[0].split(",&?,");
    let results = [];
    for (let i = 1; i < lines.length; i++) {
        let values = lines[i].split(",&?,");
        let result = {};

        for (let j = 0; j < headers.length; j++) {
            result[headers[j]] = (values[j] || "")
                .replace(/"\\|"|\r/g, "")
                .replace(/\n/g, "");
        }
        result.body1 = parseHTMLString(result.body1);
        result.body2 = parseHTMLString(result.body2);
        if (result.tags) {
            result.tags = result.tags.split(",").map((el) => el.toLowerCase());
        } else {
            result.tags = [];
        }
        if (result.widgets) {
            result.widgets = result.widgets.split(",").map((el) => {
                if (el === "hot") {
                    return { text: "HOT", color: "red" };
                }
                if (el === "new") {
                    return { text: "NEW", color: "green" };
                }

                return {};
            });
        } else {
            result.widgets = [];
        }
        if (!result.slug) return;
        results.push(result);
    }

    return results;
}
export function parseHTMLString(htmlString) {
    // Используем DOMParser для разбора HTML строки
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    function elementToObject(element) {
        // Создаем объект для представления элемента
        const obj = {
            tag:
                element.tagName.toLowerCase() === "body"
                    ? "div"
                    : element.tagName.toLowerCase(),
            children: [],
            attributes: {
                class: element.tagName.toLowerCase() === "body" ? "body1" : "",
                key: (count += 1),
            },
        };

        // Определяем классы стилей для определенных тегов
        const classMappings = {
            p: styles.p,
            h2: styles.h2,
            h3: styles.ul_b,
            ul: styles.ul,
            li: styles.li,
            strong: styles.strong,
            em: styles.em,
        };

        // Если тег соответствует одному из определенных, добавляем класс
        if (classMappings[obj.tag]) {
            obj.attributes.className = classMappings[obj.tag];
        }

        // Добавляем атрибуты элемента
        Array.from(element.attributes).forEach((attr) => {
            obj.attributes[attr.name] = attr.value;
        });

        // Проверка на самозакрывающиеся теги
        const selfClosingTags = [
            "br",
            "img",
            "input",
            "hr",
            "meta",
            "link",
            "base",
            "col",
            "area",
            "source",
            "track",
            "wbr",
        ];

        // Рекурсивно добавляем дочерние элементы, если элемент не самозакрывающийся
        if (!selfClosingTags.includes(obj.tag)) {
            Array.from(element.childNodes).forEach((child) => {
                if (child.nodeType === Node.ELEMENT_NODE) {
                    obj.children.push(elementToObject(child)); // Для элементов
                } else if (
                    child.nodeType === Node.TEXT_NODE &&
                    child.textContent.trim()
                ) {
                    obj.children.push({ text: child.textContent.trim() }); // Для текстовых узлов
                }
            });
        }

        return obj;
    }

    // Преобразуем тело документа в объект
    return elementToObject(doc.body);
}

export const renderElement = (obj) => {
    if (!obj) return null;

    // Если это текстовый узел, возвращаем его содержимое
    if (obj.text) {
        return obj.text;
    }

    // Получаем тег и атрибуты
    const { tag, attributes, children } = obj;
    const attributesProps = attributes || {};

    // Создаем элемент с соответствующими атрибутами
    const element = React.createElement(
        tag,
        attributesProps,
        children && children.map(renderElement), // Рекурсивно рендерим дочерние элементы
    );

    return element;
};
