import { Controller, Get, Next, Req, Res } from '@nestjs/common';
import { NextFunction, Response } from 'express';

@Controller()
export class StaticController {

    @Get('*')
    async getAll(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
        if (!req.url.startsWith('/api')) {
            res.sendFile('index.html', { root: 'build' });
        } else {
            next();
        }
    }
}
