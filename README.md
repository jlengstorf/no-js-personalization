# Personalized UIs with No Client-Side JavaScript

This is an experiment with Netlify Edge Functions to show how we can create adaptive UIs without client-side JavaScript.

This example uses Edge Functions to set and read a cookie. 

- Every time the user navigates to a new page on the site, the cookie is updated with a score for the type of content that was visited
- The score reflects an assumed interest in that category of content (more clicks === more interest is the assumption)
- When the home page is loaded, products are sorted so the most interesting show up first based on the user's current score

Try it out here: https://no-js-personalization.netlify.app/

## Local development

```sh
# clone the repo
git clone git@github.com:jlengstorf/no-js-personalization.git

# move into the folder
cd no-js-personalization/

# install dependencies
npm i

# install the Netlify CLI
npm i -g netlify-cli

# start the local dev server
ntl dev
```

## Stack

This demo uses:
- [Netlify Edge Functions](https://no-js-personalization.netlify.app/)
- [Netlify serverless functions](https://docs.netlify.com/functions/overview/) with [On-Demand Builders](https://docs.netlify.com/configure-builds/on-demand-builders/#app)
- [Hasura Cloud](https://cloud.hasura.io/)
- [Unsplash](https://unsplash.com/) for images
- Plain HTML + CSS
