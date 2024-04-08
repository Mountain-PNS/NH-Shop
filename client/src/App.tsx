import { Route, Router, Routes } from "react-router-dom";
import HomePage from "./page/HomePage";
import ShopPage from "./page/ShopPage";
import LayOut from "./components/LayOut";
import Detail from "./page/Detail";
import Admin from "./components/LayOutAdmin/Admin";
import ListProducts from "./page/admin/product/ListProducts";
import Update from "./page/admin/product/Update";
import Create from "./page/admin/product/Create";
import CategoryDetail from "./components/CategoryDetail";
import SignIn from "./page/auth/SignIn";
import Cart from "./page/Cart";
import Register from "./page/auth/Register";
import CategoriesList from "./components/CategoriesList";
import CategoryList from "./page/admin/categories/CategoryList";
import CategoryUpdate from "./page/admin/categories/CategoryUpdate";
import CreateCategory from "./page/admin/categories/CreateCategory";
import Order from "./page/Order";
import PrivateRoute from "./page/PrivateRoute";
import ListOrder from "./page/admin/order/ListOrder";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LayOut />}>
          <Route index element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/product/:id" element={<Detail />} />
          <Route path="/category/:id" element={<CategoryDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<Order />} />
        </Route>

        <Route path="/login" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <Admin />
            </PrivateRoute>
          }
        >
          <Route path="products" element={<ListProducts />} />
          <Route path="products/add" element={<Create />} />
          <Route path="products/:id" element={<Update />} />
          <Route path="categories" element={<CategoryList />} />
          <Route path="categories/:id" element={<CategoryUpdate />} />
          <Route path="categories/add" element={<CreateCategory />} />
          <Route path="order" element={<ListOrder />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
