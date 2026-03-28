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
    initials: "WRH",
    name: "Wolf Rudiger Harms",
    title: "Managing Director",
    bio: "A German entrepreneur with more than 30 years of experience in the international non-ferrous metals market. His professional activities focus on the sourcing, trading and commercial execution of metals transactions, particularly in the copper and nickel segments. His approach is characterised by practical experience, established industry relationships and transaction-oriented execution.",
    photoUrl: null,
    linkedIn: null,
  },
];
