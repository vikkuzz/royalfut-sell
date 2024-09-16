import { EAppContacts, EAppSocials } from "@royalfut/enums";

export const SOCIAL_CREDENTIALS = {
    mail: {
        support: "support@royalfut.com",
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