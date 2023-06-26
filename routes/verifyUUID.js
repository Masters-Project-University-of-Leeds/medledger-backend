const fetch = (...args) => import("node-fetch").then(({ default: fetch }) => fetch(...args));

const verifyXummUUID = async (request, response) => {
    try {
        const { query } = request;
        if (!(query && query.uuid)) {
            response.status(400).send({ error: "Some error occurred." });
            return;
        }

        const options = {
            method: "GET",
            headers: {
                Accept: "application/json",
                "X-API-Key": process.env.XUMM_API_KEY,
                "X-API-Secret": process.env.XUMM_API_SECRET,
            },
        };
        const xummResponse = await fetch(`https://xumm.app/api/v1/platform/payload/${query.uuid}`, options).then((response) => response.json());
        response.status(200).send({ ...xummResponse.response, ...xummResponse.meta });
    } catch (err) {
        console.log(err);
        response.status(500).send({ error: "Some error occurred." });
    }
    return;
};

module.exports = verifyXummUUID;
