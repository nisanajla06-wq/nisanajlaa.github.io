// =========================================
// SPLASH SCREEN & TYPING EFFECT OPENING
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splash-screen');
    
    // HANYA jalankan efek loading dan kunci layar JIKA elemen splash screen ada (di Home)
    if (splashScreen) {
        document.body.classList.add('no-scroll');
        
        let percentage = 0;
        const loadingText = document.getElementById('loading-percentage');
        const loadingBar = document.getElementById('loading-bar');
        
        const nameText = "Khairunnisa Najla Nugrahaini";
        const typeWriterElement = document.getElementById('typewriter-text');
        let charIndex = 0;

        function typeWriterEffect() {
            if (typeWriterElement && charIndex < nameText.length) {
                typeWriterElement.textContent += nameText.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriterEffect, 100); 
            }
        }
        
        const interval = setInterval(() => {
            percentage += Math.floor(Math.random() * 4) + 1; 
            
            if (percentage >= 100) {
                percentage = 100;
                clearInterval(interval);
                
                if (loadingText) loadingText.textContent = percentage + '%';
                if (loadingBar) loadingBar.style.width = percentage + '%';
                
                setTimeout(() => {
                    splashScreen.classList.add('splash-slide-up');
                    document.body.classList.remove('no-scroll'); // Buka kunci layar
                    
                    setTimeout(typeWriterEffect, 600);
                    
                    setTimeout(() => {
                        splashScreen.style.display = 'none';
                    }, 1000); 
                }, 500); 
                
            } else {
                if (loadingText) loadingText.textContent = percentage + '%';
                if (loadingBar) loadingBar.style.width = percentage + '%';
            }
        }, 40); 
    } else {
        // PENGAMAN: Jika ini halaman detail, pastikan layar TIDAK TERKUNCI
        document.body.classList.remove('no-scroll');
    }
});
// Konfigurasi Particles.js untuk latar belakang dinamis (titik-titik melayang)
particlesJS("particles-js", {
    "particles": {
        "number": {
            "value": 60,
            "density": { "enable": true, "value_area": 800 }
        },
        "color": { "value": ["#f472b6", "#0f172a"] }, // Warna partikel (Pink Accent & Navy)
        "shape": {
            "type": "circle",
            "stroke": { "width": 0, "color": "#000000" }
        },
        "opacity": {
            "value": 0.3,
            "random": false,
            "anim": { "enable": false }
        },
        "size": {
            "value": 4,
            "random": true,
            "anim": { "enable": false }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#f472b6",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 2, // Kecepatan partikel melayang
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": { "enable": false, "rotateX": 600, "rotateY": 1200 }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" }, // Partikel bereaksi saat kena mouse
            "onclick": { "enable": true, "mode": "push" },
            "resize": true
        },
        "modes": {
            "grab": { "distance": 140, "line_linked": { "opacity": 0.8 } },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});

// Intersection Observer for Scroll Motion (Efek Muncul Perlahan saat Scroll)
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('section-visible');
        }
    });
}, {
    threshold: 0.15 
});

