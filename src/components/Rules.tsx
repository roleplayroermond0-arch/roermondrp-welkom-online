import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Gavel } from "lucide-react";
import { Header } from "@/components/Header";
import { AuthProvider, useAuth } from "@/hooks/useAuth";
import { useState } from "react";


const RulesPage = () => {
  const [activeTab, setActiveTab] = useState('rules');
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    setActiveTab('home');
  };
  // Eerst de algemene regels
  const ruleArticles = [
  
    {
      title: "Artikel 1.1 – VDM (Vehicle Deathmatch)",
      description:
        "Het is verboden andere spelers opzettelijk aan te rijden of te hinderen met een voertuig, tenzij dit een geloofwaardig roleplayscenario betreft.",
      sanctions: [
        "1e keer: waarschuwing",
        "2e keer: 1 dag ban",
        "3e keer: 3 dagen ban",
        "4e keer: 9 dagen ban",
        "5e keer: permanente ban (unban-ticket na 1 maand)",
      ],
    },
    {
      title: "Artikel 1.2 – RDM (Random Deathmatch)",
      description:
        "Het is verboden om een speler te doden zonder betrokkenheid in het spelverloop. Een huurmoord of bounty valt hier ook onder.",
      sanctions: [
        "1e keer: waarschuwing",
        "2e keer: 1 dag ban",
        "3e keer: 3 dagen ban (wapen wordt ingenomen)",
        "4e keer: 9 dagen ban",
        "5e keer: permanente ban (unban-ticket na 1 maand)",
      ],
    },
    {
      title: "Artikel 1.3 – Massa VDM/RDM",
      description:
        "Indien drie of meer personen betrokken zijn bij VDM of RDM, wordt dit als zeer ernstig beschouwd.",
      sanctions: [
        "1e keer: 3 dagen ban",
        "2e keer: 1 week ban (wapen wordt ingenomen)",
        "3e keer: 2 weken ban",
        "4e keer: permanente verbanning (unban-ticket na 1 maand)",
      ],
    },
    {
      title: "Artikel 2 – Fail RP en/of Powergaming",
      description:
        "Handelingen die onrealistisch of dwingend zijn vallen onder Fail RP en Powergaming. Voorbeelden: gelijktijdig rijden en iemand vastbinden, meerdere gijzelaars nemen, emote abuse, carry abuse, parachutes gebruiken tijdens vlucht, vervoersmiddelen wisselen in een achtervolging, high ground campen zonder toegang, of weglopen met handen omhoog midden in een scenario.",
      sanctions: [
        "1e keer: waarschuwing",
        "2e keer: 1 dag ban",
        "3e keer: 3 dagen ban",
        "4e keer: 1 week ban",
        "5e keer: 2 weken ban",
        "6e keer: permanente verbanning (unban-ticket na 1 maand)",
      ],
    },
    {
      title: "Artikel 3 – Copbaiten",
      description:
        "Het moedwillig uitlokken van politie of burgers is verboden. Herhaaldelijk langsrijden of onnodig contact zoeken met als doel reactie uit te lokken valt hieronder.",
      sanctions: [
        "1e keer: waarschuwing",
        "2e keer: 12 uur ban",
        "3e keer: 1 dag ban",
        "4e keer: 1 week ban",
        "5e keer: permanente verbanning (unban-ticket na 1 maand)",
      ],
    },
    {
      title: "Artikel 4 – No Value Of Life (NVOL)",
      description:
        "Spelers dienen waarde aan hun leven te hechten. Handelingen zoals een wapen trekken terwijl iemand een wapen op je richt, schieten op mensen die anderen onder schot houden, met voertuig het water inrijden of porto gebruiken onder schot vallen hieronder.",
      sanctions: [
        "1e keer: 3 uur ban",
        "2e keer: 1 dag ban",
        "3e keer: 3 dagen ban",
        "4e keer: 1 week ban",
        "5e keer: permanente verbanning (unban-ticket na 1 maand)",
      ],
    },
    {
      title: "Artikel 5 – New Life Rule (NLR)",
      description:
        "Na overlijden dient men het vorige leven te vergeten. Het is verboden terug te keren naar een scenario na doodverklaring. Wordt men door ambu/politie/kmar geholpen, dan geldt geen NLR. Artikel 5 is ook van kracht wanneer een stafflid een NLR oplegt.",
      sanctions: [
        "1e keer: waarschuwing",
        "2e keer: 12 uur ban",
        "3e keer: 1 dag ban",
        "4e keer: 1 week ban",
        "5e keer: permanente verbanning (unban-ticket na 1 maand)",
      ],
    },
    {
      title: "Artikel 6 – Offroad/GTA rijstijl",
      description:
        "Spelers dienen realistisch te rijden. Geen sprongen van bergen of met hoge snelheid door de stad. Offroad alleen met geschikte voertuigen of wanneer duidelijk zichtbaar als zandpad.",
      sanctions: [
        "1e keer: waarschuwing",
        "2e keer: 8 uur ban",
        "3e keer: 1 dag ban",
        "4e keer: 1 week ban",
      ],
    },
    {
      title: "Artikel 7 – OOC Praten / Karakter breken",
      description:
        "Het is verboden om out-of-character te praten tijdens roleplay. Uitzondering: officiële content creators mogen melding maken van opname of stream.",
      sanctions: [
        "1e keer: waarschuwing",
        "2e keer: 50 taken",
        "3e keer: 3 uur ban",
        "4e keer: 8 uur ban",
        "5e keer: 3 dagen ban",
      ],
    },
    {
      title: "Artikel 8 – Scenario’s verstoren",
      description:
        "Het verstoren van roleplayscenario’s van andere burgers of overheidsinstanties is verboden. Bij zichtbare politie-inzet bij een gijzeling of overval mag je niet meer aansluiten.",
      sanctions: [
        "1e keer: 3 uur ban (eventueel waarschuwing)",
        "2e keer: 12 uur ban",
        "3e keer: 1 dag ban",
        "4e keer: 1 week ban",
        "5e keer: permanente verbanning (unban-ticket na 1 maand)",
      ],
    },
    {
      title: "Artikel 9 – Gangterrein",
      description:
        "Het kloten bij een level 1+ gangterrein is niet toegestaan. Zij mogen dodelijk geweld gebruiken en staffzaak starten.",
      sanctions: [
        "1e keer: waarschuwing",
        "2e keer: 1 dag ban",
        "3e keer: 1 week ban",
        "4e keer: 1 maand ban",
        "5e keer: permanente verbanning (unban-ticket na 1 maand)",
      ],
    },
    {
      title: "Artikel 10 – Nederlandse Taal",
      description:
        "Spelers dienen de Nederlandse taal of vloeiend Engels te beheersen.",
      sanctions: ["1e keer: waarschuwing", "2e keer: 1 week ban"],
    },
    {
      title: "Artikel 10.1 – Schelden / Spammen",
      description:
        "Het overmatig gebruik van scheldwoorden en/of het herhaaldelijk verzenden van berichten (spammen) is verboden. Het gericht schelden met hedendaagse ziektes is onder geen enkele omstandigheid toegestaan. Gebruik van ziektegerelateerde termen is op eigen risico, maar bij streamers altijd strafbaar.",
      sanctions: [
        "1e keer: waarschuwing",
        "2e keer: 12 uur ban",
        "3e keer: 1 dag ban",
        "4e keer: 1 week ban",
        "5e keer: permanente verbanning (unban-ticket na 1 maand)",
      ],
    },
  
    {
  title: "Artikel 10.2 – Disrespect naar staffleden",
  description:
    "Respecteer staffleden altijd. Het verstoren van een staffzaak is niet toegestaan.",
  sanctions: [
    "1e keer: 12 uur ban",
    "2e keer: 1 dag ban",
    "3e keer: 1 week ban",
    "4e keer: permanente verbanning (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 11 – Nep Impersonatie",
  description:
    "Het is verboden om je voor te doen als overheid, staff of officiële gang. Ook porto-imitatie valt hieronder.",
  sanctions: [
    "1e keer: 3 uur ban",
    "2e keer: 8 uur ban",
    "3e keer: 1 dag ban",
    "4e keer: 1 week ban",
    "5e keer: permanente verbanning (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 12 – Reports/Staffzaken",
  description:
    "Rapporteer op serieuze wijze. Onzinmeldingen of respectloos gedrag in staffzaken is verboden. Het verlaten zonder toestemming van een actieve staffzaak is verboden.",
  sanctions: [
    "1e keer: waarschuwing (evt. 3 uur ban)",
    "2e keer: 12 uur ban",
    "3e keer: 3 dagen ban",
    "4e keer: 2 weken ban",
    "5e keer: permanente verbanning (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 13 – Scammen / Oplichten",
  description:
    "Scammen is toegestaan tot €75.000. Voor wapens/attachments alleen bij officiële gangleden, mits in bezit en dit bij zich draagt. Voor het scammen van wapens/attachments bij officiële gangleden is geen maximum bedrag vastgesteld.",
  sanctions: [
    "1e keer: 1 dag ban",
    "2e keer: 1 week ban",
    "3e keer: 2 weken ban",
    "4e keer: permanente verbanning (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 14.1 – Voertuigen tijdens scenario",
  description:
    "Het is verboden een nieuw voertuig te pakken uit het garage menu tijdens een scenario. Alleen vooraf klaarzetten is toegestaan.",
  sanctions: [
    "1e keer: waarschuwing",
    "2e keer: 12 uur ban",
    "3e keer: 3 dagen ban",
    "4e keer: 1 week ban",
    "5e keer: permanente verbanning (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 14.2 – Landen van helikopters/vliegtuigen",
  description:
    "Landen dient te gebeuren op helipads, landingsbanen of veilige plaatsen met afstand tot burgers. Het landen op een straat is nooit toegestaan.",
  sanctions: [
    "1e keer: waarschuwing",
    "2e keer: 3 uur ban",
    "3e keer: 1 dag ban",
    "4e keer: 3 dagen ban + inname toestel",
  ],
},
{
  title: "Artikel 14.3 – Overheidsvoertuigen stelen",
  description:
    "Het stelen of besturen van overheidsvoertuigen is verboden.",
  sanctions: [
    "1e keer: waarschuwing",
    "2e keer: 12 uur ban",
    "3e keer: 1 dag ban",
    "4e keer: 1 week ban",
  ],
},
{
  title: "Artikel 15 – Realistisch/onrealistisch pitten",
  description:
    "Pitten is toegestaan tot 130 km/u. Motoren, vrachtwagens, voetgangers en luchtvaartuigen mogen niet gepit worden.",
  sanctions: [
    "1e keer: waarschuwing",
    "2e keer: 12 uur ban",
    "3e keer: 1 dag ban",
    "4e keer: 3 dagen ban",
    "5e keer: permanente verbanning (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 16 – Combatloggen",
  description:
    "Het uitloggen tijdens een scenario is verboden. Onopzettelijk? Je hebt 5 minuten om terug te keren. Verboden goederen zoals wapens of drugs worden ingenomen.",
  sanctions: [
    "1e keer: 12 uur ban",
    "2e keer: 1 dag ban",
    "3e keer: 1 week ban",
    "4e keer: 2 weken ban",
    "5e keer: 1 maand ban",
  ],
},
{
  title: "Artikel 17 – Garage / Vluchten / Campen",
  description:
    "Vluchten naar garage of huis tijdens scenario is verboden. Ook in het garage-menu blijven om zicht te vermijden is niet toegestaan.",
  sanctions: [
    "1e keer: waarschuwing",
    "2e keer: 8 uur ban",
    "3e keer: 12 uur ban",
    "4e keer: 1 dag ban",
    "5e keer: 1 week ban",
    "6e keer: permanente verbanning (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 18 – Metagamen",
  description:
    "Het gebruiken van buiten spel verkregen informatie om voordeel te behalen is verboden. In een call zitten met anderen via externe kanalen is ook verboden.",
  sanctions: [
    "1e keer: 6 uur ban",
    "2e keer: 1 dag ban",
    "3e keer: 3 dagen ban",
    "4e keer: 1 week ban",
    "5e keer: permanente verbanning (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 19 – Stream Snipen",
  description:
    "Het verkrijgen van informatie uit livestreams en dit gebruiken in het spel is verboden.",
  sanctions: [
    "1e keer: 3 uur ban",
    "2e keer: 12 uur ban",
    "3e keer: 1 dag ban",
    "4e keer: 1 week ban",
    "5e keer: permanente verbanning (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 20 – Ghost Peaken",
  description:
    "Schieten om de hoek zonder zelf zichtbaar te zijn is verboden.",
  sanctions: [
    "1e keer: 3 uur ban",
    "2e keer: 1 dag ban",
    "3e keer: 3 dagen ban",
    "4e keer: 1 week ban",
    "5e keer: permanente verbanning (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 21 – Stemherkenning / vervorming",
  description:
    "Het herkennen van stemmen ondanks maskers is toegestaan. Stemvervormers zijn verboden voor iedereen.",
  sanctions: [
    "1e keer: waarschuwing",
    "2e keer: 8 uur ban",
    "3e keer: 1 dag ban",
    "4e keer: 1 week ban",
    "5e keer: 1 maand ban (unban-ticket na 2 weken)",
  ],
},
{
  title: "Artikel 22.1 – Lichte exploits / bug abuse",
  description:
    "Elke vorm van software of modificaties die voordeel geven is verboden. Voorbeelden: mod packs waardoor objecten verdwijnen of crossairs.",
  sanctions: [
    "1e keer: 1 dag ban",
    "2e keer: 3 dagen ban",
    "3e keer: 1 week ban",
    "4e keer: permanente ban (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 22.2 – Zware exploits / duplicaten",
  description:
    "Zware bug abuse met grote voordelen of economische schade is verboden.",
  sanctions: ["1e keer: Permanente ban + account wipe (unban-ticket na 2 maanden)"],
},
{
  title: "Artikel 23.1 – Hacken, cheaten, spoofen",
  description:
    "Gebruik van hacks of cheats is verboden. Bij vermoeden kan PC-check worden geëist. Ontduiken leidt tot permanente ban en account wipe.",
  sanctions: ["1e keer: Permanente ban (unban-ticket na 3 maanden)"],
},
{
  title: "Artikel 23.2 – Samenwerken met cheaters",
  description:
    "Samenwerken met of niet melden van cheaters is verboden.",
  sanctions: ["Minimaal: 1 week ban", "Maximaal: 1 maand ban"],
},
{
  title: "Artikel 24 – IRL Trading",
  description:
    "Het verhandelen van in-game goederen voor echt geld is verboden.",
  sanctions: ["1e keer: Permanente ban + account wipe"],
},
{
  title: "Artikel 25 – Adresgegevens leaken / Booten / DDoS",
  description:
    "Het lekken van adresgegevens, IP’s of het DDoS’en van personen is verboden.",
  sanctions: ["1e keer: Permanente ban"],
},
{
  title: "Artikel 26 – Bedreigingen",
  description: "Elke vorm van reallife bedreiging is verboden.",
  sanctions: ["1e keer: 1 week ban (verdere escalatie wordt door management afgehandeld)"],
},
{
  title: "Artikel 27 – Liegen in staffzaak",
  description:
    "Het liegen in een staffzaak is verboden, ook bij refund-aanvragen.",
  sanctions: [
    "1e keer: 1 dag ban",
    "2e keer: 3 dagen ban",
    "3e keer: 1 week ban",
    "4e keer: 2 weken ban",
    "5e keer: permanente verbanning (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 28 – Negatieve content",
  description:
    "Het publiceren van negatieve content over Roermond RP is verboden.",
  sanctions: [
    "1e keer: ban tot video offline + 12 uur ban",
    "2e keer: ban tot video offline + 1 dag ban",
    "3e keer: ban tot video offline + 1 week ban",
    "4e keer: ban tot video offline + 2 weken ban",
    "5e keer: permanente verbanning (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 29 – Roermond RP zwart maken",
  description: "Het zwart maken van Roermond RP is verboden.",
  sanctions: [
    "1e keer: 12 uur ban",
    "2e keer: 1 dag ban",
    "3e keer: 1 week ban",
    "4e keer: 2 weken ban",
    "5e keer: permanente verbanning (unban-ticket na 1 maand)",
  ],
},
{
  title: "Artikel 30 – Vulgariteit en seksuele handelingen",
  description:
    "Extreem seksueel taalgebruik, seksuele intimidatie of seksisme is verboden. Alleen management mag deze straf opleggen.",
  sanctions: ["1e keer: Permanente ban (unban-ticket na 2 maanden)"],
},
{
  title: "Artikel 31 – Opruiing",
  description:
    "Het aanzetten van spelers tot overtreding van het reglement is verboden.",
  sanctions: [
    "1e keer: 3 uur ban",
    "2e keer: 1 dag ban",
    "3e keer: 3 dagen ban",
    "4e keer: 1 week ban",
    "5e keer: 1 maand ban (unban-ticket na 2 weken)",
  ],
},

  ];

    // Onderwereld regels
  const underworldArticles = [
    {
      title: "Artikel O.1 – Rippen",
      description:
        "Het rippen van personen in Groningen Roleplay is toegestaan onder strikte voorwaarden (masker, holster, zichtbaar wapen, etc.).",
      sanctions: [
        "1e keer: 8 uur ban",
        "2e keer: 1 dag ban",
        "3e keer: 3 dagen ban",
        "4e keer: 1 week (gangkick)",
        "5e keer: 1 maand ban + 3 maanden gangs blacklist",
        "Extra: betrokken wapen kan worden ingenomen",
      ],
    },
    {
      title: "Artikel O.2 – Invallen",
      description:
        "Een ganghuis mag alleen binnengevallen worden na goedkeuring via support Discord van management. Zonder toestemming is binnenvallen verboden.",
      sanctions: [
        "1e keer: waarschuwing",
        "2e keer: 8 uur ban",
        "3e keer: 1 dag ban",
        "4e keer: 1 week (gangkick)",
        "5e keer: 1 maand ban + 3 maanden gangs blacklist",
        "Extra: betrokken wapen kan worden ingenomen",
      ],
    },
    {
      title: "Artikel O.3 – Campen van gangterrein",
      description:
        "Het is verboden te campen op of rond een gangterrein of daarheen te vluchten tijdens scenario’s.",
      sanctions: [
        "1e keer: waarschuwing",
        "2e keer: 8 uur ban",
        "3e keer: 3 dagen ban",
        "4e keer: 1 week (gangkick)",
        "5e keer: 1 maand ban + 3 maanden gangs blacklist",
        "Extra: betrokken wapen kan worden ingenomen",
      ],
    },
   
  {
    title: "Artikel O.4 – Gang switch",
    description:
      "Een overstap naar een andere gang moet in roleplay worden gemeld bij de leiding. Het is niet toegestaan om over te stappen zonder melding of puur om te rippen.",
    sanctions: [
      "1e keer: 8 uur ban",
      "2e keer: 3 dagen ban",
      "3e keer: 1 week (gangkick)",
      "4e keer: 1 maand ban + 3 maanden gangs blacklist",
      "Extra: betrokken wapen kan worden ingenomen",
    ],
  },
  {
    title: "Artikel O.5 – Laag niveau van roleplay",
    description:
      "Voorbeelden: boeien zonder wapen, gewond doen en daarna schieten, voertuig terug in garage tijdens scenario, iemand doden terwijl handsuppen kan, iemand doden terwijl hij meewerkt.",
    sanctions: [
      "1e keer: waarschuwing",
      "2e keer: 12 uur ban",
      "3e keer: 3 dagen ban",
      "4e keer: 1 week (gangkick)",
      "5e keer: 1 maand ban + 3 maanden gangs blacklist",
      "Extra: betrokken wapen kan worden ingenomen",
    ],
  },
  {
    title: "Artikel O.6 – Overheidsbanen hostage nemen",
    description:
      "Het is niet toegestaan om hulpdiensten te ontvoeren. Onder schot houden op locatie is toegestaan bij politie/KMar. Ontvoeren kan enkel na toestemming onderwereldcoördinator binnen 24 uur na goedkeuring. Er zijn uitzonderingen bij gang level 3+ en recherche.",
    sanctions: [
      "1e keer: 8 uur ban",
      "2e keer: 1 dag ban",
      "3e keer: 3 dagen ban",
      "4e keer: 1 week (gangkick)",
      "5e keer: 1 maand ban + 3 maanden gangs blacklist",
      "Extra: betrokken wapen kan worden ingenomen",
    ],
  },
  {
    title: "Artikel O.7 – (Agenten) TH pakken",
    description:
      "Het is toegestaan een agent TH te pakken, maar niet meenemen naar andere locaties of gebruiken om iemand via telefoon/porto vrij te krijgen. Max TH-tijd: 15 minuten. Alleen met vuurwapen toegestaan.",
    sanctions: [
      "1e keer: 3 uur ban",
      "2e keer: 12 uur ban",
      "3e keer: 1 dag ban",
      "4e keer: 1 week (gangkick)",
      "5e keer: 1 maand ban + 3 maanden gangs blacklist",
      "Extra: betrokken wapen kan worden ingenomen",
    ],
  },
  {
    title: "Artikel O.8 – Rippen binnen een gang",
    description:
      "Geen eigen gang/portoleden rippen of scammen. Geen wapens uit gangkluis stelen bij vertrek of actieve deelname.",
    sanctions: [
      "1e keer: 12 uur ban",
      "2e keer: 3 dagen ban",
      "3e keer: 1 week (gangkick)",
      "4e keer: 1 maand ban + 3 maanden gangs blacklist",
      "Extra: betrokken wapen kan worden ingenomen",
    ],
  },
  {
    title: "Artikel O.9 – Outside-shooters/Hinderlaag",
    description:
      "Outside-shooters en hinderlagen zijn toegestaan tijdens achtervolging, mits alleen op banden wordt geschoten en maximaal twee personen schieten per scenario.",
    sanctions: [
      "1e keer: 8 uur ban",
      "2e keer: 1 dag ban",
      "3e keer: 1 week (gangkick)",
      "4e keer: 1 maand ban + 3 maanden gangs blacklist",
      "Extra: betrokken wapen kan worden ingenomen",
    ],
  },
  {
    title: "Artikel O.10 – Wapenverkoop",
    description:
      "Het is niet toegestaan openlijk wapens te verkopen op Twitter. Synoniemen zijn wel toegestaan. Alle items moeten fysiek bij je zijn tijdens de verkoop. Politie mag fouilleren of uitlokken.",
    sanctions: [
      "1e keer: 3 uur ban",
      "2e keer: 1 dag ban",
      "3e keer: 1 week ban",
      "4e keer: 1 maand ban",
      "5e keer: permanente ban",
    ],
  },
  {
    title: "Artikel O.11 – Kloten bij overheidsgebouwen",
    description:
      "Het is verboden te schieten, kloten of rippen rondom overheidsgebouwen, inclusief het bestormen of overnemen van politiebureaus.",
    sanctions: [
      "1e keer: waarschuwing",
      "2e keer: 8 uur ban + wapen inname",
      "3e keer: 3 dagen ban + wapen inname",
      "4e keer: 1 week ban + wapen inname",
      "5e keer: 2 weken ban + wapen inname",
      "6e keer: permanente ban + wapen inname (unban-ticket na 1 maand)",
    ],
  },
  {
    title: "Artikel O.12 – Bank/Winkel/Overvallen/Hostage",
    description:
      "Het is verboden iemand die bezig is met een bankoverval, winkeloverval of gijzeling te rippen of te volgen met dat doel. Laat overvallers/gijzelaars ongemoeid.",
    sanctions: [
      "1e keer: 3 uur ban",
      "2e keer: 1 dag ban",
      "3e keer: 1 week ban",
      "4e keer: 1 maand ban (unban-ticket na 2 weken)",
      "Extra: betrokken wapen kan worden ingenomen",
    ],
  },
  {
    title: "Artikel O.13 – Ghostbag/Holster",
    description:
      "Voor gebruik van een handvuurwapen is een holster verplicht. Grote wapens moeten zichtbaar zijn of in een rugzak worden gedragen.",
    sanctions: [
      "1e keer: waarschuwing",
      "2e keer: 1 dag ban",
      "3e keer: 3 dagen ban",
      "4e keer: 1 week ban",
      "5e keer: 1 maand ban",
      "Extra: betrokken wapen kan worden ingenomen",
    ],
  },
  {
    title: "Artikel O.14 – Gang overtredingen / klachten",
    description:
      "Herhaalde overtredingen of klachten kunnen de officiële status van een gang beïnvloeden.",
    sanctions: [],
  },
];


  const importantNotes = [
    "Onwetendheid van de regels is geen excuus",
    "Regels kunnen zonder aankondiging worden aangepast",
    "Staff heeft het recht om naar eigen inzicht te handelen",
    "Bij twijfel: vraag het aan een staff member",
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 md:mb-4">Server Regels</h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
            Dit reglement geldt voor alle spelers en wordt gehandhaafd door het staff team.
          </p>
        </div>

        <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
  {/* Algemene Server Regels */}
  <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Algemene Server Regels</h2>
  {ruleArticles.map((category, index) => (
    <Card key={index} className="p-4 md:p-6">
      <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">{category.title}</h3>
      <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">{category.description}</p>
      <ul className="list-disc pl-4 md:pl-6 space-y-1 text-xs md:text-sm">
        {category.sanctions.map((sanction, sIndex) => (
          <li key={sIndex}>{sanction}</li>
        ))}
      </ul>
    </Card>
  ))}

  {/* Onderwereld Regels */}
  <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">Onderwereld Regels</h2>
  <h2 className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">Onderstaand reglement bevat alle bepalingen voor onderwereld-activiteiten binnen Roermond Roleplay. Deze regels zijn opgesteld om een ordelijk en realistisch spelverloop te waarborgen. Spelers worden geacht deze bepalingen te kennen en te allen tijde na te leven. Alle straffen worden verdubbeld indien je minder dan 24 uur speeltijd hebt. Sancties blijven maximaal 60 dagen in je dossier staan. Het management behoudt het recht om eigen zaken te behandelen. Let op: een staffzaak moet binnen 24 uur worden aangemaakt, anders kan een stafflid niets meer voor je betekenen.</h2>
  {underworldArticles.map((category, index) => (
    <Card key={index} className="p-4 md:p-6">
      <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">{category.title}</h3>
      <p className="text-muted-foreground mb-3 md:mb-4 text-sm md:text-base">{category.description}</p>
      <ul className="list-disc pl-4 md:pl-6 space-y-1 text-xs md:text-sm">
        {category.sanctions.map((sanction, sIndex) => (
          <li key={sIndex}>{sanction}</li>
        ))}
      </ul>
    </Card>
  ))}
      
      
      </div>
        <Card className="p-4 md:p-6 mb-6 md:mb-8">
          <h2 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 flex items-center">
            <AlertTriangle className="h-5 w-5 md:h-6 md:w-6 text-destructive mr-2 flex-shrink-0" />
            Belangrijke Opmerkingen
          </h2>
          <div className="space-y-2">
            {importantNotes.map((note, index) => (
              <div key={index} className="flex items-start space-x-2">
                <Badge variant="destructive" className="text-xs flex-shrink-0">
                  !
                </Badge>
                <span className="text-muted-foreground text-sm md:text-base">{note}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

const Rules = () => {
  return (
    <AuthProvider>
      <RulesPage />
    </AuthProvider>
  );
};

export default Rules;
