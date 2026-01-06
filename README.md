# final-exam-project-bcu24d

# This is my attempt to utilize smart contract and blockchain technology to create a fair platform between artists and users. 

# npm install dependencies 

# run anvil locally in ubuntu

# open a new ubuntu termial and use following commands

// BROADCAST CONTRACT

forge create --broadcast src/StreamingSubscription.sol:StreamingSubscription --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

// ADD ARTIST 

Artist 1

cast send 0x5FbDB2315678afecb367f032d93F642f64180aa3 \
  'addArtistToContract(address,string)' \
  0x14dC79964da2C08b23698B3D3cc7Ca32193d9955 \
  "Burgundy" \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
  --rpc-url http://127.0.0.1:8545

Artist 2

cast send 0x5FbDB2315678afecb367f032d93F642f64180aa3 \
  'addArtistToContract(address,string)' \
  0x23618e81E3f5cdF7f54C3d65f7FBc0aBf5B21E8f \
  "Dagored" \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
  --rpc-url http://127.0.0.1:8545


Artist 3

cast send 0x5FbDB2315678afecb367f032d93F642f64180aa3 \
  'addArtistToContract(address,string)' \
  0xa0Ee7A142d267C1f36714E4a8F75612F20a79720 \
  "Moavii" \
  --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 \
  --rpc-url http://127.0.0.1:8545


// SEND MONEY TO YOUR METAMASK WALLET

cast send <metamask-address> --value 10ether --private-key 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80 --rpc-url http://127.0.0.1:8545/


# use application ! 

# Notes about bugs:  after subscribing update page to read from contract ,  the same goes for after payment to artists is sent!
