# Ask if user wants to send some of the fake tokens to his/her address
# Ask what the initial supply is

echo "NOTE: DO NOT SHARE YOUR PRIVATE KEY WITH ANYONE UNLESS IT'S A THROWAWAY WALLET USED ONLY FOR TESTING"
echo ""

read -e -p "What is the address you want to use for the deployment? " ADDRESS
echo $ADDRESS

# read -e -p "What is the private key for the address you shared? " PRIVATE_KEY
# echo $PRIVATE_KEY

read -e -p "Do you want to send some of the fake tokens to your address (Y/N)? " -i "Y" SHOULD_SEND_TOKENS
if [[ $SHOULD_SEND_TOKENS =~ ^[Yy]$ ]]; then
  read -e -p "What is the receiver address? " RECEIVER_ADDRESS
fi

TEMPLATE=contracts/FakeTokens/FakeTokenTemplate.sol

# This will create 27 fake tokens files in content/FakeTokens/FakeToken*.sol
COUNT=1

for char in {A..Z}; do
  echo "Creating fake token $COUNT: FakeToken$char.sol"

  FILE_PATH="contracts/FakeTokens/FakeToken$char.sol"
  cp $TEMPLATE $FILE_PATH

  # Replace token name, symbol and contract name
  sed -i.bak "s/XXXXXX/$char/g" $FILE_PATH
  echo $RECEIVER_ADDRESS
  if [[ $SHOULD_SEND_TOKENS =~ ^[Yy]$ ]]; then
    sed -i.bak "s/0x0000000000000000000000000000000000000000/$RECEIVER_ADDRESS/g" $FILE_PATH
  fi
  rm $FILE_PATH.bak
  COUNT=$((COUNT + 1))
done

# # Compile the contracts
# echo "Compiling contracts"
# npx hardhat compile

# # This will deploy the 27 fake tokens to ropsten
# # and try to verify the smart contracts on etherscan.io

# echo "Deploying fake tokens to ropsten"
# for sc in {A..B}; do
#   echo "Deploying FakeToken$sc.sol"
#   ADDRESS=$(
#     hh deploy --network ropsten --contract contracts/FakeTokens/FakeToken$sc.sol |
#       grep "Deployed" |
#       awk '{print $3}'
#   )
#   echo "Verifying FakeToken$sc.sol"
#   # get the smart contract address from the output
#   hh verify --network ropsten $ADDRESS
# done
