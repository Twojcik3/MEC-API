export interface IValidationService {
    validate<T>(obj: unknown): Promise<T>;
}