import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Request',
  },
  {
    displayName: 'Mockup',
    iconName: 'layout-dashboard',
    route: 'client/mockup',
  },
  {
    displayName: 'Order',
    iconName: 'layout-dashboard',
    route: 'client/order',
  },
  {
    navCap: 'Setup',
  },
  {
    displayName: 'Product',
    iconName: 'layout-dashboard',
    route: 'setup/product',
  },
  {
    displayName: 'Product Price',
    iconName: 'layout-dashboard',
    route: 'setup/pricelist',
  },
  {
    displayName: 'Product Size Price',
    iconName: 'layout-dashboard',
    route: 'setup/sizepricelist',
  },
  {
    navCap: 'User Management',
  },
  {
    displayName: 'User Creation',
    iconName: 'user-plus',
    route: 'usermanagement/new-user-creation',
  },
  {
    navCap: 'Inventory',
  },
  {
    displayName: 'Item Setup',
    iconName: 'layout-dashboard',
    route: 'inventory/itemsetup',
  },
  {
    displayName: 'Purchase Order',
    iconName: 'layout-dashboard',
    route: 'inventory/po',
  },
  {
    displayName: 'Good Receive Note',
    iconName: 'layout-dashboard',
    route: 'inventory/grn',
  },
  {
    displayName: 'Return GRN',
    iconName: 'layout-dashboard',
    route: 'inventory/returngrn',
  },
  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Badge',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Chips',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Menu',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Tooltips',
    iconName: 'tooltip',
    route: '/ui-components/tooltips',
  },
  // {
  //   navCap: 'User Management',
  // },
  // {
  //   displayName: 'User Creation',
  //   iconName: 'user-plus',
  //   route: 'user-management/user-creation',
  // },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Register',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  {
    navCap: 'Extra',
  },
  {
    displayName: 'Icons',
    iconName: 'mood-smile',
    route: '/extra/icons',
  },
  {
    displayName: 'Sample Page',
    iconName: 'aperture',
    route: '/extra/sample-page',
  },
];
