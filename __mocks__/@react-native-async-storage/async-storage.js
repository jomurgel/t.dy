// __mocks__/@react-native-async-storage/async-storage.js
import { jest } from '@jest/globals'

const mockAsyncStorage = {
  getItem: jest.fn( () => Promise.resolve( null ) ),
  setItem: jest.fn( () => Promise.resolve() ),
  removeItem: jest.fn( () => Promise.resolve() ),
  clear: jest.fn( () => Promise.resolve() ),
}

export default mockAsyncStorage
