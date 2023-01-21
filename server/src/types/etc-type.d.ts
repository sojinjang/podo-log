export type DataObj = Record<string, string | number | boolean>;

export type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<any>;
