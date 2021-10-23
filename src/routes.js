import {
    CATALOG_ROUTE, PRODUCT_ROUTE,
} from "./utils/constants";
import Catalog from "./pages/Catalog";
import Product from "./pages/Product";

export const routes = [
    {
        path: CATALOG_ROUTE,
        enable: true,
        comp: Catalog,
        name: 'catalog',
        className: ''
    },
    {
        path: PRODUCT_ROUTE + '/:id',
        enable: false,
        comp: Product,
        name: 'product',
        className: ''
    },
]

