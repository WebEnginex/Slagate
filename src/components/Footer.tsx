import React from "react";
import { Youtube, Twitch, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-sidebar-accent border-t border-sidebar-border py-6">
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground mb-4">Suivez-moi sur :</p>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.youtube.com/@Sohoven"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <Youtube className="h-6 w-6" />
          </a>
          <a
            href="https://www.twitch.tv/sohoven"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <Twitch className="h-6 w-6" />
          </a>
          <a
            href="https://x.com/Soho_ven"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <Twitter className="h-6 w-6" />
          </a>
          <a
            href="https://www.instagram.com/sohoven"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-white transition-colors"
          >
            <Instagram className="h-6 w-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;