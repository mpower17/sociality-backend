import Request from 'express';

export interface IRequest extends Request {
    login(user: any, callback: any): any;
}