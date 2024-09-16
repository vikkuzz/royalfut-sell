import EventsContent from "./EventsContent";

export const metadata = {
    title: "FC 25 Team Of The Season Events Schedule",
    description:
        "Stay updated on player upgrades and discover the essence of FC 25 TOTS, including mixed-league packs and Premier League TOTS.",
};

export default async function EventsPage({ params }) {
    return (
        <>
            <EventsContent />
        </>
    );
}
