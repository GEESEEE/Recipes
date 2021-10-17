export declare type SortQueryTuple = [string, 'ASC' | 'DESC'];
export declare function decodeQueryParams(param?: string): string[] | undefined;
export declare function decodeSortQuery(param?: string): SortQueryTuple[] | undefined;
