module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
   
      extend: {
        animation: {
          "fade-in": "fadeIn 1s ease-in-out",
          "fade-in-up": "fadeInUp 1s ease-in-out",
          "slide-in-up": "slideInUp 1s ease-out",
          "slide-in-right": "slideInRight 1s ease-out",
          "scale-up": "scaleUp 0.8s ease-in-out",
          "hover": "hoverBounce 0.8s ease-in-out infinite",
          "text-fade": "textFade 1s ease-in",
        },
        keyframes: {
          fadeIn: {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
          fadeInUp: {
            "0%": { opacity: 0, transform: "translateY(20px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
          slideInUp: {
            "0%": { opacity: 0, transform: "translateY(50px)" },
            "100%": { opacity: 1, transform: "translateY(0)" },
          },
          slideInRight: {
            "0%": { opacity: 0, transform: "translateX(-50px)" },
            "100%": { opacity: 1, transform: "translateX(0)" },
          },
          scaleUp: {
            "0%": { transform: "scale(0.9)" },
            "100%": { transform: "scale(1)" },
          },
          hoverBounce: {
            "0%, 100%": { transform: "translateY(0)" },
            "50%": { transform: "translateY(-5px)" },
          },
          textFade: {
            "0%": { opacity: 0 },
            "100%": { opacity: 1 },
          },
        },
      },
    
  },
  plugins: [],
};
