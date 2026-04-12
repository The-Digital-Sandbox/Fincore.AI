export interface Question {
  id: number;
  facet: string;
  domain: "Extraversion" | "Agreeableness" | "Conscientiousness" | "Negative Emotionality" | "Open-Mindedness";
  text: string;
  hint: string;
  options: string[];
}

export const questions: Question[] = [
  // Extraversion
  { id: 1, facet: "Sociability", domain: "Extraversion", text: "Sociability", hint: "Select which apply to you", options: ["Is outgoing, sociable", "Is talkative", "Tends to be quiet", "Is sometimes shy, introverted"] },
  { id: 2, facet: "Assertiveness", domain: "Extraversion", text: "Assertiveness", hint: "Select which apply to you", options: ["Has an assertive personality", "Is dominant, acts as a leader", "Finds it hard to influence people", "Prefers to have others take charge"] },
  { id: 3, facet: "Energy Level", domain: "Extraversion", text: "Energy Level", hint: "Select which apply to you", options: ["Is full of energy", "Shows a lot of enthusiasm", "Rarely feels excited or eager", "Is less active than other people"] },

  // Agreeableness
  { id: 4, facet: "Compassion", domain: "Agreeableness", text: "Compassion", hint: "Select which apply to you", options: ["Is compassionate, has a soft heart", "Is helpful and unselfish with others", "Feels little sympathy for others", "Can be cold and uncaring"] },
  { id: 5, facet: "Respectfulness", domain: "Agreeableness", text: "Respectfulness", hint: "Select which apply to you", options: ["Is respectful, treats others with respect", "Is polite, courteous to others", "Starts arguments with others", "Is sometimes rude to others"] },
  { id: 6, facet: "Trust", domain: "Agreeableness", text: "Trust", hint: "Select which apply to you", options: ["Has a forgiving nature", "Assumes the best about people", "Tends to find fault with others", "Is suspicious of others\u2019 intentions"] },

  // Conscientiousness
  { id: 7, facet: "Organisation", domain: "Conscientiousness", text: "Organisation", hint: "Select which apply to you", options: ["Is systematic, likes to keep things in order", "Keeps things neat and tidy", "Tends to be disorganised", "Leaves a mess, doesn\u2019t clean up"] },
  { id: 8, facet: "Productiveness", domain: "Conscientiousness", text: "Productiveness", hint: "Select which apply to you", options: ["Is efficient, gets things done", "Is persistent, works until the task is finished", "Tends to be lazy", "Has difficulty getting started on tasks"] },
  { id: 9, facet: "Responsibility", domain: "Conscientiousness", text: "Responsibility", hint: "Select which apply to you", options: ["Is dependable, steady", "Is reliable, can always be counted on", "Can be somewhat careless", "Sometimes behaves irresponsibly"] },

  // Negative Emotionality
  { id: 10, facet: "Anxiety", domain: "Negative Emotionality", text: "Anxiety", hint: "Select which apply to you", options: ["Can be tense", "Worries a lot", "Is relaxed, handles stress well", "Rarely feels anxious or afraid"] },
  { id: 11, facet: "Depression", domain: "Negative Emotionality", text: "Depression", hint: "Select which apply to you", options: ["Often feels sad", "Tends to feel depressed, blue", "Stays optimistic after experiencing a setback", "Feels secure, comfortable with self"] },
  { id: 12, facet: "Emotional Volatility", domain: "Negative Emotionality", text: "Emotional Volatility", hint: "Select which apply to you", options: ["Is moody, has up and down mood swings", "Is temperamental, gets emotional easily", "Is emotionally stable, not easily upset", "Keeps their emotions under control"] },

  // Open-Mindedness
  { id: 13, facet: "Intellectual Curiosity", domain: "Open-Mindedness", text: "Intellectual Curiosity", hint: "Select which apply to you", options: ["Is curious about many different things", "Is complex, a deep thinker", "Avoids intellectual, philosophical discussions", "Has little interest in abstract ideas"] },
  { id: 14, facet: "Aesthetic Sensitivity", domain: "Open-Mindedness", text: "Aesthetic Sensitivity", hint: "Select which apply to you", options: ["Is fascinated by art, music, or literature", "Values art and beauty", "Has few artistic interests", "Thinks poetry and plays are boring"] },
  { id: 15, facet: "Creative Imagination", domain: "Open-Mindedness", text: "Creative Imagination", hint: "Select which apply to you", options: ["Is inventive, finds clever ways to do things", "Is original, comes up with new ideas", "Has little creativity", "Has difficulty imagining things"] },
];

export const traitColors: Record<string, { from: string; to: string }> = {
  Openness: { from: "#005FCC", to: "#00C2FF" },
  Conscientiousness: { from: "#34C759", to: "#30D158" },
  Extraversion: { from: "#FF9F0A", to: "#FECA57" },
  Agreeableness: { from: "#FF3B30", to: "#FF6B6B" },
  Neuroticism: { from: "#5AC8FA", to: "#007AFF" },
};
