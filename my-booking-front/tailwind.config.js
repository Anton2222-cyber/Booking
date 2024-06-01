/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        container: {
            padding: "5rem",
        },
        extend: {
            backgroundImage: {
                "hero-home": "url('/assets/homeHero.jpeg')",
                "hero-search": "url('/assets/searchHero.jpg')",
                "map-bg": "url('/assets/mapbg.png')",
            },
        },
        colors: {
            blue: "#003b95",
            darkblue: "#00224F",
            red: "#A30000",
            brown: "#923E01",
            lightblue: "#1A4FA0",
            green: "#00d300",
            white: "#ffffff",
            sky: "#006ce4",
            lightsky: "#e8edf6",
            black: "#1a1a1a",
            gray: "#595959",
            lightgray: "#6b6b6b",
            light2gray: "#f5f5f5",
            yellow: "#ffb700",

        },
        fontFamily: {
            main: ["Roboto", "sans-serif"],
        },
    },
    plugins: [],
};
