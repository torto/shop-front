import { IRepository } from "../repositories";

export interface IRepositoryItemState {
  data: IRepositoryItem 
}

export interface IRepositoryItem extends IRepository {
  isStar: boolean;
}
