jest.mock('axios');

import axios from 'axios';
import * as service from '../utils/api/service';

import user from './mocks/user';

describe('service functions', () => {
  afterEach(() => { jest.resetAllMocks(); });

  describe('login', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.post.mockImplementation(() => {
          return Promise.resolve({ data: user.customer });
        });
  
        result = await service.login(user.customer.user.email, 'valid_password');
      });
  
      it('should call axios.post', () => {  
        expect(axios.post).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.post with proper parameters', () => {  
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/login', { email: user.customer.user.email, password: 'valid_password' });
      });

      it('should return correct user', () => {
        expect(result).toStrictEqual(user.customer);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.post.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });

        result = await service.login('', 'valid_password');
      });
  
      it('should call axios.post', () => {  
        expect(axios.post).toHaveBeenCalledTimes(1);
      });

      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });

  describe('register', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.post.mockImplementation(() => {
          return Promise.resolve({ data: user.customer });
        });
  
        result = await service.register(user.customer.user.name, user.customer.user.email, 'valid_password');
      });
  
      it('should call axios.post', () => {  
        expect(axios.post).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.post with proper parameters', () => {  
        expect(axios.post).toHaveBeenCalledWith('http://localhost:3001/register', { name: user.customer.user.name, email: user.customer.user.email, password: 'valid_password' });
      });

      it('should return correct user', () => {
        expect(result).toStrictEqual(user.customer);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.post.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        result = await service.register('', '', 'valid_password');
      });
      
      it('should call axios.post', () => {  
        expect(axios.post).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });

  describe('getProducts', () => {
    describe('successful request', () => {
      let result;

      beforeEach(async () => {
        axios.get.mockImplementation(() => {
          return Promise.resolve({ data: [] });
        });
  
        result = await service.getProducts();
      });
  
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
  
      it('should call axios.get with proper parameters', () => {  
        expect(axios.get).toHaveBeenCalledWith('http://localhost:3001/customer/products');
      });

      it('should return an array', () => {
        expect(result).toStrictEqual([]);
      });
    });

    describe('unsuccessful request', () => {
      let result;

      beforeEach(async () => {
        global.console.log = jest.fn();
        axios.get.mockImplementation(() => {
          return Promise.reject(new Error('error'));
        });
        
        result = await service.getProducts();
      });
      
      it('should call axios.get', () => {  
        expect(axios.get).toHaveBeenCalledTimes(1);
      });
      
      it('should call console.log', () => {  
        expect(console.log).toHaveBeenCalledTimes(1);
      });

      it('should return undefined', () => {
        expect(result).toBe(undefined);
      });
    });
  });
});
