import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SharedLeafletMapNoNextSSR from "../components/shared-module/shared-leaflet-map/shared-leaflet-map-no-next-ssr";
import * as L from 'leaflet';
import {LatLngExpression} from 'leaflet';
import {useCallback, useMemo, useState} from "react";
import {BikeCollision} from "../types/bike-collision";
import {useCSV} from "../hooks/use-csv";
import SVGOverlayNoNextSSR from "../components/bike-collisions-module/svg-overlay/svg-overlay-no-next-ssr";
import CanvasOverlayNoNextSSR from "../components/bike-collisions-module/canvas-overlay/canvas-overlay-no-next-ssr";
import {CollisionSeverity} from "../types/collision-severity";

const INITIAL_CENTER: LatLngExpression = {lat: 51.507359, lng: -0.136439};
const INITIAL_ZOOM: number = 11;

const Home: NextPage = () => {
  const data = useCSV<BikeCollision>('/data/bike_collisions.csv');
  
  const [{map}, setMapWrapper] = useState<{ map: L.Map | undefined }>({map: undefined});
  const [isZooming, setIsZooming] = useState<boolean>(false);
  
  const handleMapUpdate = useCallback((map: L.Map) => {
    setMapWrapper({map});
  }, []);
  
  const handleMapZoomStateUpdate = useCallback((isZooming: boolean) => {
    setIsZooming(isZooming);
  }, []);
  
  const markerData = useMemo(() => data?.filter(d => d.Severity === CollisionSeverity.fatal), [data])
  const contextData = useMemo(() => data, [data])
  
  const Main = <main className={styles.main}>
    <h1>London Bike Collisions</h1>
    <h2>Data visualization of london bike collisions between 2005 - 2019</h2>
    <div className={styles.layerContainer}>
      <div className={styles.interactiveLayer}>
        <SharedLeafletMapNoNextSSR
            $onUpdate$={handleMapUpdate}
            $onZoomStateUpdate$={handleMapZoomStateUpdate}
            initialCenter={INITIAL_CENTER}
            initialZoom={INITIAL_ZOOM}
        />
      </div>
      <div className={styles.layer}>
        {map && <CanvasOverlayNoNextSSR map={map} data={contextData ?? []} isZooming={isZooming}/>}
      </div>
      <div className={styles.layer}>
        {map && <SVGOverlayNoNextSSR map={map} data={markerData ?? []} isZooming={isZooming}/>}
      </div>
    </div>
  </main>;
  const Loading = <p>Loading</p>;
  
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
        {(data && data.length > 0) ? Main : Loading}
        <footer className={styles.footer}>
          Data: <a href={'https://bikedata.cyclestreets.net/collisions/#9.44/51.4814/0.0567'}>Bike Collisions in
          London</a> (2005-2019),
          Data Source: <a href={'https://bikedata.cyclestreets.net/collisions/#9.44/51.4814/0.0567'}>CycleStreets</a>
        </footer>
      </div>
  );
};

export default Home;
