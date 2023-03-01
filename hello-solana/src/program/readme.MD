# https://github.com/solana-labs/example-helloworld/issues/444#issuecomment-1094595474

```sh

$ sh -c "$(curl -sSfL https://release.solana.com/stable/install)"

$ solana-keygen new --force

$ solana config set --keypair /home/mourad/.config/solana/id.json

$ solana config set --url https://api.devnet.solana.com

$ solana logs

$ solana balance

$ solana airdrop 1

$ solana supply

$ solana cluster-version

$ solana config get

$ solana program show --programs

```