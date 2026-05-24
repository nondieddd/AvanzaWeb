document.addEventListener("DOMContentLoaded", function () {
    
    // 1. INCORPORACIÓN DEL WIDGET INTERACTIVO DE TRADINGVIEW (BOLSA MEXICANA IPC)
    if (typeof TradingView !== 'undefined') {
        new TradingView.widget({
            "width": "100%",
            "height": "100%",
            "symbol": "BMV:ME", 
            "interval": "D",
            "timezone": "America/Mexico_City",
            "theme": "dark",
            "style": "3", 
            "locale": "es",
            "enable_publishing": false,
            "hide_top_toolbar": true,
            "hide_legend": false,
            "save_image": false,
            "container_id": "bmv_live_widget",
            "backgroundColor": "#051428", 
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

    // 3. SELECCIÓN DE ENLACES ACTIVOS (CAMBIA SEGÚN EL SCROLL) - Optimización de rendimiento
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";
        const scrollPos = window.scrollY || window.pageYOffset;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            if (scrollPos >= sectionTop - 120) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active");
            }
        });
    }, { passive: true }); // Passive true optimiza el comportamiento de scroll en móviles

    // 4. ENVÍO DE FORMULARIO DIRECTO A WHATSAPP
    const contactForm = document.getElementById("contact-form");
    const footerWhatsapp = document.getElementById("footer-whatsapp");

    if (contactForm && footerWhatsapp) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const telefono = document.getElementById("telefono").value.trim();
            const ciudad = document.getElementById("ciudad").value.trim();
            const monto = document.getElementById("monto").value.trim();
            const tipoServicio = document.getElementById("tipoServicio").value;
            const mensaje = document.getElementById("mensaje").value.trim() || "Sin mensaje adicional";

            const rawPhone = footerWhatsapp.textContent.replace(/[^+\d]/g, "");
            const whatsappNumber = rawPhone.replace(/\D/g, "");
            const messageText = `Hola, quiero información sobre un servicio financiero.%0A%0ANombre: ${encodeURIComponent(nombre)}%0ATeléfono: ${encodeURIComponent(telefono)}%0ACiudad: ${encodeURIComponent(ciudad)}%0AMonto aproximado: ${encodeURIComponent(monto)}%0ATipo de servicio: ${encodeURIComponent(tipoServicio)}%0AMensaje: ${encodeURIComponent(mensaje)}`;
            const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${messageText}`;

            window.open(whatsappUrl, "_blank");
        });
    }
});