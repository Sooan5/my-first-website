// Wait for DOM content to load fully before executing scripts
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = hamburger.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = hamburger.querySelector('i');
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        });
    });

    // --- 2. Dynamic Course Database & Rendering ---
    const coursesData = [
        {
            id: 1,
            title: "Advanced SEO & GEO Masterclass",
            category: "seo",
            tag: "Advanced",
            description: "Master organic search rankings, Google algorithm updates, and modern Generative Engine Optimization (GEO) techniques.",
            duration: "8 Weeks",
            level: "Intermediate",
            icon: "fa-magnifying-glass-chart",
            bgClass: "seo-bg"
        },
        {
            id: 2,
            title: "Performance & Social Ads",
            category: "social",
            tag: "Popular",
            description: "Learn high-ROI campaign structuring, audience targeting, and copywriting across Google Ads, Meta Ads, and LinkedIn.",
            duration: "6 Weeks",
            level: "Beginner-Friendly",
            icon: "fa-bullhorn",
            bgClass: "social-bg"
        },
        {
            id: 3,
            title: "Data Analytics & CRM Metrics",
            category: "analytics",
            tag: "Essential",
            description: "Track attribution models, analyze conversion funnels, calculate CRM ROI, and make data-backed marketing decisions.",
            duration: "4 Weeks",
            level: "Intermediate",
            icon: "fa-chart-pie",
            bgClass: "analytics-bg"
        },
        {
            id: 4,
            title: "AI-Powered Content & Copywriting",
            category: "social",
            tag: "New",
            description: "Leverage generative AI tools to scale high-converting blog posts, ad creatives, and automated email sequences.",
            duration: "5 Weeks",
            level: "Beginner-Friendly",
            icon: "fa-robot",
            bgClass: "seo-bg"
        }
    ];

    const courseGrid = document.getElementById('courseGrid');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const courseSearch = document.getElementById('courseSearch');

    let currentFilter = 'all';
    let searchQuery = '';

    // Function to render courses dynamically based on filter and search query
    function renderCourses() {
        const filtered = coursesData.filter(course => {
            const matchesCategory = currentFilter === 'all' || course.category === currentFilter;
            const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                  course.description.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filtered.length === 0) {
            courseGrid.innerHTML = `<div class="no-courses">No courses found matching your criteria.</div>`;
            return;
        }

        courseGrid.innerHTML = filtered.map(course => `
            <div class="course-card" data-category="${course.category}">
                <div class="course-img ${course.bgClass}">
                    <i class="fa-solid ${course.icon}"></i>
                </div>
                <div class="course-body">
                    <span class="tag">${course.tag}</span>
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <div class="course-meta">
                        <span><i class="fa-regular fa-clock"></i> ${course.duration}</span>
                        <span><i class="fa-solid fa-signal"></i> ${course.level}</span>
                    </div>
                    <a href="#contact" class="btn btn-card">Enroll Now</a>
                </div>
            </div>
        `).join('');
    }

    // Initial render
    renderCourses();

    // Filter button click event listeners
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderCourses();
        });
    });

    // Real-time search input listener
    courseSearch.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderCourses();
    });

    // --- 3. Dynamic Contact Form Handling ---
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const selectedCourse = document.getElementById('course-select').value;

            if (name && email) {
                // Change button state to indicate processing
                submitBtn.disabled = true;
                submitBtn.textContent = 'Submitting...';

                // Simulate dynamic asynchronous server request (e.g., API call / Database save)
                setTimeout(() => {
                    formMessage.style.color = '#0284c7';
                    formMessage.textContent = `Success, ${name}! Your inquiry for our digital marketing program has been securely saved in our CRM system. We will contact you at ${email} shortly.`;
                    
                    contactForm.reset();
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Message';

                    // Clear message after 6 seconds
                    setTimeout(() => {
                        formMessage.textContent = '';
                    }, 6000);
                }, 1000);

            } else {
                formMessage.style.color = '#dc2626';
                formMessage.textContent = 'Please fill out all required fields correctly.';
            }
        });
    }

    // --- 4. Active Navigation Highlight on Scroll ---
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (window.pageYOffset >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });

});