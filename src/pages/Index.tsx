import React from "react";
import Layout from "@/components/Layout";
import { Youtube, Twitch, Twitter, BookOpen, Newspaper } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="mb-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Bienvenue sur le Hub de Contenu</h1>
          <p className="text-muted-foreground text-lg">
            Découvrez les dernières vidéos, guides et suivez les streams en direct.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold text-center">À propos du créateur</h2>
        <div className="flex justify-center">
          <div className="rounded-lg bg-card p-6 shadow-md max-w-3xl text-center">
            <p className="text-lg text-muted-foreground">
              Passionné par le jeu <strong>Solo Leveling: Arise</strong>, je partage des vidéos, des streams en direct
              et des guides pour aider la communauté à progresser et à s'amuser. Rejoignez-moi dans cette aventure !
            </p>
          </div>
        </div>
      </section>

      {/* Latest YouTube Video */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold text-center">Dernière Vidéo</h2>
        <div className="flex justify-center">
          <div className="rounded-lg bg-card p-4 shadow-md hover:shadow-lg transition-shadow max-w-lg w-full">
            <iframe
              className="w-full h-64 rounded-lg"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="YouTube Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <h3 className="mt-4 text-lg font-semibold text-center">Titre de la Vidéo</h3>
            <p className="text-sm text-muted-foreground text-center">
              Description rapide de la vidéo.
            </p>
          </div>
        </div>
      </section>

      {/* Guides and Resources Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold text-center">Guides et Ressources</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-card p-6 shadow-md hover:shadow-lg transition-shadow">
            <BookOpen className="h-8 w-8 text-solo-purple mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-center">Guide du Débutant</h3>
            <p className="text-sm text-muted-foreground text-center">
              Apprenez les bases pour bien démarrer dans Solo Leveling: Arise.
            </p>
          </div>
          <div className="rounded-lg bg-card p-6 shadow-md hover:shadow-lg transition-shadow">
            <BookOpen className="h-8 w-8 text-solo-purple mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-center">Tier List des Hunters</h3>
            <p className="text-sm text-muted-foreground text-center">
              Découvrez les meilleurs chasseurs pour optimiser votre équipe.
            </p>
          </div>
          <div className="rounded-lg bg-card p-6 shadow-md hover:shadow-lg transition-shadow">
            <BookOpen className="h-8 w-8 text-solo-purple mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-center">Codes Promotionnels</h3>
            <p className="text-sm text-muted-foreground text-center">
              Obtenez des récompenses gratuites avec les derniers codes promo.
            </p>
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold text-center">Dernières Actualités</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg bg-card p-6 shadow-md hover:shadow-lg transition-shadow">
            <Newspaper className="h-8 w-8 text-solo-purple mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-center">Mise à jour 1.1</h3>
            <p className="text-sm text-muted-foreground text-center">
              Découvrez les nouveautés de la dernière mise à jour du jeu.
            </p>
          </div>
          <div className="rounded-lg bg-card p-6 shadow-md hover:shadow-lg transition-shadow">
            <Newspaper className="h-8 w-8 text-solo-purple mb-4 mx-auto" />
            <h3 className="text-lg font-semibold text-center">Événement Spécial</h3>
            <p className="text-sm text-muted-foreground text-center">
              Participez à l'événement spécial pour gagner des récompenses uniques.
            </p>
          </div>
        </div>
      </section>

      {/* Live Stream Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold text-center">Stream en Direct</h2>
        <div className="flex justify-center">
          <div className="rounded-lg bg-card p-8 text-center shadow-md hover:shadow-lg transition-shadow max-w-lg w-full">
            <p className="mb-4 text-lg font-medium">Regardez le stream en direct sur Twitch :</p>
            <a
              href="https://www.twitch.tv/nom_du_streamer"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Twitch className="h-5 w-5" />
              Voir le Stream
            </a>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="mb-12">
        <h2 className="mb-6 text-3xl font-bold text-center">Suivez-moi</h2>
        <div className="flex justify-center gap-6">
          <a
            href="https://www.youtube.com/channel/nom_du_channel"
            target="_blank"
            rel="noopener noreferrer"
            className="text-solo-purple hover:text-solo-light-purple"
          >
            <Youtube className="h-8 w-8" />
          </a>
          <a
            href="https://www.twitch.tv/nom_du_streamer"
            target="_blank"
            rel="noopener noreferrer"
            className="text-solo-purple hover:text-solo-light-purple"
          >
            <Twitch className="h-8 w-8" />
          </a>
          <a
            href="https://twitter.com/nom_du_twitter"
            target="_blank"
            rel="noopener noreferrer"
            className="text-solo-purple hover:text-solo-light-purple"
          >
            <Twitter className="h-8 w-8" />
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Index;