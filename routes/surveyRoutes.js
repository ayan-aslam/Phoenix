const _ = require('lodash');
const { Path } = require('path-parser');

const { URL } = require('url');
const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const requireCredits = require('../middlewares/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');

const Survey = mongoose.model('surveys');

module.exports = (app) => {


  app.get('/api/surveys', requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id })
    .select({
      recipients: false,});

      

    res.send(surveys);

  });




  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send(`
      <html>
        <body style="margin:0;padding:0;min-height:100vh;display:flex;align-items:center;justify-content:center;background: linear-gradient(135deg, #f8ffae 0%, #43c6ac 100%);overflow:hidden;">
          <div style="position:relative;z-index:2;text-align:center;">
            <h1 style="font-size:2.5rem;color:#333;font-family:'Segoe UI',Arial,sans-serif;margin-bottom:0.5em;letter-spacing:1px;">Thank You for voting</h1>
          </div>
          <div style="position:absolute;top:0;left:0;width:100vw;height:100vh;z-index:1;pointer-events:none;">
            <div style="position:absolute;width:120px;height:120px;background:rgba(255,255,255,0.25);border-radius:50%;top:10%;left:15%;animation:float1 6s ease-in-out infinite alternate;"></div>
            <div style="position:absolute;width:180px;height:180px;background:rgba(255,255,255,0.18);border-radius:50%;top:60%;left:70%;animation:float2 8s ease-in-out infinite alternate;"></div>
            <div style="position:absolute;width:90px;height:90px;background:rgba(255,255,255,0.22);border-radius:50%;top:40%;left:50%;animation:float3 7s ease-in-out infinite alternate;"></div>
            <style>
              @keyframes float1 { 0%{transform:translateY(0);} 100%{transform:translateY(-30px);} }
              @keyframes float2 { 0%{transform:translateY(0);} 100%{transform:translateY(40px);} }
              @keyframes float3 { 0%{transform:translateY(0);} 100%{transform:translateY(-20px);} }
            </style>
          </div>
        </body>
      </html>
    `);
  });

  app.post('/api/surveys/webhooks', (req, res) => {
    const p = new Path('/api/surveys/:surveyId/:choice');

    _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy('email', 'surveyId')
      .each(({ surveyId, email, choice }) => {
        Survey.updateOne(
          {
            _id: surveyId,
            recipients: {
              $elemMatch: { email: email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { 'recipients.$.responded': true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();

    res.send({});
  });

  app.post('/api/surveys', requireLogin, requireCredits, async (req, res) => {
    const { title, subject, body, recipients } = req.body;

    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients
        .split(',')
        .map((email) => ({ email: email.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });

    // Great place to send an email!
    const mailer = new Mailer(survey, surveyTemplate(survey));

    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();

      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
