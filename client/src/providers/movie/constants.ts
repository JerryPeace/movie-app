export type MovieObject = {
  _id?: string;
  film: string;
  genre: string;
  lead_studio: string;
  audience_score: number;
  profitability: number;
  rotten_tomatoes: number;
  worldwide_gross: string;
  year: number;
  comments: {
    name: string;
    comment: string;
  }[];
};

export type AddResult = {
  duplicated?: MovieObject[];
  added: MovieObject[];
};

export const BASE_URL = 'http://127.0.0.1:4000';
