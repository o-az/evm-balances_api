WRITE_PATH='src/data/top-tokens-contracts'

CHAINS=(
  'polygon'
  'ethereum'
  'smartchain'
)

URL='https://raw.githubusercontent.com/trustwallet/assets/master/blockchains'

for chain in ${CHAINS[@]}; do
  echo "Getting top tokens for $chain"
  cURL $URL/$chain/tokenlist.json >$WRITE_PATH/$chain.json
done
