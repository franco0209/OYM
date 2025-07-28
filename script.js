document.addEventListener('DOMContentLoaded', function() {
    // Navegación móvil
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li');
    
    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    navLinksItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });
    
    // Scroll suave para enlaces
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Cambiar navbar al hacer scroll
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });
    
    // Sistema de pestañas
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Remover clase active de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Agregar clase active al botón y contenido seleccionado
            button.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Sistema de modales
    const modalButtons = document.querySelectorAll('.learn-more');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    modalButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            modal.style.display = 'block';
            setTimeout(() => {
                modal.classList.add('show');
            }, 10);
            
            document.body.style.overflow = 'hidden';
        });
    });
    
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modal = button.closest('.modal');
            closeModal(modal);
        });
    });
    
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModal(e.target);
        }
    });
    
    function closeModal(modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
    
    // Gráfico de oferta y demanda
    const supplyDemandCtx = document.getElementById('supply-demand-chart').getContext('2d');
    const supplyDemandChart = new Chart(supplyDemandCtx, {
        type: 'line',
        data: {
            labels: ['Precio 1', 'Precio 2', 'Precio 3', 'Precio 4', 'Precio 5'],
            datasets: [
                {
                    label: 'Demanda',
                    data: [50, 40, 30, 20, 10],
                    borderColor: '#4a6bff',
                    backgroundColor: 'rgba(74, 107, 255, 0.1)',
                    tension: 0.3,
                    fill: true
                },
                {
                    label: 'Oferta',
                    data: [10, 20, 30, 40, 50],
                    borderColor: '#ff6b6b',
                    backgroundColor: 'rgba(255, 107, 107, 0.1)',
                    tension: 0.3,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    mode: 'index',
                    intersect: false,
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Cantidad'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Precio'
                    }
                }
            }
        }
    });
    
