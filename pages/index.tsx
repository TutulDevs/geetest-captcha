import type { NextPage } from "next";
import Head from "next/head";
import { WithEffect } from "../components/WithEffect";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Geetest Captcha</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <WithEffect />
    </>
  );
};

export default Home;
