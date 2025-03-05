const chainContracts = {
    ethereum: {
        issued: ["0x4274cd7277c7bb0806bd5fe84b9adae466a8da0a"],
    },
};

import { addChainExports } from "../helper/getSupply";
const adapter = addChainExports(chainContracts);
export default adapter;