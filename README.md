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
**Cleanup: Create a place to put universal constants** <br />
**Cleanup: Change unnececessary div wrappers to fragments** <br />
**Cleanup: Shorthands for bool/strings in props** <br />
**Cleanup: Group imports** <br />
-DONE Cleanup: Consolidate songBuilder / createSong page (No need to have these two separated) <br />
**Improvement: Break down larger components into smaller sub-components** <br />
**Improvement: Create components for general styling** <br />
**Cleanup: Change conditional rendering to be if else when more than 2 possibilities** <br />
**Cleanup: Create 'Edit mode' conditional render, do not conditionally render all items'** <br />
**Bug: During editing, a token may expire which would cause a subsequent "save changes" request to fail.: THIS NOW HAS A "FIX", JUST NEED TO FINISH EVERYTHING** <br />
**General: Find a better way of handling the page update after updating a song** <br />
