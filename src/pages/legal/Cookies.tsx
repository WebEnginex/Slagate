import React from "react";
import Layout from "@/components/Layout";

const Cookies = () => {
  return (
    <Layout>
      <div className="space-y-6 max-w-3xl mx-auto px-4 py-10 text-muted-foreground">
        <h1 className="text-3xl font-bold text-white">Politique de cookies</h1>

        <section>
          <p>
            Le site <strong>SLAGATE</strong> utilise des cookies pour améliorer votre expérience utilisateur et analyser le trafic.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Qu’est-ce qu’un cookie ?</h2>
          <p>
            Un cookie est un petit fichier texte enregistré sur votre appareil lorsque vous visitez un site web. Il permet de reconnaître votre navigateur
            lors de visites ultérieures.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Cookies utilisés</h2>
          <p>
            - Cookies de session (nécessaires au fonctionnement)
            <br />
            - Cookies d’analyse (ex. Google Analytics, si activé)
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Gestion des cookies</h2>
          <p>
            Vous pouvez à tout moment désactiver les cookies dans les paramètres de votre navigateur. Notez que cela peut altérer certaines fonctionnalités du site.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Cookies;
