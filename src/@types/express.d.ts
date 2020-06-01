declare namespace Express {
  export interface Request {
    customProperties: string[];
    user: {
      id: string;
    };
  }
}
