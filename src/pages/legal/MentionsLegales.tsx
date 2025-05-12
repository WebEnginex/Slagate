import React from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const MentionsLegales = () => {
  return (
    <Layout>
      <SEO 
        title="Mentions Légales - SLAGATE" 
        description="Mentions légales et informations sur l'éditeur et l'hébergeur du site SLAGATE dédié à Solo Leveling: ARISE."
      />
      <div className="bg-gradient-to-b from-gray-900/50 to-transparent py-8 mb-6">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-center text-violet-400 mb-4">Mentions légales</h1>
          <div className="h-1 w-24 bg-violet-600 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-16 text-gray-300">
        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Éditeur du site</h2>
          <div className="flex flex-col md:flex-row md:gap-8">
            <div className="flex-1">
              <p className="mb-4">
                Le site <strong className="text-violet-400">SLAGATE</strong> est un site fan non officiel dédié au jeu Solo Leveling: ARISE.
                Il n'est ni affilié, ni soutenu par Netmarble ou les ayants droit officiels de la licence.
              </p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 mt-4 md:mt-0">
              <h3 className="text-lg font-semibold text-violet-300 mb-2">Coordonnées</h3>
              <p>
                <span className="font-medium">Éditeur :</span> WebEngine
                <br />
                <span className="font-medium">Adresse :</span> 14 Rue Maillaux, 59740 Felleries
                <br />
                <span className="font-medium">SIRET :</span> 940 330 863 00017
                <br />
                <span className="font-medium">Email :</span> <a href="mailto:contact@webengine.fr" className="text-violet-400 hover:underline">contact@webengine.fr</a>
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Hébergement</h2>
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-white p-2 rounded-lg flex-shrink-0">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 0C8.955 0 0 8.955 0 20C0 31.045 8.955 40 20 40C31.045 40 40 31.045 40 20C40 8.955 31.045 0 20 0ZM10.825 29.175L6.825 25.175C11.025 17.775 20 13.325 29.175 13.325V19.175L10.825 29.175ZM29.175 24.175V31.025C21.775 31.025 14.875 28.025 10.825 23.175L29.175 24.175Z" fill="#3EBCB3"/>
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-violet-300">Netlify</h3>
              <p>
                <span className="font-medium">Adresse :</span> 2325 3rd Street, Suite 215, San Francisco, CA 94107, USA
                <br />
                <span className="font-medium">Site :</span> <a href="https://www.netlify.com" target="_blank" rel="noopener noreferrer" className="text-violet-400 hover:underline inline-flex items-center">
                  https://www.netlify.com
                  <svg className="w-3 h-3 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z" />
                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z" />
                  </svg>
                </a>
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Propriété intellectuelle</h2>
          <p>
            Les visuels et contenus liés à Solo Leveling: ARISE appartiennent à leurs ayants droit respectifs.
            Ce site est un projet communautaire à but non lucratif. Si vous êtes ayant droit et souhaitez faire retirer un contenu,
            veuillez nous contacter à l'adresse indiquée ci-dessus. 
          </p>
          <div className="mt-4 bg-gray-900/30 p-3 rounded border-l-4 border-violet-500">
            <p className="italic">
              Toute demande sera traitée dans les plus brefs délais.
            </p>
          </div>
        </section>

        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Responsabilité</h2>
          <p>
            L'éditeur du site s'efforce de fournir des informations à jour et fiables, mais ne saurait être tenu responsable
            des erreurs, omissions ou de l'indisponibilité temporaire de certaines fonctionnalités.
            Les utilisateurs sont responsables de l'utilisation qu'ils font des informations fournies sur le site.
          </p>
          <div className="mt-4 flex items-center">
            <div className="bg-violet-700/30 p-1.5 rounded-full mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-300" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm text-violet-200">
              Ce site est constamment mis à jour et amélioré. Si vous constatez une erreur, n'hésitez pas à nous en faire part.
            </p>
          </div>
        </section>
        
        <div className="text-center text-sm text-gray-500 mt-12">
          Dernière mise à jour : Mai 2025
        </div>
      </div>
    </Layout>
  );
};

export default MentionsLegales;
