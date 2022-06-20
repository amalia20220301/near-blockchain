# Near Blockchain

```shell
yarn global add near-cli
```

## Mint NFT

```shell
export NEARID=demo0617.testnet
# 该操作会在本地生成一个credentials文件
near login
near call example-nft.testnet nft_mint '{"token_id": "demo0617", "receiver_id": "'$NEARID'", "token_metadata": { "title": "GO TEAM", "description": "The Team Goes", "media": "https://bafybeidl4hjbpdr6u6xvlrizwxbrfcyqurzvcnn5xoilmcqbxfbdwrmp5m.ipfs.dweb.link/", "copies": 1}}' --accountId $NEARID --deposit 0.1
```