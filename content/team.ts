// To add a new team member: push a new object to the `team` array below.
// All fields except photoUrl and linkedIn are required.
// Set photoUrl to null if no photo is available — a placeholder avatar will render.

export interface TeamMember {
  id: string;
  initials: string;
  name: string;
  title: string;
  bio: string;
  photoUrl: string | null;
  linkedIn: string | null;
}

export const team: TeamMember[] = [
  {
    id: "founder",
    initials: "SH",
    name: "<!-- PLACEHOLDER: Founder Full Name -->",
    title: "<!-- PLACEHOLDER: Managing Director -->",
    bio: "<!-- PLACEHOLDER: 3-4 sentence professional bio. -->",
    photoUrl: null,
    linkedIn: null,
  },
];
