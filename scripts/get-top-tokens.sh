WRITE_PATH='src/data/top-tokens-contracts'

CHAINS=(
  'polygon'
  'ethereum'
  'smartchain'
)

URL='https://raw.githubusercontent.com/trustwallet/assets/master/blockchains'
URL_2='https://raw.githubusercontent.com/crypto-crawler/erc20-token-list/master/tokens.json'
POLYGON='https://tokenmapper.api.matic.today/api/v1/mapping?map_type=%5B%22POS%22%5D&chain_id=137&limit=1000'

COINGECKO_URL='https://api.coingecko.com/api/v3/coins/list?include_platform=true'
cURL $COINGECKO_URL | jq -r '.[] | select(.platforms.name == "Ethereum") | .symbol' > $WRITE_PATH/ethereum-tokens.txt

# for chain in ${CHAINS[@]}; do
#   echo "Getting top tokens for $chain"
#   cURL $URL/$chain/tokenlist.json >$WRITE_PATH/$chain.json
#   yarn tsnode scripts/generate-tokens-array.ts $chain
# done
