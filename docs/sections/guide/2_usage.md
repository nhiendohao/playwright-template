
# Run test

Command to run sample test

**Case:**
=== "Run all projects"
    ```bash
    npx playwright test
    ```

**Case:**
=== "Run specifc test project(e.g: run pom project)"
    ```bash
    npx playwright test --project=pom
    ```

**Case:**
=== "Run test on specific environment (e.g: alpha)"
    ```bash
    TEST_ENV=alpha npx playwright test
    ```
**Case:**
=== "DebRunug specific test (e.g: run test for Login.test.ts)"
    ```bash
    npx playwright test Login.test 
    ```

**Case:**
=== "Run specific test at line of code(e.g: run test for Login.test.ts line 13)"

    ```bash
    npx playwright test Login.test:13
    ```