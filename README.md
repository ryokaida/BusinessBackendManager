# Business Backend Manager
Web application to automate backend business processes
<br /><br />
**References**
<br /><br />
[abarron-linkedin], et. Al. (2023, November, 30). *Authorization Code Flow (3-legged OAuth)*. Microsoft. https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?tabs=HTTPS1
<br /><br />
De Andrade, E. S. (2025, January 25). *Automated Python Unit Testing Made Easy with Pytest and GitHub Actions*. Pytest with Eric. https://pytest-with-eric.com/integrations/pytest-github-actions/
GitHub, Inc. (2025). *Building and testing Node.js*. GitHub. https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-nodejs
<br /><br />
Geoffrey, B. (2023, October 24). *Why I get No module named 'requests' within the github actions runner?* [Online forum post]. Stack Overflow. https://stackoverflow.com/questions/77353375/why-i-get-no-module-named-requests-within-the-github-actions-runner
<br /><br />
GitHub, Inc. (2025). *Building and testing Node.js*. GitHub. https://docs.github.com/en/actions/use-cases-and-examples/building-and-testing/building-and-testing-nodejs
<br /><br />
GitHub, Inc. (2025). *Quickstart for GitHub Actions*. GitHub. https://docs.github.com/en/actions/writing-workflows/quickstart
<br /><br />
[GroenteLepel]. (2020, December 1). *Github pytest Action failing to import from tests/ folder*. [Online forum post]. Stack Overflow. https://stackoverflow.com/questions/65090928/github-pytest-action-failing-to-import-from-tests-folder
<br /><br />
[hpanchag]. (2025, February 2). *Sign In with LinkedIn using OpenID Connect*. Microsoft. https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2
<br /><br />
[johnbeynon]. (n.d.). *Render Deploy Action*. GitHub. https://github.com/marketplace/actions/render-deploy-action
<br /><br />
[katestud]. (2019, November 6). *example-actions-phonex/.github/workflows/test_and_release.yml*. GitHub. https://github.com/katestud/example-actions-phoenix/blob/main/.github/workflows/test_and_release.yml
<br /><br />
Krekel, H., et. Al. (2015). *Get Started*. pytest. https://docs.pytest.org/en/stable/getting-started.html#get-started
<br /><br />
Lizardo, A. (2023, June 22). *Building a Real-Time Search Filter in React: A Step-by-Step Guide*. DEV. https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm
<br /><br />
Miedema, T. (2020, December 1). *qiskit-quantum-knn/pytest.ini*. GitHub. https://github.com/GroenteLepel/qiskit-quantum-knn/blob/master/pytest.ini
Samuel, F. S. (2023, May 15). *How to Secure Your MERN Stack App with JWT-Based User Authentication and Authorization*. freeCodeCamp. https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
<br /><br />
(2025, February 23). *OAuth 2.0 for Client-side Web Applications*. Google. https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
<br /><br />
For the CI/CD YAML file, I incorporated the *Atlas CLI GitHub Action* by mongodb and the *Render Deploy Action* by johnbeynon from the Marketplace.

# Installing the dependencies
Once you have cloned the project, run `npm install` to install the project dependencies.

# .env File Setup
This project uses a .env file to load the MongoDB Connection String when connecting to the database.
## Instructions
1. Create a .env file at the root of the project.
2. Ensure that your .env file contains the below
```
ATLAS_URI=<insert your MongoDB connection string here>
TOKEN_KEY=<insert your random string here>
```