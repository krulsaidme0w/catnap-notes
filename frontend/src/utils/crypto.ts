import { SHA256, enc } from "crypto-js";

function sha256(input: string): string {
    return SHA256(input + "soup").toString(enc.Hex);
}

export default sha256;
