export interface TokenGenerator {
    generate(payload: object): Promise<string>;
    verify(token: string): Promise<string | null>;
}