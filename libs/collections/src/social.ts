import { EAppContacts, EAppSocials } from "@royalfut/enums";

export const SOCIAL_CREDENTIALS = {
    mail: {
        support: "support@royalfut.com",
    },
    telegram: {
        contact: "https://t.me/vcroy_1",
    },
    skype: {
        contact: "https://msng.link/o?live:.cid.93b9278a908ded55=sk",
    },
};

export const SOCIAL_LINKS: Record<EAppContacts | EAppSocials, string> = {
    [EAppContacts.MAIL]: `mailto:${SOCIAL_CREDENTIALS.mail.support}`,
    [EAppContacts.WHATS_APP]: "https://api.whatsapp.com/send?phone=74952604325",
    [EAppContacts.TELEGRAM]: "https://t.me/royalfutcoins",
    [EAppSocials.INSTAGRAM]: "https://www.instagram.com/royalfutcoins/",
    [EAppSocials.TIK_TOK]: "https://www.tiktok.com/@royalfutcoins",
    [EAppSocials.YOU_TUBE]: "https://www.youtube.com/c/ROYALFUT",
    [EAppSocials.TWITCH]: "https://www.twitch.tv/royalfutcom",
};

export const SOCIAL_LABELS: Record<EAppContacts | EAppSocials, string> = {
    [EAppContacts.MAIL]: SOCIAL_CREDENTIALS.mail.support,
    [EAppContacts.WHATS_APP]: "WhatsApp",
    [EAppContacts.TELEGRAM]: "Telegram",
    [EAppSocials.INSTAGRAM]: "Instagram",
    [EAppSocials.TIK_TOK]: "TikTok",
    [EAppSocials.YOU_TUBE]: "YouTube",
    [EAppSocials.TWITCH]: "Twitch",
};
