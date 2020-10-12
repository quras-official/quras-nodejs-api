/** Verifies a QEP1. This merely verifies the format. It is unable to verify if it is has been tampered with. */
export function isQEP1(qep1: string): boolean

/** Verifies a QTP1 using its checksum. */
export function isQTP1(wif: string): boolean

/** Checks if hexstring is a valid Private Key. Any hexstring of 64 chars is a valid private key. */
export function isPrivateKey(key: string): boolean

/** Checks if hexstring is a valid Public Key. Accepts both encoded and unencoded forms. */
export function isPublicKey(key: string, encoded?: boolean): boolean

/** Verifies if hexstring is a scripthash. */
export function isScriptHash(scriptHash: string): boolean

/** Verifies an address using its checksum. */
export function isAddress(address: string): boolean
