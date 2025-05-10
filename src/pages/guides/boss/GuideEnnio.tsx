import React, { useState } from "react";
import Layout from "@/components/Layout";

const tabs = [
  {
    id: "informations",
    label: "Informations",
    content: (
      <div>
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Informations générales</h2>
        <p className="mb-4">
          Ennio est un boss redoutable connu pour sa puissance et son rôle central dans le lore. 
          Il est le gardien de nombreux trésors et représente un défi majeur pour les aventuriers.
        </p>
        <h3 className="text-xl font-semibold mb-2">Histoire</h3>
        <p className="mb-4">
          Ennio, surnommé le "Gardien des Flammes", est une entité ancienne qui protège les reliques 
          des temps oubliés. Sa présence est liée à des événements cataclysmiques dans le monde.
        </p>
        <h3 className="text-xl font-semibold mb-2">Loot</h3>
        <ul className="list-disc list-inside">
          <li>Équipement légendaire</li>
          <li>Artefacts rares</li>
          <li>Matériaux pour améliorer vos armes</li>
        </ul>
      </div>
    ),
  },
  {
    id: "metus",
    label: "Métus",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Guide stratégique : Métus</h2>
        <p>
          Métus est un adversaire qui utilise des attaques basées sur la peur et la confusion. 
          Pour le vaincre, il est essentiel de :
        </p>
        <ul className="list-disc list-inside mt-4">
          <li>Éviter ses zones d'effet en restant mobile.</li>
          <li>Utiliser des compétences qui augmentent votre résistance mentale.</li>
          <li>Coordonner les attaques avec votre équipe pour maximiser les dégâts.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "esil-radir",
    label: "Esil Radir",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Guide stratégique : Esil Radir</h2>
        <p>
          Esil Radir est un boss qui maîtrise les attaques à distance et les pièges. 
          Voici quelques conseils pour le vaincre :
        </p>
        <ul className="list-disc list-inside mt-4">
          <li>Restez en mouvement pour éviter ses projectiles.</li>
          <li>Détruisez les pièges qu'il place sur le champ de bataille.</li>
          <li>Utilisez des compétences de contrôle pour limiter ses déplacements.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "baran-flammes",
    label: "Baran des flammes blanches",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Guide stratégique : Baran des flammes blanches</h2>
        <p>
          Baran des flammes blanches est un boss qui inflige des dégâts massifs avec ses attaques de feu. 
          Pour le vaincre :
        </p>
        <ul className="list-disc list-inside mt-4">
          <li>Équipez-vous d'armures résistantes au feu.</li>
          <li>Évitez ses attaques en cône en restant sur ses flancs.</li>
          <li>Utilisez des compétences de soin pour contrer les dégâts persistants.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "baran-roi",
    label: "Baran Roi des démons",
    content: (
      <div>
        <h2 className="text-2xl font-bold mb-4">Guide stratégique : Baran Roi des démons</h2>
        <p>
          Baran Roi des démons est la forme ultime de Baran, avec des attaques dévastatrices et une grande résistance. 
          Voici comment le vaincre :
        </p>
        <ul className="list-disc list-inside mt-4">
          <li>Formez une équipe bien équilibrée avec des tanks, des soigneurs et des DPS.</li>
          <li>Évitez ses attaques de zone en restant dispersés.</li>
          <li>Concentrez vos attaques sur ses points faibles pour briser sa défense.</li>
        </ul>
      </div>
    ),
  },
];

const Ennio = () => {
  const [activeTab, setActiveTab] = useState("informations");

  return (
    <Layout>
      {/* Image du boss en pleine largeur sans overflow */}
      <div className="-mx-4 sm:mx-0">
        <img
          src="https://todwuewxymmybbunbclz.supabase.co/storage/v1/object/public/background//Background_Guide_Ennio.webp"
          alt="Ennio"
          className="w-full h-64 sm:h-72 md:h-96 object-cover"
        />
      </div>

      {/* Contenu principal */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Onglets avec scroll horizontal mobile/tablette fluide */}
        <div
  className="mb-8 border-b border-gray-700 overflow-x-auto tabs-scroll"
  style={{ WebkitOverflowScrolling: "touch" }}
>
  <ul className="flex w-max space-x-2 sm:space-x-3 md:space-x-4 px-2 sm:px-0">
    {tabs.map((tab) => (
      <li
        key={tab.id}
        className={`cursor-pointer px-4 py-2 text-sm sm:text-base rounded-t-lg whitespace-nowrap transition-colors duration-200 ${
          activeTab === tab.id
            ? "bg-solo-purple text-white font-bold"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
        }`}
        onClick={() => setActiveTab(tab.id)}
      >
        {tab.label}
      </li>
    ))}
  </ul>
</div>


        {/* Contenu de l'onglet actif */}
        <div className="text-white text-left bg-gray-900 p-4 sm:p-6 rounded-lg shadow-md">
          {tabs.find((tab) => tab.id === activeTab)?.content}
        </div>
      </div>
    </Layout>
  );
};

export default Ennio;
