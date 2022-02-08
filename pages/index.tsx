import type {NextPage} from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';
import LeafletMapNoNextSSR from "../components/leaflet-map/leaflet-map-no-next-ssr";


const Home: NextPage = () => {
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
              <LeafletMapNoNextSSR/>
            </div>
            <div className={styles.layer}>
              <svg className={styles.svg}>
                <rect width={100} height={100}/>
              </svg>
            </div>
            <div className={styles.layer}>
              <canvas className={styles.canvas}/>
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
