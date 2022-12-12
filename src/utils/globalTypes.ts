type SocietyInputs = {
  associationName: string;
  category: string;
  eventName: string;
  eventType: string;
  numberOfQuote: number;
  soldBy: string;
  comments: string;
};

type ContactInputs = {
  companyName: string;
  contactName: string;
  telephoneNumber: number;
  email: string;
  comments: string;
};

type Places =
  | ""
  | "Entrée principale"
  | "Salle de conférence (Inspire)"
  | "Gymnase"
  | "Cube | Rez de Chaussée"
  | "Cube | +1"
  | "VIP 1"
  | "VIP 2"
  | "VIP 3"
  | "Amphi"
  | "Atrium"
  | "Biergarten"
  | "Atrium"
  | "Experiment"
  | "Share"
  | "Moholicious"
  | "Imagine"
  | "Solve"
  | "Make"
  | "Lead"
  | "Cocktail espcae (à côté du Gymnase)"
  | "4 Rue de la Gare";

type EventComponent = {
  title: string;
  time: {
    start: string;
    end: string;
  };
  place: Places[];
};
interface ProgramInputs extends EventComponent {
  comments: string;
  numberOfPeople: number;
  departureTime: Date;
  events: EventComponent[];
}

type WifiInputs = {
  username: string;
  password: string;
};

type SignageInputs = {
  lobby: string;
  otherInfo: string;
  comments: string;
};

type AllEventGroups = {
  society: SocietyInputs;
  contact: ContactInputs;
  program: ProgramInputs;
  wifi: WifiInputs;
  signage: SignageInputs;
};

interface ModifiedServerResponse extends AllEventGroups {
  creationDetails: {
    creatorId: string;
    createdAt: Date;
    createdBy: string;
    creatorEmail: string;
  };
  docId: string;
}

export type {
  Places,
  SocietyInputs,
  ContactInputs,
  ProgramInputs,
  WifiInputs,
  SignageInputs,
  AllEventGroups,
  ModifiedServerResponse,
};
