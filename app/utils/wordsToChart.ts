export type Letter = {
  char: string;
};
export type Word = Letter[];

export function textToChars(input: string): Word[] {
  return input.split(" ").map(word =>
    [...word].map(char => ({
      char,
    })),
  );
}
