import { SelectItem, SelectSeparator } from "@/components/ui/select";

export const BTPMetiersSelect = () => (
  <>
    {/* ÉLECTRICITÉ */}
    <SelectSeparator />
    <SelectItem value="header-electricite" disabled className="font-bold text-primary">
      ⚡ ÉLECTRICITÉ
    </SelectItem>
    <SelectItem value="electricien-installation">Électricien d'installation du bâtiment</SelectItem>
    <SelectItem value="electricien-equipement">Électricien d'équipement</SelectItem>
    <SelectItem value="electricien-monteur-cableur">Électricien monteur-câbleur</SelectItem>
    <SelectItem value="electricien-industriel">Électricien industriel</SelectItem>
    <SelectItem value="electricien-chantier">Électricien de chantier</SelectItem>
    <SelectItem value="electricien-maintenance">Électricien de maintenance</SelectItem>
    <SelectItem value="electricien-renovation">Électricien en rénovation</SelectItem>
    <SelectItem value="electricien-residentiel">Électricien résidentiel</SelectItem>
    <SelectItem value="electricien-tertiaire">Électricien tertiaire</SelectItem>
    <SelectItem value="electricien-collectivites">Électricien des collectivités</SelectItem>
    <SelectItem value="installateur-haute-tension">Installateur haute tension</SelectItem>
    <SelectItem value="installateur-moyenne-tension">Installateur moyenne tension</SelectItem>
    <SelectItem value="installateur-basse-tension">Installateur basse tension</SelectItem>
    <SelectItem value="monteur-cableur">Monteur-câbleur en électricité de bâtiment</SelectItem>
    <SelectItem value="cableur-chantier">Câbleur de chantier</SelectItem>
    <SelectItem value="tireur-cables">Tireur de câbles</SelectItem>
    <SelectItem value="raccordeur-electricien">Raccordeur électricien</SelectItem>
    <SelectItem value="installateur-securite">Installateur de systèmes de sécurité</SelectItem>
    <SelectItem value="electricien-courants-faibles">Électricien courants faibles</SelectItem>
    <SelectItem value="installateur-alarmes">Installateur d'alarmes</SelectItem>
    <SelectItem value="technicien-alarme-intrusion">Technicien alarme intrusion</SelectItem>
    <SelectItem value="installateur-videosurveillance">Installateur de vidéosurveillance</SelectItem>
    <SelectItem value="installateur-controle-acces">Installateur de contrôle d'accès</SelectItem>
    <SelectItem value="cableur-reseau-informatique">Câbleur réseau informatique</SelectItem>
    <SelectItem value="installateur-cablage-structure">Installateur de câblage structuré (VDI)</SelectItem>
    <SelectItem value="technicien-fibre-optique">Technicien fibre optique bâtiment</SelectItem>
    <SelectItem value="installateur-telephonique">Installateur téléphonique</SelectItem>
    <SelectItem value="domoticien">Domoticien</SelectItem>
    <SelectItem value="installateur-domotique">Installateur en domotique résidentielle</SelectItem>
    <SelectItem value="technicien-automatisme">Technicien en automatisme du bâtiment</SelectItem>
    <SelectItem value="electricien-domoticien">Électricien domoticien</SelectItem>
    <SelectItem value="installateur-systemes-connectes">Installateur de systèmes connectés</SelectItem>
    <SelectItem value="technicien-gtb">Technicien en gestion technique du bâtiment (GTB)</SelectItem>
    <SelectItem value="technicien-gtc">Technicien en gestion technique centralisée (GTC)</SelectItem>
    <SelectItem value="programmeur-domotique">Programmeur de systèmes domotiques</SelectItem>
    <SelectItem value="installateur-knx">Installateur KNX</SelectItem>
    <SelectItem value="installateur-maison-intelligente">Installateur de maison intelligente</SelectItem>
    <SelectItem value="electricien-eclairagiste">Électricien éclairagiste</SelectItem>
    <SelectItem value="installateur-eclairage-public">Installateur d'éclairage public</SelectItem>
    <SelectItem value="technicien-eclairage-architectural">Technicien en éclairage architectural</SelectItem>
    <SelectItem value="installateur-eclairage-led">Installateur d'éclairage LED</SelectItem>
    <SelectItem value="concepteur-lumiere">Concepteur lumière (lighting designer)</SelectItem>
    <SelectItem value="installateur-eclairage-securite">Installateur d'éclairage de sécurité</SelectItem>
    <SelectItem value="installateur-eclairage-exterieur">Installateur d'éclairage extérieur</SelectItem>
    <SelectItem value="monteur-reseaux-aeriens">Monteur de réseaux électriques aériens</SelectItem>
    <SelectItem value="monteur-reseaux-souterrains">Monteur de réseaux électriques souterrains</SelectItem>
    <SelectItem value="monteur-lignes">Monteur de lignes électriques</SelectItem>
    <SelectItem value="electricien-lignes">Électricien lignes et canalisations</SelectItem>
    <SelectItem value="technicien-reseaux-electriques">Technicien réseaux électriques</SelectItem>
    <SelectItem value="raccordeur-reseau">Raccordeur au réseau électrique</SelectItem>
    <SelectItem value="poseur-compteurs">Poseur de compteurs électriques</SelectItem>
    <SelectItem value="electricien-ascenseurs">Électricien d'ascenseurs</SelectItem>
    <SelectItem value="electricien-piscines">Électricien de piscines</SelectItem>
    <SelectItem value="electricien-ventilation">Électricien de systèmes de ventilation</SelectItem>
    <SelectItem value="electricien-cuisines-pro">Électricien de cuisines professionnelles</SelectItem>
    <SelectItem value="electricien-salles-blanches">Électricien de salles blanches</SelectItem>
    <SelectItem value="electricien-data-centers">Électricien de data centers</SelectItem>
    <SelectItem value="electricien-naval">Électricien naval (bateaux, ports)</SelectItem>
    <SelectItem value="electricien-erp">Électricien d'ERP</SelectItem>
    <SelectItem value="dessinateur-projeteur-elec">Dessinateur-projeteur électricité</SelectItem>
    <SelectItem value="ingenieur-elec-batiment">Ingénieur électricité bâtiment</SelectItem>
    <SelectItem value="charge-etudes-elec">Chargé d'études électriques</SelectItem>
    <SelectItem value="charge-affaires-elec">Chargé d'affaires en électricité</SelectItem>

    {/* CHAUFFAGE */}
    <SelectSeparator />
    <SelectItem value="header-chauffage" disabled className="font-bold text-secondary">
      🔥 CHAUFFAGE
    </SelectItem>
    <SelectItem value="chauffagiste">Chauffagiste</SelectItem>
    <SelectItem value="installateur-chauffage">Installateur en chauffage</SelectItem>
    <SelectItem value="monteur-chauffage-central">Monteur en chauffage central</SelectItem>
    <SelectItem value="installateur-chauffage-gaz">Installateur de chauffage au gaz</SelectItem>
    <SelectItem value="installateur-chauffage-fioul">Installateur de chauffage au fioul</SelectItem>
    <SelectItem value="installateur-chauffage-electrique">Installateur de chauffage électrique</SelectItem>
    <SelectItem value="installateur-chauffage-mixte">Installateur de chauffage mixte</SelectItem>
    <SelectItem value="chauffagiste-depanneur">Chauffagiste dépanneur</SelectItem>
    <SelectItem value="installateur-chaudieres-gaz">Installateur de chaudières gaz</SelectItem>
    <SelectItem value="installateur-chaudieres-fioul">Installateur de chaudières fioul</SelectItem>
    <SelectItem value="installateur-chaudieres-bois">Installateur de chaudières bois</SelectItem>
    <SelectItem value="installateur-chaudieres-granules">Installateur de chaudières granulés</SelectItem>
    <SelectItem value="installateur-chaudieres-condensation">Installateur de chaudières condensation</SelectItem>
    <SelectItem value="installateur-chaudieres-basse-temp">Installateur de chaudières basse température</SelectItem>
    <SelectItem value="installateur-micro-cogeneration">Installateur de micro-cogénération</SelectItem>
    <SelectItem value="chaudronnier-chauffagiste">Chaudronnier chauffagiste</SelectItem>
    <SelectItem value="technicien-bruleur">Technicien brûleur</SelectItem>
    <SelectItem value="installateur-pac">Installateur de pompes à chaleur</SelectItem>
    <SelectItem value="installateur-pac-air-air">Installateur PAC air/air</SelectItem>
    <SelectItem value="installateur-pac-air-eau">Installateur PAC air/eau</SelectItem>
    <SelectItem value="installateur-pac-eau-eau">Installateur PAC eau/eau</SelectItem>
    <SelectItem value="installateur-pac-geothermique">Installateur PAC géothermique</SelectItem>
    <SelectItem value="technicien-frigoriste-pac">Technicien frigoriste PAC</SelectItem>
    <SelectItem value="foreur-geothermique">Foreur géothermique</SelectItem>
    <SelectItem value="dimensionneur-pac">Dimensionneur de PAC</SelectItem>
    <SelectItem value="installateur-energies-renouvelables">Installateur en énergies renouvelables</SelectItem>
    <SelectItem value="installateur-chauffage-solaire">Installateur de chauffage solaire</SelectItem>
    <SelectItem value="poseur-capteurs-solaires-thermiques">Poseur de capteurs solaires thermiques</SelectItem>
    <SelectItem value="installateur-ssc">Installateur de système solaire combiné (SSC)</SelectItem>
    <SelectItem value="installateur-cesi">Installateur de chauffe-eau solaire (CESI)</SelectItem>
    <SelectItem value="installateur-poeles-bois">Installateur de poêles à bois</SelectItem>
    <SelectItem value="installateur-poeles-granules">Installateur de poêles à granulés</SelectItem>
    <SelectItem value="installateur-insert-cheminee">Installateur d'insert cheminée</SelectItem>
    <SelectItem value="fumiste">Fumiste</SelectItem>
    <SelectItem value="ramoneur-fumiste">Ramoneur-fumiste</SelectItem>
    <SelectItem value="installateur-chaudieres-biomasse">Installateur de chaudières biomasse</SelectItem>
    <SelectItem value="installateur-plancher-chauffant-hydraulique">Installateur de plancher chauffant hydraulique</SelectItem>
    <SelectItem value="installateur-plancher-chauffant-electrique">Installateur de plancher chauffant électrique</SelectItem>
    <SelectItem value="installateur-plancher-rafraichissant">Installateur de plancher rafraîchissant</SelectItem>
    <SelectItem value="poseur-tubes-multicouches">Poseur de tubes multicouches</SelectItem>
    <SelectItem value="installateur-plafond-rayonnant">Installateur de plafond rayonnant</SelectItem>
    <SelectItem value="poseur-radiateurs">Poseur de radiateurs</SelectItem>
    <SelectItem value="installateur-radiateurs-electriques">Installateur de radiateurs électriques</SelectItem>
    <SelectItem value="installateur-radiateurs-eau">Installateur de radiateurs à eau</SelectItem>
    <SelectItem value="installateur-seche-serviettes">Installateur de sèche-serviettes</SelectItem>
    <SelectItem value="installateur-convecteurs">Installateur de convecteurs</SelectItem>
    <SelectItem value="installateur-panneaux-rayonnants">Installateur de panneaux rayonnants</SelectItem>
    <SelectItem value="technicien-regulation-chauffage">Technicien en régulation chauffage</SelectItem>
    <SelectItem value="installateur-thermostats">Installateur de thermostats</SelectItem>
    <SelectItem value="programmeur-regulation-chauffage">Programmeur de régulation chauffage</SelectItem>
    <SelectItem value="technicien-gtb-chauffage">Technicien GTB chauffage</SelectItem>
    <SelectItem value="installateur-sondes-capteurs">Installateur de sondes et capteurs</SelectItem>
    <SelectItem value="installateur-chauffage-urbain">Installateur de chauffage urbain</SelectItem>
    <SelectItem value="monteur-reseaux-chaleur">Monteur de réseaux de chaleur</SelectItem>
    <SelectItem value="technicien-sous-station">Technicien de sous-station</SelectItem>
    <SelectItem value="calorifugeur-chauffagiste">Calorifugeur chauffagiste</SelectItem>
    <SelectItem value="installateur-ventilation">Installateur en ventilation</SelectItem>
    <SelectItem value="monteur-vmc-simple-flux">Monteur en VMC simple flux</SelectItem>
    <SelectItem value="monteur-vmc-double-flux">Monteur en VMC double flux</SelectItem>
    <SelectItem value="installateur-ventilation-naturelle">Installateur de ventilation naturelle assistée</SelectItem>
    <SelectItem value="installateur-puits-canadien">Installateur de puits canadien/provençal</SelectItem>
    <SelectItem value="aeraulicien">Aéraulicien</SelectItem>
    <SelectItem value="installateur-gaines-ventilation">Installateur de gaines de ventilation</SelectItem>
    <SelectItem value="technicien-genie-climatique">Technicien en génie climatique</SelectItem>
    <SelectItem value="monteur-genie-climatique">Monteur en installations de génie climatique</SelectItem>

    {/* CLIMATISATION & FROID */}
    <SelectSeparator />
    <SelectItem value="header-climatisation" disabled className="font-bold text-primary">
      ❄️ CLIMATISATION & FROID
    </SelectItem>
    <SelectItem value="climaticien">Climaticien</SelectItem>
    <SelectItem value="installateur-climatisation">Installateur de climatisation</SelectItem>
    <SelectItem value="installateur-clim-reversible">Installateur de climatisation réversible</SelectItem>
    <SelectItem value="frigoriste-climaticien">Frigoriste climaticien</SelectItem>
    <SelectItem value="poseur-split">Poseur de split système</SelectItem>
    <SelectItem value="installateur-multi-split">Installateur de multi-split</SelectItem>
    <SelectItem value="installateur-vrv-vrf">Installateur de VRV/VRF</SelectItem>
    <SelectItem value="installateur-clim-gainable">Installateur de climatisation gainable</SelectItem>
    <SelectItem value="installateur-clim-cassette">Installateur de climatisation cassette</SelectItem>
    <SelectItem value="installateur-clim-mobile">Installateur de climatisation mobile</SelectItem>
    <SelectItem value="frigoriste">Frigoriste</SelectItem>
    <SelectItem value="monteur-installations-frigorifiques">Monteur en installations frigorifiques</SelectItem>
    <SelectItem value="frigoriste-chambre-froide">Frigoriste de chambre froide</SelectItem>
    <SelectItem value="installateur-meubles-frigorifiques">Installateur de meubles frigorifiques</SelectItem>
    <SelectItem value="technicien-froid-commercial">Technicien en froid commercial</SelectItem>
    <SelectItem value="technicien-froid-industriel">Technicien en froid industriel</SelectItem>
    <SelectItem value="technicien-conditionnement-air">Technicien en conditionnement d'air</SelectItem>
    <SelectItem value="technicien-maintenance-clim">Technicien de maintenance en climatisation</SelectItem>
    <SelectItem value="technicien-maintenance-froid">Technicien de maintenance frigorifique</SelectItem>
    <SelectItem value="depanneur-froid-clim">Dépanneur en froid et climatisation</SelectItem>
    <SelectItem value="agent-maintenance-cvc">Agent de maintenance CVC</SelectItem>
    <SelectItem value="frigoriste-fluides">Frigoriste manipulation fluides frigorigènes</SelectItem>
    <SelectItem value="technicien-fgaz">Technicien certifié fluides F-Gaz</SelectItem>
    <SelectItem value="recuperateur-fluides">Récupérateur de fluides frigorigènes</SelectItem>

    {/* PLOMBERIE & SANITAIRE */}
    <SelectSeparator />
    <SelectItem value="header-plomberie" disabled className="font-bold text-primary">
      🔧 PLOMBERIE & SANITAIRE
    </SelectItem>
    <SelectItem value="plombier">Plombier</SelectItem>
    <SelectItem value="plombier-chauffagiste">Plombier-chauffagiste</SelectItem>
    <SelectItem value="plombier-sanitaire">Plombier-sanitaire</SelectItem>
    <SelectItem value="installateur-sanitaire">Installateur sanitaire</SelectItem>
    <SelectItem value="monteur-installations-sanitaires">Monteur en installations sanitaires</SelectItem>
    <SelectItem value="plombier-zingueur">Plombier zingueur</SelectItem>
    <SelectItem value="plombier-neuf">Plombier en neuf</SelectItem>
    <SelectItem value="plombier-renovation">Plombier en rénovation</SelectItem>
    <SelectItem value="plombier-entretien">Plombier d'entretien</SelectItem>
    <SelectItem value="installateur-chauffe-eau">Installateur de chauffe-eau</SelectItem>
    <SelectItem value="installateur-chauffe-eau-electrique">Installateur de chauffe-eau électrique</SelectItem>
    <SelectItem value="installateur-chauffe-eau-thermodynamique">Installateur de chauffe-eau thermodynamique</SelectItem>
    <SelectItem value="installateur-chauffe-eau-gaz">Installateur de chauffe-eau gaz</SelectItem>
    <SelectItem value="installateur-ballon-eau-chaude">Installateur de ballon d'eau chaude</SelectItem>
    <SelectItem value="installateur-preparateurs-ecs">Installateur de préparateurs ECS</SelectItem>
    <SelectItem value="installateur-production-ecs">Installateur de production ECS collective</SelectItem>
    <SelectItem value="installateur-salles-bain">Installateur de salles de bain</SelectItem>
    <SelectItem value="poseur-baignoires">Poseur de baignoires</SelectItem>
    <SelectItem value="poseur-douches">Poseur de douches</SelectItem>
    <SelectItem value="installateur-wc">Installateur de WC</SelectItem>
    <SelectItem value="poseur-lavabos-vasques">Poseur de lavabos et vasques</SelectItem>
    <SelectItem value="installateur-equipements-pmr">Installateur d'équipements PMR</SelectItem>
    <SelectItem value="cuisiniste-plombier">Cuisiniste-plombier</SelectItem>
    <SelectItem value="zingueur">Zingueur</SelectItem>
    <SelectItem value="couvreur-zingueur">Couvreur-zingueur</SelectItem>
    <SelectItem value="installateur-gouttieres">Installateur de gouttières</SelectItem>
    <SelectItem value="poseur-cheneaux">Poseur de chéneaux</SelectItem>
    <SelectItem value="faconnier-zinc">Façonnier en zinc</SelectItem>
    <SelectItem value="metallier-zingueur">Métallier-zingueur</SelectItem>
    <SelectItem value="canalisateur">Canalisateur</SelectItem>
    <SelectItem value="poseur-canalisations">Poseur de canalisations</SelectItem>
    <SelectItem value="soudeur-plomberie">Soudeur en plomberie</SelectItem>
    <SelectItem value="braseur-plomberie">Braseur en plomberie</SelectItem>
    <SelectItem value="sertisseur-tubes">Sertisseur de tubes</SelectItem>
    <SelectItem value="installateur-multicouche">Installateur de tuyauterie multicouche</SelectItem>
    <SelectItem value="installateur-per">Installateur PER (polyéthylène réticulé)</SelectItem>
    <SelectItem value="installateur-adoucisseurs">Installateur d'adoucisseurs d'eau</SelectItem>
    <SelectItem value="installateur-filtres-eau">Installateur de filtres à eau</SelectItem>
    <SelectItem value="installateur-osmoseurs">Installateur d'osmoseurs</SelectItem>
    <SelectItem value="technicien-traitement-eau">Technicien en traitement d'eau</SelectItem>
    <SelectItem value="fontainier">Fontainier</SelectItem>
    <SelectItem value="installateur-assainissement">Installateur en assainissement</SelectItem>
    <SelectItem value="poseur-fosses-septiques">Poseur de fosses septiques</SelectItem>
    <SelectItem value="installateur-micro-stations">Installateur de micro-stations d'épuration</SelectItem>
    <SelectItem value="installateur-assainissement-non-collectif">Installateur de systèmes d'assainissement non collectif</SelectItem>
    <SelectItem value="vidangeur">Vidangeur</SelectItem>

    {/* PHOTOVOLTAÏQUE & SOLAIRE */}
    <SelectSeparator />
    <SelectItem value="header-photovoltaique" disabled className="font-bold text-secondary">
      ☀️ PHOTOVOLTAÏQUE & SOLAIRE
    </SelectItem>
    <SelectItem value="installateur-photovoltaique">Installateur photovoltaïque</SelectItem>
    <SelectItem value="poseur-panneaux-solaires">Poseur de panneaux solaires</SelectItem>
    <SelectItem value="installateur-pv-toiture">Installateur PV en toiture</SelectItem>
    <SelectItem value="installateur-pv-sol">Installateur PV au sol</SelectItem>
    <SelectItem value="installateur-centrales-solaires">Installateur de centrales solaires</SelectItem>
    <SelectItem value="monteur-electricien-pv">Monteur-électricien photovoltaïque</SelectItem>
    <SelectItem value="couvreur-solaire">Couvreur solaire</SelectItem>
    <SelectItem value="etancheur-solaire">Étancheur solaire</SelectItem>
    <SelectItem value="charpentier-solaire">Charpentier solaire</SelectItem>
    <SelectItem value="installateur-pv-residentiel">Installateur PV résidentiel</SelectItem>
    <SelectItem value="installateur-pv-tertiaire">Installateur PV tertiaire</SelectItem>
    <SelectItem value="installateur-pv-industriel">Installateur PV industriel</SelectItem>
    <SelectItem value="installateur-pv-agricole">Installateur PV agricole (hangar, serre)</SelectItem>
    <SelectItem value="installateur-ombrieres-pv">Installateur d'ombrières photovoltaïques</SelectItem>
    <SelectItem value="installateur-pergolas-solaires">Installateur de pergolas solaires</SelectItem>
    <SelectItem value="installateur-carports-solaires">Installateur de carports solaires</SelectItem>
    <SelectItem value="installateur-facades-solaires">Installateur de façades solaires (BIPV)</SelectItem>
    <SelectItem value="electricien-photovoltaique">Électricien photovoltaïque</SelectItem>
    <SelectItem value="cableur-photovoltaique">Câbleur photovoltaïque</SelectItem>
    <SelectItem value="raccordeur-photovoltaique">Raccordeur photovoltaïque</SelectItem>
    <SelectItem value="installateur-onduleurs">Installateur d'onduleurs</SelectItem>
    <SelectItem value="installateur-micro-onduleurs">Installateur de micro-onduleurs</SelectItem>
    <SelectItem value="installateur-optimiseurs">Installateur d'optimiseurs</SelectItem>
    <SelectItem value="installateur-coffrets-dcac">Installateur de coffrets DC/AC</SelectItem>
    <SelectItem value="installateur-batteries-stockage">Installateur de batteries de stockage</SelectItem>
    <SelectItem value="installateur-systemes-hybrides">Installateur de systèmes hybrides PV+batterie</SelectItem>
    <SelectItem value="technicien-stockage-energie">Technicien en stockage d'énergie résidentiel</SelectItem>
    <SelectItem value="installateur-autoconsommation">Installateur de systèmes en autoconsommation</SelectItem>
    <SelectItem value="installateur-monitoring-pv">Installateur de systèmes de monitoring</SelectItem>
    <SelectItem value="technicien-supervision-pv">Technicien de supervision photovoltaïque</SelectItem>
    <SelectItem value="installateur-gestion-energie">Installateur de systèmes de gestion d'énergie</SelectItem>
    <SelectItem value="technicien-maintenance-pv">Technicien de maintenance photovoltaïque</SelectItem>
    <SelectItem value="agent-maintenance-centrales">Agent de maintenance de centrales solaires</SelectItem>
    <SelectItem value="nettoyeur-panneaux">Nettoyeur de panneaux solaires</SelectItem>
    <SelectItem value="inspecteur-thermographique-pv">Inspecteur thermographique PV</SelectItem>
    <SelectItem value="be-photovoltaique">Bureau d'études photovoltaïque</SelectItem>
    <SelectItem value="dimensionneur-pv">Dimensionneur de systèmes PV</SelectItem>
    <SelectItem value="charge-affaires-pv">Chargé d'affaires photovoltaïque</SelectItem>
    <SelectItem value="ingenieur-photovoltaique">Ingénieur photovoltaïque</SelectItem>
    <SelectItem value="dessinateur-projeteur-pv">Dessinateur-projeteur PV</SelectItem>
    <SelectItem value="auditeur-energetique-solaire">Auditeur énergétique solaire</SelectItem>
    <SelectItem value="installateur-solaire-thermique">Installateur solaire thermique</SelectItem>
    <SelectItem value="plombier-solaire-thermique">Plombier solaire thermique</SelectItem>

    {/* ISOLATION */}
    <SelectSeparator />
    <SelectItem value="header-isolation" disabled className="font-bold text-primary">
      🏠 ISOLATION
    </SelectItem>
    <SelectItem value="isolateur">Isolateur</SelectItem>
    <SelectItem value="poseur-isolation-interieure">Poseur d'isolation intérieure</SelectItem>
    <SelectItem value="installateur-isolation-combles">Installateur d'isolation des combles</SelectItem>
    <SelectItem value="poseur-laine-verre">Poseur de laine de verre</SelectItem>
    <SelectItem value="poseur-laine-roche">Poseur de laine de roche</SelectItem>
    <SelectItem value="poseur-laine-bois">Poseur de laine de bois</SelectItem>
    <SelectItem value="poseur-ouate-cellulose">Poseur d'ouate de cellulose</SelectItem>
    <SelectItem value="souffleur-isolant">Souffleur d'isolant</SelectItem>
    <SelectItem value="insuffleur-isolant">Insuffleur d'isolant</SelectItem>
    <SelectItem value="poseur-panneaux-isolants">Poseur de panneaux isolants rigides</SelectItem>
    <SelectItem value="poseur-plaques-platre-isolantes">Poseur de plaques de plâtre isolantes</SelectItem>
    <SelectItem value="facadier-isolateur">Façadier-isolateur</SelectItem>
    <SelectItem value="poseur-ite">Poseur d'ITE</SelectItem>
    <SelectItem value="applicateur-enduits-isolants">Applicateur d'enduits isolants</SelectItem>
    <SelectItem value="poseur-bardages-isolants">Poseur de bardages isolants</SelectItem>
    <SelectItem value="poseur-vêture">Poseur de vêture</SelectItem>
    <SelectItem value="poseur-panneaux-sandwich">Poseur de panneaux sandwich</SelectItem>
    <SelectItem value="installateur-ite-enduit">Installateur de systèmes d'ITE sous enduit</SelectItem>
    <SelectItem value="installateur-ite-bardage">Installateur de systèmes d'ITE sous bardage</SelectItem>
    <SelectItem value="couvreur-isolateur">Couvreur-isolateur</SelectItem>
    <SelectItem value="sarking-specialiste">Sarking spécialiste</SelectItem>
    <SelectItem value="poseur-ecran-sous-toiture">Poseur d'écran sous-toiture</SelectItem>
    <SelectItem value="isolateur-combles-perdus">Isolateur de combles perdus</SelectItem>
    <SelectItem value="isolateur-combles-amenages">Isolateur de combles aménagés</SelectItem>
    <SelectItem value="poseur-pare-vapeur-toiture">Poseur de pare-vapeur toiture</SelectItem>
    <SelectItem value="poseur-isolation-murs-interieur">Poseur d'isolation des murs par l'intérieur</SelectItem>
    <SelectItem value="poseur-doublages-isolants">Poseur de doublages isolants</SelectItem>
    <SelectItem value="poseur-contre-cloisons">Poseur de contre-cloisons isolantes</SelectItem>
    <SelectItem value="installateur-isolation-ossature-metal">Installateur d'isolation en ossature métallique</SelectItem>
    <SelectItem value="installateur-isolation-ossature-bois">Installateur d'isolation en ossature bois</SelectItem>
    <SelectItem value="poseur-isolation-plancher-bas">Poseur d'isolation de plancher bas</SelectItem>
    <SelectItem value="poseur-isolation-plancher-intermediaire">Poseur d'isolation de plancher intermédiaire</SelectItem>
    <SelectItem value="poseur-isolation-phonique-plancher">Poseur d'isolation phonique plancher</SelectItem>
    <SelectItem value="poseur-chapes-isolantes">Poseur de chapes isolantes</SelectItem>
    <SelectItem value="poseur-dalles-flottantes">Poseur de dalles flottantes</SelectItem>
    <SelectItem value="isolateur-phonique">Isolateur phonique</SelectItem>
    <SelectItem value="poseur-isolation-acoustique">Poseur d'isolation acoustique</SelectItem>
    <SelectItem value="installateur-faux-plafonds-acoustiques">Installateur de faux plafonds acoustiques</SelectItem>
    <SelectItem value="poseur-panneaux-absorbants">Poseur de panneaux absorbants</SelectItem>
    <SelectItem value="installateur-ecrans-acoustiques">Installateur d'écrans acoustiques</SelectItem>
    <SelectItem value="poseur-chanvre">Poseur de chanvre</SelectItem>
    <SelectItem value="poseur-lin">Poseur de lin</SelectItem>
    <SelectItem value="poseur-liege">Poseur de liège</SelectItem>
    <SelectItem value="poseur-fibre-bois">Poseur de fibre de bois</SelectItem>
    <SelectItem value="poseur-laine-mouton">Poseur de laine de mouton</SelectItem>
    <SelectItem value="poseur-paille">Poseur de paille</SelectItem>
    <SelectItem value="poseur-textiles-recycles">Poseur de textiles recyclés</SelectItem>
    <SelectItem value="poseur-polystyrene-expanse">Poseur de polystyrène expansé (PSE)</SelectItem>
    <SelectItem value="poseur-polystyrene-extrude">Poseur de polystyrène extrudé (XPS)</SelectItem>
    <SelectItem value="poseur-polyurethane">Poseur de polyuréthane (PUR/PIR)</SelectItem>
    <SelectItem value="poseur-mousse-resolique">Poseur de mousse résolique</SelectItem>
    <SelectItem value="technicien-etancheite-air">Technicien en étanchéité à l'air</SelectItem>
    <SelectItem value="poseur-membranes-etancheite">Poseur de membranes d'étanchéité</SelectItem>
    <SelectItem value="poseur-pare-vapeur">Poseur de pare-vapeur</SelectItem>
    <SelectItem value="poseur-frein-vapeur">Poseur de frein-vapeur</SelectItem>
    <SelectItem value="applicateur-joints-etancheite">Applicateur de joints d'étanchéité</SelectItem>
    <SelectItem value="technicien-test-infiltrometrie">Technicien test d'infiltrométrie</SelectItem>
    <SelectItem value="calorifugeur">Calorifugeur</SelectItem>
    <SelectItem value="calorifugeur-industriel">Calorifugeur industriel</SelectItem>
    <SelectItem value="calorifugeur-tuyauteries">Calorifugeur de tuyauteries</SelectItem>
    <SelectItem value="calorifugeur-reseaux">Calorifugeur de réseaux</SelectItem>
    <SelectItem value="poseur-manchons-isolants">Poseur de manchons isolants</SelectItem>
    <SelectItem value="poseur-fenetres-isolantes">Poseur de fenêtres isolantes</SelectItem>
    <SelectItem value="installateur-double-vitrage">Installateur de double vitrage</SelectItem>
    <SelectItem value="installateur-triple-vitrage">Installateur de triple vitrage</SelectItem>
    <SelectItem value="poseur-vitrages-ir">Poseur de vitrages à isolation renforcée</SelectItem>
    <SelectItem value="installateur-volets-isolants">Installateur de volets isolants</SelectItem>

    {/* PISCINES */}
    <SelectSeparator />
    <SelectItem value="header-piscines" disabled className="font-bold text-primary">
      🏊 PISCINES
    </SelectItem>
    <SelectItem value="pisciniste">Pisciniste</SelectItem>
    <SelectItem value="constructeur-piscines">Constructeur de piscines</SelectItem>
    <SelectItem value="macon-pisciniste">Maçon pisciniste</SelectItem>
    <SelectItem value="coffreur-piscines">Coffreur de piscines</SelectItem>
    <SelectItem value="ferrailleur-piscines">Ferrailleur piscines</SelectItem>
    <SelectItem value="constructeur-piscines-beton">Constructeur de piscines béton</SelectItem>
    <SelectItem value="constructeur-piscines-coque">Constructeur de piscines coque</SelectItem>
    <SelectItem value="constructeur-piscines-liner">Constructeur de piscines liner</SelectItem>
    <SelectItem value="poseur-piscines-hors-sol">Poseur de piscines hors-sol</SelectItem>
    <SelectItem value="installateur-piscines-enterrees">Installateur de piscines enterrées</SelectItem>
    <SelectItem value="constructeur-piscines-naturelles">Constructeur de piscines naturelles</SelectItem>
    <SelectItem value="constructeur-bassins-baignade-eco">Constructeur de bassins de baignade écologique</SelectItem>
    <SelectItem value="constructeur-spa">Constructeur de spa</SelectItem>
    <SelectItem value="installateur-spa-encastre">Installateur de spa encastré</SelectItem>
    <SelectItem value="installateur-spa-semi-enterre">Installateur de spa semi-enterré</SelectItem>
    <SelectItem value="installateur-jacuzzi-exterieur">Installateur de jacuzzi extérieur</SelectItem>
    <SelectItem value="constructeur-piscines-interieures">Constructeur de piscines intérieures</SelectItem>
    <SelectItem value="constructeur-couloirs-nage">Constructeur de couloirs de nage</SelectItem>
    <SelectItem value="constructeur-bassins-miroir">Constructeur de bassins miroir</SelectItem>
    <SelectItem value="constructeur-piscines-debordement">Constructeur de piscines à débordement</SelectItem>
    <SelectItem value="constructeur-piscines-biologiques">Constructeur de piscines biologiques</SelectItem>
    <SelectItem value="poseur-liner-piscine">Poseur de liner piscine</SelectItem>
    <SelectItem value="poseur-membrane-armee">Poseur de membrane armée</SelectItem>
    <SelectItem value="carreleur-piscine">Carreleur piscine</SelectItem>
    <SelectItem value="mosaiste-piscine">Mosaïste piscine</SelectItem>
    <SelectItem value="applicateur-enduit-piscine">Applicateur d'enduit piscine</SelectItem>
    <SelectItem value="poseur-pvc-arme">Poseur de PVC armé</SelectItem>
    <SelectItem value="applicateur-resine-polyester">Applicateur de résine polyester</SelectItem>
    <SelectItem value="installateur-filtration-piscine">Installateur de filtration piscine</SelectItem>
    <SelectItem value="monteur-locaux-techniques">Monteur de locaux techniques</SelectItem>
    <SelectItem value="installateur-pompes-piscine">Installateur de pompes de piscine</SelectItem>
    <SelectItem value="installateur-filtres-sable">Installateur de filtres à sable</SelectItem>
    <SelectItem value="installateur-filtres-diatomees">Installateur de filtres à diatomées</SelectItem>
    <SelectItem value="installateur-filtres-cartouche">Installateur de filtres à cartouche</SelectItem>
    <SelectItem value="installateur-electrolyseurs-sel">Installateur d'électrolyseurs au sel</SelectItem>
    <SelectItem value="installateur-traitement-auto">Installateur de traitement automatique</SelectItem>
    <SelectItem value="installateur-uv-piscine">Installateur d'UV piscine</SelectItem>
    <SelectItem value="installateur-chauffage-piscine">Installateur de chauffage piscine</SelectItem>
    <SelectItem value="installateur-pac-piscine">Installateur de pompe à chaleur piscine</SelectItem>
    <SelectItem value="installateur-rechauffeur-electrique">Installateur de réchauffeur électrique</SelectItem>
    <SelectItem value="installateur-echangeur-thermique">Installateur d'échangeur thermique piscine</SelectItem>
    <SelectItem value="installateur-chauffage-solaire-piscine">Installateur de chauffage solaire piscine</SelectItem>
    <SelectItem value="installateur-panneaux-solaires-piscine">Installateur de panneaux solaires piscine</SelectItem>
    <SelectItem value="installateur-couverture-isotherme">Installateur de couverture isotherme</SelectItem>
    <SelectItem value="installateur-couvertures-piscine">Installateur de couvertures de piscine</SelectItem>
    <SelectItem value="poseur-volets-roulants-piscine">Poseur de volets roulants piscine</SelectItem>
    <SelectItem value="installateur-abris-bas">Installateur d'abris de piscine bas</SelectItem>
    <SelectItem value="installateur-abris-hauts">Installateur d'abris de piscine hauts</SelectItem>
    <SelectItem value="installateur-abris-telescopiques">Installateur d'abris télescopiques</SelectItem>
    <SelectItem value="poseur-baches-barres">Poseur de bâches à barres</SelectItem>
    <SelectItem value="installateur-volets-immerges">Installateur de volets immergés</SelectItem>
    <SelectItem value="installateur-eclairage-piscine">Installateur d'éclairage piscine</SelectItem>
    <SelectItem value="installateur-led-piscine">Installateur de LED piscine</SelectItem>
    <SelectItem value="installateur-projecteurs-immerges">Installateur de projecteurs immergés</SelectItem>
    <SelectItem value="installateur-domotique-piscine">Installateur de domotique piscine</SelectItem>
    <SelectItem value="programmeur-systemes-piscine">Programmeur de systèmes piscine automatisés</SelectItem>
    <SelectItem value="constructeur-plages-piscine">Constructeur de plages de piscine</SelectItem>
    <SelectItem value="poseur-margelles">Poseur de margelles</SelectItem>
    <SelectItem value="constructeur-terrasses-piscine">Constructeur de terrasses piscine</SelectItem>
    <SelectItem value="poseur-dalles-piscine">Poseur de dalles piscine</SelectItem>
    <SelectItem value="constructeur-plages-bois">Constructeur de plages en bois</SelectItem>
    <SelectItem value="poseur-carrelage-exterieur-piscine">Poseur de carrelage extérieur piscine</SelectItem>
    <SelectItem value="poseur-beton-desactive">Poseur de béton désactivé</SelectItem>
    <SelectItem value="constructeur-pool-house">Constructeur de pool house</SelectItem>
    <SelectItem value="installateur-echelles-piscine">Installateur d'échelles de piscine</SelectItem>
    <SelectItem value="installateur-plongeoirs">Installateur de plongeoirs</SelectItem>
    <SelectItem value="installateur-toboggans">Installateur de toboggans</SelectItem>
    <SelectItem value="installateur-nage-contre-courant">Installateur de nage à contre-courant</SelectItem>
    <SelectItem value="installateur-buses-massage">Installateur de buses de massage</SelectItem>
    <SelectItem value="installateur-cascades">Installateur de cascades</SelectItem>
    <SelectItem value="installateur-fontaines">Installateur de fontaines</SelectItem>
    <SelectItem value="installateur-jeux-eau">Installateur de jeux d'eau</SelectItem>
    <SelectItem value="technicien-maintenance-piscine">Technicien de maintenance piscine</SelectItem>
    <SelectItem value="piscinier-sav">Piscinier SAV</SelectItem>
    <SelectItem value="renovateur-piscines">Rénovateur de piscines</SelectItem>
    <SelectItem value="reparateur-liner">Réparateur de liner</SelectItem>
    <SelectItem value="technicien-depannage-piscine">Technicien en dépannage piscine</SelectItem>
    <SelectItem value="agent-entretien-piscine">Agent d'entretien de piscine</SelectItem>
    <SelectItem value="installateur-bassins-olympiques">Installateur de bassins olympiques</SelectItem>
    <SelectItem value="constructeur-piscines-municipales">Constructeur de piscines municipales</SelectItem>
    <SelectItem value="installateur-pataugeoires">Installateur de pataugeoires</SelectItem>
    <SelectItem value="constructeur-centres-aquatiques">Constructeur de centres aquatiques</SelectItem>
    <SelectItem value="installateur-toboggans-aquatiques">Installateur de toboggans aquatiques</SelectItem>
    <SelectItem value="constructeur-piscines-therapeutiques">Constructeur de piscines thérapeutiques</SelectItem>

    {/* ÉNERGIES RENOUVELABLES COMPLÉMENTAIRES */}
    <SelectSeparator />
    <SelectItem value="header-enr-complementaires" disabled className="font-bold text-secondary">
      🌱 ÉNERGIES RENOUVELABLES COMPLÉMENTAIRES
    </SelectItem>
    <SelectItem value="installateur-eoliennes-domestiques">Installateur d'éoliennes domestiques</SelectItem>
    <SelectItem value="monteur-eoliennes-collectif">Monteur d'éoliennes petit collectif</SelectItem>
    <SelectItem value="technicien-eolien-batiment">Technicien éolien bâtiment</SelectItem>
    <SelectItem value="installateur-eoliennes-verticales">Installateur d'éoliennes verticales</SelectItem>
    <SelectItem value="installateur-chaudieres-bois-dechiquete">Installateur de chaudières à bois déchiqueté</SelectItem>
    <SelectItem value="installateur-silos-granules">Installateur de silos à granulés</SelectItem>
    <SelectItem value="installateur-systemes-biomasse">Installateur de systèmes biomasse collectifs</SelectItem>
    <SelectItem value="ramoneur-professionnel-certifie">Ramoneur professionnel certifié</SelectItem>
    <SelectItem value="installateur-sondes-geothermiques">Installateur de sondes géothermiques</SelectItem>
    <SelectItem value="installateur-capteurs-horizontaux">Installateur de capteurs horizontaux</SelectItem>
    <SelectItem value="installateur-capteurs-verticaux">Installateur de capteurs verticaux</SelectItem>
    <SelectItem value="technicien-geothermie-tbe">Technicien en géothermie très basse énergie</SelectItem>
    <SelectItem value="installateur-cuves-recuperation">Installateur de cuves de récupération d'eau</SelectItem>
    <SelectItem value="installateur-systemes-eau-pluie">Installateur de systèmes de récupération eau de pluie</SelectItem>
    <SelectItem value="poseur-citernes-enterrees">Poseur de citernes enterrées</SelectItem>
    <SelectItem value="installateur-systemes-multi-energies">Installateur de systèmes multi-énergies</SelectItem>
    <SelectItem value="technicien-gestion-energie-renouvelable">Technicien en gestion d'énergie renouvelable</SelectItem>

    {/* DIAGNOSTIC ET PERFORMANCE ÉNERGÉTIQUE */}
    <SelectSeparator />
    <SelectItem value="header-diagnostic" disabled className="font-bold text-primary">
      📊 DIAGNOSTIC & PERFORMANCE ÉNERGÉTIQUE
    </SelectItem>
    <SelectItem value="diagnostiqueur-immobilier">Diagnostiqueur immobilier</SelectItem>
    <SelectItem value="diagnostiqueur-dpe">Diagnostiqueur performance énergétique (DPE)</SelectItem>
    <SelectItem value="auditeur-energetique">Auditeur énergétique</SelectItem>
    <SelectItem value="thermicien-batiment">Thermicien du bâtiment</SelectItem>
    <SelectItem value="conseiller-economie-energie">Conseiller en économie d'énergie</SelectItem>
    <SelectItem value="technicien-bbc">Technicien BBC (Bâtiment Basse Consommation)</SelectItem>
    <SelectItem value="technicien-maison-passive">Technicien maison passive</SelectItem>
    <SelectItem value="expert-renovation-energetique">Expert en rénovation énergétique</SelectItem>
    <SelectItem value="accompagnateur-renov">Accompagnateur Rénov'</SelectItem>
    <SelectItem value="thermographe-batiment">Thermographe bâtiment</SelectItem>
    <SelectItem value="testeur-infiltrometrie">Testeur d'infiltrométrie</SelectItem>
    <SelectItem value="mesureur-permeabilite-air">Mesureur de perméabilité à l'air</SelectItem>

    {/* ÉTUDES ET CONCEPTION TECHNIQUES */}
    <SelectSeparator />
    <SelectItem value="header-etudes" disabled className="font-bold text-secondary">
      📐 ÉTUDES & CONCEPTION TECHNIQUES
    </SelectItem>
    <SelectItem value="ingenieur-cvc">Ingénieur CVC</SelectItem>
    <SelectItem value="ingenieur-fluides">Ingénieur fluides</SelectItem>
    <SelectItem value="ingenieur-thermique">Ingénieur thermique</SelectItem>
    <SelectItem value="ingenieur-electricite-batiment">Ingénieur électricité bâtiment</SelectItem>
    <SelectItem value="ingenieur-energies-renouvelables">Ingénieur énergies renouvelables</SelectItem>
    <SelectItem value="bet-fluides">Bureau d'études techniques (BET) fluides</SelectItem>
    <SelectItem value="bet-electricite">Bureau d'études électricité</SelectItem>
    <SelectItem value="economiste-installations-techniques">Économiste en installation techniques</SelectItem>
    <SelectItem value="metreur-tce">Métreur TCE (Tous Corps d'État)</SelectItem>
    <SelectItem value="charge-affaires-cvc">Chargé d'affaires CVC</SelectItem>
    <SelectItem value="charge-affaires-electricite">Chargé d'affaires électricité</SelectItem>
    <SelectItem value="chef-projet-enr">Chef de projet énergies renouvelables</SelectItem>
  </>
);
