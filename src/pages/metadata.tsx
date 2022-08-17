import type { NextPage } from "next";
import Head from "next/head";
import { MetadataView } from "../views";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Metadata: NextPage = (props) => {
  return (
    <div>
      <Head>
        <title>Solana Scaffold</title>
        <meta
          name="description"
          content="Solana Scaffold"
        />
      </Head>
      <MetadataView />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default Metadata;
