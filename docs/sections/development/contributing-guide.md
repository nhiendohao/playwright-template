# Contributing to `My Playwright Project`

`My Playwright Project` is open source testing framework. It is what it is today because community members have opened issues, provided feedback, and contributed to the knowledge loop. Whether you are a seasoned open source contributor or a first-time committer, we welcome and encourage you to contribute code, documentation, ideas, or problem statements to this project.

1. [About this document](#about-this-document)
2. [Getting the code](#getting-the-code)
3. [Setting up an environment](#setting-up-an-environment)
4. [Testing My Playwright Project](#testing)
5. [Submitting a Pull Request](#submitting-a-pull-request)

## About this document

The rest of this document serves as a more granular guide for contributing code changes to `My Playwright Project` (this repository). It is not intended as a guide for using `Automation Testing 101`, and some pieces assume a level of familiarity with Typescripts & Automation Test experiences. Specific code snippets in this guide assume you are using macOS or Linux and are comfortable with the command line.

- **Branches:** All pull requests from community contributors should target the `main` branch (default). If the change is needed as a patch for a minor version of dbt that has already been released (or is already a release candidate), a maintainer will backport the changes in your PR to the relevant "latest" release branch (`1.0.<latest>`, `1.1.<latest>`, ...). If an issue fix applies to a release branch, that fix should be first committed to the development branch and then to the release branch (rarely release-branch fixes may not apply to `main`).
- **Releases**: Before releasing a new minor version, we prepare a series of beta release candidates to allow users to test the new version in live environments. This is an important quality assurance step, as it exposes the new code to a wide variety of complicated deployments and can surface bugs before official release. Releases are accessible via pip.

### External contributor

You can contribute to `My Playwright Project` by forking the `My Playwright Project` repository. For a detailed overview on forking, check out the [GitHub docs on forking](https://help.github.com/en/articles/fork-a-repo). In short, you will need to:

1. Fork the `My Playwright Project` repository
2. Clone your fork locally
3. Check out a new branch for your proposed changes
4. Push changes to your fork
5. Open a pull request against `https://github.com/nhiendohao/playwright-template` from your forked repository

## Setting up an environment

There are some tools that will be helpful to you in developing locally. While this is the list relevant for `My Playwright Project` development, many of these tools are used commonly across open-source Typescripts projects.

## Tools

- Visual Studio Code with [Playwright extension](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)
- [Install nodejs](https://nodejs.org/en/download)
- Install playwright

<div class="termynal" data-ty-startDelay="600">
    <span data-ty="input" data-ty-prompt="$ ~/repo>">npx playwright install --with-deps</span>
</div>

- Install some dependencies:
<div class="termynal" data-ty-startDelay="600">
    <span data-ty="input" data-ty-prompt="$ ~/repo>">npm install</span>
</div>

## Submitting a Pull Request

Code can be merged into the current development branch `main` by opening a pull request. Maintainer will review your PR. They may suggest code revision for style or clarity, or request that you add unit or integration test(s). These are good things! We believe that, with a little bit of help, anyone can contribute high-quality code.

Automated tests run via GitHub Actions / CircleCI. If you're a first-time contributor, all tests (including code checks and unit tests) will require a maintainer to approve. Changes in the `My Playwright Project` repository trigger integration tests against heroku test app.

Once all tests are passing and your PR has been approved,`My Playwright Project` maintainer will merge your changes into the active development branch. And that's it! Happy developing :tada:
