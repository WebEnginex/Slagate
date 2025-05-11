import { FC } from 'react';
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { FaGithub, FaDiscord } from "react-icons/fa";
import { IoMdHeart } from "react-icons/io";
import { BiError } from "react-icons/bi";

// Liens paramétrables pour le Discord et la page de dons
const DISCORD_BUG_REPORT_URL = "https://discord.gg/votre-lien-discord";
const DONATION_URL = "https://ko-fi.com/votre-page-don";

// Liste des contributeurs sous forme de tableau JSON
const contributors = [
  {
    id: 1,
    name: "Fab",
    role: "Fondateur & Développeur",
    description: "Développeur principal, responsable de l'architecture et de la maintenance du site.",
    image: "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y",
    links: {
      github: "https://github.com/username",
      discord: "username#0000"
    }
  },
  {
    id: 2,
    name: "Alex",
    role: "Gestionnaire de Builds",
    description: "Responsable de la curation et de la mise à jour des builds de chasseurs.",
    image: "",
    links: {
      discord: "alex#0000"
    }
  },
  {
    id: 3,
    name: "Sophia",
    role: "Designer UI/UX",
    description: "Création des maquettes, de l'interface utilisateur et des assets graphiques.",
    image: "https://www.gravatar.com/avatar/11111111111111111111111111111111?d=mp&f=y",
    links: {
      github: "https://github.com/designer",
    }
  },
  {
    id: 4,
    name: "Marco",
    role: "Expert en Contenu",
    description: "Rédaction des guides et vérification de l'exactitude du contenu du jeu.",
    image: "https://www.gravatar.com/avatar/22222222222222222222222222222222?d=mp&f=y",
    links: {
      discord: "marco#0000"
    }
  },
  {
    id: 5,
    name: "Léa",
    role: "Contributrice & Testeuse",
    description: "Test des fonctionnalités, recherche de bugs et suggestions d'améliorations.",
    image: "",
    links: {}
  },
  {
    id: 6,
    name: "Tom",
    role: "Développeur Frontend",
    description: "Développement de composants React et intégration des APIs.",
    image: "https://www.gravatar.com/avatar/33333333333333333333333333333333?d=mp&f=y",
    links: {
      github: "https://github.com/tom-dev",
      discord: "tom#0000"
    }
  },
];

// Composant pour la carte de contributeur
const ContributorCard: FC<{
  name: string;
  role: string;
  description: string;
  image?: string;
  links?: {
    github?: string;
    discord?: string;
  };
}> = ({ name, role, description, image, links }) => {
  const defaultImage = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=identicon&f=y";
  
  return (
    <div className="bg-sidebar border border-sidebar-border rounded-lg overflow-hidden shadow-md transition-transform duration-300 hover:scale-[1.02]">
      <div className="p-4 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-solo-purple">
          <img
            src={image || defaultImage}
            alt={`${name} profile`}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Remplacer par l'image par défaut en cas d'erreur
              (e.target as HTMLImageElement).src = defaultImage;
            }}
          />
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
        <span className="text-sm text-solo-purple font-medium mb-2">{role}</span>
        <p className="text-gray-300 text-sm text-center mb-3">{description}</p>
        
        {links && (
          <div className="flex space-x-3 mt-auto">
            {links.github && (
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={`GitHub de ${name}`}
              >
                <FaGithub size={20} />
              </a>
            )}
            {links.discord && (
              <span
                className="text-gray-400 hover:text-white transition-colors cursor-help"
                title={`Discord: ${links.discord}`}
                aria-label={`Discord de ${name}: ${links.discord}`}
              >
                <FaDiscord size={20} />
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Composant pour les sections
const Section: FC<{
  title: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}> = ({ title, children, icon }) => {
  return (
    <div className="mb-12">
      <div className="flex items-center mb-6">
        {icon && <span className="mr-3">{icon}</span>}
        <h2 className="text-2xl md:text-3xl font-bold text-white">{title}</h2>
      </div>
      <div>{children}</div>
    </div>
  );
};

// Composant principal de la page Pantheon
const Pantheon: FC = () => {
  return (
    <Layout>
      <SEO
        title="Panthéon des Contributeurs - Slagate"
        description="Découvrez l'équipe derrière Slagate - les contributeurs qui rendent ce projet possible. Apprenez également comment signaler des bugs ou nous soutenir."
        keywords="Solo Leveling, ARISE, contributeurs, équipe, bénévoles, donations, bugs"
      />
      
      <div className="w-full px-4 py-6">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Section Titre */}
          <div className="bg-sidebar-accent p-6 rounded-lg shadow-md space-y-4 mb-12">
            <h1 className="text-3xl md:text-4xl font-extrabold text-violet-400 text-center md:text-left">
              Panthéon - Contributeurs de Slagate
            </h1>
            <p className="text-base md:text-lg text-gray-300 text-center md:text-left">
              Derrière Slagate se trouve une équipe de passionnés qui contribuent à créer et maintenir cette ressource pour la communauté Solo Leveling: ARISE. 
              Nous tenons à remercier chaleureusement toutes les personnes qui ont participé à ce projet.
            </p>
          </div>

          {/* Section Contributeurs */}
          <Section title="Notre Équipe" icon={<IoMdHeart className="text-solo-purple" size={28} />}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {contributors.map((contributor) => (
                <ContributorCard
                  key={contributor.id}
                  name={contributor.name}
                  role={contributor.role}
                  description={contributor.description}
                  image={contributor.image}
                  links={contributor.links}
                />
              ))}
            </div>
          </Section>

          {/* Section Signalement de Bugs */}
          <Section title="🚨 Signaler un bug ou une erreur" icon={<BiError className="text-red-500" size={28} />}>
            <div className="bg-sidebar p-6 rounded-lg border border-sidebar-border">
              <p className="text-gray-300 mb-4">
                Vous avez trouvé un bug, une erreur dans les informations, ou vous avez une suggestion d'amélioration ? 
                Rejoignez notre serveur Discord et signalez-le dans le canal dédié. Nous apprécions votre aide pour améliorer Slagate !
              </p>
              <a 
                href={DISCORD_BUG_REPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-discord-purple hover:bg-discord-purple-dark text-white rounded-md transition-colors shadow-md"
              >
                <FaDiscord className="mr-2" />
                Rejoindre le Discord
              </a>
            </div>
          </Section>

          {/* Section Soutien par Dons */}
          <Section title="❤️ Nous soutenir" icon={<IoMdHeart className="text-red-500" size={28} />}>
            <div className="bg-sidebar p-6 rounded-lg border border-sidebar-border">
              <p className="text-gray-300 mb-4">
                Slagate est un projet entièrement gratuit et sans publicité. Les dons nous aident à couvrir les frais d'hébergement,
                à améliorer les infrastructures et à développer de nouvelles fonctionnalités. Chaque contribution, même minime, nous aide
                à maintenir et à faire évoluer le site.
              </p>
              <p className="text-gray-300 mb-6">
                <strong className="text-white">Important :</strong> 100% des dons sont réinvestis dans le projet et non utilisés à des fins personnelles.
                Nous maintenons une transparence totale sur l'utilisation des fonds.
              </p>
              <a 
                href={DONATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-solo-purple to-purple-600 hover:from-solo-purple-dark hover:to-purple-700 text-white font-medium rounded-md transition-all shadow-md"
              >
                <IoMdHeart className="mr-2" size={20} />
                Faire un don
              </a>
            </div>
          </Section>
        </div>
      </div>
    </Layout>
  );
};

export default Pantheon;