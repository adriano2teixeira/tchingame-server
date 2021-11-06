import * as Queue from "bull"
const voucherQueue = new Queue('voucher status control', 'redis://127.0.0.1:6379'); 

voucherQueue.process()