import * as React from "react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const PolitiqueConfidentialite = () => {
  const [copiedEmail, setCopiedEmail] = React.useState(false);
  
  const copyEmail = () => {
    navigator.clipboard.writeText('contact@webengine.fr');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };
  
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
        </section>
        
        <section className="bg-gray-800/30 p-6 rounded-lg shadow-lg border border-gray-700 mb-8">
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
            Vous pouvez exercer ces droits en nous contactant à : 
            <span className="relative inline-block">
              <button 
                onClick={copyEmail}
                className="text-violet-400 hover:underline hover:text-violet-300 transition-colors duration-300 font-medium cursor-pointer bg-transparent border-none p-0 mx-1"
                title="Cliquer pour copier l'adresse email"
              >
                contact@webengine.fr
              </button>
              <span className={`absolute -top-7 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded shadow-md transition-opacity duration-300 ${copiedEmail ? 'opacity-100' : 'opacity-0'}`}>
                Copié !
              </span>
            </span>.
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
          <div className="relative">
            <button 
              onClick={copyEmail}
              className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2 rounded-lg shadow transition duration-300 flex items-center group"
              title="Cliquer pour copier l'adresse email"
            >
              <span className="mr-2 group-hover:animate-bounce">✉️</span>
              contact@webengine.fr
              <span className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">&rarr;</span>
            </button>
            <div className={`absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-gray-900 text-white text-sm px-3 py-1 rounded shadow-lg transition-all duration-300 ${copiedEmail ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1 pointer-events-none'}`}>
              Copié !
            </div>
          </div>
        </section>
        
        <div className="text-center text-sm text-gray-500 mt-12">
          Dernière mise à jour : Mai 2025
        </div>
      </div>
    </Layout>
  );
};

export default PolitiqueConfidentialite;
