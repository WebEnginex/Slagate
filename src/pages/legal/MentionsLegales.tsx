import React from "react";
import Layout from "@/components/Layout";

const MentionsLegales = () => {
  return (
    <Layout>
      <div className="space-y-6 max-w-3xl mx-auto px-4 py-10 text-muted-foreground">
        <h1 className="text-3xl font-bold text-white">Mentions légales</h1>

        <section>
          <h2 className="text-xl font-semibold text-white">Éditeur du site</h2>
          <p>
            Le site <strong>SLAGATE</strong> est un site fan non officiel dédié au jeu Solo Leveling: ARISE.
            Il n’est ni affilié, ni soutenu par Netmarble ou les ayants droit officiels de la licence.
          </p>
          <p>
            Éditeur : [https://webengine.fr/]  
            <br />
            Adresse e-mail : [contact@webengine.fr]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Hébergement</h2>
          <p>
            Le site est hébergé par :
            <br />
            [Netlify]
            <br />
            [https://app.netlify.com/]
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Propriété intellectuelle</h2>
          <p>
            Les visuels et contenus liés à Solo Leveling: ARISE appartiennent à leurs ayants droit respectifs.
            Ce site est un projet communautaire à but non lucratif. Si vous êtes ayant droit et souhaitez faire retirer un contenu,
            veuillez nous contacter à l'adresse indiquée ci-dessus.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-white">Responsabilité</h2>
          <p>
            L’éditeur du site s’efforce de fournir des informations à jour et fiables, mais ne saurait être tenu responsable
            d’éventuelles erreurs, omissions ou de l’indisponibilité temporaire de certaines fonctionnalités.
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default MentionsLegales;
