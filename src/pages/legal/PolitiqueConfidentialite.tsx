import React from "react";
import Layout from "@/components/Layout";

const PolitiqueConfidentialite = () => {
  return (
    <Layout>
      <div className="space-y-6 max-w-3xl mx-auto px-4 py-10 text-muted-foreground">
        <h1 className="text-3xl font-bold text-white">Politique de confidentialité</h1>

        <section>
          <p>
            Cette politique de confidentialité décrit comment vos données personnelles peuvent être collectées, utilisées et protégées sur <strong>SLAGATE</strong>.
            Le site respecte le Règlement Général sur la Protection des Données (RGPD).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Données collectées</h2>
          <p>
            En l'état actuel, le site ne collecte aucune donnée personnelle sensible. Certaines informations anonymes peuvent être utilisées
            à des fins statistiques (nombre de visites, pages vues, etc.).
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Cookies</h2>
          <p>
            Le site peut utiliser des cookies à des fins de navigation ou d’analyse. Vous pouvez configurer votre navigateur pour bloquer
            les cookies si vous le souhaitez.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Contact</h2>
          <p>
            Pour toute demande liée à vos données personnelles : [contact@webengine.fr]
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default PolitiqueConfidentialite;
