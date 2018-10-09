# Mailplate
Html email boilerplate, using MJML.

## About
Mailplate is a html email boilerplate, using MJML, Handlebars and Sass.

## Folderstructure
### data
Js and json files in this folder get loaded and are accessible in handlebars under the filename.
So events.json would be called as ```{{ events }}```.

### layouts
Handlebarsfiles (*.hbs) get loaded as layouts and are extendable. For more info, have a look at handlebars-layouts.

### pages
These are your emails or pages, written in hbs. To work on multiple projects, you can save each page in its own folder, with its assets.

### partials
Normal hbs partials, that can be used like small components.

### sass
All sass files in this folder, get injected into your pages.

## Build
```js
  npm run build
```