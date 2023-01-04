import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import "../styles/globals.css";
import { store } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const persistor = persistStore(store);
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider>
        <PersistGate persistor={persistor}>
          <Navbar />
          <Component {...pageProps} />
          <Footer />
        </PersistGate>
      </ChakraProvider>
    </Provider>
  );
}
