/*
  ForgeDaily Mirror Blogger Theme
  Artifact 3: JavaScript File
  Author: Shafekul Abid
  Version: 1.0
  Instructions:
    - Link this file in your Blogger XML template.
    - Customize feature toggles and integration points as needed.
*/

// === Mobile Menu Toggle ===
const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
const mainNav = document.getElementById('main-nav');
if (mobileMenuToggle && mainNav) {
  mobileMenuToggle.addEventListener('click', () => {
    mainNav.classList.toggle('open');
  });
}

// === Smooth Scrolling for Anchor Links ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// === Reading Time Calculation ===
function calculateReadingTime() {
  // Only run on post pages, using the class we added to the body tag
  if (!document.body.classList.contains('page-type-item')) {
    return;
  }

  const postBody = document.querySelector('.post-body');
  const postTitle = document.querySelector('.post-title');

  // Exit if the main elements of a post aren't found
  if (!postBody || !postTitle) return;

  const text = postBody.innerText || '';
  const words = text.trim().split(/\s+/).length;
  const wordsPerMinute = 200; // Average reading speed
  const time = Math.ceil(words / wordsPerMinute);

  // Create the element to display the reading time
  const readingTimeElem = document.createElement('div');
  readingTimeElem.className = 'post-meta-item reading-time';
  readingTimeElem.innerHTML = `<span>⏱️ ${time} min read</span>`;

  // Insert it right after the post title for good visibility
  postTitle.insertAdjacentElement('afterend', readingTimeElem);
}
document.addEventListener('DOMContentLoaded', calculateReadingTime);

// === Last Updated Date Display ===
function addLastUpdatedDate() {
  if (!document.body.classList.contains('page-type-item')) {
    return;
  }

  const timestampsContainer = document.getElementById('post-timestamps');
  const postTitle = document.querySelector('.post-title');

  if (!timestampsContainer || !postTitle) return;

  const publishedDate = new Date(timestampsContainer.dataset.published);
  const updatedDate = new Date(timestampsContainer.dataset.updated);

  // Show "Last updated" if it was updated more than 24 hours after publishing
  const oneDayInMs = 24 * 60 * 60 * 1000;
  if (updatedDate.getTime() - publishedDate.getTime() > oneDayInMs) {
    const formattedDate = new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(updatedDate);

    const updatedElem = document.createElement('div');
    updatedElem.className = 'post-meta-item last-updated';
    updatedElem.innerHTML = `<span>🔄 Last updated on ${formattedDate}</span>`;

    // Insert it after the reading time element for consistency
    const readingTimeElem = document.querySelector('.reading-time');
    (readingTimeElem || postTitle).insertAdjacentElement('afterend', updatedElem);
  }
}
document.addEventListener('DOMContentLoaded', addLastUpdatedDate);

// === Social Sharing Functionality ===
document.querySelectorAll('.share-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    const platform = this.getAttribute('data-platform');
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        break;
    }
    if (shareUrl) window.open(shareUrl, '_blank', 'noopener');
  });
});

// === Email Subscription Form Handling ===
const emailForm = document.getElementById('email-signup-form');
if (emailForm) {
  emailForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const email = this.email.value;
    // TODO: Integrate with your email marketing provider (Mailchimp, ConvertKit, etc.)
    alert('Thank you for subscribing!');
    this.reset();
  });
}

// === Ad Lazy Loading ===
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ad-zone').forEach(ad => {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // TODO: Load ad code dynamically here
            observer.unobserve(entry.target);
          }
        });
      });
      observer.observe(ad);
    }
  });
});

// === Enhanced Search Functionality (Basic Example) ===
// TODO: Replace with Blogger's search widget enhancement or custom implementation
const searchInput = document.querySelector('input[type="search"]');
if (searchInput) {
  searchInput.addEventListener('input', function () {
    // Optionally implement autocomplete or instant search
  });
}

