# Business Backend Manager
Web application to automate backend business processes
<br /><br />
References
<br />
[abarron-linkedin], et. Al. (2023, November, 30). *Authorization Code Flow (3-legged OAuth)*. Microsoft. https://learn.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?tabs=HTTPS1
<br />
[hpanchag]. (2025, February 2). *Sign In with LinkedIn using OpenID Connect*. Microsoft. https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/sign-in-with-linkedin-v2
<br />
Krekel, H., et. Al. (2015). *Get Started*. pytest. https://docs.pytest.org/en/stable/getting-started.html#get-started
<br />
Lizardo, A. (2023, June 22). *Building a Real-Time Search Filter in React: A Step-by-Step Guide*. DEV. https://dev.to/alais29dev/building-a-real-time-search-filter-in-react-a-step-by-step-guide-3lmm
<br />
Samuel, F. S. (2023, May 15). *How to Secure Your MERN Stack App with JWT-Based User Authentication and Authorization*. freeCodeCamp. https://www.freecodecamp.org/news/how-to-secure-your-mern-stack-application/
<br />
(2025, February 23). *OAuth 2.0 for Client-side Web Applications*. Google. https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow
<br />

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