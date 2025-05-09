import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-sidebar-accent border-t border-sidebar-border py-8 mt-auto lg:ml-64">
      <div className="container mx-auto px-4 flex flex-col items-center text-center space-y-6">
        <div>
          <p className="text-base font-medium text-white mb-4">
            Suivez-moi sur :
          </p>
          <div className="flex justify-center gap-6">
            <a
              href="https://www.youtube.com/@Sohoven"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <img
                src="/icons/youtube.svg"
                alt="YouTube"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.twitch.tv/sohoven"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <img
                src="/icons/twitch.svg"
                alt="Twitch"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.tiktok.com/@sohovenn"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <img
                src="/icons/tiktok.svg"
                alt="TikTok"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://x.com/Soho_ven"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <img
                src="/icons/twitter.svg"
                alt="Twitter"
                className="h-6 w-6"
              />
            </a>
            <a
              href="https://www.instagram.com/sohoven"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-white transition-colors"
            >
              <img
                src="/icons/instagram.svg"
                alt="Instagram"
                className="h-6 w-6"
              />
            </a>
          </div>
        </div>

        <div className="text-sm text-muted-foreground flex flex-wrap justify-center gap-4">
          <Link
            to="/mentions-legales"
            className="hover:underline hover:text-white"
          >
            Mentions légales
          </Link>
          <Link to="/cgu" className="hover:underline hover:text-white">
            Conditions d’utilisation
          </Link>
          <Link
            to="/confidentialite"
            className="hover:underline hover:text-white"
          >
            Confidentialité
          </Link>
          <Link to="/cookies" className="hover:underline hover:text-white">
            Cookies
          </Link>
        </div>

        <p className="text-xs text-muted-foreground mt-4">
          © {new Date().getFullYear()}{" "}
          <a
            href="https://webengine.fr"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline hover:text-white font-medium"
          >
            WebEngine
          </a>{" "}
          – Développé avec passion pour les fans de Solo Leveling: ARISE
        </p>
      </div>

      {/* Flèche pour remonter en haut */}
      <button
        onClick={scrollToTop}
        className="fixed right-4 bottom-4 bg-violet-500 hover:bg-violet-600 text-white p-3 rounded-full shadow-lg transition-all duration-300"
        aria-label="Remonter en haut"
      >
        <img
          src="/icons/arrow-up.svg"
          alt="Remonter en haut"
          className="h-5 w-5"
        />
      </button>
    </footer>
  );
};

export default Footer;