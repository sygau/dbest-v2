@sanity/table

Sometimes a table is what you need. But do consider a more structured approach first!
Sanity Table Plugin

    For the v2 version, please refer to the v2 repository.

This is a (triple) fork of the Sanity Plugin Table, migrated to Sanity Studio V3. Only the v3 version is maintained by Sanity.io.

example
Acknowledgements

Big thanks to the original contributors for their work!

    Original version: rdunk/sanity-plugin-table.
    Further improvements in fork MathisBullinger/sanity-plugin-another-table.
    Initial V3 port: bitfo/sanity-plugin-table

Disclaimer

Sometimes a table is just what you need. However, before using the Table plugin, consider if there are other ways to model your data that are:

    easier to edit and validate
    easier to query

Approaching your schemas in a more structured manner can often pay dividends down the line.
Install

Install using npm

$ npm i --save @sanity/table

Usage

Add the plugin to your project configuration. Then use the type in your schemas

// sanity.config.ts

import { defineConfig } from 'sanity';

import { table } from '@sanity/table';

export default defineConfig({
  name: 'default',
  title: 'My Cool Project',
  projectId: 'my-project-id',
  dataset: 'production',
  plugins: [
    // Include the table plugin
    table(),
  ],
  schema: {
    types: [
      {
        name: 'product',
        title: 'Product',
        type: 'document',
        fields: [
          {
            // Include the table as a field
            // Giving it a semantic title
            name: 'sizeChart',
            title: 'Size Chart',
            type: 'table',
          },
        ],
      },
    ],
  },
});

Configuration

You can optionally configure the _type used for the row object in the table schema by passing a rowType when adding the plugin. For most users this is unnecessary, but it can be useful if you are migrating from a legacy table plugin.

export default defineConfig({
  // ...
  plugins: [
    table({
      rowType: 'my-custom-row-type',
    }),
  ],
  // ...
});





@sanity/code-input
What is it?

Code input for Sanity.

A subset of languages and features are exposed by default. More can be added via the plugin options.

Code input

Click the line numbers to toggle line highlighting.
Installation

npm install @sanity/code-input

Usage

Add it as a plugin in sanity.config.ts (or .js):

import {defineConfig} from 'sanity'
import {codeInput} from '@sanity/code-input'

export default defineConfig({
  // ...
  plugins: [codeInput()],
})

Now you can use the code type in your schema types:

import {defineType, defineField} from 'sanity'

defineType({
  // [...]
  fields: [
    defineField({
      type: 'code',
      name: 'myCodeField',
      title: 'My code field',
    }),
  ],
})

Options

    language - Default language for this code field.
    languageAlternatives - Array of languages that should be available (se its format in the example below)
    withFilename - Boolean option to display input field for filename

//...fields,
defineField({
  type: 'code',
  name: 'myCodeField',
  title: 'Code with all options',
  options: {
    language: 'javascript',
    languageAlternatives: [
      {title: 'Javascript', value: 'javascript'},
      {title: 'HTML', value: 'html'},
      {title: 'CSS', value: 'css'},
    ],
    withFilename: true,
  },
})

Code input with all options in dark mode
Add support for more languages

Only a subset of languages are have syntax highlighting support by default (see full list here).
Mode: Reuse an existing language

Some languages are similar enough, that reusing one of the default highlighters will be "good enough". To reuse an existing language, specify mode for a value in languageAlternatives:

//...fields,
defineField({
  name: 'zhOnly',
  type: 'code',
  options: {
    language: 'zh',
    languageAlternatives: [
      //Adds support for zh language, using sh syntax highlighting
      {title: 'ZH', value: 'zh', mode: 'sh'},
    ],
  },
})

Add more languages

You can add support for additional languages, or override existing ones, by providing a codeModes array to the plugin. codeModes should be an array where each value is an object with a name and a loader function. The loader function should return a codemirror Extension or a Promise that resolves to Extension.

The loader function will be invoked when the language is selected.

For a full list of officialy code-mirror languages, see:
Example: Add support for CodeMirror 6 language (Angular)

We can add support for a CodeMirror 6 lang package:

// sanity.config.js

// ... in the plugins array of defineConfig, where we add the codeInput plugin
codeInput({
  codeModes: [
    {
      name: 'angular',
      // dynamic import the angular package, and initialize the plugin after it is loaded
      // This way, the language is only when it is selected
      loader: () => import('@codemirror/lang-angular').then(({angular}) => angular()),
    },
  ],
})

// in a code field, you can now use rust as a language as a value, or mode
defineField({
  name: 'exampleRust',
  title: 'Example usage',
  type: 'code',
  options: {
    languageAlternatives: [
      {title: 'Javascript', value: 'javascript'},
      {title: 'Angular', value: 'angular'},
      {title: 'Angular-like', value: 'angular-like', mode: 'angular'}, // uses angular highlighter
    ],
  },
})

For this to work, you will have to run npm i @codemirror/lang-angular as this package is not included by @sanity/code-input.
Example: Add support for CodeMirror 5 legacy language (Rust)

We can add support for any CodeMirror 5 legacy language using CodeMirror 6 StreamLanguage.

