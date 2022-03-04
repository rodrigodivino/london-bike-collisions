import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {MapProvider} from "../components/shared-module/shared-leaflet-map/map-provider";

function MyApp({ Component, pageProps }: AppProps) {
  return  <MapProvider>
  <Component {...pageProps} />
  </MapProvider>
}

export default MyApp
