// prettier-ignore
import {
    Keypair,
    Connection,
    PublicKey,
    LAMPORTS_PER_SOL,
    TransactionInstruction,
    Transaction,
    sendAndConfirmRawTransaction,
    sendAndConfirmTransaction
} from '@solana/web3.js'
import fs from "fs";
import path from "path";

// prettier-ignore
const PROGRAM_KEYPAIR_PATH = path.join(
    path.resolve(__dirname, "../"),
    "keypair.json"
);

const readKeyData = (path: string) =>
  new Promise<string>((resolve, reject) => {
    fs.readFile(path, { encoding: "utf8" }, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });

const main = async () => {
  console.log("Client launched");

  /**
   *
   * Connect to Solana
   */
  const connection = new Connection("https://api.devnet.solana.com", "confirmed");

  /**
   *
   * Get program public key
   */
  const secretKeyString = await readKeyData(PROGRAM_KEYPAIR_PATH);
  const secretKey = Uint8Array.from(JSON.parse(secretKeyString));
  const programKeyPair = Keypair.fromSecretKey(secretKey);
  const programId = programKeyPair.publicKey;

  /**
   *
   * Generate an account (key_pair) to transact with our program
   */
  const triggerKeyPair = Keypair.generate();
  // prettier-ignore
  const airdropRequest = await connection.requestAirdrop(
    triggerKeyPair.publicKey,
    LAMPORTS_PER_SOL
  );
  await connection.confirmTransaction(airdropRequest);

  /**
   *
   * COnduct a transaction with our program
   */
  console.log("--Pinging Program", programId.toBase58());
  const instruction = new TransactionInstruction({
    keys: [
      {
        pubkey: triggerKeyPair.publicKey,
        isSigner: false,
        isWritable: true,
      },
    ],
    programId,
    data: Buffer.alloc(0),
  });
  await sendAndConfirmTransaction(connection, new Transaction().add(instruction), [triggerKeyPair]);
};

main();
