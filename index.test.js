const assert = require('assert');
const { sendPingTransaction } = require('./index');

describe('sendPingTransaction', () => {
    it('should return a signature', async () => {
        const signature = await sendPingTransaction()
        assert.strictEqual(typeof signature, 'string');
    }, 30000);
});