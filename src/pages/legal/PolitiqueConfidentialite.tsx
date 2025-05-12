import React from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const PolitiqueConfidentialite = () => {
  return (
    <Layout>
      <SEO 
        title="Politique de Confidentialité - SLAGATE" 
        description="Découvrez notre politique de confidentialité et comment nous protégeons vos données sur SLAGATE."
      />
      <div className="bg-gradient-to-b from-gray-900/50 to-transparent py-8 mb-6">
        <div className="max-w-4xl mx-auto px-6">
          <h1 className="text-4xl font-extrabold text-center text-violet-400 mb-4">Politique de confidentialité</h1>
          <div className="h-1 w-24 bg-violet-600 mx-auto rounded-full"></div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 pb-16 text-gray-300">
        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <p className="text-lg">
            Cette politique de confidentialité décrit comment vos données personnelles peuvent être collectées, utilisées et protégées sur <strong className="text-violet-400">SLAGATE</strong>.
            Le site respecte le Règlement Général sur la Protection des Données (RGPD).
          </p>
        </section>

        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Données collectées</h2>
          <p>
            En l'état actuel, le site ne collecte aucune donnée personnelle sensible. Certaines informations anonymes peuvent être utilisées
            à des fins statistiques (nombre de visites, pages vues, etc.).
          </p>
        </section>        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Droits des utilisateurs</h2>
          <p>
            Conformément au RGPD, vous disposez des droits suivants :
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li>Accès à vos données</li>
            <li>Rectification de vos informations</li>
            <li>Suppression de vos données</li>
            <li>Opposition au traitement</li>
            <li>Limitation du traitement</li>
            <li>Portabilité de vos données</li>
          </ul>
          <p className="mt-3">
            Vous pouvez exercer ces droits en nous contactant à : <a href="mailto:contact@webengine.fr" className="text-violet-400 hover:underline">contact@webengine.fr</a>.
          </p>
        </section>

        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Durée de conservation des données</h2>
          <p>
            Les données collectées sont conservées uniquement pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées.
          </p>
        </section>

        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Sécurité des données</h2>
          <p>
            Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données contre toute perte, accès non autorisé ou divulgation.
          </p>
        </section>

        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-violet-400 mb-3">Contact</h2>
          <p className="text-center mb-4">
            Pour toute demande liée à vos données personnelles ou pour exercer vos droits :
          </p>
          <a href="mailto:contact@webengine.fr" className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg shadow transition duration-300 flex items-center">
            <span className="mr-2">✉️</span>
            contact@webengine.fr
          </a>
        </section>
        
        <div className="text-center text-sm text-gray-500 mt-12">
          Dernière mise à jour : Mai 2025
        </div>
      </div>
    </Layout>
  );
};

export default PolitiqueConfidentialite;
