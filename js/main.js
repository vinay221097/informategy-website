(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 45) {
            $('.navbar').addClass('sticky-top shadow-sm');
        } else {
            $('.navbar').removeClass('sticky-top shadow-sm');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        dots: true,
        loop: true,
        center: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


    // Vendor carousel
    $('.vendor-carousel').owlCarousel({
        loop: true,
        margin: 45,
        dots: false,
        loop: true,
        autoplay: true,
        smartSpeed: 1000,
        responsive: {
            0:{
                items:2
            },
            576:{
                items:4
            },
            768:{
                items:6
            },
            992:{
                items:8
            }
        }
    });
    
})(jQuery);


const words = document.querySelectorAll('.animated-statement span');
let lastScrollTop = 0;

const animateWords = (direction) => {
let i = direction === 'down' ? 0 : words.length - 1;
const increment = direction === 'down' ? 1 : -1;

const interval = setInterval(() => {
  if (direction === 'down' && i < words.length) {
    words[i].classList.add('highlighted');
    i += increment;
  } else if (direction === 'up' && i >= 0) {
    words[i].classList.remove('highlighted');
    i += increment;
  } else {
    clearInterval(interval);
  }
}, direction === 'down' ? 120 : 40); // faster on reverse
};

const observer = new IntersectionObserver((entries) => {
entries.forEach(entry => {
  if (entry.isIntersecting) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const direction = scrollTop > lastScrollTop ? 'down' : 'up';
    animateWords(direction);
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // update
  }
});
}, { threshold: 0.2 });

observer.observe(document.querySelector('.animated-statement'));









async function fetchMediumPosts() {
  const rssUrl = 'https://medium.com/feed/informategy';
  const apiUrl = 'https://api.rss2json.com/v1/api.json?rss_url=' + encodeURIComponent(rssUrl);

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (!data.items) {
      console.error('No articles found');
      return;
    }

    const postsContainer = document.getElementById('medium-posts');
    postsContainer.innerHTML = ''; // Clear existing posts

    data.items.slice(0, 3).forEach((article, index) => {
      const title = article.title;
      const link = article.link;
      const pubDate = new Date(article.pubDate).toLocaleDateString();
      const description = article.description;

      // Extract img src from description if article.thumbnail is empty
      let thumbnail = article.thumbnail;
      if (!thumbnail) {
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = description;
        const img = tempDiv.querySelector('img');
        thumbnail = img ? img.src : 'default-image.jpg'; // fallback
      }

      // Create post HTML
      const col = document.createElement('div');
      col.className = 'col-lg-4 col-md-4 mb-3';
      col.style.animationDelay = `${0.3 + index * 0.3}s`;

      col.innerHTML = `
        <div class="blog-item bg-light rounded overflow-hidden">
          <div class="blog-img position-relative overflow-hidden">
            <img class="img-fluid" src="${thumbnail}" alt="Post image">
            <a class="position-absolute top-0 start-0 bg-primary text-white rounded-end mt-5 py-2 px-4" href="#">Blog</a>
          </div>
          <div class="p-4">
            <div class="d-flex mb-3">
              <small class="me-3 text-black"><i class="far fa-user text-primary me-2"></i>Informategy</small>
              <small class="text-black"><i class="far fa-calendar-alt text-primary me-2"></i>${pubDate}</small>
            </div>
            <h4 class="mb-3 text-black">${title}</h4>
            <p class="text-black">${description.replace(/<[^>]+>/g, '').substring(0, 100)}...</p>
            <a class="text-uppercase" href="${link}" target="_blank" rel="noopener noreferrer">Read More <i class="bi bi-arrow-right"></i></a>
          </div>
        </div>
      `;

      postsContainer.appendChild(col);
    });
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
  }
}



  document.addEventListener('DOMContentLoaded', fetchMediumPosts);



  const avatarContainer = document.getElementById("avatar-container");
  const avatarVideo = document.getElementById("avatar-video");
  let hasAutoOpened = false;

  function toggleAvatar() {
    const isOpen = avatarContainer.style.display === "block";
    avatarContainer.style.display = isOpen ? "none" : "block";
    if (!isOpen) avatarVideo.play();
    else avatarVideo.pause();
  }

  function closeAvatar() {
    avatarContainer.style.display = "none";
    avatarVideo.pause();
  }

  window.addEventListener("scroll", () => {
    const scrollTrigger = window.innerHeight * 0.5;
    if (!hasAutoOpened && window.scrollY > scrollTrigger) {
      avatarContainer.style.display = "block";
      avatarVideo.play();
      hasAutoOpened = true;
    }
  });



  document.querySelectorAll('.reveal-card').forEach(card => {
    const title = card.querySelector('h4');
    const text = card.querySelector('.reveal-text');

    gsap.set(text, { y: 10 });

    card.addEventListener('mouseenter', () => {
      gsap.to(card, {
        backgroundPosition: '100% 100%',
        duration: 0.6,
        ease: 'power2.out'
      });

      gsap.to(title, {
        y: -6,
        duration: 0.3,
        ease: 'power2.out'
      });

      gsap.to(text, {
        opacity: 1,
        y: 0,
        duration: 0.3,
        ease: 'power2.out'
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(title, { y: 0, duration: 0.3 });
      gsap.to(text, { opacity: 0, y: 10, duration: 0.3 });
    });
  });


document.querySelectorAll('.brand-card').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-open');
  });
});
