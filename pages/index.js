import Head from "next/head";
import Image from "next/image";
import styles from '@/styles/Home.module.css'
import { useMoralis, useWeb3Contract } from 'react-moralis'
import { abi } from "../constants/abi";
import { useState, useEffect } from "react";

export default function Home() {
  const { enableWeb3, isWeb3Enabled } = useMoralis();
  const [hasMetamask, setHasMetamask] = useState(false);

  const { runContractFunction } =
    useWeb3Contract({
      abi: abi,
      contractAddress: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      functionName: "store",
      params: {
        _favoriteNumber: 42,
      },
    });

    useEffect(() => {
      if (typeof window.ethereum !== "undefined") {
        setHasMetamask(true);
      }
    });

    return (
      <main className={styles.main}>     
        <div className={styles.description}>
  
          <Head>
            <title>NextJS Moralis Application</title>
            <link rel="icon" href="/favicon.ico"/>
          </Head>
  
          <div>
            Hello Developers! This is a basic NextJS & ethers application.
            <br></br>
            <br></br>
            <div className={styles.author}>
              By:
              <a href="https://takibaker.netlify.app/">Taki Baker</a>
            </div>
          </div>
  
          <div>
            Click to connect your MetaMask wallet:
            {hasMetamask ? (
              isWeb3Enabled ? (
                "Connected! "
              ) : (
                <button onClick={() => enableWeb3()}>Connect</button>
              )
            ) : (
              "Please install metamask"
            )}

            {isWeb3Enabled ? (
              <button onClick={() => runContractFunction()}>Execute</button>
            ) : (
              ""
            )}    
          </div>
  
          <Image
            src="/image.png"
            width={500}
            height={500}
            alt="Me!"
          />
  
        </div>
      </main>
    )
}
