export interface ITenantsRepository {
  create(data: any): Promise<string>;
}
