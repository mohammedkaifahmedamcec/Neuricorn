// Golden Neural Network Animation Class
class NeuralNetwork {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.nodes = [];
        this.connections = [];
        this.animationId = null;
        
        this.resize();
        this.init();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = this.canvas.offsetWidth;
        this.canvas.height = this.canvas.offsetHeight;
    }
    
    init() {
        const nodeCount = Math.min(50, Math.floor((this.canvas.width * this.canvas.height) / 15000));
        
        // Create nodes
        for (let i = 0; i < nodeCount; i++) {
            this.nodes.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                radius: Math.random() * 3 + 1,
                opacity: Math.random() * 0.8 + 0.2,
                pulsePhase: Math.random() * Math.PI * 2
            });
        }
        
        // Create connections
        this.updateConnections();
    }
    
    updateConnections() {
        this.connections = [];
        const maxDistance = 120;
        
        for (let i = 0; i < this.nodes.length; i++) {
            for (let j = i + 1; j < this.nodes.length; j++) {
                const dx = this.nodes[i].x - this.nodes[j].x;
                const dy = this.nodes[i].y - this.nodes[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    this.connections.push({
                        node1: this.nodes[i],
                        node2: this.nodes[j],
                        distance: distance,
                        opacity: (maxDistance - distance) / maxDistance
                    });
                }
            }
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // Update and draw connections with golden colors
        this.connections.forEach(connection => {
            const gradient = this.ctx.createLinearGradient(
                connection.node1.x, connection.node1.y,
                connection.node2.x, connection.node2.y
            );
            gradient.addColorStop(0, `rgba(255, 215, 0, ${connection.opacity * 0.3})`);
            gradient.addColorStop(0.5, `rgba(244, 196, 48, ${connection.opacity * 0.5})`);
            gradient.addColorStop(1, `rgba(218, 165, 32, ${connection.opacity * 0.3})`);
            
            this.ctx.strokeStyle = gradient;
            this.ctx.lineWidth = connection.opacity * 2;
            this.ctx.beginPath();
            this.ctx.moveTo(connection.node1.x, connection.node1.y);
            this.ctx.lineTo(connection.node2.x, connection.node2.y);
            this.ctx.stroke();
        });
        
        // Update and draw nodes with golden colors
        this.nodes.forEach(node => {
            // Update position
            node.x += node.vx;
            node.y += node.vy;
            
            // Bounce off walls
            if (node.x <= 0 || node.x >= this.canvas.width) node.vx *= -1;
            if (node.y <= 0 || node.y >= this.canvas.height) node.vy *= -1;
            
            // Keep nodes in bounds
            node.x = Math.max(0, Math.min(this.canvas.width, node.x));
            node.y = Math.max(0, Math.min(this.canvas.height, node.y));
            
            // Update pulse phase
            node.pulsePhase += 0.02;
            const pulseScale = 1 + Math.sin(node.pulsePhase) * 0.3;
            
            // Draw node with golden glow
            const gradient = this.ctx.createRadialGradient(
                node.x, node.y, 0,
                node.x, node.y, node.radius * pulseScale * 3
            );
            gradient.addColorStop(0, `rgba(255, 215, 0, ${node.opacity})`);
            gradient.addColorStop(0.7, `rgba(255, 215, 0, ${node.opacity * 0.3})`);
            gradient.addColorStop(1, 'rgba(255, 215, 0, 0)');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * pulseScale * 3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Draw golden core
            this.ctx.fillStyle = `rgba(255, 215, 0, ${node.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(node.x, node.y, node.radius * pulseScale, 0, Math.PI * 2);
            this.ctx.fill();
        });
        
        // Update connections every few frames for performance
        if (Math.random() < 0.1) {
            this.updateConnections();
        }
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
    
    destroy() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    }
}

// Intersection Observer for animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        this.observer = new IntersectionObserver(
            this.handleIntersection.bind(this),
            this.observerOptions
        );
        
        this.init();
    }
    
    init() {
        // Elements to animate on scroll
        const animateElements = document.querySelectorAll(
            '.product-card, .feature-card, .about__text, .about__visual, .section-header'
        );
        
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'all 0.8s ease';
            this.observer.observe(el);
        });
    }
    
    handleIntersection(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                this.observer.unobserve(entry.target);
            }
        });
    }
}

// Navigation Class
class Navigation {
    constructor() {
        this.header = document.getElementById('header');
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.navLinks = document.querySelectorAll('.nav__link');
        
        this.init();
    }
    
    init() {
        // Mobile menu toggle
        this.navToggle.addEventListener('click', () => {
            this.navMenu.classList.toggle('active');
        });
        
        // Close menu on link click
        this.navLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.updateActiveLink(link);
            });
        });
        
        // Smooth scrolling
        this.setupSmoothScrolling();
        
        // Header scroll effect
        this.setupHeaderScroll();
        
        // Update active link on scroll
        this.setupScrollSpy();
    }
    
    setupSmoothScrolling() {
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                let targetSection = document.querySelector(targetId);
                
                // Handle special cases
                if (targetId === '#home') {
                    targetSection = document.querySelector('.hero');
                } else if (targetId === '#contact') {
                    targetSection = document.querySelector('.contact');
                }
                
                if (targetSection) {
                    const headerHeight = this.header.offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    setupHeaderScroll() {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                this.header.style.background = 'rgba(15, 15, 15, 0.98)';
                this.header.style.boxShadow = '0 2px 20px rgba(255, 215, 0, 0.1)';
            } else {
                this.header.style.background = 'rgba(15, 15, 15, 0.95)';
                this.header.style.boxShadow = 'none';
            }
        });
    }
    
    setupScrollSpy() {
        const sections = document.querySelectorAll('section[id], .hero');
        
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY + this.header.offsetHeight + 50;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                let sectionId = section.getAttribute('id');
                
                // Handle hero section
                if (section.classList.contains('hero')) {
                    sectionId = 'home';
                }
                
                if (sectionId && scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    const activeLink = document.querySelector(`.nav__link[href="#${sectionId}"]`);
                    if (activeLink) {
                        this.updateActiveLink(activeLink);
                    }
                }
            });
        });
    }
    
    updateActiveLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }
}

// Interactive Elements Class
class InteractiveElements {
    constructor() {
        this.init();
    }
    
    init() {
        this.setupProductCards();
        this.setupButtons();
        this.setupParallax();
        this.setupDemoModal();
    }
    
    setupProductCards() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-15px) rotateX(5deg)';
                card.style.boxShadow = '0 20px 60px rgba(255, 215, 0, 0.3)';
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) rotateX(0deg)';
                card.style.boxShadow = '0 8px 32px rgba(255, 215, 0, 0.15)';
            });
            
            // Add click animation
            card.addEventListener('click', () => {
                card.style.animation = 'none';
                card.offsetHeight; // Trigger reflow
                card.style.animation = 'cardPulse 0.6s ease';
                
                // Show product details
                this.showProductDetails(card);
            });
        });
    }
    
    showProductDetails(card) {
        const productName = card.querySelector('.product-card__title').textContent;
        const productDescription = card.querySelector('.product-card__description').textContent;
        
        alert(`${productName}\n\n${productDescription}\n\nContact us to learn more about this solution!`);
    }
    
    setupButtons() {
        const buttons = document.querySelectorAll('.btn');
        
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Create ripple effect with golden color
                const ripple = document.createElement('span');
                const rect = button.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.cssText = `
                    position: absolute;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                    background: rgba(255, 215, 0, 0.3);
                    border-radius: 50%;
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    pointer-events: none;
                `;
                
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
                button.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
                
                // Handle specific button actions
                this.handleButtonAction(button);
            });
        });
    }
    
    handleButtonAction(button) {
        const buttonText = button.textContent.trim();
        
        if (buttonText.includes('Watch Demo')) {
            this.showDemoModal();
        } else if (buttonText.includes('Schedule Demo')) {
            this.scheduleDemo();
        } else if (buttonText.includes('Download Brochure')) {
            this.downloadBrochure();
        } else if (buttonText.includes('Explore Our Solutions')) {
            // Already handled by navigation - scroll to products
            const productsSection = document.querySelector('#products');
            if (productsSection) {
                const headerHeight = document.getElementById('header').offsetHeight;
                window.scrollTo({
                    top: productsSection.offsetTop - headerHeight,
                    behavior: 'smooth'
                });
            }
        }
    }
    
    setupDemoModal() {
        // Create modal HTML with golden theme
        const modalHTML = `
            <div id="demo-modal" class="modal hidden">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Neural Intelligence Demo</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>Experience the power of our neural network-based educational solutions.</p>
                        <div class="demo-placeholder">
                            <div class="demo-animation">
                                <div class="demo-node"></div>
                                <div class="demo-node"></div>
                                <div class="demo-node"></div>
                                <div class="demo-connection"></div>
                                <div class="demo-connection"></div>
                            </div>
                            <p>Interactive Demo Coming Soon!</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Add modal styles with golden theme
        const modalStyles = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.8);
                z-index: 10000;
                display: flex;
                align-items: center;
                justify-content: center;
                backdrop-filter: blur(10px);
            }
            
            .modal.hidden {
                display: none;
            }
            
            .modal-content {
                background: rgba(42, 42, 42, 0.95);
                border: 1px solid rgba(255, 215, 0, 0.2);
                border-radius: 12px;
                max-width: 500px;
                width: 90%;
                max-height: 80vh;
                overflow-y: auto;
                backdrop-filter: blur(20px);
            }
            
            .modal-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 1.5rem;
                border-bottom: 1px solid rgba(255, 215, 0, 0.2);
            }
            
            .modal-header h3 {
                color: #FFD700;
                margin: 0;
            }
            
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                color: #F4C430;
                cursor: pointer;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                transition: all 0.3s ease;
            }
            
            .modal-close:hover {
                background: rgba(255, 215, 0, 0.1);
                color: #FFFFFF;
            }
            
            .modal-body {
                padding: 1.5rem;
                color: #F4C430;
            }
            
            .demo-placeholder {
                text-align: center;
                padding: 2rem;
                background: rgba(255, 215, 0, 0.05);
                border-radius: 8px;
                margin: 1rem 0;
            }
            
            .demo-animation {
                position: relative;
                width: 100px;
                height: 100px;
                margin: 0 auto 1rem;
            }
            
            .demo-node {
                position: absolute;
                width: 10px;
                height: 10px;
                background: #FFD700;
                border-radius: 50%;
                animation: neuralPulse 2s infinite ease-in-out;
            }
            
            .demo-node:nth-child(1) { top: 20%; left: 30%; }
            .demo-node:nth-child(2) { top: 40%; right: 20%; animation-delay: 0.5s; }
            .demo-node:nth-child(3) { bottom: 30%; left: 50%; animation-delay: 1s; }
            
            .demo-connection {
                position: absolute;
                background: linear-gradient(90deg, transparent, #FFD700, transparent);
                height: 1px;
                animation: connectionFlow 3s infinite;
            }
            
            .demo-connection:nth-child(4) {
                top: 25%;
                left: 35%;
                width: 40%;
                transform: rotate(15deg);
            }
            
            .demo-connection:nth-child(5) {
                top: 50%;
                left: 20%;
                width: 60%;
                transform: rotate(-20deg);
                animation-delay: 1s;
            }
        `;
        
        const styleSheet = document.createElement('style');
        styleSheet.textContent = modalStyles;
        document.head.appendChild(styleSheet);
        
        // Setup modal event listeners
        const modal = document.getElementById('demo-modal');
        const closeBtn = modal.querySelector('.modal-close');
        
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
            }
        });
    }
    
    showDemoModal() {
        const modal = document.getElementById('demo-modal');
        modal.classList.remove('hidden');
    }
    
    scheduleDemo() {
        alert('Schedule Demo\n\nThank you for your interest! Our team will contact you within 24 hours to schedule a personalized demo.\n\nFor immediate assistance, please call: +91 (800) 123-4567\nOr email: hello@neuricornsyndicate.com');
    }
    
    downloadBrochure() {
        alert('Download Brochure\n\nYour brochure download will begin shortly.\n\nThe comprehensive guide includes:\n• Detailed product specifications\n• Implementation case studies\n• Pricing information\n• Technical requirements\n\nFor additional resources, visit our documentation portal.');
    }
    
    setupParallax() {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.neural-brain, .about__visual');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    }
}

// Footer Links Handler
class FooterHandler {
    constructor() {
        this.setupFooterLinks();
    }
    
    setupFooterLinks() {
        const footerLinks = document.querySelectorAll('.footer__list a');
        
        footerLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const linkText = link.textContent.trim();
                
                // Handle product links
                if (['WebChain', 'NeuraGrade', 'NeuraScan', 'Training Hub'].includes(linkText)) {
                    this.scrollToProduct(linkText);
                } else if (linkText === 'About Us') {
                    this.scrollToSection('#about');
                } else if (linkText === 'Contact') {
                    this.scrollToSection('#contact');
                } else {
                    alert(`${linkText}\n\nThis section is coming soon! Stay tuned for updates.\n\nFor immediate assistance, contact us at hello@neuricornsyndicate.com`);
                }
            });
        });
    }
    
    scrollToProduct(productName) {
        const productsSection = document.querySelector('#products');
        if (productsSection) {
            const headerHeight = document.getElementById('header').offsetHeight;
            window.scrollTo({
                top: productsSection.offsetTop - headerHeight,
                behavior: 'smooth'
            });
            
            // Highlight the specific product with golden glow
            setTimeout(() => {
                const productCards = document.querySelectorAll('.product-card');
                productCards.forEach(card => {
                    const cardTitle = card.querySelector('.product-card__title').textContent;
                    if (cardTitle.includes(productName.replace(' Hub', ''))) {
                        card.style.border = '2px solid #FFD700';
                        card.style.boxShadow = '0 0 30px rgba(255, 215, 0, 0.4)';
                        
                        setTimeout(() => {
                            card.style.border = '1px solid rgba(255, 215, 0, 0.2)';
                            card.style.boxShadow = '0 8px 32px rgba(255, 215, 0, 0.15)';
                        }, 3000);
                    }
                });
            }, 1000);
        }
    }
    
    scrollToSection(sectionId) {
        const section = document.querySelector(sectionId);
        if (section) {
            const headerHeight = document.getElementById('header').offsetHeight;
            window.scrollTo({
                top: section.offsetTop - headerHeight,
                behavior: 'smooth'
            });
        }
    }
}

// Particle System for enhanced golden effects
class ParticleSystem {
    constructor() {
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.canvas = null;
        this.ctx = null;
        this.init();
    }
    
    init() {
        // Create floating particles canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1;
            opacity: 0.6;
        `;
        document.body.appendChild(this.canvas);
        
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        
        // Track mouse
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
        
        // Create particles
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.2,
                vy: (Math.random() - 0.5) * 0.2,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.1,
                color: `rgba(${255}, ${215}, ${0}, 0.6)` // Golden color
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.x -= dx * force * 0.01;
                particle.y -= dy * force * 0.01;
            }
            
            // Wrap around screen
            if (particle.x < 0) particle.x = this.canvas.width;
            if (particle.x > this.canvas.width) particle.x = 0;
            if (particle.y < 0) particle.y = this.canvas.height;
            if (particle.y > this.canvas.height) particle.y = 0;
            
            // Draw particle with golden glow
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 215, 0, ${particle.opacity})`;
            this.ctx.fill();
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

// Performance Monitor
class PerformanceMonitor {
    constructor() {
        this.isHighPerformance = true;
        this.checkPerformance();
    }
    
    checkPerformance() {
        // Simple performance check based on device capabilities
        const canvas = document.createElement('canvas');
        const gl = canvas.getContext('webgl');
        
        if (!gl) {
            this.isHighPerformance = false;
            return;
        }
        
        // Check for mobile devices
        if (window.innerWidth < 768 || /Mobi|Android/i.test(navigator.userAgent)) {
            this.isHighPerformance = false;
        }
        
        // Adjust animations based on performance
        if (!this.isHighPerformance) {
            document.documentElement.style.setProperty('--animation-duration', '0s');
            // Disable heavy animations on low-performance devices
        }
    }
}

// Main App Initialization
class NeuricornApp {
    constructor() {
        this.neuralNetwork = null;
        this.navigation = null;
        this.scrollAnimations = null;
        this.interactiveElements = null;
        this.footerHandler = null;
        this.particleSystem = null;
        this.performanceMonitor = null;
        
        this.init();
    }
    
    init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initializeApp());
        } else {
            this.initializeApp();
        }
    }
    
    initializeApp() {
        console.log('🧠 Initializing Neuricorn Syndicate...');
        
        // Initialize performance monitor first
        this.performanceMonitor = new PerformanceMonitor();
        
        // Initialize core components
        this.navigation = new Navigation();
        this.scrollAnimations = new ScrollAnimations();
        this.interactiveElements = new InteractiveElements();
        this.footerHandler = new FooterHandler();
        
        // Initialize neural network canvas with golden theme
        const neuralCanvas = document.getElementById('neural-canvas');
        if (neuralCanvas) {
            this.neuralNetwork = new NeuralNetwork(neuralCanvas);
        }
        
        // Initialize particle system only on high-performance devices
        if (this.performanceMonitor.isHighPerformance) {
            this.particleSystem = new ParticleSystem();
        }
        
        // Add custom CSS animations
        this.addCustomAnimations();
        
        console.log('✅ Neuricorn Syndicate initialized with Golden Theme!');
    }
    
    addCustomAnimations() {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
            
            @keyframes cardPulse {
                0%, 100% { transform: scale(1); }
                50% { transform: scale(1.02); }
            }
            
            .product-card {
                transform-style: preserve-3d;
            }
            
            .feature-card:hover .feature-card__icon {
                transform: rotateY(360deg);
                transition: transform 0.8s ease;
            }
            
            .btn:active {
                transform: scale(0.98);
            }
            
            /* Golden glow effect for interactive elements */
            .product-card:hover,
            .feature-card:hover,
            .btn:hover {
                box-shadow: 0 0 20px rgba(255, 215, 0, 0.3);
            }
        `;
        document.head.appendChild(style);
    }
}

// Initialize the application
const app = new NeuricornApp();