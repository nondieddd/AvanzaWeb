document.addEventListener("DOMContentLoaded", function () {
    
    // 1. INCORPORACIÓN DEL WIDGET INTERACTIVO DE TRADINGVIEW (BOLSA MEXICANA IPC)
    if (typeof TradingView !== 'undefined') {
        new TradingView.widget({
            "width": "100%",
            "height": "100%",
            "symbol": "BMV:ME", // S&P/BMV IPC Index Oficial de México
            "interval": "D",
            "timezone": "America/Mexico_City",
            "theme": "dark",
            "style": "3", // Área sombreada para una lectura impecable y elegante
            "locale": "es",
            "enable_publishing": false,
            "hide_top_toolbar": true,
            "hide_legend": false,
            "save_image": false,
            "container_id": "bmv_live_widget",
            "backgroundColor": "#051428", // Match exacto con el azul de fondo de AVANZA
            "gridColor": "rgba(255, 255, 255, 0.03)",
            "lineWidth": 2
        });
    }

    // 2. RELOJ CORPORATIVO DIGITAL EN VIVO (ZONA HORARIA MÉXICO)
    function runAvanzaClock() {
        const clockElement = document.getElementById("clock-display");
        if (!clockElement) return;

        setInterval(() => {
            const localDate = new Date();
            clockElement.textContent = localDate.toLocaleTimeString("es-MX", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
                timeZone: "America/Mexico_City"
            });
        }, 1000);
    }
    runAvanzaClock();

    // 3. SELECCIÓN DE ENLACES ACTIVOS (CAMBIA SEGÚN EL SCROLL)
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (pageYOffset >= sectionTop - 120) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    });
});