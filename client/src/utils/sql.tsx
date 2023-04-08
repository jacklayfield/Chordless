import { CHORD_TYPE } from "../components/songBuilder";

/** Function to construct the sql statement to insert chords of a new song.
 * It will take in the entire chords array and construct a sql statement to insert
 * the chords with the associated song "id".
 */
export function constructInsertAllStatement(chords: CHORD_TYPE[], id: number) {
  let sqlState =
    "INSERT INTO chords(songId, chordIndex, chordNotes, chordName) VALUES";
  for (let i = 0; i < chords.length - 1; i++) {
    sqlState =
      sqlState +
      "(" +
      id +
      ", " +
      i +
      ", '{" +
      String(chords[i].chordArr) +
      "}', '" +
      String(chords[i].chordName) +
      "'),";
  }
  sqlState =
    sqlState +
    "(" +
    id +
    ", " +
    (chords.length - 1) +
    ", '{" +
    String(chords[chords.length - 1].chordArr) +
    "}', '" +
    String(chords[chords.length - 1].chordName) +
    "')";

  return sqlState;
}

/** Function to construct the sql statement to insert the newly added chords.
 * It will take in the entire new chords array and look for the chords with
 * negative ids denoting new chords. It will construct a sql statement to insert
 * the chords with the associated "chordindex".
 */
export function constructInsertAddedStatement(
  chords: CHORD_TYPE[] // The entire chords list
) {}

/** Function to construct the sql statement to update the indicies of the chord
 * rows associated with the song upon one or more new chords being added.
 * Only upon additions do we need to re-order, and this must be done for all
 * chords (due to "delete" not re-ordering with step size 1).
 */
export function constructUpdateIndiciesStatement(
  chords: CHORD_TYPE[] // The entire chords list
) {}

/** Function to construct the sql statement to update existing chords, whose notes
 * have been updated. It will take in a small list of updated chords, and will
 * construct a straightforward statement to update the associated chords name and
 * chord array.
 */
export function constructUpdateChordsStatement(
  chords: CHORD_TYPE[] // The updated chords list
) {}

/** Function to construct the sql statement to delete chords. This will take in
 * a list of chordIds and construct a sql statement to delete the chords for
 * said chordIds.
 */
export function constructDeleteChordsStatement(
  chordIndicies: number[] // Indicies for the chords to be deleted
) {}
