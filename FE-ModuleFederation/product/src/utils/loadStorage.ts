import { IProduct } from "@/components/Product/product.type";
import _ from "lodash";

export interface IItemCart {
  id: number;
  title: string;
  qty: number;
  price: number;
  img: string;
}

export interface ICartData {
  userId: number | null;
  totalItems: number;
  subTotal: number;
  grandTotal: number;
  items: IItemCart[];
}

interface IGlobalStorage {
  getCartData(): ICartData | null;
  getFavoriteList(): { items: IItemCart[] };
  addItemToCart(item: IItemCart): void;
  addItemToFavoriteList(item: any): void;
  checkItemInFavoriteListExist(item: IProduct): boolean;
  removeItemFromFavoriteList(item: IProduct): void;
}

class globalStorageClass {
  private getLocalStorage(name: string) {
    return localStorage.getItem(name);
  }

  private setLocalStorage(name: string, val: string | object) {
    if (typeof val !== "string") {
      val = JSON.stringify(val);
    }

    return localStorage.setItem(name, val);
  }

  private removeLocalStorage(name: string) {
    return localStorage.removeItem(name);
  }

  public getCartData() {
    const data = this.getLocalStorage("mfcart");
    return data ? JSON.parse(data) : null;
  }

  public getFavoriteList() {
    const data = this.getLocalStorage("mf_favorite");
    return data ? JSON.parse(data) : null;
  }

  public addItemToFavoriteList(item: any) {
    const currentData = this.getFavoriteList();
    if (!currentData) {
      this.setLocalStorage("mf_favorite", { items: [item] });
    }

    if (currentData && !currentData.items.some((data: any) => data.id === item.id)) {
      currentData.items.push(item);
      this.setLocalStorage("mf_favorite", currentData);
    }
  }

  public removeItemFromFavoriteList(item: IProduct) {
    const currentData = this.getFavoriteList();
    currentData.items = currentData.items.filter((dataItem: any) => dataItem.id !== item.id);
    console.log(currentData.items);
    this.setLocalStorage("mf_favorite", currentData);
  }

  public checkItemInFavoriteListExist(item: IProduct) {
    const currentData = this.getFavoriteList();
    return currentData && currentData.items.some((data: IItemCart) => data.id === item.id);
  }

  public addItemToCart(item: IItemCart) {
    const currentData = this.getCartData();
    const userId = null;
    if (!currentData) {
      const defaultData: ICartData = {
        userId,
        totalItems: 1,
        subTotal: item.price,
        grandTotal: item.price,
        items: [item],
      };

      return this.setLocalStorage("mfcart", defaultData);
    }

    currentData.userId = userId;
    if (currentData.items.length > 0) {
      const findIndex = _.findIndex(currentData.items, (o: IItemCart) => o.id === item.id);
      if (findIndex !== -1) {
        const checkData = currentData.items[findIndex];
        checkData.qty += item.qty;
        checkData.price = item.price;
        currentData.items[findIndex] = checkData;
        currentData.subTotal += item.price;
        currentData.grandTotal = currentData.subTotal;

        return this.setLocalStorage("mfcart", currentData);
      }
    }

    currentData.totalItems += 1;
    currentData.subTotal += item.qty * item.price;
    currentData.grandTotal = currentData.subTotal;
    currentData.items = currentData.items.concat(item);
    return this.setLocalStorage("mfcart", currentData);
  }
}

const globalStorage: IGlobalStorage = new globalStorageClass();

export default globalStorage;
