import ClientProfileComponent from "./ClientProfileComponent";

export async function generateMetadata() {
    return {
        robots: {
            index: false,
            follow: true,
        },
    };
}

export default async function ProfilePage() {
    return (
        <>
            <ClientProfileComponent />
        </>
    );
}
