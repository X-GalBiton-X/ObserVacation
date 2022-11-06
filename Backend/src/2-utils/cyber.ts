import crypto from "crypto"

const salt = "GalAnnihilatesHackers"

function hash(plainText: string) {
    if(!plainText) return null;
    return crypto.createHmac("sha512", salt).update(plainText).digest("hex");
}

export default hash;