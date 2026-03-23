document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // 1. Theme Toggle
    // =========================
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const htmlEl = document.documentElement;

    // 🔥 DEBUG
    console.log("Button:", themeToggleBtn);

    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlEl.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // 🔥 SAFETY CHECK (important)
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            console.log("clicked");

            const currentTheme = htmlEl.getAttribute('data-theme');
            console.log("current:", currentTheme);

            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            htmlEl.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            console.log("new:", newTheme);

            updateThemeIcon(newTheme);
        });
    } else {
        console.log("❌ theme button not found");
    }

    function updateThemeIcon(theme) {
        themeIcon.className = theme === 'dark' ? 'ph ph-sun' : 'ph ph-moon';
    }


    // =========================
    // 2. Navbar Scroll Effect
    // =========================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });


    // =========================
    // 3. Scroll Reveal Animation
    // =========================
    const revealElements = document.querySelectorAll('.reveal');
    const processProgress = document.getElementById('process-progress');
    const processCards = document.querySelectorAll('.process-card');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;

            entry.target.classList.add('active');

            if (entry.target.id === 'process' || entry.target.closest('#process')) {
                if (processProgress) {
                    setTimeout(() => processProgress.style.width = '100%', 300);
                }

                processCards.forEach((card, index) => {
                    setTimeout(() => card.classList.add('active-step'), 300 + index * 200);
                });
            }

            observer.unobserve(entry.target);
        });
    }, {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));


    // =========================
    // 4. Story Scroll Videos
    // =========================
    const storySteps = document.querySelectorAll('.story-step');
    const storyVideos = document.querySelectorAll('.story-video');

    if (storySteps.length) {
        const storyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                storySteps.forEach(step => step.classList.remove('active'));
                entry.target.classList.add('active');

                const stepNumber = entry.target.dataset.step;

                storyVideos.forEach(video => {
                    const isActive = video.dataset.video === stepNumber;

                    video.classList.toggle('active', isActive);

                    if (isActive) {
                        video.play().catch(() => { });
                    } else {
                        video.pause();
                    }
                });
            });
        }, {
            rootMargin: '-40% 0px -40% 0px'
        });

        storySteps.forEach(step => storyObserver.observe(step));
    }


    // =========================
    // 5. 3D Hover Effect
    // =========================
    const whyCards = document.querySelectorAll('.why-card');

    whyCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 12;
            const rotateX = ((rect.height / 2 - y) / (rect.height / 2)) * 12;

            card.style.setProperty('--rx', `${rotateX}deg`);
            card.style.setProperty('--ry', `${rotateY}deg`);
            card.style.setProperty('--mx', `${x}px`);
            card.style.setProperty('--my', `${y}px`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.removeProperty('--rx');
            card.style.removeProperty('--ry');
            card.style.removeProperty('--mx');
            card.style.removeProperty('--my');
        });
    });

});
