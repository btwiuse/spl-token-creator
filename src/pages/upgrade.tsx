import type { NextPage } from "next";
import Head from "next/head";
import { UpgradeView } from "../views";

const Upgrade: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Solana Scaffold"
        />
      </Head>
      <UpgradeView />
    </div>
  );
};

export default Upgrade;
