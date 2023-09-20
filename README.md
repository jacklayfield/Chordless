# Chordless

## [app.chordless.net](https://app.chordless.net)

## Demo: https://www.youtube.com/watch?v=J8fvorIcCiU

An app designed to help make songwriting effortless for guitarists. <br />

## Motivation

While many guitar songwriting applications exist, they do not offer the ability to construct <br />
chords on a fretboard. This means you will either have to know every shape or rely on using tabs. <br />
This impedes creativity especially for begginers and even intermediate guitarists who are not <br />
familar with all shapes and who might find tabs to be difficult to create or read. This appplication <br />
addresses this need. <br />

## Analysis

In hindsight, Redux or Context could have been useful for state management when it came to the chords especially things like "muted" strings which needed to be passed around through several layers of the system. Prop drilling definitely became a slight concern here, but I do not think it was a huge issue as most cases were 2/3 levels deep with the exception of a few cases where we were 3-5 levels deep. <br />
Structurally, I think this project was well organized. <br />
Minor cleanup could help readability, and best practices could have been more consistent. <br />

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

I am not using a tool like Redux w/ RTK query for this app. In the future, if this app grows I will consider replacing the current infrastructure. For now I use the following for api requests which I found to be the most simple, clean, and concise: <br />

```javascript
export const apiRequest = async (reqFunction: Function) => {
  let res = await reqFunction();
  if (isForbidden(res)) {
    const tokenRes = await refreshToken();
    if (tokenRes.status === 200) {
      res = await reqFunction();
    }
  }
  return res;
};
```

'reqFunction' is going to be the function that contains the actual axios request. These functions are defined in their category dependant api files on the frontend (ex. apiSong.tsx). <br />

This structure works by defining a 'res' variable housing the result of the axios query passed in from 'reqFunction'. Then, this res is checked to see if it returning a 'forbidden' (403) status. If so, we want to then refresh our token. If this returns success, we can try our 'reqFunction' again, assigning 'res' again to be the updated result from this second call. After this we can simply check 'res.status' and call the appropriate code (like we normally would). <br />

Here is an example of how we could invoke this using the "createSongRequest" api request function defined in "apiSong.tsx": <br />

```javascript
let res = await apiRequest(() => createSongRequest(songName, chords));
```

And that's it! <br />

#### TODO

[X] Transfer page related elements out of guitar component <br />
[X] Cleanup: profile/about page styling <br />
[X] Feature: Add Confirmations for deleting chords/songs <br />
[X] Bug: Fix bug with selecting top string <br />
[X] Bug: Refresh tokens not generating token prior to loading page on refresh after real token expired. <br />
[X] Cleanup: get rid of unnecessary nested try catch blocks in auth route <br />
[X] Bug: Mute buttons with "-0" not showing up on song view. <br />
[X] General: "Create account" window redirection and popup after submit <br />
[X] Bug: Odd logout bug that occours when trying to logout from CreateSong page <br />
[X] General: If user not signed in, do NOT let them create a song <br />
[X] General: "Create song" window redirection and popup after submit <br />
[X] Cleanup: Organize css files <br />
[X] Cleanup: Change unnececessary div wrappers to fragments <br />
[] Cleanup: Group imports <br />
[X] Cleanup: Consolidate songBuilder / createSong page (No need to have these two separated) <br />
[X] Improvement: Break down larger components into smaller sub-components<br />
[X] Improvement: Create components for general styling <br />
[X] Cleanup: Change conditional rendering to be if else when more than 2 possibilities <br />
[X] Bug: While idle for some time, when a post request is performed, a token may expire which would cause the request to fail despite the refresh token being valid <br />
[] General: Find a better way of handling the page update after updating a song <br />
[X]General: Apply the token bug error to all post requests and perhaps create a general function for this behavior <br />
[] Improvement: Add TimeStamps to songs <br />
[] Improvement: Add some automated testing <br />
[X] Improvement: Handle JWT token confirmation better (add designated middleware section) <br />
[] Cleanup: clean up inserts and use model <br />
[X]Cleanup: get rid of create flag in manager <br />
[X] Bug: bio/name do not get updated upon token refresh <br/>

[X] Deployment: Deploy app v1! (ensure all major bugs / cleanup addressed) <br/>