const hiddenSections = document.querySelectorAll('.section-hidden');
hiddenSections.forEach((el) => observer.observe(el));

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// =========================================
// NAVBAR SCROLLSPY (Indikator Aktif Saat Scroll)
// =========================================
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Deteksi jika pengguna sudah scroll masuk ke dalam area section tersebut
        if (pageYOffset >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    // Menghapus dan menambahkan class 'active' ke menu navbar
    navItems.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// =========================================
// BUTTERY SMOOTH AUTO-SCROLL (Berhenti saat disentuh)
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('prokerCarousel');
    
    if (carousel) {
        let isHovered = false;
        let isDragging = false;
        let startX, scrollLeft;

        // 1. FUNGSI JALAN OTOMATIS (Mulus & Continuous)
        function smoothScroll() {
            if (!isHovered && !isDragging) {
                // Kecepatan diatur di sini (1.5 adalah kecepatan sedang, cocok untuk dibaca)
                carousel.scrollLeft += 1.5; 
                
                // Jika sudah mentok setengah jalan (Set 1 habis), loop ke awal tanpa ketahuan
                if (carousel.scrollLeft >= (carousel.scrollWidth / 2)) {
                    carousel.scrollLeft = 0; 
                }
            }
            requestAnimationFrame(smoothScroll);
        }

        // Mulai animasi
        requestAnimationFrame(smoothScroll);

        // 2. BERHENTI SAAT DISENTUH (Hover / Touch)
        carousel.addEventListener('mouseenter', () => isHovered = true);
        carousel.addEventListener('mouseleave', () => { isHovered = false; isDragging = false; });
        carousel.addEventListener('touchstart', () => isHovered = true, {passive: true});
        carousel.addEventListener('touchend', () => isHovered = false, {passive: true});

        // 3. FITUR BISA DITARIK/SWIPE MANUAL
        carousel.addEventListener('mousedown', (e) => {
            isDragging = true;
            isHovered = true; // Stop auto-scroll
            startX = e.pageX - carousel.offsetLeft;
            scrollLeft = carousel.scrollLeft;
        });

        carousel.addEventListener('mouseup', () => {
            isDragging = false;
            isHovered = false; // Lanjut auto-scroll
        });

        carousel.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const x = e.pageX - carousel.offsetLeft;
            const walk = (x - startX) * 2; // Tarikan responsif
            carousel.scrollLeft = scrollLeft - walk;
        });
    }
});
// =========================================
// FINAL CAROUSEL: AUTO-SCROLL SMOOTH + DRAG
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.getElementById('prokerCarousel');
    if (!carousel) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollInterval;

    // Fungsi gerak otomatis yang super mulus
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            // Jika sudah mentok, kembalikan ke awal
            if (carousel.scrollLeft >= (carousel.scrollWidth / 2)) {
                carousel.scrollLeft = 0;
            } else {
                carousel.scrollLeft += 1; // Kecepatan pelan dan nyaman
            }
        }, 15); // Update setiap 15ms (60fps)
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    startAutoScroll();
    // 3. SINKRONISASI TITIK INDIKATOR DENGAN PERGESERAN CAROUSEL
    const dots = document.querySelectorAll('.slider-dot');
    if (carousel && dots.length > 0) {
        carousel.addEventListener('scroll', () => {
            const scrollPos = carousel.scrollLeft;
            const slideWidth = carousel.querySelector('.proker-slide').clientWidth + 40; // 40 adalah gap CSS
            const index = Math.round(scrollPos / slideWidth) % (dots.length);
            
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        });

        // Klik pada titik untuk langsung melompat ke slide tersebut
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const slideWidth = carousel.querySelector('.proker-slide').clientWidth + 40;
                carousel.scrollTo({
                    left: slideWidth * index,
                    behavior: 'smooth'
                });
            });
        });
    }

    // Hentikan otomatis saat mouse masuk atau disentuh
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);
    carousel.addEventListener('touchstart', stopAutoScroll, {passive: true});
    carousel.addEventListener('touchend', startAutoScroll, {passive: true});

    // Fitur Klik & Tarik (Drag)
    carousel.addEventListener('mousedown', (e) => {
        isDown = true;
        stopAutoScroll();
        carousel.style.cursor = 'grabbing';
        startX = e.pageX - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
    });

    carousel.addEventListener('mouseleave', () => {
        if (!isDown) return;
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mouseup', () => {
        isDown = false;
        carousel.style.cursor = 'grab';
    });

    carousel.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Tarikan
        carousel.scrollLeft = scrollLeft - walk;
    });
});
document.addEventListener("DOMContentLoaded", function() {
    // 1. LOGIKA MENU HAMBURGER
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active'); // Memicu animasi ikon menjadi X
        });

        // Menutup menu jika mengklik salah satu tautan (opsional, tapi disarankan)
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            });
        });
    }

    // 2. LOGIKA TOMBOL KEMBALI KE ATAS
    const backToTopBtn = document.getElementById("backToTopBtn");

    // Tampilkan tombol saat pengguna scroll ke bawah
    window.onscroll = function() {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    // Fungsi smooth scroll ke atas saat tombol diklik
    if (backToTopBtn) {
        backToTopBtn.addEventListener("click", function(event) {
            event.preventDefault(); // Mencegah perilaku default tautan
            window.scrollTo({
                top: 0,
                behavior: "smooth" // Efek scroll yang halus
            });
        });
    }
});