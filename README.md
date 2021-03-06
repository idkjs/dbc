# @yawaramin/dbc

This is a small library to help you program in a design-by-contract
style in JavaScript and ReasonML (i.e. BuckleScript).

## Rationale

When targeting JavaScript, even when using a safer language like
ReasonML, it's nice to have more guarantees about invariants in your
programs. Types provide some of those guarantees, but not all. Design-by-
contract style allows you to catch problems as soon as possible–right at
the start and end of function bodies.

<details>
<summary>Note on defensive programming</summary>
This may sound like defensive programming–you know, doing checks before
doing anything. It's actually not–DBC is meant to be used only to enforce
_contracts,_ i.e. only at the start and end of public functions. You
wouldn't use it in private functions.

But this note on defensive programming from the excellent
[Cornell CS3110 course](http://www.cs.cornell.edu/courses/cs3110/2019sp/textbook/basics/defensive.html) is worth mentioning here:

> Sometimes programmers worry unnecessarily that defensive programming
> will be too expensive—either in terms of the time it costs them to
> implement the checks initially, or in the run-time costs that will be
> paid in checking assertions. These concerns are far too often
> misplaced. The time and money it costs society to repair faults in
> software suggests that we could all afford to have programs that run a
> little more slowly.
</details>

## Usage

For JavaScript, usage is as follows.

### `contract(body[, pre[, post]])`

The `body` is the body of the function itself, and is required. `pre` is
an array of (array) pairs of string descriptions and boolean
preconditions, and is optional. `post` is a function that takes the final
result of the function being contracted, and returns an array of pairs of
postcondition descriptions and booleans.

Throws a `TypeError` at the first precondition or postcondition
violation.

### `pre`, `post`

These are older APIs; you'll probably want to use `contract` instead.

### Example

```javascript
const {contract} = require('@yawaramin/dbc');

const safeDiv = (num, denom) => contract(
  num / denom,
  /* pre: */ [
    ['num >= denom', num >= denom],
    ['denom !== 0', denom !== 0],
  ],
  /* post: */ result => [
    ['safeDiv(num, denom) * denom === num', result * denom === num],
  ],
);

const makeUser = (name, age) => contract(
  {name, age},
  /* pre: */ [['age >= 13', age >= 13]],
  // post is optional
);
```

### ReasonML/BuckleScript

See the `src/Yawaramin__Dbc.mli` file for detailed ReasonML documentation
on the functions, and `src/Test.re` for example usage.

ReasonML usage has an extra feature if you need it: all checks can be
erased for production use. The idea being that you test thoroughly with
all checks turned on during development, and deploy with them turned off
(if you need to). See below for the command.

### Tips

For best results, don't use this library to check types (including '`x`
is not `null`'). I recommend using a typechecker (like ReasonML or
TypeScript) to do that. Use `pre` and `post` to check invariants that
can't _easily_ be expressed as types, like 'weight must be 5 kg minimum'.

# Build

Development:

    npm run build

Production:

    NODE_ENV=production npm run build # this turns off all checks

If you actually decide to keep checks on in production (imho a good
thing), you can always keep them on explicitly:

    NODE_ENV= npm run build

# Test

    npm test
