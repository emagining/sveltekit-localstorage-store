// define your store from your localStore store 
import { writable } from './localStore' 

export const user = writable('user', {
  name: 'there', 
  id: 1 
})
