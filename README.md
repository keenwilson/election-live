# ELECT LIVE [![CircleCI](https://img.shields.io/circleci/project/github/codeforthailand/election-live/master.svg?logo=circleci)](https://circleci.com/gh/codeforthailand/election-live) [![Code Climate technical debt](https://img.shields.io/codeclimate/tech-debt/codeforthailand/election-live.svg)](https://codeclimate.com/github/codeforthailand/election-live/maintainability) [![Code Climate maintainability](https://img.shields.io/codeclimate/maintainability/codeforthailand/election-live.svg)](https://codeclimate.com/github/codeforthailand/election-live/maintainability)

[![All Contributors](https://img.shields.io/badge/all_contributors-13-orange.svg?style=flat-square)](#contributors)

Live Scoreboard for Thailand General Election 2562 (2019).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [Development](#development)
  - [@todo comments \*](#todo-comments-)
  - [Prerequisites](#prerequisites)
  - [Install dependencies](#install-dependencies)
  - [Running development server](#running-development-server)
  - [Disable the curtain](#disable-the-curtain)
  - [Resources for developers](#resources-for-developers)
  - [How to add new pages](#how-to-add-new-pages)
  - [Styling](#styling)
  - [Responsive Design](#responsive-design)
  - [Use JSDoc instead of `propTypes`](#use-jsdoc-instead-of-proptypes)
- [Build the project into a static web page](#build-the-project-into-a-static-web-page)
- [Releasing new version](#releasing-new-version)
- [Contributors](#contributors)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Development

This web application is built using [Gatsby](https://www.gatsbyjs.org). We chose to use Gatsby because:

- It sets up the required tooling, such as webpack, Babel, routing (etc.) for us.
- We can add new pages by adding a file in `src/pages`. No need to fiddle with router.
- It has a comprehensive [documentation](https://www.gatsbyjs.org/docs/), including a lot of [recipes](https://www.gatsbyjs.org/docs/recipes/).
- A lot of things can be done just by installing [Gatsby plugins](https://www.gatsbyjs.org/plugins/), such as adding [Google Fonts](https://www.gatsbyjs.org/packages/gatsby-plugin-web-font-loader/), [Google Analytics](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/).

### @todo comments [![PDD status](http://www.0pdd.com/svg?name=codeforthailand/election-live)](http://www.0pdd.com/p?name=codeforthailand/election-live)

[0pdd](https://github.com/yegor256/0pdd#what-does-it-do) helps us keep track of TODOs by converting `@todo` markers in source code into GitHub issue. The created issue will be closed automatically when the corresponding `@todo` marker is removed from the source code.

To add a todo, put a comment in the source code beginning with `@todo`, followed by issue number. If there’s no associated issue, just use the catch-all issue #1. Example:

```js
// @todo #1 Add Analytics, e.g. Google Analytics.
//  Check out Gatsby docs for how to add analytics
//  - Main Guide: https://www.gatsbyjs.org/docs/adding-analytics/
//  - Google Analytics: https://www.gatsbyjs.org/docs/adding-analytics/#using-gatsby-plugin-google-analytics
//  - Google Tag Manager: https://www.gatsbyjs.org/packages/gatsby-plugin-google-tagmanager/
```

Note that if the `@todo` spans multiple lines, subsequent lines must be indented with 1 extra space. [See `@todo` formatting rules.](https://github.com/yegor256/pdd#how-to-format)

### Prerequisites

You need to install these tools first in order to develop this project:

- Node.js (10.x)
- Yarn

### Install dependencies

Before you can start the development server, you have to install the dependencies first.

```
yarn install
```

### Running development server

```
yarn develop
```

### Disable the curtain

When you run the app for the first time, if it’s not yet time to count the election results, the application will be disabled and you will see a curtain with a countdown. To develop this website, you have to disable the curtain first.

1. Go to `/dev`, e.g. http://localhost:8000/dev
2. Toggle the flag `ELECT_DISABLE_CURTAIN`

### Resources for developers

- &rarr; [Gatsby recipes](https://www.gatsbyjs.org/docs/recipes/)
- &rarr; [Gatsby project structure](https://www.gatsbyjs.org/docs/gatsby-project-structure/)

### How to add new pages

Just add a new file in `src/pages` — each `.js` file becomes a new page automatically.

### Styling

We [use](https://www.gatsbyjs.org/docs/emotion/) [emotion](https://emotion.sh/) to style the website. It allows us to keep the CSS code close to the component that uses it.

- Instead of using inline `style` or CSS file, [use the `css` prop](https://emotion.sh/docs/css-prop) with [object styles](https://emotion.sh/docs/css-prop#object-styles). Example:

  ```js
  function Component() {
    return (
      <div
        css={{
          fontSize: 18,
          [media(600)]: {
            fontSize: 20,
          },
        }}
      />
    )
  }
  ```

  [Object styles](https://emotion.sh/docs/css-prop#object-styles) are preferred over [string styles](https://emotion.sh/docs/css-prop#string-styles) because:

  - VS Code can help autocomplete CSS properties and values.
  - Doesn’t require importing the CSS helper (`import { css } from '@emotion/core'`).
  - Can be automatically formatted using [Prettier](https://prettier.io/).

### Responsive Design

Development of the UI is done using mobile-first approach.
The main benefit is that it allows many component to be reused easily.
Most components for mobile can be use as-is on the desktop (just position it in a way that makes sense), while usually components for desktop must be re-implemented for mobile from scratch.

This results in one simple rule: `@media (max-width)` should not be used. Instead, put in the mobile styling first, then use `@media (min-width)` to enhance the component for desktop.

When it come to pre-rendered React applications, there are two main approaches to responsive design: CSS-based and React-based. Each approach has its own pros and cons. We use both approaches in this project, its trade-offs are discussed below:

1. **CSS-based.** We render the same HTML, but use CSS to apply styling.

   - **Pro:** The same markup can be shared.
   - **Pro:** Can be pre-rendered. This makes the component appear immediately while page is loading.
   - **Con:** Usually results in a more complex code, especially when a component looks very different on different screen sizes.

   Usage:

   ```js
   import { media } from "../styles"

   function Thing() {
     return (
       <div
         css={{
           // Mobile-first:
           display: "block",
           // then enhance to desktop:
           [media(600)]: { display: "inline-block" },
         }}
       >
         ...
       </div>
     )
   }
   ```

2. **React-based.** Different markup is rendered based on window size.

   - **Pro:** Can use different markup for different screen sizes. This usually results in simpler code.
   - **Con:** Cannot be pre-rendered, because the server cannot send different HTML code based on screen size. Our `<Responsive />` component will only be mounted after JavaScript is loaded.

   Usage:

   ```js
   import { Responsive } from "../styles"

   function Thing() {
     return (
       <Responsive
         breakpoint={600}
         narrow={<ComponentForMobile />}
         wide={<ComponentForDesktop />}
       />
     )
   }
   ```

   Note that **`<Responsive />` will not be pre-rendered.** This means that sometimes you might need to use both approaches together to prevent layout jumping. For example, if a component is 50 pixels high on mobile and 100 pixels high on desktop:

   ```js
   import { Responsive } from "../styles"

   function Thing() {
     const breakpoint = 600
     return (
       <div
         css={{
           // Reserve the space for component to be mounted.
           height: 50,
           [media(breakpoint)]: { height: 100 },
         }}
       >
         <Responsive
           breakpoint={breakpoint}
           narrow={<ComponentForMobile />}
           wide={<ComponentForDesktop />}
         />
       </div>
     )
   }
   ```

### Use JSDoc instead of `propTypes`

Using JSDoc allows us to specify types of component props more expressively, and allows enhanced integration (and refactoring capability) with Visual Studio Code.

You can define all props in one line:

```js
/**
 * @param {{ party: IParty, hidden: boolean }} props
 */
export default function Unimplemented(props) {
```

...or you can also spell out each prop as a `@param` (where some props needs extra elaboration):

```js
/**
 * @param {object} props
 * @param {IParty} props.party
 * @param {number} props.changeRate - The rate of change in score
 */
export default function MyComponent(props) {
```

## Build the project into a static web page

```
yarn build
```

## Releasing new version

To release a new version, run `/updateelectliveversion 1.0.0-beta.5` slash command in our development Slack channel (only available to collaborators). This will update `package.json` file and deploy to the live website, and will also cause an update bar to display on user’s screen, asking them to refresh.

## Contributors

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
<table><tr><td align="center"><a href="http://dt.in.th/"><img src="https://avatars3.githubusercontent.com/u/193136?v=4" width="100px;" alt="Thai Pangsakulyanont"/><br /><sub><b>Thai Pangsakulyanont</b></sub></a><br /><a href="https://github.com/codeforthailand/election-live/commits?author=dtinth" title="Code">💻</a></td><td align="center"><a href="http://pat.chormai.org/#!/projects"><img src="https://avatars0.githubusercontent.com/u/1214890?v=4" width="100px;" alt="Pattarawat Chormai"/><br /><sub><b>Pattarawat Chormai</b></sub></a><br /><a href="https://github.com/codeforthailand/election-live/commits?author=heytitle" title="Code">💻</a></td><td align="center"><a href="http://kristw.yellowpigz.com"><img src="https://avatars2.githubusercontent.com/u/1659771?v=4" width="100px;" alt="Krist Wongsuphasawat"/><br /><sub><b>Krist Wongsuphasawat</b></sub></a><br /><a href="https://github.com/codeforthailand/election-live/commits?author=kristw" title="Code">💻</a></td><td align="center"><a href="https://github.com/kratuwu"><img src="https://avatars0.githubusercontent.com/u/15684095?v=4" width="100px;" alt="kratuwu"/><br /><sub><b>kratuwu</b></sub></a><br /><a href="https://github.com/codeforthailand/election-live/commits?author=kratuwu" title="Code">💻</a></td><td align="center"><a href="https://aimetpgm.github.io/"><img src="https://avatars1.githubusercontent.com/u/5433758?v=4" width="100px;" alt="AimeTPGM"/><br /><sub><b>AimeTPGM</b></sub></a><br /><a href="https://github.com/codeforthailand/election-live/commits?author=AimeTPGM" title="Code">💻</a></td><td align="center"><a href="http://www.linkedin.com/in/rapee"><img src="https://avatars1.githubusercontent.com/u/924635?v=4" width="100px;" alt="Rapee Suveeranont"/><br /><sub><b>Rapee Suveeranont</b></sub></a><br /><a href="https://github.com/codeforthailand/election-live/commits?author=rapee" title="Code">💻</a></td><td align="center"><a href="https://github.com/NesChaiyapon"><img src="https://avatars2.githubusercontent.com/u/26592279?v=4" width="100px;" alt="Chaiyapon"/><br /><sub><b>Chaiyapon</b></sub></a><br /><a href="https://github.com/codeforthailand/election-live/commits?author=NesChaiyapon" title="Code">💻</a></td></tr><tr><td align="center"><a href="https://github.com/dodadoa"><img src="https://avatars2.githubusercontent.com/u/10590965?v=4" width="100px;" alt="Kiang"/><br /><sub><b>Kiang</b></sub></a><br /><a href="https://github.com/codeforthailand/election-live/commits?author=dodadoa" title="Code">💻</a></td><td align="center"><a href="http://www.whs.in.th/"><img src="https://avatars2.githubusercontent.com/u/345483?v=4" width="100px;" alt="Manatsawin Hanmongkolchai"/><br /><sub><b>Manatsawin Hanmongkolchai</b></sub></a><br /><a href="https://github.com/codeforthailand/election-live/commits?author=whs" title="Code">💻</a></td><td align="center"><a href="https://www.unnawut.com"><img src="https://avatars1.githubusercontent.com/u/921194?v=4" width="100px;" alt="Unnawut Leepaisalsuwanna"/><br /><sub><b>Unnawut Leepaisalsuwanna</b></sub></a><br /><a href="https://github.com/codeforthailand/election-live/commits?author=unnawut" title="Code">💻</a></td><td align="center"><a href="https://github.com/gminemini"><img src="https://avatars1.githubusercontent.com/u/21194656?v=4" width="100px;" alt="gminemini"/><br /><sub><b>gminemini</b></sub></a><br /><a href="https://github.com/codeforthailand/election-live/commits?author=gminemini" title="Code">💻</a></td><td align="center"><a href="https://github.com/Woracheth"><img src="https://avatars0.githubusercontent.com/u/6293218?v=4" width="100px;" alt="Woracheth Sae-lim"/><br /><sub><b>Woracheth Sae-lim</b></sub></a><br /><a href="https://github.com/codeforthailand/election-live/commits?author=Woracheth" title="Code">💻</a></td><td align="center"><a href="https://na399.github.io"><img src="https://avatars0.githubusercontent.com/u/13469652?v=4" width="100px;" alt="Max Natthawut Adulyanukosol"/><br /><sub><b>Max Natthawut Adulyanukosol</b></sub></a><br /><a href="https://github.com/codeforthailand/election-live/commits?author=na399" title="Code">💻</a></td></tr></table>

<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
