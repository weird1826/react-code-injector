declare const useCodeInjection: () => {
    isInjected: boolean;
    inject: () => void;
    eject: () => void;
};
export default useCodeInjection;
