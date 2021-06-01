export declare const fetch: (url: string) => Promise<string | null>;
export declare const REPO_URL = "https://raw.githubusercontent.com/spdx/license-list-data";
export default class DefaultLicenseTextProvider {
    private request;
    private cache;
    constructor(request?: (url: string) => Promise<string>);
    retrieveLicenseText(license: string): Promise<string | null>;
}