// === Dark Mode Toggle ===
const darkModeToggle = document.getElementById('dark-mode-toggle');
function setDarkMode(enabled) {
  document.body.classList.toggle('dark-mode', enabled);
  if (darkModeToggle) {
    darkModeToggle.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    darkModeToggle.textContent = enabled ? '☀️' : '🌙';
  }
}
function getDarkModePref() {
  return localStorage.getItem('dark_mode') === 'enabled';
}
function saveDarkModePref(enabled) {
  localStorage.setItem('dark_mode', enabled ? 'enabled' : 'disabled');
}
if (darkModeToggle) {
  // On load, apply saved preference
  setDarkMode(getDarkModePref());
  darkModeToggle.addEventListener('click', () => {
    const enabled = !document.body.classList.contains('dark-mode');
    setDarkMode(enabled);
    saveDarkModePref(enabled);
  });
}

// === Analytics & Conversion Tracking Integration Points ===
// TODO: Insert your Google Analytics, AdSense, or affiliate tracking scripts here
// Example:
// window.dataLayer = window.dataLayer || [];
// function gtag(){dataLayer.push(arguments);}
// gtag('js', new Date());
// gtag('config', 'UA-XXXXXXXXX-X');

// === Conversion Tracking for Affiliate Clicks ===
document.querySelectorAll('.affiliate-btn').forEach(btn => {
  btn.addEventListener('click', function () {
    // TODO: Track affiliate click event (Google Analytics, etc.)
    // Example: gtag('event', 'affiliate_click', { 'event_category': 'Affiliate', 'event_label': this.href });
  });
});

// === GDPR Cookie Consent Banner ===
function showCookieConsent() {
  if (localStorage.getItem('gdpr_cookie_consent') === 'accepted') return;
  const banner = document.createElement('div');
  banner.id = 'cookie-consent-banner';
  banner.innerHTML = `
    <div class="cookie-banner-content">
      This site uses cookies to personalize content and ads. By using this site, you agree to our <a href="/p/privacy-policy.html" target="_blank">Privacy Policy</a>.
      <button id="accept-cookies">Accept</button>
    </div>
  `;
  document.body.appendChild(banner);
  document.getElementById('accept-cookies').addEventListener('click', function() {
    localStorage.setItem('gdpr_cookie_consent', 'accepted');
    banner.remove();
  });
}
document.addEventListener('DOMContentLoaded', showCookieConsent);

// === Keyboard Navigation for Main Navigation ===
const nav = document.getElementById('main-nav');
if (nav) {
  const topItems = nav.querySelectorAll('.nav-list > li > a');
  topItems.forEach((item, idx) => {
    item.setAttribute('tabindex', '0');
    item.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        topItems[(idx + 1) % topItems.length].focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        topItems[(idx - 1 + topItems.length) % topItems.length].focus();
      } else if (e.key === 'ArrowDown') {
        const dropdown = item.parentElement.querySelector('.dropdown');
        if (dropdown) {
          const firstDropdownItem = dropdown.querySelector('a');
          if (firstDropdownItem) {
            e.preventDefault();
            firstDropdownItem.focus();
          }
        }
      }
    });
  });
  // Dropdown items: up/down navigation
  nav.querySelectorAll('.dropdown a').forEach((dropdownItem, dIdx, dropdownArr) => {
    dropdownItem.setAttribute('tabindex', '0');
    dropdownItem.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const next = dropdownArr[dIdx + 1] || dropdownArr[0];
        next.focus();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        const prev = dropdownArr[dIdx - 1] || dropdownArr[dropdownArr.length - 1];
        prev.focus();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        // Focus parent top-level item
        let parentLi = dropdownItem.closest('li');
        if (parentLi) {
          const parentA = parentLi.parentElement.previousElementSibling;
          if (parentA) parentA.focus();
        }
      }
    });
  });
}

// === Back to Top Button Functionality ===
const backToTopBtn = document.getElementById('back-to-top');
if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    document.body.focus();
  });
}
// === Sticky Social Sharing Sidebar Functionality ===
document.querySelectorAll('.sidebar-share').forEach(btn => {
  btn.addEventListener('click', function(e) {
    e.preventDefault();
    const platform = this.getAttribute('data-platform');
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${url}&title=${title}`;
        break;
    }
    if (shareUrl) window.open(shareUrl, '_blank', 'noopener');
  });
});

// === End of Script === 
