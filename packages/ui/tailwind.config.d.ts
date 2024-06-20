declare const _default: {
    content: string[];
    presets: {
        content: string[];
        presets: {
            darkMode: ["class"];
            content: string[];
            theme: {
                extend: {
                    animation: {
                        "caret-blink": string;
                        "fade-in": string;
                    };
                    keyframes: {
                        shimmer: {
                            "100%": {
                                transform: string;
                            };
                        };
                        "caret-blink": {
                            "0%,70%,100%": {
                                opacity: string;
                            };
                            "20%,50%": {
                                opacity: string;
                            };
                        };
                        "fade-in": {
                            from: {
                                opacity: string;
                            };
                            to: {
                                opacity: string;
                            };
                        };
                    };
                    transitionTimingFunction: {
                        smoothing: string;
                    };
                    colors: {
                        border: string;
                        background: string;
                        foreground: string;
                        popover: string;
                        primary: {
                            DEFAULT: string;
                        };
                        secondary: string;
                        muted: {
                            DEFAULT: string;
                            foreground: string;
                        };
                        accent: {
                            DEFAULT: string;
                            foreground: string;
                        };
                    };
                    fontSize: {
                        base: string;
                    };
                    borderRadius: {
                        "3xl": string;
                        "2xl": string;
                        xl: string;
                        lg: string;
                        md: string;
                        sm: string;
                    };
                    boxShadow: {
                        button: string;
                        shadow: string;
                        "shadow-lighter": string;
                    };
                };
            };
        }[];
        theme: {
            container: {
                center: true;
                padding: string;
                screens: {
                    sm: string;
                    md: string;
                    lg: string;
                    xl: string;
                    "2xl": string;
                };
            };
        };
        plugins: {
            handler: () => void;
        }[];
    }[];
};
export default _default;
//# sourceMappingURL=tailwind.config.d.ts.map