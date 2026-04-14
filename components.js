/* DeChellis Capital — shared layout components.
 *
 * Defines <site-header> and <site-footer> as Web Components so the header
 * and footer markup live in one place and every page just drops the tags in.
 * Use data-current="home|about|listings|contact" on <site-header> to mark
 * the active nav link.
 *
 * All template strings are static literals under our control — no user input
 * is interpolated.
 */
(function () {
  const NAV_ITEMS = [
    { key: "home",     label: "Home",     href: "index.html" },
    { key: "about",    label: "About",    href: "about.html" },
    { key: "listings", label: "Listings", href: "listings.html" },
    { key: "contact",  label: "Contact",  href: "contact.html" },
  ];

  // Parse a trusted literal HTML string into a DocumentFragment.
  function fragment(html) {
    return document.createRange().createContextualFragment(html);
  }

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      const current = (this.dataset.current || "").toLowerCase();
      const links = NAV_ITEMS.map(
        (n) =>
          `<li><a href="${n.href}"${n.key === current ? ' class="is-current"' : ""}>${n.label}</a></li>`
      ).join("");

      this.appendChild(
        fragment(`
        <a class="skip-link" href="#main">Skip to content</a>
        <header class="site-header">
          <div class="container">
            <nav class="main-nav" aria-label="Main">
              <a class="main-nav__logo" href="index.html" aria-label="DeChellis Capital home">
                <img src="assets/logo/dechellis-capital-mark.svg" alt="" aria-hidden="true" />
                <span class="brand-lockup">
                  <span class="brand-lockup__name">DeChellis</span>
                  <span class="brand-lockup__sub">Capital</span>
                </span>
              </a>
              <button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false" aria-controls="primary-nav">
                <span></span><span></span><span></span>
              </button>
              <ul id="primary-nav" class="main-nav__links">${links}</ul>
            </nav>
          </div>
        </header>
      `)
      );

      const toggle = this.querySelector(".nav-toggle");
      const menu = this.querySelector("#primary-nav");
      if (toggle && menu) {
        toggle.addEventListener("click", () => {
          const open = menu.classList.toggle("is-open");
          toggle.classList.toggle("is-open", open);
          toggle.setAttribute("aria-expanded", String(open));
        });
      }
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      const year = new Date().getFullYear();
      this.appendChild(
        fragment(`
        <footer class="site-footer">
          <div class="container">
            <div class="site-footer__grid">
              <div class="site-footer__brand">
                <div class="brand-footer">
                  <img src="assets/logo/dechellis-capital-mark.svg" alt="" aria-hidden="true" />
                  <span class="brand-lockup">
                    <span class="brand-lockup__name">DeChellis</span>
                    <span class="brand-lockup__sub">Capital</span>
                  </span>
                </div>
                <p>As professional landlords and property managers, we're committed to bringing you the best rental experience possible.</p>
              </div>
              <div>
                <h4>Office</h4>
                <ul>
                  <li>916 Turtle Cove Lane<br />Vero Beach, Florida 32963</li>
                  <li><a href="tel:+17724108382">(772) 410-8382</a></li>
                  <li><a href="mailto:info@dechelliscapital.com">info@dechelliscapital.com</a></li>
                </ul>
              </div>
              <div>
                <h4>Residents</h4>
                <ul>
                  <li><a class="footer-portal" href="https://app.doorloop.com" target="_blank" rel="noopener">Portal Login</a></li>
                </ul>
              </div>
            </div>
            <div class="site-footer__bottom">
              &copy; ${year} DeChellis Capital. All rights reserved.
            </div>
          </div>
        </footer>
      `)
      );
    }
  }

  customElements.define("site-header", SiteHeader);
  customElements.define("site-footer", SiteFooter);
})();