// ===== DIAGRAMA DE ISHIKAWA =====
    const ishikawaBtn = document.getElementById('generate-ishikawa');
    const ishikawaCanvas = document.getElementById('ishikawa-diagram');
    
    // Verificamos que los elementos existen
    if (!ishikawaCanvas || !ishikawaBtn) {
        console.error('Elementos del diagrama no encontrados');
        return;
    }
    
    // Obtenemos el contexto del canvas con verificación
    let ishikawaCtx;
    try {
        ishikawaCtx = ishikawaCanvas.getContext('2d');
        if (!ishikawaCtx) {
            throw new Error('Contexto 2D no disponible');
        }
    } catch (error) {
        console.error('Error al obtener contexto:', error);
        return;
    }
    
    // Función para inicializar el canvas
    function initCanvas() {
        // Ajustamos el tamaño del canvas (importante para calidad de gráficos)
        const container = ishikawaCanvas.parentElement;
        ishikawaCanvas.width = container.offsetWidth;
        ishikawaCanvas.height = container.offsetHeight;
        
        // Estilos base
        ishikawaCanvas.style.display = 'block';
        ishikawaCanvas.style.backgroundColor = '#fff';
    }
    
    // Función principal para generar el diagrama
    function generateIshikawa() {
        console.log('Generando diagrama...');
        
        // Inicializamos el canvas
        initCanvas();
        
        // Limpiar el canvas
        ishikawaCtx.clearRect(0, 0, ishikawaCanvas.width, ishikawaCanvas.height);
        
        // Configuración del diagrama
        const centerX = ishikawaCanvas.width / 2;
        const centerY = ishikawaCanvas.height / 2;
        const spineLength = Math.min(ishikawaCanvas.width * 0.8, 500);
        const branchLength = spineLength * 0.35;
        const branchAngle = 25;
        
        // 1. Dibujar la espina principal (línea horizontal)
        ishikawaCtx.beginPath();
        ishikawaCtx.moveTo(centerX - spineLength / 2, centerY);
        ishikawaCtx.lineTo(centerX + spineLength / 2, centerY);
        ishikawaCtx.strokeStyle = '#2c3e50';
        ishikawaCtx.lineWidth = 3;
        ishikawaCtx.stroke();
        
        // 2. Dibujar la cabeza del pescado (triángulo)
        ishikawaCtx.beginPath();
        ishikawaCtx.moveTo(centerX + spineLength / 2, centerY);
        ishikawaCtx.lineTo(centerX + spineLength / 2 - 25, centerY - 20);
        ishikawaCtx.lineTo(centerX + spineLength / 2 - 25, centerY + 20);
        ishikawaCtx.closePath();
        ishikawaCtx.fillStyle = '#4a6bff';
        ishikawaCtx.fill();
        
        // 3. Definir las causas (6M tradicionales)
        const causes = [
            { name: 'Método', sub: ['Procedimientos', 'Flujo', 'Estándares'] },
            { name: 'Personas', sub: ['Habilidades', 'Capacitación', 'Motivación'] },
            { name: 'Materiales', sub: ['Calidad', 'Proveedores', 'Disponibilidad'] },
            { name: 'Maquinaria', sub: ['Mantenimiento', 'Calibración', 'Antigüedad'] },
            { name: 'Medio Ambiente', sub: ['Lugar', 'Temperatura', 'Humedad'] },
            { name: 'Medición', sub: ['Instrumentos', 'Frecuencia', 'Precisión'] }
        ];
        
        // 4. Dibujar ramas principales y subramas
        causes.forEach((cause, index) => {
            const isLeftSide = index < 3; // Las primeras 3 van al lado izquierdo
            const angle = (index % 2 === 0 ? 1 : -1) * branchAngle;
            const direction = isLeftSide ? -1 : 1;
            
            // Punto de inicio de la rama
            const startX = centerX + (direction * spineLength / 3);
            const startY = centerY;
            
            // Punto final de la rama
            const endX = startX + (direction * branchLength * Math.cos(angle * Math.PI / 180));
            const endY = startY + (branchLength * Math.sin(angle * Math.PI / 180));
            
            // Dibujar rama principal
            ishikawaCtx.beginPath();
            ishikawaCtx.moveTo(startX, startY);
            ishikawaCtx.lineTo(endX, endY);
            ishikawaCtx.strokeStyle = '#6c757d';
            ishikawaCtx.lineWidth = 2;
            ishikawaCtx.stroke();
            
            // Dibujar subramas
            cause.sub.forEach((subCause, subIndex) => {
                const subAngle = angle + (subIndex - 1) * 12;
                const subLength = branchLength * 0.7;
                
                // Punto medio de la rama principal
                const midX = startX + (direction * (branchLength * 0.4) * Math.cos(angle * Math.PI / 180));
                const midY = startY + ((branchLength * 0.4) * Math.sin(angle * Math.PI / 180));
                
                // Punto final de la subrama
                const subEndX = midX + (direction * subLength * Math.cos(subAngle * Math.PI / 180));
                const subEndY = midY + (subLength * Math.sin(subAngle * Math.PI / 180));
                
                // Dibujar subrama
                ishikawaCtx.beginPath();
                ishikawaCtx.moveTo(midX, midY);
                ishikawaCtx.lineTo(subEndX, subEndY);
                ishikawaCtx.strokeStyle = '#adb5bd';
                ishikawaCtx.lineWidth = 1;
                ishikawaCtx.stroke();
                
                // Texto de la subcausa
                ishikawaCtx.font = '11px Arial';
                ishikawaCtx.fillStyle = '#495057';
                ishikawaCtx.textAlign = direction === -1 ? 'right' : 'left';
                ishikawaCtx.fillText(subCause, subEndX + (direction * 5), subEndY + 4);
            });
            
            // Texto de la causa principal
            ishikawaCtx.font = 'bold 13px Arial';
            ishikawaCtx.fillStyle = '#2c3e50';
            ishikawaCtx.textAlign = direction === -1 ? 'right' : 'left';
            ishikawaCtx.fillText(cause.name, endX + (direction * 8), endY + 5);
        });
        
        // 5. Texto del problema principal
        ishikawaCtx.font = 'bold 18px Arial';
        ishikawaCtx.fillStyle = '#ff6b6b';
        ishikawaCtx.textAlign = 'center';
        ishikawaCtx.fillText('PROBLEMA PRINCIPAL', centerX, centerY - 45);
        
        // 6. Flecha indicadora
        ishikawaCtx.beginPath();
        ishikawaCtx.moveTo(centerX, centerY - 35);
        ishikawaCtx.lineTo(centerX, centerY - 15);
        ishikawaCtx.strokeStyle = '#ff6b6b';
        ishikawaCtx.lineWidth = 2;
        ishikawaCtx.stroke();
        
        // Punta de flecha
        ishikawaCtx.beginPath();
        ishikawaCtx.moveTo(centerX - 6, centerY - 25);
        ishikawaCtx.lineTo(centerX, centerY - 15);
        ishikawaCtx.lineTo(centerX + 6, centerY - 25);
        ishikawaCtx.fillStyle = '#ff6b6b';
        ishikawaCtx.fill();
    }
    
    // Event listeners
    ishikawaBtn.addEventListener('click', generateIshikawa);
    window.addEventListener('load', generateIshikawa);
    window.addEventListener('resize', function() {
        generateIshikawa();
    });
    
    // Formulario de contacto
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simular envío
        const submitBtn = this.querySelector('button[type="submit"]');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        
        setTimeout(() => {
            submitBtn.textContent = 'Mensaje Enviado!';
            submitBtn.style.backgroundColor = '#28a745';
            
            // Resetear formulario después de 2 segundos
            setTimeout(() => {
                contactForm.reset();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Enviar Mensaje';
                submitBtn.style.backgroundColor = '';
                
                // Mostrar notificación
                alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
            }, 2000);
        }, 1500);
    });
    
    // Animaciones al hacer scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.method-card, .indicator, .concept-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Configurar observador de intersección para animaciones
    const observerOptions = {
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.method-card, .indicator, .concept-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(element);
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar
});

