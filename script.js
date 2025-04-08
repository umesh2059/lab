document.addEventListener('DOMContentLoaded', function() {
    // Custom Cursor
    const cursor = document.querySelector('.cursor');
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.pageX + 'px';
        cursor.style.top = e.pageY + 'px';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
    });
    
    // Links hover effect for cursor
    const hoverElements = document.querySelectorAll('a, button, .project-card, .tech-icons i');
    
    hoverElements.forEach(el => {
        el.addEventListener('mouseover', () => {
            cursor.classList.add('cursor-hover');
        });
        
        el.addEventListener('mouseout', () => {
            cursor.classList.remove('cursor-hover');
        });
    });
    
    // Sticky Header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        header.classList.toggle('sticky', window.scrollY > 0);
    });
    
    // Mobile Navigation
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    
    burger.addEventListener('click', function() {
        navLinks.classList.toggle('active');
        burger.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            burger.classList.remove('active');
        });
    });
    
    // Smooth scrolling for anchor links
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
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.progress');
    const circleProgress = document.querySelectorAll('.circle-progress');
    
    function animateOnScroll() {
        skillBars.forEach(bar => {
            const barWidth = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = barWidth;
            }, 100);
        });
        
        circleProgress.forEach(circle => {
            const value = circle.getAttribute('data-value');
            const circleFill = circle.querySelector('.circle-fill');
            
            circleFill.style.strokeDasharray = `0, 100`;
            
            setTimeout(() => {
                circleFill.style.strokeDasharray = `${value}, 100`;
            }, 100);
        });
    }
    
    // Intersection Observer for animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateOnScroll();
                skillsObserver.unobserve(entry.target);
            }
        });
    },