// sanity.config.js
import {StreamLanguage} from '@codemirror/language'

// ... in the plugins array of defineConfig, where we add the codeInput plugin
codeInput({
  codeModes: [
    {
      name: 'rust',
      // dynamic import so the language is only be loaded on demand
      loader: () =>
        import('@codemirror/legacy-modes/mode/rust').then(({rust}) => StreamLanguage.define(rust)),
    },
  ],
})

// in a code field, you can now use rust as a language as a value, or mode
defineField({
  name: 'exampleRust',
  title: 'Example usage',
  type: 'code',
  options: {
    languageAlternatives: [
      {title: 'Javascript', value: 'javascript'},
      {title: 'Rust', value: 'rust'},
      {title: 'Rust-like', value: 'rust-like', mode: 'rust'}, // uses rust highlighter
    ],
  },
})

Note: @sanity/code-input already includes the @codemirror/legacy-modes and @codemirror/language dependencies, so no need to install them explicitly.
Data model

{
  _type: 'code',
  language: 'js',
  highlightedLines: [1, 2],
  code: 'const foo = "bar"\nconsole.log(foo.toUpperCase())\n// BAR',
  filename: 'available when enabled'
}

Example usage in frontend (React)

You can use any syntax highlighter you want - but not all of them might support highlighted lines or the syntax you've defined.

As outlined above, the actual code is stored in a code property, so if your schema has a field called codeExample of type code, the property you'd want to pass to the highlighter would be codeExample.code.

Here's an example using react-refractor:

import React from 'react'
import Refractor from 'react-refractor'
import js from 'refractor/lang/javascript'

Refractor.registerLanguage(js)

export function Code(props) {
  return (
    <Refractor
      // In this example, `props` is the value of a `code` field
      language={props.language}
      value={props.code}
      markers={props.highlightedLines}
    />
  )
}

Rich table plugin for Sanity

A modern structured Table with Portable Text cells - even works in Portable Text as a block!

By Saskia Bobinska
Rich table plugin for Sanity

The last rich table plugin for Sanity you will need!
Screenshot 2026-01-30 at 20 17 38
Features

Please be aware, that this plugin is still growing - so while this first version is doing the job, there will be more features coming soon!

    100% Typescript
    Initialise a table with intuitive table selection by click or drag
    Rich table schema type richTable with Portable Text based cells
    Portable Text block type richTableBlock
    Portable Text editor goodies like Slash commands, Markdown shortcuts, LinkPlugin and emoji picker - thanks to the amazing work of Christian Groengaard!
    Optional row and column titles
    Expandable table dialog
    Advanced row and column menus (move, delete, add new inline)
    Option to show table headers
    Unset table data with a button & confirmation dialog
    Dark and light mode support 😎

Preview of inline slash command
Slash command picker on top of the toolbar
Screenshot 2026-01-30 at 20 18 21	Screenshot 2026-01-30 at 20 18 28
Column context menu	Row context menu
Compatibility
Plugin version	Sanity	React	Node
≥ 1.1.0	5.x (≥ 5.11.0)	19	≥ 18
1.0.5	3.x / 4.x / 5.x (< 5.13)	18–19	≥ 18

    Why the change? Starting with Sanity 5.13.0, the internal @portabletext/sanity-bridge package was upgraded to v3, which requires @portabletext/editor v6 and @portabletext/toolbar v7. These packages in turn require React 19. Plugin versions ≥ 1.1.0 ship the updated @portabletext/* stack so that studio builds (sanity build, sanity deploy, etc.) work correctly.

    If you are on Sanity 3 or 4 (React 18), pin the plugin to the last compatible release:

    npm install sanity-plugin-rich-table@1.0.5

Installation

npm install sanity-plugin-rich-table
# or
pnpm add sanity-plugin-rich-table
# or
yarn add sanity-plugin-rich-table

Usage

Add it as a plugin in sanity.config.ts (or .js):

import {defineConfig} from 'sanity'
import {richTablePlugin} from 'sanity-plugin-rich-table'

export default defineConfig({
  //...
  plugins: [richTablePlugin({})],
})

After installing the plugin, you can use the richTable object type in your schemas as a field (object) or the richTableBlock type in your Portable Text fields.
Usage as field

defineField({
  name: 'myRichTable',
  title: 'My Rich Table',
  type: 'richTable', // Use the rich table object type
})

Usage as custom block in Portable Text

// in the portable text schema
defineArrayMember({
  name: 'richTableBlock',
  title: 'Rich Table Block',
  type: 'richTableBlock', // Use the rich table block type
})

Render tables

Read more about rendering rich tables in your frontend application in the Render tables guide. In the docs you will find even more details about the data structure used by this plugin. And get a suggestion on how to merge cells when rendering.
Features coming

    More customization options for table styles and behaviors
    Additional cell types and content options
    Improved performance for large tables
    Enhanced accessibility features
    Default option to merge cells in the table input

TypeScript Support

This plugin is written in TypeScript and exports types for consumers:

import type {RichTableType, RichTableRowType, RichTableCellType} from 'sanity-plugin-rich-table'

See the data structure documentation for detailed type information.

