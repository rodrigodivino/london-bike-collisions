import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import LeafletMap from "../components/leaflet-map/leaflet-map";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>London Bike Collisions</title>
        <meta name="description" content="London Bike Collisions Data Visualization" />
        {/*<link rel="icon" href="/favicon.ico" />*/}
      </Head>

      <main className={styles.main}>
        <h1>London Bike Collisions</h1>
        <h2>Data visualization of london bike collisions between 200X - 200X</h2>
        <div className={styles.visualization}>
          <LeafletMap/>
        </div>
        
      </main>

      <footer className={styles.footer}>
        Footer
      </footer>
    </div>
  )
}

export default Home
