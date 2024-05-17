/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {},
        colors: {
            blue: "#003b95",
            lightblue: "#1A4FA0",
            white: "#ffffff",
            sky: "#006ce4",
            black: "#1a1a1a",
            gray: "#595959",
            lightgray: "#6b6b6b",
            yellow: "#ffb700",
        },
        fontFamily: {
            main: ["Roboto", "sans-serif"],
        },
    },
    plugins: [],
};
