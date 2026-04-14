const getBaseTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Inter', sans-serif; line-height: 1.6; color: #1a202c; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 12px; }
        .header { text-align: center; padding: 20px 0; background-color: #1e3c72; color: white; border-radius: 12px 12px 0 0; }
        .content { padding: 30px; background-color: #ffffff; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #718096; background-color: #f8fafc; border-radius: 0 0 12px 12px; }
        .button { display: inline-block; padding: 12px 24px; background-color: #ff6b35; color: white; text-decoration: none; border-radius: 8px; font-weight: 600; margin-top: 20px; }
        .logo { font-size: 24px; font-weight: 800; letter-spacing: 1px; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <div class="logo">🛡️ ResQNet</div>
        </div>
        <div class="content">
            ${content}
        </div>
        <div class="footer">
            <p>&copy; 2026 ResQNet Emergency Response System</p>
            <p>123 Resilience Way, Emergency Response HQ</p>
        </div>
    </div>
</body>
</html>
`;

module.exports = {
    welcome: (name) => getBaseTemplate(`
        <h2>Welcome to ResQNet, ${name}!</h2>
        <p>Your account has been successfully created. You are now part of a nationwide network dedicated to disaster resilience and coordinated response.</p>
        <p>Login to your dashboard to report incidents, contribute resources, or manage your profile.</p>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/login" class="button">Access Dashboard</a>
    `),

    reportConfirmation: (name, disasterTitle) => getBaseTemplate(`
        <h2>Report Received</h2>
        <p>Hi ${name},</p>
        <p>We have successfully received your report for <strong>"${disasterTitle}"</strong>. Our administrative team and local rescue units have been notified.</p>
        <p>Thank you for your vigilance. Reporting incidents early saves lives.</p>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/disasters" class="button">View Incident Status</a>
    `),

    donationReceipt: (name, type, amount, disaster) => getBaseTemplate(`
        <h2>Thank You for Your Contribution</h2>
        <p>Hi ${name},</p>
        <p>We gratefully acknowledge your ${type} contribution towards <strong>"${disaster}"</strong>.</p>
        <p><strong>Details:</strong> ${amount}</p>
        <p>Your support directly impacts field operations and helps build community resilience.</p>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/dashboard" class="button">Track Your Impact</a>
    `),

    rescueTeamAck: (teamName) => getBaseTemplate(`
        <h2>Rescue Team Registered</h2>
        <p>The team <strong>"${teamName}"</strong> has been successfully registered on the ResQNet platform.</p>
        <p>Our operational staff will review your credentials and specialization details. You will be notified when you are assigned to active disaster zones.</p>
        <p>Thank you for your service.</p>
    `),

    deploymentNotice: (teamName, disasterTitle, location) => getBaseTemplate(`
        <h2>⚠️ DEPLOYMENT ALERT</h2>
        <p><strong>Team ${teamName},</strong></p>
        <p>You have been officially assigned to the active disaster: <strong>"${disasterTitle}"</strong>.</p>
        <p><strong>Location:</strong> ${location}</p>
        <p>Please coordinate with base command immediately and initiate deployment protocols.</p>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/admin/rescue-teams" class="button">View Assignment Details</a>
    `)
};
