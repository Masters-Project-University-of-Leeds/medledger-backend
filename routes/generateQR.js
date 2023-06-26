const { Client, Wallet } = require("xrpl");
const { XummSdk } = require("xumm-sdk");

const checkIfUserExists = (userAddress) => {
    return new Promise(async (resolve, reject) => {
        try {
            const client = new Client(process.env.XRPL_WSS_CLIENT);
            await client.connect();
            console.log("Connected to XRPL");

            const wallet = await Wallet.fromSecret(process.env.XRPL_SECRET);

            const response = await client.request({
                "method": "account_nfts",
                "account": wallet.address,
            })

            await client.disconnect();

            // Check if the user address is present in the response
            const userAddressExists = response.result.account_nfts.some((nft) => nft.URI === userAddress);

            if (userAddressExists) {
                resolve({ status: "Success", message: "User Address Exists" });
            } else {
                resolve({ status: "Success", message: "User Address Does Not Exist" });
            }
        } catch (error) {
            reject(error);
        }
    });
};

const generateQR = async (request, response) => {
    try {
        const { body } = request;
        const Sdk = new XummSdk(process.env.XUMM_API_KEY, process.env.XUMM_API_SECRET);

        if (!body) {
            response.status(400).send({ error: "Bad Request" });
            return;
        }

        if (body.TransactionType === "Payment") {
            const userAddressExists = await checkIfUserExists(body.Account);
            if (userAddressExists.status === "Success" && userAddressExists.message === "User Address Exists") {
                response.status(200).send({ error: userAddressExists.message });
                return;
            }
        }

        const payload = await Sdk.payload.create(body, true);
        response.status(200).send(payload);
    } catch (err) {
        console.log(err);
        response.status(500).send({ error: "Some Error Occured." });
    }
    return;
};



module.exports = generateQR;