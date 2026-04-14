require('dotenv').config();
const { sendEmail } = require('./utils/emailService');

console.log('Testing email service with:', process.env.EMAIL_USER);

async function test() {
    try {
        const result = await sendEmail(
            process.env.EMAIL_USER, 
            'ResQNet Test Email', 
            '<h1>Test Successful</h1><p>If you see this, your ResQNet email service is working correctly.</p>'
        );
        console.log('Test Result:', result);
    } catch (e) {
        console.error('Test script error:', e);
    }
}

test();
