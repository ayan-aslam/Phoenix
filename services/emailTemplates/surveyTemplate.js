const keys = require('../../config/keys');

module.exports = survey => {
  return `
    <html>
      <body style="background: #f9f9f9; font-family: Arial, sans-serif; margin: 0; padding: 0;">
        <div style="max-width: 480px; margin: 40px auto; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.08); padding: 32px 24px; text-align: center;">
          <h2 style="color: #333; margin-bottom: 8px;">We'd love your input!</h2>
          <p style="color: #555; font-size: 16px; margin-bottom: 24px;">Please answer the following question:</p>
          <p style="font-size: 18px; color: #222; font-weight: 500; margin-bottom: 32px;">${survey.body}</p>
          <div style="display: flex; justify-content: center; gap: 16px; margin-bottom: 8px;">
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/yes"
              style="background:rgb(218, 99, 9); color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 50px; font-size: 16px; font-weight: bold; display: inline-block;">
              Yes
            </a>
            <a href="${keys.redirectDomain}/api/surveys/${survey.id}/no"
              style="background: #000; color: #fff; text-decoration: none; padding: 12px 32px; border-radius: 50px; font-size: 16px; font-weight: bold; display: inline-block;">
              No
            </a>
          </div>
          <p style="color: #aaa; font-size: 12px; margin-top: 32px;">Thank you for your feedback!</p>
        </div>
      </body>
    </html>
  `;
};
