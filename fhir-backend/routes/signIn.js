const { Client, Wallet } = require("xrpl");
const { AES, enc } = require("crypto-js");

const jwt = require("jsonwebtoken");

const encryptJSON = (data) => {
    const encrypt = AES.encrypt(JSON.stringify(data), process.env.ENCRYPTION_KEY).toString();
    return encrypt;
};

// Check if the user address is present in XRPL Oracle Account NFT List
const checkUserAddress = (userAddress) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!userAddress) {
                resolve({ status: "Failure", message: "User Address Not Provided" });
            }

            // Connect to xrp-ledger
            const client = new Client(process.env.XRPL_WSS_CLIENT);
            await client.connect();
            console.log("Connected to XRPL");

            const wallet = await Wallet.fromSecret(process.env.XRPL_SECRET);

            if (wallet.address === userAddress) {
                resolve({ status: "Success", message: "Admin" });
                return;
            }

            const payload = {
                "method": "account_nfts",
                "account": wallet.address,
                "ledger_index": "validated",
            }

            const response = await client.request(payload);
            await client.disconnect();

            // Check if the user address is present in the response
            const userAddressExists = response.result.account_nfts.some((nft) => nft.URI === userAddress);
            if (userAddressExists) {
                resolve({ status: "Success", message: "User Address Exists" });
            } else {
                resolve({ status: "Failure", message: "User Address Does Not Exist" });
            }

        } catch (err) {
            console.log(err);
            reject(err);
        }
    });
};

const signIn = async (request, response) => {
    try {

        const { body } = request;
        const { userAddress } = body;
        const userAddressExists = await checkUserAddress(userAddress);

        if (userAddressExists.status === "Success" && userAddressExists.message === "Admin") {
            // Generate JWT with 12-hour expiration
            const token = jwt.sign({ userAddress }, process.env.JWT_SECRET, { expiresIn: '12h' });
            response.status(200).send(encryptJSON({ token, type: "Admin" }));
            return;
        }

        if (userAddressExists.status === "Success") {
            // Generate JWT with 12-hour expiration
            const token = jwt.sign({ userAddress }, process.env.JWT_SECRET, { expiresIn: '12h' });
            response.status(200).send(encryptJSON({ token, type: "User" }));
            return;
        }

        response.status(200).send(encryptJSON({ error: "User Address Does Not Exist" }));
        return;
    } catch (err) {
        console.log(err);
        response.status(500).send(encryptJSON({ error: "Some error occurred" }));
    }
    return;
};


module.exports = signIn;
