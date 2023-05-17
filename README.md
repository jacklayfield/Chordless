# Chordless

An app designed to help make songwriting effortless for guitarists. <br />

## Motivation

While many guitar songwriting applications exist, they do not offer the ability to construct <br />
chords on a fretboard. This means you will either have to know every shape or rely on using tabs. <br />
This impedes creativity especially for begginers and even intermediate guitarists who are not <br />
familar with all shapes and who might find tabs to be difficult to create or read. This appplication <br />
addresses this need. <br />

## Stack

This project uses React + Typescript, Express, Node.js, and PostgreSQL. <br />

## Structure

### API:

#### config: contains temporary values for encoding

#### database: contains sequilize init for database

#### models: database models

#### routes: api endpoints

#### <index.js>: server

### Client:

#### components: Directory for all components

##### ↳ general: Components that don't fit a specific category

##### ↳ guitar: Components used to build the guitar interface/display

##### ↳ song: Components related to song editing / creation / display

##### ↳ theme: Components used to build universal app features

#### context: User context for retrieiving the user if logged in

#### hooks: Custom hooks

#### images: App images (not user)

#### pages: App pages (highest level)

#### styling: CSS styling

#### utils: Helper functions, constants, etc.

## Notes:

#### API requests

I am not using a tool like Redux w/ RTK query for this app. In the future, if this app grows I will consider replacing the current infrastructure. For now I will do the following for api requests which I found to be the most simple, clean, and concise: <br />

```javascript
let res = await FUNCTION(DATA);
if (isForbidden(res)) {
  const tokenRefreshed = await refreshToken();
  if (tokenRefreshed) {
    res = await FUNCTION(DATA);
  }
}

if (res.status === 200) {
  doSuccess();
} else {
  doFailure();
}
```

<br />
Anything in all caps is a parameter to this structure. <br />

So 'FUNCTION' is going to be the function that contains the actual axios request. These functions are defined in their category dependant api files on the frontend (ex. apiSong.tsx). <br />

'DATA' is any of the data you are passing to the axios call within 'FUNCTION'. <br />

This structure works by defining a 'res' variable housing the result of the axios query passed in from 'FUNCTION'. Then, this res is checked to see if it returning a 'forbidden' (403) status. If so, we want to then refresh our token. If this returns success, we can try our 'FUNCTION' again, assigning 'res' again to be the updated result from this second call. After this we can simply check 'res.status' and call the appropriate code (like we normally would) <br />

And that's it! <br />

#### TODO

-DONE Transfer page related elements out of guitar component <br />
-DONE Cleanup: profile/about page styling <br />
-DONE Feature: Add Confirmations for deleting chords/songs <br />
-DONE Bug: Fix bug with selecting top string <br />
-DONE Bug: Refresh tokens not generating token prior to loading page on refresh after real token expired. <br />
-DONE Cleanup: get rid of unnecessary nested try catch blocks in auth route <br />
-DONE Bug: Mute buttons with "-0" not showing up on song view. <br />
-DONE General: "Create account" window redirection and popup after submit <br />
-DONE Bug: Odd logout bug that occours when trying to logout from CreateSong page <br />
-DONE General: If user not signed in, do NOT let them create a song <br />
-DONE General: "Create song" window redirection and popup after submit <br />
**Improvement: If user not logged in, try to handle context more efficiently (Already configured to not waste a DB query, but no api call at all would be better).** <br />
-DONE Cleanup: Organize css files <br />
**Cleanup: Change unnececessary div wrappers to fragments** <br />
**Cleanup: Shorthands for bool/strings in props** <br />
**Cleanup: Group imports** <br />
-DONE Cleanup: Consolidate songBuilder / createSong page (No need to have these two separated) <br />
-DONE Improvement: Break down larger components into smaller sub-components<br />
**Improvement: Create components for general styling** <br />
**Cleanup: Change conditional rendering to be if else when more than 2 possibilities** <br />
**Cleanup: Create 'Edit mode' conditional render, do not conditionally render all items'** <br />
-DONE Bug: While idle for some time, when a post request is performed, a token may expire which would cause the request to fail despite the refresh token being valid <br />
**General: Find a better way of handling the page update after updating a song** <br />
**General: Apply the token bug error to all post requests and perhaps create a general function for this behavior** <br />
**Improvement: Add TimeStamps to songs** <br />
**Improvement: (Extra): Apply chordManager to createSong** <br />
**Improvement: Add some automated testing** <br />
**Improvement: Handle JWT token confirmation better (add designated middleware section)** <br />
**Cleanup: clean up inserts and use model** <br />
**Cleanup: get rid of create flag in manager** <br />

**Deployment: Deploy app v1! (ensure all major bugs / cleanup addressed)** <br/>
