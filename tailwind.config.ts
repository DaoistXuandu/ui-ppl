import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: { DEFAULT: '#017EC1', active: '#0165A0' },
                secondary: '#B3D9F2',
                accent: '#06B6D4',
                background: { DEFAULT: '#E6F4FB', active: '#E6F4FB' },
                disabled: '#9CA3AF',
                textMain: '#4A5565',
                heading: '#000000',
                success: { DEFAULT: '#16A34A', active: '#169745' },
                error: { DEFAULT: '#DC2626', active: '#B52121' },
                warning: { DEFAULT: '#D97706', active: '#D97706' },
            },
            fontSize: {
                title: ['32px', '38px'],    // Size / Line height
                heading: ['24px', '31px'],
                body: ['16px', '24px'],
                tiny: ['12px', '17px'],
            },
        },
    },
    plugins: [],
};

export default config;