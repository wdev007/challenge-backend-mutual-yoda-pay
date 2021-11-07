import { HttpException, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { HttpExceptionFilter } from './http-exception.filter';

describe('HttpExceptionFilter', () => {
  it('should be defined', () => {
    expect(new HttpExceptionFilter()).toBeDefined();
  });

  it('shold be able filter http exceptions', () => {
    const httpExeptionFilter = new HttpExceptionFilter();
    const argumentsHost: ArgumentsHost = {
      switchToHttp: jest.fn().mockImplementation(() => {
        return {
          getResponse: jest.fn().mockImplementation(() => {
            return {
              status: jest.fn().mockImplementation(() => {
                return {
                  json: jest.fn(),
                };
              }),
            };
          }),
        };
      }),
      getArgByIndex: jest.fn(),
      getArgs: jest.fn(),
      getType: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
    };

    httpExeptionFilter.catch(
      new HttpException('Bad Request', HttpStatus.BAD_REQUEST),
      argumentsHost,
    );

    expect(argumentsHost.switchToHttp).toHaveBeenCalled();
  });
});
