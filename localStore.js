import { writable as internal, get } from 'svelte/store'
// localStorage isn't available on server 
// -> check if in browser before trying to access it
import { browser } from '$app/env'

export function writable(key, initialValue) {
    
  const store = internal(initialValue)
  const {subscribe, set} = store
  if(browser){
    const json = localStorage.getItem(key)
    if (json) { set(JSON.parse(json)) }
  } 
  return {
    set(value) {
      if(browser){
      localStorage.setItem(key, JSON.stringify(value))
      }
      set(value)
    },
    update(cb) {
      const value = cb(get(store))
      this.set(value)
    },
    subscribe
  }
} 
// check joshnuss code for more info https://gist.github.com/joshnuss/aa3539daf7ca412202b4c10d543bc077
