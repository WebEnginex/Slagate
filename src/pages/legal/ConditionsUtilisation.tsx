import React from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const ConditionsUtilisation = () => {
  return (
    <Layout>
      <SEO 
        title="Conditions d'Utilisation - SLAGATE" 
        description="Conditions générales d'utilisation du site SLAGATE dédié au jeu Solo Leveling: ARISE."
      />
      <div className="bg-gradient-to-b from-gray-900/50 to-transparent py-8 mb-6">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-center text-violet-400 mb-4">Conditions Générales d'Utilisation</h1>
          <div className="h-1 w-24 bg-violet-600 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-16 text-gray-300">
        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0 mr-4">
              <div className="bg-violet-600/30 p-2 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-violet-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <p className="text-lg">
              L'accès et l'utilisation du site <strong className="text-violet-400">SLAGATE</strong> impliquent l'acceptation pleine et entière des présentes CGU.
              L'utilisateur s'engage à utiliser le site de manière responsable, à ne pas nuire à son bon fonctionnement et à respecter
              les autres utilisateurs.
            </p>
          </div>
        </section>

        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Accès au site</h2>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex-1">
              <h3 className="text-lg font-semibold text-violet-300 mb-2">Gratuit</h3>
              <p>
                Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet.
              </p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex-1">
              <h3 className="text-lg font-semibold text-violet-300 mb-2">Fonctionnalités</h3>
              <p>
                Certaines fonctionnalités peuvent nécessiter une connexion ou des autorisations spécifiques.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Responsabilités de l'utilisateur</h2>
          <p>
            L'utilisateur s'engage à ne pas utiliser le site pour des activités illégales, à respecter les lois en vigueur et à ne pas perturber le fonctionnement du site.
          </p>
          <ul className="list-disc list-inside mt-3 space-y-2 pl-4">
            <li>Ne pas nuire à la sécurité du site</li>
            <li>Ne pas distribuer de contenu illicite ou offensant</li>
            <li>Ne pas tenter d'accéder à des parties restreintes du site</li>
            <li>Respecter les droits de propriété intellectuelle</li>
          </ul>
        </section>

        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Contenu</h2>
          <p>
            Les informations publiées sur le site sont fournies à titre indicatif et peuvent être modifiées ou mises à jour
            à tout moment. <strong className="text-violet-400">SLAGATE</strong> ne garantit pas l'exactitude ou l'exhaustivité des informations.
          </p>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-gray-900/30 p-3 rounded flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-300 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              <span>Contenu à but informatif uniquement</span>
            </div>
            <div className="bg-gray-900/30 p-3 rounded flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-300 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>Mises à jour régulières</span>
            </div>
          </div>
        </section>

        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Modification des CGU</h2>
          <p>
            L'éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs sont invités à les consulter régulièrement.
          </p>
        </section>

        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Juridiction et Loi Applicable</h2>
          <div className="flex items-center justify-between">
            <p>
              Les présentes CGU sont régies par la loi française. En cas de litige, les tribunaux français seront seuls compétents.
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

export default ConditionsUtilisation;
