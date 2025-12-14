document.addEventListener('DOMContentLoaded', () => {

    // --- Data ---
    const products = [
        {
            id: 1,
            name: "Moringa Powder",
            price: 450,
            image: "assets/products/IMG-20251215-WA0001.jpg",
            desc: "Pure, forest-collected wild honey with no added sugar or preservatives.",
            featured: true
        },
        {
            id: 2,
            name: "Onion Powder",
            price: 320,
            image: "assets/products/IMG-20251215-WA0003.jpg",
            desc: "Extracted from premium quality coconuts using traditional wood-pressing methods.",
            featured: true
        },
        {
            id: 3,
            name: "Garlic Powder",
            price: 180,
            image: "assets/products/IMG-20251215-WA0004.jpg",
            desc: "High curcumin wild turmeric powder, perfect for cooking and immunity.",
            featured: false
        },
        {
            id: 4,
            name: "Tomato Powder",
            price: 150,
            image: "assets/products/IMG-20251215-WA0005.jpg",
            desc: "Mineral-rich pink salt sourced directly from the Himalayas.",
            featured: false
        },
        {
            id: 5,
            name: "Turmeric Powder",
            price: 550,
            image: "assets/products/IMG-20251215-WA0006.jpg",
            desc: "Protein-packed organic quinoa, a perfect superfood for your diet.",
            featured: true
        },
        {
            id: 6,
            name: "Chia Seeds",
            price: 290,
            image: "assets/products/IMG-20251215-WA0007.jpg",
            desc: "Premium quality chia seeds rich in Omega-3 and fiber.",
            featured: false
        },
        {
            id: 7,
            name: "Organic Green Tea",
            price: 380,
            image: "assets/products/IMG-20251215-WA0008.jpg",
            desc: "Handpicked tea leaves from organic gardens for a refreshing brew.",
            featured: true
        },
        {
            id: 8,
            name: "Multiflora Honey",
            price: 420,
            image: "assets/products/IMG-20251215-WA0009.jpg",
            desc: "A blend of nectar from various flowers, rich in antioxidants.",
            featured: false
        }
    ];

    // --- Preloader ---
    const preloader = document.getElementById('preloader');

    // Ensure it shows for at least a bit, but remove after 2 seconds max
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500); // Wait for fade out transition
    }, 2000); // 2 seconds delay as requested

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu ---
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const closeMenuBtn = document.querySelector('.close-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-links a');

    menuBtn.addEventListener('click', () => {
        mobileMenu.classList.add('active');
    });

    closeMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // --- Dynamic Product Loading ---
    const productGrid = document.getElementById('product-grid');
    const sliderWrapper = document.getElementById('featured-slider');

    function createProductCard(product) {
        return `
            <div class="product-card">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}" onerror="this.src='https://placehold.co/400x300?text=Organic+Product'">
                    <button class="view-btn" onclick="openModal(${product.id})">
                        <i class="fas fa-eye"></i>
                    </button>
                </div>
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <div class="product-price">₹${product.price}</div>
                </div>
            </div>
        `;
    }

    // Load Grid
    if (productGrid) {
        productGrid.innerHTML = products.map(product => createProductCard(product)).join('');
    }

    // Load Slider (Featured Only)
    if (sliderWrapper) {
        const featuredProducts = products.filter(p => p.featured);
        sliderWrapper.innerHTML = featuredProducts.map(product => createProductCard(product)).join('');
    }

    // --- Slider Controls ---
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            sliderWrapper.scrollBy({ left: -300, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            sliderWrapper.scrollBy({ left: 300, behavior: 'smooth' });
        });
    }

    // --- Product Modal ---
    window.openModal = (id) => {
        const product = products.find(p => p.id === id);
        if (!product) return;

        const modal = document.getElementById('product-modal');
        const modalImg = document.getElementById('modal-img');
        const modalTitle = document.getElementById('modal-title');
        const modalPrice = document.getElementById('modal-price');
        const modalDesc = document.getElementById('modal-desc');

        modalImg.src = product.image;
        modalImg.onerror = function () { this.src = 'https://placehold.co/600x600?text=Product+Image'; };
        modalTitle.textContent = product.name;
        modalPrice.textContent = `₹${product.price}`;
        modalDesc.textContent = product.desc;

        modal.classList.add('active');
    };

    const closeModalBtn = document.querySelector('.close-modal');
    const modal = document.getElementById('product-modal');

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Allow re-animation if needed, or keep it once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    // Fade In Up Elements
    document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

    // Add simple fade class logic for scroll reveal
    const revealElements = document.querySelectorAll('.section-header, .about-text, .about-image');
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Custom Observer for Reveal
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    revealElements.forEach(el => revealObserver.observe(el));

});
