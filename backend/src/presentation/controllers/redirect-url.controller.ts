import { Request, Response } from 'express';
import { GetOriginalUrlUseCase } from '../../application/use-cases/get-original-url.use-case';
import { LinkNotFoundError } from '../../application/errors/link-not-found.error';
import { LinkExpiredError } from '../../application/errors/link-expired.error';

export class RedirectUrlController {
  constructor(private readonly getOriginalUrlUseCase: GetOriginalUrlUseCase) {}

  public handle = async (req: Request, res: Response): Promise<void> => {
    const { code } = req.params;
    try {
      const originalUrl = await this.getOriginalUrlUseCase.execute(code);
      res.redirect(302, originalUrl);
    } catch (error: any) {
      if (error instanceof LinkNotFoundError) {
        res.status(404).send(this.renderErrorPage('Link Not Found', 'The requested shortened link does not exist.'));
        return;
      } 
      
      if (error instanceof LinkExpiredError) {
        res.status(410).send(this.renderErrorPage('Link Expired', 'The requested link has expired and is no longer available.'));
        return;
      }
      
      res.status(400).send(this.renderErrorPage('Invalid Request', error.message || 'An error occurred.'));
    }
  };

  private renderErrorPage(title: string, message: string): string {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${title} | URL Shortener</title>
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;800&display=swap" rel="stylesheet">
        <style>
          body {
            font-family: 'Outfit', sans-serif;
            background: radial-gradient(circle at center, #1e1b4b 0%, #0f172a 100%);
            color: #f8fafc;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 20px;
            box-sizing: border-box;
          }
          .card {
            background: rgba(30, 41, 59, 0.4);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
            text-align: center;
            max-width: 450px;
            width: 100%;
          }
          h1 {
            background: linear-gradient(135deg, #f43f5e 0%, #d946ef 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-size: 2.5rem;
            margin-top: 0;
            font-weight: 800;
          }
          p {
            color: #94a3b8;
            font-size: 1.1rem;
            line-height: 1.6;
            margin-bottom: 30px;
          }
          .btn {
            display: inline-block;
            background: linear-gradient(135deg, #6366f1 0%, #a855f7 100%);
            color: white;
            text-decoration: none;
            padding: 12px 30px;
            border-radius: 12px;
            font-weight: 600;
            transition: all 0.3s ease;
            box-shadow: 0 4px 14px 0 rgba(168, 85, 247, 0.4);
          }
          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px 0 rgba(168, 85, 247, 0.6);
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h1>${title}</h1>
          <p>${message}</p>
          <a href="http://localhost:5173" class="btn">Back to Shortener</a>
        </div>
      </body>
      </html>
    `;
  }
}
