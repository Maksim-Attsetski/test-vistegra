// #NOTE This class is needed to send requests to API.

import { leafs, storage } from 'shared';
import { ILeaf, ILeafBasket } from './types';

class LeafService {
  async getLeafs(): Promise<ILeaf[]> {
    try {
      // const res = await axios.get(**endpoint**);
      console.log('Successfully get leafs', leafs);

      return leafs;
    } catch (error) {
      console.log(error);
      throw error; // as example
    }
  }

  async getLeafBasket(): Promise<ILeafBasket[]> {
    try {
      // const res = await axios.get(**endpoint**);
      console.log('Successfully get leaf basket', leafs);

      return storage.getItem('leafBasket') || [];
    } catch (error) {
      console.log(error);
      throw error; // as example
    }
  }

  // #NOTE here we can write other CRUD operations
}

export const leafService = new LeafService();
