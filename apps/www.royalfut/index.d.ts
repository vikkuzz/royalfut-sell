/* eslint-disable @typescript-eslint/no-explicit-any */
declare module "*.svg" {
    const content: any;
    export const ReactComponent: any;
    export default content;
}
// eslint-disable-next-line @typescript-eslint/naming-convention
interface Window {
    dataLayer: any;
}
