export type Cat = {
  url: string;
  id: string;
  elo: number;
  ref: string;
  projectedElo: number;
};

export type Match = {
  cat1: Cat;
  cat2: Cat;
  id: string;
  played: boolean;
};
