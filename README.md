# localStorage store for SvelteKit
Store that writes to window.localStorage - working on SvelteKit svelte/kit

Based on [joshnuss/localStorageStore](https://gist.github.com/joshnuss/aa3539daf7ca412202b4c10d543bc077), but working on SvelteKit.
#### Making it work on sveltekit
window.localStorage isn't available on server and since SvelteKit first renders every component on the server trying to access window will make it break.
To solve this - you need to check if you are in the client first. 
Read more in the [SvelteKit Docs](https://kit.svelte.dev/docs#troubleshooting-server-side-rendering)

## Create your store
Create a Svelte store backed by window.localStorage.
It will persist the store's data locally.
More info: [joshnuss/localStorageStore](https://gist.github.com/joshnuss/aa3539daf7ca412202b4c10d543bc077)

```javascript
import { writable as internal, get } from 'svelte/store'
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

```

## Usage 
Define your store from your custom store. 
NOTE that it is not defined from 'svelte/store'

Then you just use this as you would use a normal svelte store - but it will persist in the browser's localStorage
```javascript
import { writable } from './localStore' 

export const user = writable('user', {
  name: 'there', 
  id: 1 
})
```
