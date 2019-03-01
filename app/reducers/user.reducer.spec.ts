import assert from 'assert';
import chai from 'chai';

import { userReducer, initialState } from './user.reducer';

chai.should();


describe('User Reducer', () => {
  describe('Unkown action', () => {

    it('should return the initial state', () => {
      const action = {} as any;
      const result = userReducer(initialState, action) as any;

      result.should.be(initialState);
    });
  });
});