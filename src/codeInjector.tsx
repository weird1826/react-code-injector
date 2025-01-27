import React, { useRef, useEffect, useState } from "react";
import useCodeInjection from "./useCodeInjection";
import { getSecurityConfig } from "./securityConfig";
import DOMPurify, { Config as DOMPurifyConfig } from "dompurify";

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

export const CodeInjector: React.FunctionComponent<CodeInjectorProps> = ({
  codeId,
  enabled,
  onFetch,
  onError,
  loadingComponent,
  errorComponent,
  securityLevel,
  customSecurityConfig,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { inject, eject } = useCodeInjection();
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasInjected, setHasInjected] = useState(false);
  const [content, setContent] = useState<string>('');

  useEffect(() => {
    let mounted = true;
    const injectCode = async () => {
      if (!enabled || !containerRef.current) return;

      console.log(`Injecting code with ID: ${codeId}, Enabled: ${enabled}`);
      setIsLoading(true);
      setContent('');

      try {
        const code = await onFetch(codeId);

        if (!mounted) return;

        console.log(`Fetched code for ID ${codeId}:`, code);
        const sanitizedCode = customSecurityConfig
          ? DOMPurify.sanitize(code, customSecurityConfig)
          : DOMPurify.sanitize(
              code,
              getSecurityConfig(securityLevel ?? "NONE")
            );
        console.log(`Sanitized code for ID ${codeId}:`, sanitizedCode);
        setContent(sanitizedCode);
        setTimeout(() => {
          if (containerRef.current && mounted) {
            containerRef.current.innerHTML = sanitizedCode;
            inject();
            setHasInjected(true);
            console.log('Content has been rendered to DOM');
          }
        }, 0);

      } catch (error) {
        if (mounted) {
          setError(error as Error);
          onError?.(error as Error);
          console.error("Error fetching code:", error);
        }
      } finally {
        if (mounted) {
          setIsLoading(false);
          console.log(`Loading state set to false for ID ${codeId}`);
        }
      }
    };

    const cleanup = () => {
      if (!enabled && hasInjected && containerRef.current) {
        containerRef.current.innerHTML = "";
        console.log(`Ejected code from container for ID ${codeId}`);
        setContent('');
        eject();
        setHasInjected(false);
      }
    };

    injectCode();

    return () => {
      mounted = false;
      cleanup();
    }
  }, [
    enabled,
    codeId,
  ]);

  if (error) {
    console.error(`Error in CodeInjector for ID ${codeId}:`, error);
    return (
      <div className="error-container">{errorComponent || error.message}</div>
    );
  }

  if (isLoading) {
    console.log(`Loading component displayed for ID ${codeId}`);
    return (
      <div className="loading-code-block">
        {loadingComponent || "Loading..."}
      </div>
    );
  }

  return <div ref={containerRef} style={{ display: enabled ? 'block' : 'none' }}
  dangerouslySetInnerHTML={content ? { __html: content } : undefined}/>;
};
