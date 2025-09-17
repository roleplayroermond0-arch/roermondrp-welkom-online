// Applications Configuration
// Set APPLICATIONS_ENABLED to true/false to enable/disable applications globally

export const APPLICATIONS_ENABLED = true;

export interface Question {
  id: string;
  questionText: string;
  questionType: 'text' | 'textarea' | 'select';
  options?: string[];
  isRequired: boolean;
}

export interface Job {
  id: string;
  name: string;
  description: string;
  isAcceptingApplications: boolean;
  icon: string;
  webhookUrl?: string;
  questions: Question[];
}

export const JOBS: Job[] = [
  {
    id: 'taxi',
    name: 'Taxi',
    description: 'Vervoer passagiers door de stad',
    isAcceptingApplications: true,
    icon: '🚕',
    webhookUrl: import.meta.env.VITE_DISCORD_WEBHOOK_TAXI,
    questions: [
      {
        id: 'name',
        questionText: 'Wat is je volledige naam?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'age',
        questionText: 'Wat is je leeftijd?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'experience',
        questionText: 'Heb je ervaring met rijden of klantenservice?',
        questionType: 'textarea',
        isRequired: true
      },
      {
        id: 'availability',
        questionText: 'Wanneer ben je beschikbaar?',
        questionType: 'select',
        options: [
          'Doordeweeks overdag',
          'Doordeweeks avond',
          'Weekend',
          'Flexibel'
        ],
        isRequired: true
      },
      {
        id: 'motivation',
        questionText: 'Waarom wil je taxi chauffeur worden?',
        questionType: 'textarea',
        isRequired: true
      }
    ]
  },
  {
    id: 'ambulance',
    name: 'Ambulance',
    description: 'Help mensen in nood als ambulance medewerker',
    isAcceptingApplications: true,
    icon: '🚑',
    webhookUrl: import.meta.env.VITE_DISCORD_WEBHOOK_AMBULANCE,
    questions: [
      {
        id: 'name',
        questionText: 'Wat is je volledige naam?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'age',
        questionText: 'Wat is je leeftijd?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'experience',
        questionText: 'Heb je ervaring in de zorg of als hulpverlener?',
        questionType: 'textarea',
        isRequired: true
      },
      {
        id: 'availability',
        questionText: 'Wanneer ben je beschikbaar?',
        questionType: 'select',
        options: [
          'Doordeweeks overdag',
          'Doordeweeks avond',
          'Weekend',
          'Flexibel'
        ],
        isRequired: true
      },
      {
        id: 'motivation',
        questionText: 'Waarom wil je bij de ambulance werken?',
        questionType: 'textarea',
        isRequired: true
      }
    ]
  },
  {
    id: 'police',
    name: 'Politie',
    description: 'Handhaaf de wet en orde in Roermond',
    isAcceptingApplications: true,
    icon: '👮‍♂️',
    webhookUrl: import.meta.env.VITE_DISCORD_WEBHOOK_POLICE,
    questions: [
      {
        id: 'name',
        questionText: 'Wat is je volledige naam?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'age',
        questionText: 'Wat is je leeftijd?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'experience',
        questionText: 'Heb je ervaring in de handhaving of beveiliging?',
        questionType: 'textarea',
        isRequired: true
      },
      {
        id: 'availability',
        questionText: 'Wanneer ben je beschikbaar?',
        questionType: 'select',
        options: [
          'Doordeweeks overdag',
          'Doordeweeks avond',
          'Weekend',
          'Flexibel'
        ],
        isRequired: true
      },
      {
        id: 'motivation',
        questionText: 'Waarom wil je bij de politie werken?',
        questionType: 'textarea',
        isRequired: true
      }
    ]
  },
  {
    id: 'kmar',
    name: 'KMAR',
    description: 'Militaire politie en grensbewaking',
    isAcceptingApplications: false,
    icon: '🎖️',
    webhookUrl: import.meta.env.VITE_DISCORD_WEBHOOK_KMAR,
    questions: [
      {
        id: 'name',
        questionText: 'Wat is je volledige naam?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'age',
        questionText: 'Wat is je leeftijd?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'experience',
        questionText: 'Heb je ervaring in de handhaving of militaire dienst?',
        questionType: 'textarea',
        isRequired: true
      },
      {
        id: 'motivation',
        questionText: 'Waarom wil je bij de KMAR werken?',
        questionType: 'textarea',
        isRequired: true
      }
    ]
  },
  {
    id: 'wegenwacht',
    name: 'Wegenwacht',
    description: 'Assisteer automobilisten bij pech en ongevallen',
    isAcceptingApplications: true,
    icon: '🛠️',
    webhookUrl: import.meta.env.VITE_DISCORD_WEBHOOK_WEGENWACHT,
    questions: [
      {
        id: 'name',
        questionText: 'Wat is je volledige naam?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'age',
        questionText: 'Wat is je leeftijd?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'experience',
        questionText: 'Heb je ervaring met auto\'s of technische reparaties?',
        questionType: 'textarea',
        isRequired: true
      },
      {
        id: 'availability',
        questionText: 'Wanneer ben je beschikbaar?',
        questionType: 'select',
        options: [
          'Doordeweeks overdag',
          'Doordeweeks avond',
          'Weekend',
          'Flexibel'
        ],
        isRequired: true
      },
      {
        id: 'motivation',
        questionText: 'Waarom wil je bij de wegenwacht werken?',
        questionType: 'textarea',
        isRequired: true
      }
    ]
  },
  {
    id: 'advocatuur',
    name: 'Advocatuur',
    description: 'Bied juridische bijstand en vertegenwoordiging',
    isAcceptingApplications: true,
    icon: '⚖️',
    webhookUrl: import.meta.env.VITE_DISCORD_WEBHOOK_ADVOCATUUR,
    questions: [
      {
        id: 'name',
        questionText: 'Wat is je volledige naam?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'age',
        questionText: 'Wat is je leeftijd?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'education',
        questionText: 'Wat is je educatieniveau en heb je juridische kennis?',
        questionType: 'textarea',
        isRequired: true
      },
      {
        id: 'experience',
        questionText: 'Heb je ervaring in het juridische veld of met roleplay advocatuur?',
        questionType: 'textarea',
        isRequired: true
      },
      {
        id: 'availability',
        questionText: 'Wanneer ben je beschikbaar?',
        questionType: 'select',
        options: [
          'Doordeweeks overdag',
          'Doordeweeks avond',
          'Weekend',
          'Flexibel'
        ],
        isRequired: true
      },
      {
        id: 'motivation',
        questionText: 'Waarom wil je advocaat worden in RoermondRP?',
        questionType: 'textarea',
        isRequired: true
      }
    ]
  },
  {
    id: 'anwb',
    name: 'ANWB',
    description: 'Wegenhulp en verkeersbegeleiding',
    isAcceptingApplications: true,
    icon: '🚗',
    webhookUrl: import.meta.env.VITE_DISCORD_WEBHOOK_ANWB,
    questions: [
      {
        id: 'name',
        questionText: 'Wat is je volledige naam?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'age',
        questionText: 'Wat is je leeftijd?',
        questionType: 'text',
        isRequired: true
      },
      {
        id: 'experience',
        questionText: 'Heb je ervaring met wegenhulp of verkeersbegeleiding?',
        questionType: 'textarea',
        isRequired: true
      },
      {
        id: 'availability',
        questionText: 'Wanneer ben je beschikbaar?',
        questionType: 'select',
        options: [
          'Doordeweeks overdag',
          'Doordeweeks avond',
          'Weekend',
          'Flexibel'
        ],
        isRequired: true
      },
      {
        id: 'motivation',
        questionText: 'Waarom wil je bij ANWB werken?',
        questionType: 'textarea',
        isRequired: true
      }
    ]
  }
];