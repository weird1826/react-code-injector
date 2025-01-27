import React from "react";
import { Config as DOMPurifyConfig } from "dompurify";
type SecurityLevel = "STRICT" | "MODERATE" | "MINIMAL" | "NONE";
interface CodeInjectorProps {
    codeId: string;
    enabled: boolean;
    onFetch: (codeId: string) => Promise<string>;
    onError?: (error: Error) => void;
    loadingComponent?: React.ReactElement;
    errorComponent?: React.ReactElement;
    securityLevel?: SecurityLevel;
    customSecurityConfig?: DOMPurifyConfig;
}
export declare const CodeInjector: React.FunctionComponent<CodeInjectorProps>;
export {};
