Problem with one loop of promises:

- If we want to complete this task only with one loop of promises, then we cannot achieve the concurrency behaviour.

Solution with my approach:

- I used three different functions for the readability of code.
- In a funciton named `manageConcurrency`, I wrapped all the tasks in a parent Promise so that i can use resolve function of a promise to resolve the pending promises easily
- I initialized function names as `next` within `manageConcurrency` function to access the the scope of variables belongs to `manageConcurrency` function