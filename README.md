# Chordless

An app designed to help make songwriting effortless for guitarists. <br />

# Todo

DONE Transfer page related elements out of guitar component <br />
Cleanup: profile/about page styling <br />
Feature: Add Confirmations for deleting chords/songs <br />
DONE Fix bug with selecting top string <br />
Bug: Refresh tokens not generating token prior to loading page on refresh after real token expired. <br />
Cleanup: get rid of unnecessary nested try catch blocks in auth route <br />
Bug: Mute buttons with "-0" not showing up on song view. <br />
DONE General: "Create account" window redirection and popup after submit <br />
Bug: Odd logout bug that occours when trying to logout from CreateSong page <br />
General: If user not signed in, do NOT let them create a song <br />
DONE General: "Create song" window redirection and popup after submit <br />
Improvement: If user not logged in, try to handle context more efficiently (Already configured to not waste a DB query, but no api call at all would be better). <br />
