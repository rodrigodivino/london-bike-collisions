import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SharedLeafletMapNoNextSSR from "../components/shared-leaflet-map/shared-leaflet-map-no-next-ssr";
import {SVGOverlay} from "../components/svg-overlay/svg-overlay";
import * as L from 'leaflet';
import {getGeoProjection} from "../hooks/get-geo-projection";
import {useCallback, useState} from "react";


const Home: NextPage = () => {
  const [{map}, setMapWrapper] = useState<{map: L.Map | undefined}>({map: undefined});
  
  const updateMap = useCallback((map: L.Map) => {
    setMapWrapper({map})
  }, []);
  
  const projection = getGeoProjection(map);
  
  
  return (
      <div>
        <Head>
          <title>London Bike Collisions</title>
          <meta name="description" content="London Bike Collisions Data Visualization"/>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                crossOrigin=""/>
          {/*<link rel="icon" href="/favicon.ico" />*/}
        </Head>
        
        <main className={styles.main}>
          <h1>London Bike Collisions</h1>
          <h2>Data visualization of london bike collisions between 200X - 200X</h2>
          <div className={styles.layerContainer}>
            <div className={styles.interactiveLayer}>
              <SharedLeafletMapNoNextSSR onUpdate={updateMap}/>
            </div>
            <div className={styles.layer}>
              <SVGOverlay projection={projection}/>
            </div>
          </div>
        </main>
        
        <footer className={styles.footer}>
          Footer
        </footer>
      </div>
  );
};

export default Home;
