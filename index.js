require('dotenv').config()
const { Connection, clusterApiUrl, PublicKey, Transaction, TransactionInstruction, sendAndConfirmTransaction } = require('@solana/web3.js')
const { getKeypairFromEnvironment } = require('@solana-developers/node-helpers')

const PING_PROGRAM_ADDRESS = 'ChT1B39WKLS8qUrkLvFDXMhEJ4F1XZzwUNHUt4AU9aVa'
const PING_PROGRAM_DATA_ADDRESS = 'Ah9K7dQ8EHaZqcAsgBW8w37yN2eAy3koFmUn4x3CJtod'

const connection = new Connection(clusterApiUrl('devnet'))

/**
 * Sends a ping transaction to the Solana blockchain.
 * @returns {Promise<string>} The transaction signature.
 */
async function sendPingTransaction() {
    const keyPair = getKeypairFromEnvironment('SECRET_KEY')

    const transaction = new Transaction()
    const programId = new PublicKey(PING_PROGRAM_ADDRESS)
    const pingPragramDataId = new PublicKey(PING_PROGRAM_DATA_ADDRESS)

    const instruction = new TransactionInstruction({
        keys: [
            {
                pubkey: pingPragramDataId,
                isSigner: false,
                isWritable: true
            }
        ],
        programId
    })

    transaction.add(instruction)

    const signature = await sendAndConfirmTransaction(connection, transaction, [keyPair])
    return signature
}

module.exports = {
    sendPingTransaction
}