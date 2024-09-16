export async function loadCatalog(locale) {
    const catalog = await import(`@lingui/loader!../locales/lng/${locale}.po`);
    return catalog.messages;
}
