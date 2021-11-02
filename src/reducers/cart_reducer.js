import {
  ADD_TO_CART,
  CLEAR_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from "../actions";

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    const tempItem = state.cart.find((item) => item.id === id + color);
    if (tempItem) {
      const tempCart = state.cart.map((cartItem) => {
        if (cartItem.id === id + color) {
          let newAmount = cartItem.amount + amount;
          if (newAmount > cartItem.max) {
            newAmount = cartItem.max;
          }
          return { ...cartItem, amount: newAmount };
        } else {
          return cartItem;
        }
      });
      return { ...state, cart: tempCart };
    } else {
      const newItem = {
        id: id + color,
        name: product.name,
        color,
        amount,
        image: product.images[0].url,
        price: product.price,
        max: product.stock,
      };
      return {
        ...state,
        cart: [...state.cart, newItem],
      };
    }
  }
  if (action.type === REMOVE_CART_ITEM) {
    const newItems = state.cart.filter((item) => item.id !== action.payload);
    console.log(action.payload);
    console.log(newItems);
    return { ...state, cart: newItems };
  }
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }
  if (action.type === "TOGGLE_AMOUNT") {
    const newItems = state.cart.map((item) => {
      if (item.id === action.payload.id) {
        if (action.payload.value === "inc") {
          let newAmount = item.amount + 1;
          if (newAmount > item.max) {
            newAmount = item.max;
          }
          return { ...item, amount: newAmount };
        }
        if (action.payload.value === "dec") {
          let newAmount = item.amount - 1;
          if (newAmount < 1) {
            newAmount = 1;
          }
          return { ...item, amount: newAmount };
        }
      }
      return item;
    });
    return { ...state, cart: newItems };
  }
  if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { cart_items, total_amount } = state.cart.reduce(
      (total, item) => {
        const { price, amount } = item;
        total.cart_items += amount;
        total.total_amount += amount * price;
        return total;
      },
      { cart_items: 0, total_amount: 0 }
    );
    return { ...state, cart_items, total_amount };
  }
  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
