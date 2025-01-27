import { Config as DOMPurifyConfig } from "dompurify";

interface GetSecurityConfig extends DOMPurifyConfig {
//   level: string;
  FORBID_SCRIPTS?: boolean;
  FORBID_EVAL?: boolean;
  FORBID_TAGS?: string[];
  FORBID_ATTR?: string[];
  ALLOWED_TAGS?: string[];
  ALLOWED_ATTR?: string[];
  USE_PROFILES?: { html: boolean };
  ADD_TAGS?: string[];
  ADD_ATTR?: string[];
}

export const SecurityLevels = {
  STRICT: "STRICT",
  MODERATE: "MODERATE",
  MINIMAL: "MINIMAL",
  NONE: "NONE",
};

export const getSecurityConfig = (level: string): GetSecurityConfig => {
  switch (level) {
    case SecurityLevels.STRICT:
      return {
        FORBID_SCRIPTS: true,
        FORBID_EVAL: true,
        ALLOWED_TAGS: ["div", "span", "p", "a", "img"],
        ALLOWED_ATTR: ["href", "src", "alt", "class", "id"],
      };
    case SecurityLevels.MODERATE:
      return {
        FORBID_EVAL: true,
        ALLOWED_TAGS: ["div", "span", "p", "a", "img", 'h1', 'input'],
        ALLOWED_ATTR: ["href", "src", "alt", "class", "id", "type"],
      };
    case SecurityLevels.MINIMAL:
      return {
        ALLOWED_TAGS: ["*"],
        ALLOWED_ATTR: ["*"],
        FORBID_EVAL: false,
      };
    case SecurityLevels.NONE:
      return {
        USE_PROFILES: { html: true },
        ADD_TAGS: ["*"],
        ADD_ATTR: ["*"],
        FORBID_TAGS: [],
        FORBID_ATTR: [],
      };
    default:
      return {}
  }
};
