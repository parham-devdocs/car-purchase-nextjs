// pages/_app.tsx
import { appWithTranslation } from '../utils/next-i18next';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default appWithTranslation(MyApp);