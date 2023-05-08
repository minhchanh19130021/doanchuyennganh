/** @type {import('tailwindcss').Config} */
module.exports = {
    tailwindConfig: './styles/tailwind.config.js',
    content: ['./src/**/*.{js,jsx,ts,tsx}','node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                roboto: ['Roboto', 'sans-serif'],
            },
            screens: {
                xs: '375px',
                cs: '0px',
            },
        },
    },
    plugins: [
        require('@tailwindcss/line-clamp'),
        require('prettier-plugin-tailwindcss'),
        require('flowbite/plugin')
    ],
};
