type Stats = {
    title: string;
    explanation: string;
    source: string;
    link: string;
    photo: string;
    scores: Scores;
}

type Scores = Record<string, number>;

export type {
    Stats, Scores
};
