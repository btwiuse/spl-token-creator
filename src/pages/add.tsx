import type { NextPage } from "next";
import Head from "next/head";
import { AddView } from "../views";

const Add: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Solana Scaffold"
        />
      </Head>
      <AddView />
    </div>
  );
};

export default Add;
