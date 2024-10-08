import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId:
                "836728370280-2dsf3v5sd9uaecimehklctogpa10ldck.apps.googleusercontent.com",
            clientSecret: "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",
            authorizationUrl:
                "https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code",
        }),
    ],
    jwt: {
        encryption: true,
    },
    secret: "secret token",
    callbacks: {
        async jwt(token, account) {
            if (account?.accessToken) {
                token.accessToken = account.accessToken;
            }
            return token;
        },
        redirect: async (url, _baseUrl) => {
            if (url === "/profile") {
                return Promise.resolve("/");
            }
            return Promise.resolve("/");
        },
    },
});
