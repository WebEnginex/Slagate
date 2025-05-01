import React from "react";
import Layout from "@/components/Layout";

const ConditionsUtilisation = () => {
  return (
    <Layout>
      <div className="space-y-6 max-w-3xl mx-auto px-4 py-10 text-muted-foreground">
        <h1 className="text-3xl font-bold text-white">Conditions Générales d’Utilisation</h1>

        <section>
          <p>
            L’accès et l’utilisation du site <strong>SLAGATE</strong> impliquent l’acceptation pleine et entière des présentes CGU.
            L’utilisateur s’engage à utiliser le site de manière responsable, à ne pas nuire à son bon fonctionnement et à respecter
            les autres utilisateurs.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Accès au site</h2>
          <p>
            Le site est accessible gratuitement à tout utilisateur disposant d’un accès à Internet. Certaines fonctionnalités
            peuvent nécessiter une connexion ou des autorisations spécifiques.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Contenu</h2>
          <p>
            Les informations publiées sur le site sont fournies à titre indicatif et peuvent être modifiées ou mises à jour
            à tout moment. <strong>SLAGATE</strong> ne garantit pas l'exactitude ou l'exhaustivité des informations.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Modifications</h2>
          <p>
            L’éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les utilisateurs sont invités à les consulter régulièrement.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default ConditionsUtilisation;
