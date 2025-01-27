import { Config as DOMPurifyConfig } from "dompurify";
interface GetSecurityConfig extends DOMPurifyConfig {
    FORBID_SCRIPTS?: boolean;
    FORBID_EVAL?: boolean;
    FORBID_TAGS?: string[];
    FORBID_ATTR?: string[];
    ALLOWED_TAGS?: string[];
    ALLOWED_ATTR?: string[];
    USE_PROFILES?: {
        html: boolean;
    };
    ADD_TAGS?: string[];
    ADD_ATTR?: string[];
}
export declare const SecurityLevels: {
    STRICT: string;
    MODERATE: string;
    MINIMAL: string;
    NONE: string;
};
export declare const getSecurityConfig: (level: string) => GetSecurityConfig;
export {};
