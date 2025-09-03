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
  questions: Question[];
}

export const JOBS: Job[] = [
  {
    id: 'ambulance',
    name: 'Ambulance Medewerker',
    description: 'Help mensen in nood als ambulance medewerker',
    isAcceptingApplications: true,
    icon: '🚑',
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
    name: 'Politie Agent',
    description: 'Handhaaf de wet en orde in Roermond',
    isAcceptingApplications: false,
    icon: '👮‍♂️',
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
    id: 'fire',
    name: 'Brandweer',
    description: 'Blus branden en help bij noodsituaties',
    isAcceptingApplications: false,
    icon: '🚒',
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
        questionText: 'Heb je ervaring met brandbestrijding of hulpverlening?',
        questionType: 'textarea',
        isRequired: true
      },
      {
        id: 'motivation',
        questionText: 'Waarom wil je bij de brandweer werken?',
        questionType: 'textarea',
        isRequired: true
      }
    ]
  },
  {
    id: 'kmar',
    name: 'Koninklijke Marechaussee',
    description: 'Militaire politie en grensbewaking',
    isAcceptingApplications: false,
    icon: '🎖️',
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
        questionText: 'Waarom wil je bij de Koninklijke Marechaussee werken?',
        questionType: 'textarea',
        isRequired: true
      }
    ]
  }
];