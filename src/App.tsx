import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/layout/MainLayout";
import { CatalogView } from "./feature/catalog/views/CatalogView";
import { CheckoutView } from "./feature/checkout/views/CheckoutView";
import { store } from "./store/store";

function App() {
  return (
    <Provider store={store}>
      <MainLayout>
        <Routes>
          <Route path="/" element={<CatalogView />} />
          <Route path="/checkout" element={<CheckoutView />} />
        </Routes>
      </MainLayout>
    </Provider>
  );
}

export default App;
