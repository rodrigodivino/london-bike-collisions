import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import SharedLeafletMapNoNextSSR from "../components/shared-module/shared-leaflet-map/shared-leaflet-map-no-next-ssr";
import * as L from 'leaflet';
import {LatLngExpression, ZoomAnimEvent} from 'leaflet';
import {useCallback, useContext, useMemo, useState} from "react";
import {BikeCollision} from "../types/bike-collision";
import {useCSV} from "../hooks/use-csv";
import SVGOverlayNoNextSSR from "../components/bike-collisions-module/svg-overlay/svg-overlay-no-next-ssr";
import CanvasOverlayNoNextSSR from "../components/bike-collisions-module/canvas-overlay/canvas-overlay-no-next-ssr";
import {CollisionSeverity} from "../types/collision-severity";
import LegendsOverlay from "../components/bike-collisions-module/legends-overlay/legends-overlay";
import {CanvasOverlayTypes} from "../components/bike-collisions-module/canvas-overlay/canvas-overlay.types";
import {SVGOverlayTypes} from "../components/bike-collisions-module/svg-overlay/svg-overlay.types";
import {Legends} from "../hooks/legends-module/legends";
import {useLegendStore} from "../hooks/legends-module/use-legend-store";
import LegendMode = Legends.LegendMode;
import LegendRegistry = Legends.LegendRegistry;
import LegendDataTypes = Legends.LegendDataTypes;
import { MapContext } from '../components/shared-module/shared-leaflet-map/map-context';
import {MapProvider} from "../components/shared-module/shared-leaflet-map/map-provider";


const INITIAL_CENTER: LatLngExpression = {lat: 51.507359, lng: -0.126439};
const INITIAL_ZOOM: number = 12;

const Home: NextPage = () => {
  const data = useCSV<BikeCollision>('/data/bike_collisions.csv');
  const [legendStore, legendDispatcher] = useLegendStore();
  const [mapContextData,] = useContext(MapContext);
  
  
  const handleColorData = useCallback((colorData: Array<CanvasOverlayTypes.ColorData>) => {
    legendDispatcher({
      mode: LegendMode.DISCRETE_COLOR,
      id: 'heatmap',
      title: 'Nº of Collisions',
      data: colorData
          .filter(colorDatum => !(colorDatum.threshold.includes(Infinity) || colorDatum.threshold.includes(-Infinity)))
          .map(colorDatum => {
            return {
              label: `${colorDatum.threshold[0]} to ${colorDatum.threshold[1]}`,
              color: colorDatum.color
            };
          })
    });
  }, [legendDispatcher]);
  
  const handleShapeLegendData = useCallback((shapeLegendData: SVGOverlayTypes.LegendData[]) => {
      legendDispatcher({
        mode: LegendMode.SHAPE,
        data: shapeLegendData,
        id: 'markers',
        title: 'Collision Locations',
        options: {
          disabled: shapeLegendData.length === 0,
          disabledMessage: 'Zoom to see',
          disabledIsClickable: true,
        }
      });
  }, [legendDispatcher]);
  
  const handleDisabledLegendClick = useCallback((legend: LegendRegistry<LegendMode>, item: LegendDataTypes[LegendMode] | null) => {
    if(legend.id === 'markers' && legend?.options?.disabled) {
      mapContextData?.mapRef?.current?.setZoom(15);
    }
  }, [mapContextData?.mapRef])
  
  const markerData = useMemo(() => data?.filter(d => d.Severity !== CollisionSeverity.slight), [data]);
  const contextData = useMemo(() => data, [data]);
  
  const Main = <main className={styles.main}>
    <div className={styles.header}>
      <h1 className={styles.title}>Bicycle collisions in london between 2005 and 2019</h1>
      <h2 className={styles.subtitle}>Understanding the routes that have been dangerous for cyclists in the past
        years</h2>
    </div>
    
    <div className={styles.layerContainer}>
      <div className={styles.interactiveLayer}>
        <SharedLeafletMapNoNextSSR
            initialCenter={INITIAL_CENTER}
            initialZoom={INITIAL_ZOOM}
        >
          <div className={styles.layer}>
            <CanvasOverlayNoNextSSR $onColorLegendData$={handleColorData} data={contextData ?? []}/>
          </div>
          <div className={styles.layer}>
            <SVGOverlayNoNextSSR $onShapeLegendData$={handleShapeLegendData} data={markerData ?? []}/>
          </div>
          <div className={styles.layer}>
            <LegendsOverlay $onLegendClick$={handleDisabledLegendClick} legendStore={legendStore}/>
          </div>
        </SharedLeafletMapNoNextSSR>
      </div>
    
    </div>
  </main>;
  const Loading = <p>Loading</p>;
  
  return (
      <div className={styles.root}>
        <Head>
          <title>London Bike Collisions</title>
          <meta name="description" content="London Bike Collisions Data Visualization"/>
          <link rel="stylesheet" href="https://unpkg.com/leaflet@1.7.1/dist/leaflet.css"
                integrity="sha512-xodZBNTC5n17Xt2atTPuE1HxjVMSvLVW9ocqUKLsCC5CXdbqCmblAshOMAS6/keqq/sMZMZ19scR4PsZChSR7A=="
                crossOrigin=""/>
          {/*<link rel="icon" href="/favicon.ico" />*/}
        </Head>
        <MapProvider>
          {(data && data.length > 0) ? Main : Loading}
        </MapProvider>
        <footer className={styles.footer}>
          <p>
            <b>Data:</b> <a href={'https://bikedata.cyclestreets.net/collisions/#9.44/51.4814/0.0567'}>Bike Collisions
            in
            London</a> (2005-2019). &nbsp;
            <b>Data Source:</b> <a
              href={'https://bikedata.cyclestreets.net/collisions/#9.44/51.4814/0.0567'}>CycleStreets</a>.
          </p>
          <p><b>Design:</b> Rodrigo Divino. &nbsp; <b>Implementation:</b> Rodrigo Divino.</p>
        </footer>
      </div>
  );
};

export default Home;
