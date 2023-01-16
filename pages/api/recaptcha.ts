import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
  status: string;
  message: string;
};
const handler = (req: NextApiRequest, res: NextApiResponse<Data>) => {
  if (req.method === 'POST') {
    try {
      fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${req.body.gRecaptchaToken}`,
      })
        .then((reCaptchaRes) => reCaptchaRes.json())
        .then((reCaptchaRes) => {
          if (reCaptchaRes?.score > 0.5) {
            res.status(200).json({
              status: 'success',
              message: 'Verification Successfull',
            });
          } else {
            res.status(200).json({
              status: 'failure',
              message: 'Verification Failed - Reload page',
            });
          }
        });
    } catch (err) {
      res.status(405).json({
        status: 'failure',
        message: 'Verification Failed - Check Internet connection',
      });
    }
  } else {
    res.status(405);
    res.end();
  }
};

export default handler;
