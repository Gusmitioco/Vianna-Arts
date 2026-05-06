import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        coal: '#080808',
        graphite: '#151515',
        iron: '#242424',
        steel: '#4f5050',
        gold: '#edc70e',
        brass: '#b89408',
        ivory: '#f5f1e7',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      boxShadow: {
        gold: '0 18px 60px rgba(237, 199, 14, 0.12)',
        hard: '0 24px 80px rgba(0, 0, 0, 0.5)',
      },
      backgroundImage: {
        metal:
          'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.01) 34%, rgba(237,199,14,0.08) 65%, rgba(255,255,255,0.03))',
      },
    },
  },
  plugins: [],
} satisfies Config;
