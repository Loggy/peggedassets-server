const axios = require("axios");
const retry = require("async-retry");
const BigNumber = require("bignumber.js");

export async function getTotalSupply(address: string, tokenType: string) {
  const supplyRes = await retry(
    async (_bail: any) =>
      await axios.get(
        `https://explorer.ont.io/v2/tokens/${tokenType}/${address}`
      )
  );
  const bnSupply = new BigNumber(supplyRes?.data?.result?.total_supply);

  return bnSupply.toNumber();
}

export async function getBalance(
  address: string,
  tokenType: string,
  owner: string
) {
  const balancesRes = await axios.get(
    `https://explorer.ont.io/v2/addresses/${owner}/${tokenType}/balances`
  )
  const filteredBalances = balancesRes?.data?.result?.filter(
    (balance: any) => balance.contract_hash === address
  );
  if (!filteredBalances[0]?.balance) return 0

  const bnBalance = new BigNumber(filteredBalances[0]?.balance);

  return bnBalance.toNumber();
}
