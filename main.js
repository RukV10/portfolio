document.addEventListener('DOMContentLoaded', () => {
    const landingPage = document.getElementById('landing-page');
    const projectView = document.getElementById('project-view');
    const projectDetailContent = document.getElementById('project-detail-content');
    const backBtn = document.getElementById('back-btn');

    // 1. SCROLL ANIMATIONS (Fade Up)
    // Add fade-up class to key elements
    const fadeElements = document.querySelectorAll('.hero-text-wrapper, .hero-img, .about-heading, .about-subheading, .about-subtitle, .quote, .intro, .resume-block, .about-img, .projects-header, .project-card');
    fadeElements.forEach(el => el.classList.add('fade-up'));

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => observer.observe(el));

    // 2. PROJECT DATA & INTERACTIONS
    const projectsData = {
        'nuvok': {
            title: 'Nuvok',
            category: 'Duo Project / Integrated Product-Service System',
            year: '2025',
            role: 'Industrial Design, Research',
            desc: 'Nuvok is a calm, trustworthy, and personalized wellness platform that simplifies how people discover, manage, and consume daily supplements while enabling safe guidance, medical support, and seamless purchasing in one ecosystem.',
            number: '// 01 - 2025'
        },
        'easydots': {
            title: 'EasyDots',
            category: 'Duo Project / Educational Tactile Learning Tool',
            year: '2025',
            role: 'Product Design, Prototyping',
            desc: 'EasyDots makes braille simple. A modular, tactile learning kit designed for early childhood education translating characters, words, and sentences into a tangible interface kids can play with.',
            number: '// 02 - 2025'
        },
        'korna': {
            title: 'Korna',
            category: 'Individual Project / Task Lighting Product',
            year: '2024',
            role: 'Industrial Design',
            desc: 'A minimalist modern industrial task lighting product designed to provide optimal lighting conditions with a refined aesthetic.',
            number: '// 03 - 2024'
        },
        'dtc': {
            title: 'DTC Connect',
            category: 'Duo Project / Digital Service Design Solution',
            year: '2024',
            role: 'UX/UI Design',
            desc: 'A floating sleek digital interface showing a transport UI system, light mode, clean white cards with subtle grey shadows, minimal orange accents.',
            number: '// 04 - 2024'
        }
    };

    document.querySelectorAll('.project-card').forEach(card => {
        const id = card.getAttribute('data-project');
        const imgSrc = card.querySelector('.full-image-underneath').src;
        if(projectsData[id]) {
            projectsData[id].img = imgSrc;
        }

        const door = card.querySelector('.shutter-door');

        card.addEventListener('click', () => {
            // Add mechanical opening animation
            door.classList.add('opening');
            
            // Wait for shutter door animation to finish, then crossfade
            setTimeout(() => {
                openProjectDetails(id);
                // Reset door after transition
                setTimeout(() => door.classList.remove('opening'), 800);
            }, 800); 
        });
    });

    function openProjectDetails(id) {
        const data = projectsData[id];
        
        projectDetailContent.innerHTML = `
            <img src="${data.img}" alt="${data.title}" class="detail-hero">
            <div class="detail-header">
                <span>${data.number}</span>
                <h2>${data.title}</h2>
            </div>
            <div class="detail-content">
                <div class="detail-desc">
                    <p>${data.desc}</p>
                </div>
                <div class="detail-meta">
                    <div class="meta-item">
                        <div class="meta-label">Role</div>
                        <div class="meta-value">${data.role}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Year</div>
                        <div class="meta-value">${data.year}</div>
                    </div>
                    <div class="meta-item">
                        <div class="meta-label">Category</div>
                        <div class="meta-value">${data.category}</div>
                    </div>
                </div>
            </div>
        `;

        // Smooth dissolve transition
        landingPage.style.opacity = '0';
        setTimeout(() => {
            landingPage.classList.remove('active');
            projectView.classList.add('active');
            // Trigger detail page entry animation
            const detailElements = projectDetailContent.querySelectorAll('.detail-hero, .detail-header, .detail-content');
            detailElements.forEach(el => {
                el.style.opacity = '0';
                el.style.transform = 'translateY(20px)';
                el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            });
            
            setTimeout(() => {
                projectView.style.opacity = '1';
                window.scrollTo({ top: 0, behavior: 'smooth' });
                
                // Animate elements in
                setTimeout(() => {
                    detailElements.forEach((el, index) => {
                        setTimeout(() => {
                            el.style.opacity = '1';
                            el.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }, 50);
            }, 50);
        }, 400);
    }

    backBtn.addEventListener('click', () => {
        projectView.style.opacity = '0';
        setTimeout(() => {
            projectView.classList.remove('active');
            landingPage.classList.add('active');
            
            // Instantly jump to projects slide before fading in
            const projectsSection = document.getElementById('projects');
            if (projectsSection) {
                projectsSection.scrollIntoView({ behavior: 'instant' });
            }

            setTimeout(() => {
                landingPage.style.opacity = '1';
                // Trigger scroll animations again for visible elements
                fadeElements.forEach(el => observer.observe(el));
            }, 50);
        }, 400);
    });
});

// Custom Cursor Logic
document.addEventListener('DOMContentLoaded', () => {
    const customCursor = document.getElementById('custom-cursor');
    if (customCursor) {
        document.addEventListener('mousemove', (e) => {
            customCursor.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });

        // Add hover effect when mousing over interactive elements
        const hoverSelectors = 'a, button, .project-card, input, textarea';
        
        // Use event delegation for dynamically loaded elements if any, or just bind directly
        document.querySelectorAll(hoverSelectors).forEach(el => {
            el.addEventListener('mouseenter', () => customCursor.classList.add('hover'));
            el.addEventListener('mouseleave', () => customCursor.classList.remove('hover'));
        });
    }
});
