import { Instagram, Twitter, Facebook, Linkedin } from "lucide-react";

const footerLinks: Record<string, { label: string; href: string }[]> = {
  Services: [
    { label: "Home Cleaning", href: "#services" },
    { label: "Office Cleaning", href: "#services" },
    { label: "Deep Cleaning", href: "#services" },
    { label: "Move-In / Out", href: "#services" },
    { label: "Window Cleaning", href: "#services" },
  ],
  Company: [
    { label: "About Us", href: "#about" },
    { label: "Our Team", href: "#about" },
    { label: "Reviews", href: "#reviews" },
    { label: "Careers", href: "#about" },
  ],
  Support: [
    { label: "Get a Quote", href: "#reviews" },
    { label: "FAQs", href: "#about" },
    { label: "Pricing", href: "#services" },
    { label: "Referral Program", href: "#reviews" },
  ],
};

const socials = [
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="relative bg-brand-darker border-t border-brand-border">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-teal/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-lg bg-brand-teal flex items-center justify-center teal-glow-sm">
                <svg width="20" height="20" viewBox="0 0 18 18" fill="none">
                  <path
                    d="M3 15C3 15 4.5 9 9 9C13.5 9 15 3 15 3"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                  />
                  <circle cx="9" cy="9" r="2" fill="white" />
                </svg>
              </div>
              <div>
                <p className="font-heading font-800 text-2xl text-white leading-none">
                  Prestiige
                </p>
                <p className="font-body text-white/40 text-xs mt-0.5">
                  Cleaning services
                </p>
              </div>
            </div>
            <p className="font-body text-white/40 text-sm leading-relaxed mb-6 max-w-xs">
              A cleaner space. A better life. Professional cleaning services you
              can count on, every single visit.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-9 h-9 rounded-xl glass-card flex items-center justify-center text-white/40 hover:text-brand-teal hover:border-brand-teal/30 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-teal/60"
                >
                  <social.icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-heading font-600 text-white text-sm mb-4 tracking-wide">
                {category}
              </h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-body text-white/40 text-sm hover:text-brand-teal transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 pt-6 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-body text-white/30 text-xs">
            © {new Date().getFullYear()} Prestiige Cleaning Services. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item) => (
                <a
                  key={item}
                  href="#"
                  className="font-body text-white/30 text-xs hover:text-brand-teal transition-colors"
                >
                  {item}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
