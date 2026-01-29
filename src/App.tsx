import { Provider } from 'react-redux';
import { MainLayout } from './components/layout/MainLayout';
import { CatalogView } from './feature/catalog/views/CatalogView';
import { store } from './store/store';

function App() {
  return (
    <Provider store={store}>
      <MainLayout>
        <CatalogView />
      </MainLayout>
    </Provider>
  );
}

export default App;
