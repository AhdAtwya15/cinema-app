import { memo } from "react";
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Dot,
} from "lucide-react";
import NavLogo from "./NavLogo";


const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Movies", href: "/movies" },
  { label: "Releases", href: "/releases" },
  { label: "Contact", href: "/contact" },
  { label: "Login", href: "/login" },
] as const;

const GENRES = [
  "Action",
  "Drama",
  "Sci-Fi",
  "Horror",
  "Comedy",
  "Animation",
  "Thriller",
  "Romance",
] as const;

const SOCIAL_LINKS = [
  { label: "Facebook", icon: Facebook, href: "#" },
  { label: "Twitter / X", icon: Twitter, href: "#" },
  { label: "Instagram", icon: Instagram, href: "#" },
  { label: "YouTube", icon: Youtube, href: "#" },
] as const;

const CONTACT_INFO = [
  { icon: Mail, text: "hello@luxurecinema.com", href: "mailto:hello@luxurecinema.com" },
  { icon: Phone, text: "+1 (800) 123-4567", href: "tel:+18001234567" },
  { icon: MapPin, text: "123 Cinema Blvd, Hollywood, CA", href: "#" },
] as const;

const POLICY_LINKS = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Cookie Policy", href: "#" },
] as const;


interface FooterColumnProps {
  heading: string;
  children: React.ReactNode;
}

const FooterColumn = memo(function FooterColumn({ heading, children }: FooterColumnProps) {
  return (
    <section aria-labelledby={`footer-col-${heading.toLowerCase().replace(/\s+/g, "-")}`}>
      <h3
        id={`footer-col-${heading.toLowerCase().replace(/\s+/g, "-")}`}
        className="text-xs font-semibold tracking-[0.22em] uppercase text-[#D4A853] mb-5 pb-2.5 border-b border-[rgba(212,168,83,0.20)] inline-block"
      >
        {heading}
      </h3>
      {children}
    </section>
  );
});

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

const FooterLink = memo(function FooterLink({ href, children, external, className = "" }: FooterLinkProps) {
  const base =
    "group inline-flex items-center gap-1 text-sm text-white/55 hover:text-[#D4A853] transition-colors duration-200 leading-relaxed outline-none focus-visible:text-[#D4A853] focus-visible:underline";

  if (external || href.startsWith("mailto:") || href.startsWith("tel:")) {
    return (
      <a
        href={href}
        className={`${base} ${className}`}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        {children}
      </a>
    );
  }

  return (
    <Link to={href} className={`${base} ${className}`}>
      {children}
    </Link>
  );
});

interface SocialButtonProps {
  href: string;
  label: string;
  icon: React.ElementType;
}

const SocialButton = memo(function SocialButton({ href, label, icon: Icon }: SocialButtonProps) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/[0.04] text-white/50 hover:border-[rgba(212,168,83,0.45)] hover:bg-[rgba(212,168,83,0.08)] hover:text-[#D4A853] hover:shadow-[0_0_14px_rgba(212,168,83,0.18)] transition-all duration-250 outline-none focus-visible:ring-2 focus-visible:ring-[#D4A853]/50"
    >
      <Icon size={15} strokeWidth={1.75} aria-hidden="true" focusable="false" />
    </a>
  );
});

interface ContactRowProps {
  icon: React.ElementType;
  text: string;
  href: string;
}

const ContactRow = memo(function ContactRow({ icon: Icon, text, href }: ContactRowProps) {
  return (
    <a
      href={href}
      className="group flex items-start gap-3 text-sm text-white/55 hover:text-[#D4A853] transition-colors duration-200 outline-none focus-visible:text-[#D4A853] focus-visible:underline"
    >
      <span className="mt-0.5 flex-shrink-0 flex items-center justify-center w-7 h-7 rounded-lg bg-[rgba(212,168,83,0.06)] border border-[rgba(212,168,83,0.15)] group-hover:bg-[rgba(212,168,83,0.12)] transition-colors duration-200">
        <Icon size={13} strokeWidth={1.75} className="text-[#D4A853]" aria-hidden="true" focusable="false" />
      </span>
      <span className="leading-relaxed">{text}</span>
    </a>
  );
});


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="relative w-full bg-[#0F0F23] border-t border-white/[0.06] overflow-hidden"
      aria-label="Site footer"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -left-32 w-80 h-80 rounded-full bg-[radial-gradient(circle,rgba(212,168,83,0.07)_0%,transparent_70%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 w-72 h-72 rounded-full bg-[radial-gradient(circle,rgba(88,28,135,0.12)_0%,transparent_70%)] blur-2xl"
      />

      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[55%] h-px bg-linear-to-r from-transparent via-[rgba(212,168,83,0.40)] to-transparent"
      />
      <div className="relative mx-auto max-w-7xl px-6 md:px-10 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          <div className="flex flex-col gap-5 sm:col-span-2 lg:col-span-1">
            <NavLogo />
            <p className="text-sm text-white/45 leading-relaxed max-w-[22rem] lg:max-w-none">
              Your premier destination for cinematic experiences. Book seats, explore new releases, and immerse yourself in the world of film.
            </p>
            <div className="flex items-center gap-2.5 mt-1" role="list" aria-label="Social media links">
              {SOCIAL_LINKS.map(({ label, icon, href }) => (
                <div key={label} role="listitem">
                  <SocialButton href={href} label={label} icon={icon} />
                </div>
              ))}
            </div>
          </div>

          <FooterColumn heading="Navigate">
            <ul className="flex flex-col " role="list">
              {NAV_LINKS.map(({ label, href }) => (
                <li key={label}>
                  <FooterLink href={href}>
                    <Dot
                      size={30}
                      className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      aria-hidden="true"
                    />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {label}
                    </span>
                  </FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn heading="Genres">
            <ul className="flex flex-col " role="list">
              {GENRES.map((genre) => (
                <li key={genre}>
                  <FooterLink href={`/movies?genre=${genre.toLowerCase()}`}>
                    <Dot
                      size={30}
                      className="opacity-0 -translate-x-3 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300"
                      aria-hidden="true"
                    />
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      {genre}
                    </span>
                  </FooterLink>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn heading="Contact Us">
            <ul className="flex flex-col gap-4" role="list">
              {CONTACT_INFO.map(({ icon, text, href }) => (
                <li key={text}>
                  <ContactRow icon={icon} text={text} href={href} />
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

    
        <div
          aria-hidden="true"
          className="my-10 h-px w-full bg-linear-to-r from-transparent via-[rgba(212,168,83,0.40)] to-transparent"
        />
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/35">
          <p>
            &copy; {currentYear}{" "}
            <span className="text-[#D4A853]/80 font-medium">Luxure Cinema</span>. All rights reserved.
          </p>

          
          <nav aria-label="Legal links">
            <ul className="flex items-center gap-1" role="list">
              {POLICY_LINKS.map(({ label, href }, i) => (
                <li key={label} className="flex items-center">
                  {i > 0 && (
                    <span aria-hidden="true" className="mx-2 text-white/15">
                      ·
                    </span>
                  )}
                  <FooterLink href={href} className="text-xs">
                    {label}
                  </FooterLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;