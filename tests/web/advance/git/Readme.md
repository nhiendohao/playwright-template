# Simple scenarios for Git commands

## Prequisites

- simple-git

```shell
npm i simple-git
```

## Usage

Include in a TypeScript app using the bundled type definitions

```ts
import { simpleGit, SimpleGit, CleanOptions } from 'simple-git';

const git: SimpleGit = simpleGit().clean(CleanOptions.FORCE);
```

## Configuration

Configure each `simple-git` instance with a properties object passed to the main `simpleGit` function:

```ts
import { simpleGit, SimpleGit, SimpleGitOptions } from 'simple-git';

const options: Partial<SimpleGitOptions> = {
   baseDir: process.cwd(),
   binary: 'git',
   maxConcurrentProcesses: 6,
   trimmed: false,
};

// when setting all options in a single object
const git: SimpleGit = simpleGit(options);

// or split out the baseDir, supported for backward compatibility
const git: SimpleGit = simpleGit('/some/path', { binary: 'git' });
```

The first argument can be either a string (representing the working directory for `git` commands to run in), `SimpleGitOptions` object or `undefined`, the second parameter is an optional `SimpleGitOptions` object.

### Authentication

The easiest way to supply a username / password to the remote host is to include it in the URL, for example:

```js
const USER = 'something';
const PASS = 'somewhere';
const REPO = 'github.com/username/private-repo';

const remote = `https://${USER}:${PASS}@${REPO}`;

simpleGit()
   .clone(remote)
   .then(() => console.log('finished'))
   .catch((err) => console.error('failed: ', err));
```

Be sure to not enable debug logging when using this mechanism for authentication to ensure passwords aren't logged to stdout.

### Catching errors in async code

To catch errors in async code, either wrap the whole chain in a try/catch:

```js
const git = simpleGit();
try {
   await git.init();
   await git.addRemote(name, repoUrl);
} catch (e) {
   /* handle all errors here */
}
```

or catch individual steps to permit the main chain to carry on executing rather than jumping to the final `catch` on the first error:

```js
const git = simpleGit();
try {
   await git.init().catch(ignoreError);
   await git.addRemote(name, repoUrl);
} catch (e) {
   /* handle all errors here */
}

function ignoreError() {}
```

### Debug Logging

This library uses [debug](https://www.npmjs.com/package/debug) to handle logging, to enable logging, use either the environment variable:

```node
"DEBUG=simple-git" node ./your-app.js 
```

Or explicitly enable logging using the `debug` library itself:

```js notranslate position-relative overflow-auto
const debug = require('debug');
const simpleGit = require('simple-git');

debug.enable('simple-git,simple-git:*');
simpleGit().init().then(() => console.log('DONE'));
```

```ts notranslate position-relative overflow-auto
import debug from 'debug';
import { simpleGit } from 'simple-git';

debug.enable('simple-git,simple-git:*');
simpleGit().init().then(() => console.log('DONE'));
```

### Verbose Logging Options

If the regular logs aren't sufficient to find the source of your issue, enable one or more of the following for a more complete look at what the library is doing:

- `DEBUG=simple-git` the least verbose logging, used as a high-level overview of what the library is doing
- `DEBUG=simple-git:task:*` adds debug output for each task being run through the library
- `DEBUG=simple-git:task:add:*` adds debug output for specific git commands, just replace the `add` with the command you need to investigate. To output multiple just add them both to the environment variable eg: `DEBUG=simple-git:task:add:*,simple-git:task:commit:*`
- `DEBUG=simple-git:output:*` logs the raw data received from the git process on both `stdOut` and `stdErr`
- `DEBUG=simple-git,simple-git:*` logs *everything*

### Problems enabling logs programmatically

The programmatic method of enabling / disabling logs through the `debug` library should 'just work', but you may have issues when there are multiple versions of `debug` available in the dependency tree. The simplest way to resolve that is to use a `resolutions` override in the `package.json`.

For example this `package.json` depends on an old version of `simple-git` but instead of allowing `simple-git` to use its own old version of `debug`, `npm` would use version `4.3.1` throughout.

```json notranslate position-relative overflow-auto
{
   "name": "my-app",
   "dependencies": {
      "simple-git": "^2.21.0",
      "debug": "^4.3.1"
   },
   "resolutions": {
      "debug": "^4.3.1"
   }
}
```
