export const loginPageSelectors = {
  username: 'input#user-name',
  password: 'input#password',
  loginButton: 'input[data-test="login-button"]'
};

export const inventoryPageSelectors = {
  shoppingCart: '.shopping_cart_link',
  firstItemButton: '.inventory_item:first-child button',
  firstItemName: '.inventory_item:first-child .inventory_item_name',
  burgerMenuWrap: '.bm-menu-wrap',
  burgerMenu: 'button#react-burger-menu-btn',
  logout: 'a[data-test="logout-sidebar-link"]'
};

export const cartPageSelectors = {
  cartQuantity: '.cart_quantity',
  cartList: '.cart_list .cart_item',
  firstItemName: '.cart_list .cart_item:nth-child(3) .inventory_item_name',
  firstItemButton: '.cart_list .cart_item:nth-child(3) button',
  shoppingCart: '.shopping_cart_link'
};
