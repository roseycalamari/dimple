// Premium Interactive Features for Dimple Website
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll behavior for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
            // For non-hash links (like about.html, graphical-cleaning.html), let the default behavior happen
        });
    });

    // Enhanced header scroll effect with hide/show animation
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    function updateHeader() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class when scrolled down
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header based on scroll direction
        if (currentScrollY > 100) {
            if (currentScrollY > lastScrollY && currentScrollY > 200) {
                // Scrolling down - hide header
                header.classList.add('hidden');
                header.classList.remove('visible');
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up - show header with animation
                header.classList.remove('hidden');
                header.classList.add('visible');
            }
        } else {
            // At top - always show header
            header.classList.remove('hidden', 'visible');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateHeader);
            ticking = true;
        }
    });

    // Parallax effect for hero background
    const heroBackground = document.querySelector('.hero-grid-pattern');
    if (heroBackground) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroBackground.style.transform = `translate(-10%, -10%) translateY(${rate}px)`;
        });
    }

    // Service cards interactive animations
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Staggered entrance animation
        card.style.animationDelay = `${index * 0.2}s`;
        
        // Enhanced hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.03) rotate(0.5deg)';
            this.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.25), 0 10px 30px rgba(0, 0, 0, 0.2)';
            
            // Animate icon
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1.15) rotate(-8deg)';
            }
            
            // Animate stats
            const stats = this.querySelectorAll('.stat');
            stats.forEach((stat, i) => {
                setTimeout(() => {
                    stat.style.transform = 'translateY(-3px) scale(1.05)';
                }, i * 100);
            });
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1) rotate(0deg)';
            this.style.boxShadow = '0 15px 50px rgba(0, 0, 0, 0.15), 0 5px 20px rgba(0, 0, 0, 0.1)';
            
            // Reset icon
            const icon = this.querySelector('.card-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            // Reset stats
            const stats = this.querySelectorAll('.stat');
            stats.forEach(stat => {
                stat.style.transform = 'translateY(0) scale(1)';
            });
        });
    });

    // CTA buttons enhanced interactions
    const ctaButtons = document.querySelectorAll('.cta-primary, .cta-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.08)';
            
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                top: 50%;
                left: 50%;
                width: 0;
                height: 0;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: translate(-50%, -50%);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add ripple animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                width: 100px;
                height: 100px;
                opacity: 0;
            }
        }
        
        @keyframes cardEntrance {
            from {
                opacity: 0;
                transform: translateY(50px) scale(0.9);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        .service-card {
            animation: cardEntrance 0.8s ease-out forwards;
        }
    `;
    document.head.appendChild(style);

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards for scroll animations
    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(card);
    });

    // NEW MODERN MOBILE MENU FUNCTIONALITY
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuClose = document.getElementById('mobileMenuClose');
    const mobileMenuLinks = document.querySelectorAll('.mobile-menu-link');
    const mobileMenuSublinks = document.querySelectorAll('.mobile-menu-sublink');
    const graphicalCleaningToggle = document.getElementById('graphicalCleaningToggle');
    const graphicalCleaningSubmenu = document.getElementById('graphicalCleaningSubmenu');
    
    // Only initialize mobile menu if elements exist
    if (mobileMenuToggle && mobileMenuOverlay && mobileMenu && mobileMenuClose) {
    
    function openMobileMenu() {
        mobileMenuOverlay.classList.add('active');
        mobileMenu.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Animate hamburger lines
        const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
        lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        lines[1].style.opacity = '0';
        lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        
        // Focus management
        setTimeout(() => {
            mobileMenuClose.focus();
        }, 300);
    }
    
    function closeMobileMenu() {
        mobileMenuOverlay.classList.remove('active');
        mobileMenu.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset hamburger lines
        const lines = mobileMenuToggle.querySelectorAll('.hamburger-line');
        lines[0].style.transform = 'none';
        lines[1].style.opacity = '1';
        lines[2].style.transform = 'none';
        
        // Close any open dropdowns
        if (graphicalCleaningToggle && graphicalCleaningSubmenu) {
            graphicalCleaningToggle.classList.remove('active');
            graphicalCleaningSubmenu.classList.remove('active');
        }
        
        // Return focus to toggle button
        setTimeout(() => {
            mobileMenuToggle.focus();
        }, 300);
    }
    
    // Event listeners
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', openMobileMenu);
    }
    
    if (mobileMenuClose) {
        mobileMenuClose.addEventListener('click', closeMobileMenu);
    }
    
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    }
    
    // Dropdown functionality
    if (graphicalCleaningToggle && graphicalCleaningSubmenu) {
        graphicalCleaningToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = this.classList.contains('active');
            
            // Close all other dropdowns
            document.querySelectorAll('.mobile-menu-dropdown-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
            document.querySelectorAll('.mobile-menu-submenu').forEach(submenu => {
                submenu.classList.remove('active');
            });
            
            // Toggle current dropdown
            if (!isActive) {
                this.classList.add('active');
                graphicalCleaningSubmenu.classList.add('active');
            }
        });
    }
    
    // Close menu when clicking on navigation links
    [...mobileMenuLinks, ...mobileMenuSublinks].forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            // Close menu first
            closeMobileMenu();
            
            // Then navigate after a short delay
            setTimeout(() => {
                if (targetId && targetId.startsWith('#')) {
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        targetElement.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                } else if (targetId && !targetId.startsWith('#')) {
                    window.location.href = targetId;
                }
            }, 300);
        });
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.mobile-menu-dropdown')) {
            document.querySelectorAll('.mobile-menu-dropdown-toggle').forEach(toggle => {
                toggle.classList.remove('active');
            });
            document.querySelectorAll('.mobile-menu-submenu').forEach(submenu => {
                submenu.classList.remove('active');
            });
        }
    });
    
    } // End of mobile menu initialization check

    // Smooth scroll indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', function() {
            const servicesSection = document.querySelector('.services-showcase');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Learn More button scroll functionality
    const learnMoreButton = document.querySelector('[data-action="learn"]');
    if (learnMoreButton) {
        learnMoreButton.addEventListener('click', function() {
            const servicesSection = document.querySelector('.services-showcase');
            if (servicesSection) {
                servicesSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Discover HSR Technology button navigation functionality
    const discoverHsrButton = document.querySelector('[data-action="discover-hsr"]');
    if (discoverHsrButton) {
        discoverHsrButton.addEventListener('click', function() {
            window.location.href = 'formula1.html';
        });
    }

    // Get More Information button navigation functionality
    const getMoreInfoButtons = document.querySelectorAll('[data-action="get-more-info"]');
    getMoreInfoButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'about.html';
        });
    });

    // Explore button scroll functionality for about page
    const exploreButton = document.querySelector('[data-action="scroll-to-story"]');
    if (exploreButton) {
        exploreButton.addEventListener('click', function() {
            const storySection = document.querySelector('#our-story-expertise');
            if (storySection) {
                storySection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Scroll to solutions functionality for graphical cleaning page
    const scrollToSolutionsButton = document.querySelector('[data-action="scroll-to-solutions"]');
    if (scrollToSolutionsButton) {
        scrollToSolutionsButton.addEventListener('click', function() {
            const solutionsSection = document.querySelector('#solutions');
            if (solutionsSection) {
                solutionsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Scroll to features functionality for wash cloth page
    const scrollToFeaturesButton = document.querySelector('[data-action="scroll-to-features"]');
    if (scrollToFeaturesButton) {
        scrollToFeaturesButton.addEventListener('click', function() {
            const featuresSection = document.querySelector('#features');
            if (featuresSection) {
                featuresSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Scroll to mini rolls functionality for cassette rolls page
    const scrollToMiniRollsButton = document.querySelector('[data-action="scroll-to-mini-rolls"]');
    if (scrollToMiniRollsButton) {
        scrollToMiniRollsButton.addEventListener('click', function() {
            const miniRollsSection = document.querySelector('#mini-rolls');
            if (miniRollsSection) {
                miniRollsSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Scroll to winding info functionality for winding device page
    const scrollToWindingInfoButton = document.querySelector('[data-action="scroll-to-winding-info"]');
    if (scrollToWindingInfoButton) {
        scrollToWindingInfoButton.addEventListener('click', function() {
            const windingInfoSection = document.querySelector('#winding-info');
            if (windingInfoSection) {
                windingInfoSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Scroll to calculator functionality for pricing page
    const scrollToCalculatorButton = document.querySelector('[data-action="scroll-to-calculator"]');
    if (scrollToCalculatorButton) {
        scrollToCalculatorButton.addEventListener('click', function() {
            const calculatorSection = document.querySelector('#pricing-calculator');
            if (calculatorSection) {
                calculatorSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Scroll to biocleaner functionality for manual wiping page
    const scrollToBiocleanerButton = document.querySelector('[data-action="scroll-to-biocleaner"]');
    if (scrollToBiocleanerButton) {
        scrollToBiocleanerButton.addEventListener('click', function() {
            const biocleanerSection = document.querySelector('#biocleaner');
            if (biocleanerSection) {
                biocleanerSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }

    // Service card modal buttons navigation functionality
    const discoverGraphicalButton = document.querySelector('[data-action="discover-graphical"]');
    if (discoverGraphicalButton) {
        discoverGraphicalButton.addEventListener('click', function() {
            window.location.href = 'graphical-cleaning.html';
        });
    }

    const exploreFormula1Button = document.querySelector('[data-action="explore-formula1"]');
    if (exploreFormula1Button) {
        exploreFormula1Button.addEventListener('click', function() {
            window.location.href = 'formula1.html';
        });
    }

    const getSupportButton = document.querySelector('[data-action="get-support"]');
    if (getSupportButton) {
        getSupportButton.addEventListener('click', function() {
            window.location.href = 'customer-service.html';
        });
    }

    // Dynamic background particles (subtle)
    function createParticle() {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1;
            animation: float 15s linear infinite;
        `;
        
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.animationDelay = Math.random() * 15 + 's';
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 15000);
    }

    // Create particles periodically
    setInterval(createParticle, 3000);

    // Add float animation
    const particleStyle = document.createElement('style');
    particleStyle.textContent = `
        @keyframes float {
            from {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            to {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(particleStyle);

    // Logo interaction
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        });
    }

    // Performance optimization: throttle scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    // Apply throttling to scroll events
    window.addEventListener('scroll', throttle(() => {
        // Additional scroll-based animations can be added here
    }, 16)); // ~60fps

    // Dynamic Carousel Functionality
    const carouselTrack = document.getElementById('carouselTrack');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    if (carouselTrack && prevBtn && nextBtn) {
        let currentIndex = 0;
        const items = carouselTrack.querySelectorAll('.carousel-item');
        const totalItems = items.length;
        const itemWidth = 360; // 280px + 80px margin
        let itemsPerView = Math.floor(window.innerWidth / itemWidth);
        const maxIndex = Math.max(0, totalItems - itemsPerView);
        
        // Auto-resize on window resize
        function updateCarousel() {
            const containerWidth = window.innerWidth;
            itemsPerView = Math.floor(containerWidth / itemWidth);
            const newMaxIndex = Math.max(0, totalItems - itemsPerView);
            
            if (currentIndex > newMaxIndex) {
                currentIndex = newMaxIndex;
            }
            
            updateCarouselPosition();
        }
        
        function updateCarouselPosition() {
            const translateX = -currentIndex * itemWidth;
            carouselTrack.style.transform = `translateX(${translateX}px)`;
            
            // Update button states
            prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
            nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
            prevBtn.style.pointerEvents = currentIndex === 0 ? 'none' : 'all';
            nextBtn.style.pointerEvents = currentIndex >= maxIndex ? 'none' : 'all';
        }
        
        function nextSlide() {
            if (currentIndex < maxIndex) {
                currentIndex++;
                updateCarouselPosition();
            }
        }
        
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex--;
                updateCarouselPosition();
            }
        }
        
        // Event listeners
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Auto-play carousel
        let autoPlayInterval = setInterval(nextSlide, 4000);
        
        // Pause auto-play on hover
        carouselTrack.parentElement.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        carouselTrack.parentElement.addEventListener('mouseleave', () => {
            autoPlayInterval = setInterval(nextSlide, 4000);
        });
        
        // Touch/swipe support for mobile
        let startX = 0;
        let isDragging = false;
        
        carouselTrack.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            clearInterval(autoPlayInterval);
        });
        
        carouselTrack.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
        });
        
        carouselTrack.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            
            const endX = e.changedTouches[0].clientX;
            const diffX = startX - endX;
            
            if (Math.abs(diffX) > 50) { // Minimum swipe distance
                if (diffX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
            
            isDragging = false;
            autoPlayInterval = setInterval(nextSlide, 4000);
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') {
                prevSlide();
            } else if (e.key === 'ArrowRight') {
                nextSlide();
            }
        });
        
        // Window resize handler
        window.addEventListener('resize', throttle(updateCarousel, 250));
        
        // Initialize carousel
        updateCarousel();
        updateCarouselPosition();
        
        // Add smooth entrance animation for carousel items
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(30px)';
            item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100 + 500);
        });
    }

    // Enhanced CTA button interactions for consistency
    const allCtaButtons = document.querySelectorAll('.cta-primary, .cta-secondary, .f1-cta-button, .machines-cta-button');
    
    allCtaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translateY(-1px) scale(1.02)';
        });
        
        button.addEventListener('mouseup', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
    });

    // Enhanced Mobile submenu dropdown functionality
    const graphicalCleaningArrow = document.getElementById('graphicalCleaningArrow');
    
    if (graphicalCleaningToggle && graphicalCleaningSubmenu && graphicalCleaningArrow) {
        let isAnimating = false;
        
        // Toggle submenu ONLY when clicking the arrow
        graphicalCleaningArrow.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            if (isAnimating) return; // Prevent rapid clicking
            
            toggleSubmenu();
        });
        
        // Enhanced toggle function with better animation handling
        function toggleSubmenu() {
            if (isAnimating) return;
            
            isAnimating = true;
            const isExpanded = graphicalCleaningToggle.classList.contains('expanded');
            
            if (isExpanded) {
                // Collapse submenu
                graphicalCleaningToggle.classList.remove('expanded');
                graphicalCleaningSubmenu.classList.remove('active');
                
                // Reset animation state after transition
                setTimeout(() => {
                    isAnimating = false;
                }, 300);
            } else {
                // Expand submenu
                graphicalCleaningToggle.classList.add('expanded');
                graphicalCleaningSubmenu.classList.add('active');
                
                // Reset animation state after transition
                setTimeout(() => {
                    isAnimating = false;
                }, 300);
            }
        }
        
        // Handle submenu link clicks with improved UX
        const submenuLinks = graphicalCleaningSubmenu.querySelectorAll('.mobile-nav-sublink');
        submenuLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                const targetUrl = this.getAttribute('href');
                
                // Add visual feedback
                this.style.transform = 'scale(0.98)';
                
                // Close menu first
                closeMobileMenu();
                
                // Then navigate after a short delay for better UX
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 400);
            });
            
            // Remove visual feedback on touch end
            link.addEventListener('touchend', function() {
                this.style.transform = '';
            });
        });
        
        // Prevent dropdown from interfering with scroll
        graphicalCleaningSubmenu.addEventListener('touchstart', function(e) {
            e.stopPropagation();
        }, { passive: true });
        
        // Close submenu when mobile menu closes
        const originalCloseMobileMenu = closeMobileMenu;
        closeMobileMenu = function() {
            graphicalCleaningToggle.classList.remove('expanded');
            graphicalCleaningSubmenu.classList.remove('active');
            originalCloseMobileMenu();
        };
    }

    console.log('Dimple Premium Interactive Features Loaded ✨');
    
    // ===== BACK TO TOP BUTTON FUNCTIONALITY =====
    // Enhanced back-to-top button with smooth animations and scroll detection
    
    // Create back-to-top button if it doesn't exist
    function createBackToTopButton() {
        if (!document.querySelector('.back-to-top')) {
            const backToTopButton = document.createElement('a');
            backToTopButton.href = '#';
            backToTopButton.className = 'back-to-top';
            backToTopButton.setAttribute('aria-label', 'Back to top');
            backToTopButton.setAttribute('title', 'Back to top');
            
            // Create arrow icon
            const arrowIcon = document.createElement('span');
            arrowIcon.className = 'arrow-icon';
            arrowIcon.innerHTML = '↑';
            arrowIcon.style.fontWeight = 'bold';
            
            backToTopButton.appendChild(arrowIcon);
            document.body.appendChild(backToTopButton);
            
            // Add click event
            backToTopButton.addEventListener('click', function(e) {
                e.preventDefault();
                smoothScrollToTop();
            });
            
            console.log('Back to top button created successfully');
        }
    }
    
    // Smooth scroll to top function
    function smoothScrollToTop() {
        const backToTopButton = document.querySelector('.back-to-top');
        if (backToTopButton) {
            // Add loading state
            backToTopButton.style.pointerEvents = 'none';
            backToTopButton.style.opacity = '0.7';
            
            // Smooth scroll to top
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            
            // Reset button state after scroll
            setTimeout(() => {
                if (backToTopButton) {
                    backToTopButton.style.pointerEvents = 'auto';
                    backToTopButton.style.opacity = '1';
                }
            }, 1000);
        }
    }
    
    // Show/hide back-to-top button based on scroll position
    function toggleBackToTopButton() {
        const backToTopButton = document.querySelector('.back-to-top');
        if (backToTopButton) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            
            // Show button when scrolled down 20% of viewport height
            const showThreshold = windowHeight * 0.2;
            
            if (scrollTop > showThreshold) {
                if (!backToTopButton.classList.contains('visible')) {
                    backToTopButton.classList.add('visible');
                }
            } else {
                if (backToTopButton.classList.contains('visible')) {
                    backToTopButton.classList.remove('visible');
                }
            }
            
            // Hide button when near bottom of page
            const hideThreshold = documentHeight - windowHeight - 100;
            if (scrollTop > hideThreshold) {
                backToTopButton.style.opacity = '0.6';
            } else {
                backToTopButton.style.opacity = '1';
            }
        }
    }
    
    // Enhanced scroll event handler with throttling
    let scrollTimeout;
    function handleScroll() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(toggleBackToTopButton, 10);
    }
    
    // Initialize back-to-top button
    function initBackToTopButton() {
        createBackToTopButton();
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Initial check
        toggleBackToTopButton();
        
        // Add keyboard support
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Home') {
                e.preventDefault();
                smoothScrollToTop();
            }
        });
        
        console.log('Back to top button initialized successfully');
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initBackToTopButton);
    } else {
        initBackToTopButton();
    }
    
    // Re-initialize if page content changes dynamically
    if (typeof MutationObserver !== 'undefined') {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && !document.querySelector('.back-to-top')) {
                    setTimeout(initBackToTopButton, 100);
                }
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
}); 