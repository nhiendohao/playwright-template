// import { test } from '@playwright/test';
// import * as fs from 'fs';
// import { simpleGit, CleanOptions, SimpleGit } from 'simple-git';


// /**
//  * git clean :The Git Clean command is used to clean the untracked files in the repository.
//  */
// simpleGit().clean(CleanOptions.FORCE);
// /**
//  * Local path for git dir: /Users/lw11885/git_test
//  */

// const git: SimpleGit = simpleGit('/Users/lw11885/git_test');

// test.skip('C3 Connect to Postgres DB', async () => {
//     /**
//      * Pre steps to clean up dir:/Users/lw11885/git_test/test_git_command
//      */
//     fs.rmSync('/Users/lw11885/git_test/test_git_command', { recursive: true, force: true });
    
//     /**
//      * Git clone sample repo https://github.com/nhiendohao/test_git_command.git
//      */
//     await git.clone('https://github.com/nhiendohao/test_git_command.git');

//     /**
//      * Set current dir to /Users/lw11885/git_test/test_git_command
//      */
//     await git.cwd('/Users/lw11885/git_test/test_git_command')

//     /**
//      * Create new text file 
//      */
//     await fs.writeFileSync('/Users/lw11885/git_test/test_git_command/text.txt', 'new test', 'utf-8');
    
//     /**
//      * Git add new files changes ~ git command : git add _file_name
//      */
//     await git.add('/Users/lw11885/git_test/test_git_command/text.txt');

//     /**
//      * Commit with specific message
//      */
//     await git.commit('Add text files');

//     /**
//      * Push to main branch 
//      */
//     await git.push('https://github.com/nhiendohao/test_git_command.git', 'main');
// });