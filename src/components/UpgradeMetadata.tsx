import { FC, useCallback, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Transaction, PublicKey } from '@solana/web3.js';
import {
  DataV2,
  createCreateMetadataAccountV2Instruction,
} from "@metaplex-foundation/mpl-token-metadata";
import { findMetadataPda } from '@metaplex-foundation/js';

export const UpgradeMetadata: FC = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [tokenMint, setTokenMint] = useState('')
  const [tokenName, setTokenName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [metadata, setMetadata] = useState('')


  const onClick = useCallback(async (form) => {
      const mint = new PublicKey(form.tokenMint)
    console.log(mint.toString())
    console.log(form.tokenMint)
      const metadataPDA = await findMetadataPda(mint);
      console.log('metadataPDA', metadataPDA.toString());
      const tokenMetadata = {
        name: form.tokenName, 
        symbol: form.symbol,
        uri: form.metadata,
        sellerFeeBasisPoints: 0,
        creators: null,
        collection: null,
        uses: null
      } as DataV2;
      console.log('tokenMetadata', tokenMetadata);

      const createMetadataTransaction = new Transaction().add(
        createCreateMetadataAccountV2Instruction({
            metadata: metadataPDA,
            mint: mint,
            mintAuthority: publicKey,
            payer: publicKey,
            updateAuthority: publicKey,
          },
          { createMetadataAccountArgsV2: 
            { 
              data: tokenMetadata, 
              isMutable: true 
            } 
          }
        )
      );
      await sendTransaction(createMetadataTransaction, connection);
  }, [publicKey, connection, sendTransaction]);

  return (
    <div className="my-6">
      <input
        type="text"
        className="form-control block mb-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Token Mint Address"
        onChange={(e) => setTokenMint(e.target.value)}
      />
      <input
        type="text"
        className="form-control block mb-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Token Name"
        onChange={(e) => setTokenName(e.target.value)}
      />
      <input
        type="text"
        className="form-control block mb-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Symbol"
        onChange={(e) => setSymbol(e.target.value)}
      />
      <input
        type="text"
        className="form-control block mb-2 w-full px-4 py-2 text-xl font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
        placeholder="Metadata Url"
        onChange={(e) => setMetadata(e.target.value)}
      />
      <button
        className="px-8 m-2 btn animate-pulse bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-pink-500 hover:to-yellow-500 ..."
        onClick={() =>
          onClick({
            metadata: metadata,
            symbol: symbol,
            tokenName: tokenName,
            tokenMint: tokenMint
          })
        }
      >
        <span>Upgrade Metadata</span>
      </button>
    </div>
  );
}
