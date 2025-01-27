import { IProduct } from "@/components/Product/product.type";
import globalStorage, { IItemCart } from "@/utils/loadStorage";

function addToCart(item: any, eventBus: any) {
  const data: IItemCart = {
    id: item.id,
    title: item.name,
    qty: 1,
    price: item.price,
    img: item.list_img?.[0].url || require("@/assets/img/default.png"),
  };
  globalStorage.addItemToCart(data);
  eventBus.emit("addCartItem");
  eventBus.emit("showMessage", null, {
    detail: {
      serverity: "success",
      message: "Success! The item has been added to your shopping cart",
    },
  });
}

function addToFavorite(item: any, eventBus: any) {
  if (!globalStorage.checkItemInFavoriteListExist(item)) {
    globalStorage.addItemToFavoriteList(item);
    eventBus.emit("updateFovariteItem");
    eventBus.emit("showMessage", null, {
      detail: {
        serverity: "success",
        message: "Success! The item has been added to your wish list",
      },
    });
  } else {
    eventBus.emit("showMessage", null, {
      detail: {
        serverity: "fail",
        message: "Warning! This item is already in your wish list",
      },
    });
  }
}

function handleRemoveItemFromFavoriteList(item: IProduct, eventBus: any) {
  if (globalStorage.checkItemInFavoriteListExist(item)) {
    globalStorage.removeItemFromFavoriteList(item);
    eventBus.emit("updateFovariteItem");
    eventBus.emit("showMessage", null, {
      detail: {
        serverity: "success",
        message: "Success! The item has been removed to your wish list",
      },
    });
  }
}

export { addToCart, addToFavorite, handleRemoveItemFromFavoriteList };
