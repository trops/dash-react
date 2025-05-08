# dash-react

This project is a npm package hosted on github to be used with Dash.

Dash is a framework of Workspaces and Widgets that use dependency injection to pass functionality through Workspaces to the Widgets inside. You may create Widgets and Workspaces alike to utilize libraries, apis, anything you desire.

Examples:

-   Algolia Search
-   Google Drive
-   Contentful
-   Slack
-   ChatGPT

# Installation and Dev Notes

This relies on the [@trops/dash-react](https://github.com/trops/dash-react) package hosted privately as a package on github.

In order to install this we have provided a `.npmrc file` with the Personal Access Token (PAT) generated from github providing read-only access to the package.

This key may change or be provided upon request.

| CLI                             | Description                                                                             |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| `npm install`                   | Install the main application, and dash-react dependency                                 |
| `npm run dev`                   | Run Development environment and launch Electron window                                  |
| `npm run build`                 | Build the tailwind.css file and run development environment and launch Electron window  |
| `node ./widgetize <WidgetName>` | Generate a new Widget inside the src/Widgets directory using the template as a scaffold |

## Running Production

-   Add all changes to git
-   run `npm run prod` to generate the build
-   commit the changes
-   run `npm version patch` to update the package version
-   push `git push origin main`

# React Web Project

This current project runs Electron, but the @trops/dash-react package may be used in a simple React web based application. The caveat is the API bridge between Electron and the React renderer will have to be re-created in order to satisfy the data requirements for configuring the application. This API is injected into the Dash application for portability.

More to come...

# Development (Workspaces and Widgets)

Developing custom Workspaces and Widgets is the whole reason for creating Dash in the first place. From Stock tracker Dashboards, to social media analytics, dashboards are very important.

Inside the `src/widgets` directory is where you should create your, well, widgets!

## Folder Structure

Let's say you wanted to create a component named MyWidget. You should create a second file named MyWidget.dash.js, like this inside of the following folder structure.

Notice we also created a Workspace in the same MyWidget folder.

```
src/widgets
src/widgets/MyWidget
src/widgets/MyWidget/MyWidget.js
src/widgets/MyWidget/MyWidget.dash.js
src/widgets/MyWidget/MyWorkspace.js
src/widgets/MyWidget/MyWorkspace.dash.js
```

Inside the `MyWidget.dash.js` file, include a configuration for the widget.

```js
// MyWidget.dash.js
import { MyWidget } from "./MyWidget";

export default {
    component: MyWidget,
    canHaveChildren: false,
    workspace: "my-cool-workspace-name",
    type: "widget",
};
```

And for a workspace, type will change to `workspace`, canHaveChildren is set to true (or false if you are making a self-contained workspace). Both the widget and the workspace is belongs to will both have the same "workspace" name.

```js
// MyWidgetWorkspace.dash.js
import { MyWidgetWorkspace } from "./MyWidgetWorkspace";

export default {
    component: MyWidgetWorkspace,
    canHaveChildren: true,
    workspace: "my-cool-workspace-name",
    type: "workspace",
};
```

Another example of a configuration. In this configuration, the developer is allowing the end user to enter information. The values the user enters into the form (in the dashboard) can then be used by the developer in the widget!

This means you can create custom widgets that are dynamic based on the user's entered data.

```js
export default {
    component: MyWidget,
    canHaveChildren: false,
    workspace: "MyWidgetWorkspace-workspace",
    type: "widget",
    userConfig: {
        title: {
            type: "text",
            defaultValue: "default",
            instructions: "Type a heading for your widget",
            options: [],
            displayName: "Title",
            required: true,
        },
        subtitle: {
            type: "text",
            defaultValue: "Im a subtitle",
            instructions: "Type a subtitle for your widget",
            displayName: "Sub Title",
        },
    },
```

# Widgetize.js

You may alternatively use the `widgetize.js` script in order to copy the Widget folder structure and template files.

To generate a scaffold for a widget named `MyWidget`, enter the following into the command line in the root of your project:

`node ./widgetize MyWidget`

This will create a folder structure as follows inside the `src/Widgets` directory:

```

src/Widgets/MyWidget/widgets/
src/Widgets/MyWidget/widgets/MyWidget.js
src/Widgets/MyWidget/widgets/MyWidget.dash.js
src/Widgets/MyWidget/workspaces/MyWidgetWorkspace.js
src/Widgets/MyWidget/workspaces/MyWidgetWorkspace.dash.js
src/Widgets/MyWidget/index.js

```

# Themed Components

There are many Components provided with the @trops/dash-react library that may be utilized and in some cases must be utilized in the creation of Workspaces and Widgets. Here is a brief list of the Components available.

| Component  | Definition                                                                                                                                                                                 |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Dashboard  | A user generated Layout that can be customized to add different layouts, workspaces and widgets.                                                                                           |
| Workspace  | A container that holds Widgets. The Workspace may inject functionality to the Widgets, use Contexts to provide functionaity, and be used to render display. Can have or not have children. |
| Widgets    | A component that may be added to a Workspace. Widgets may be added to the workspace specified in their configuration.                                                                      |
| Panel      | A User Interface Component that may be used indside your render method of your component                                                                                                   |
| Heading    | A User Interface Component that may be used indside your render method of your component                                                                                                   |
| SubHeading | A User Interface Component that may be used indside your render method of your component                                                                                                   |
| Button     | A User Interface Component that may be used indside your render method of your component                                                                                                   |
| ButtonIcon | A User Interface Component that may be used indside your render method of your component                                                                                                   |
| MenuItem   | A User Interface Component that may be used indside your render method of your component                                                                                                   |

# Communication

All of the Workspace and Widget components may utilize the publish/subscribe pattern built into the Dash framework. All Widgets have access to the WidgetApi that allows for the publish and setup of listeners.

## Publishing Events

A Widget may communicate with any component with the capacity to listen in the Dashboard you create. In the configuration of your dashboard (UI) you can select the available events and the handlers to listen to.

This is an example of how to publish an event.

```js
/**
 * publishEvent
 * @param {string} name the name of the widget (TODO - uuid + handler)
 * @param {object} events the payload for the event published
 */
 publishEvent: function (name, events)
```

## Listening for events

You may pass in event listeners

```js
/**
 * registerListeners
 *
 * Register an array of listeners (strings) and set the handler (object)
 * Each handler has a key and Component named the same so we can use the handler
 * methods in code.
 *
 * @param {array} listeners
 * @param {object} handlers
 */
 registerListeners: function (listeners, handlers)
```

# Widget Data

Sometimes you might want to store data. And then read it.
For example, if I wanted to save a history of locations I search on google maps (widget), and since Dash is an Electron application, we exposed a saveData and readData method in the Widget API.

The API automatically knows the uuid of your widget, so you can concentrate on saving and reading data...not the arguments of the methods.

```js
storeData: function ( data,
        { filename = null, callbackComplete = null, callbackError = null }
```

Sample:

```js
export const MyWidget = ({ api }) => {
...

api.storeData(data);

...
```

To read the stored data:

```js
/**
 * readData
 * @param {object} options
 * @param {string} filename the name of the file if you want to override the default
 * @param {object} callbackComplete the handler for dealing with the complete callback data
 * @param {object} callbackError the handler for dealing with the error callback data
 */
 readData: function ({
        filename = null,
        callbackComplete = null,
        callbackError = null,
    })
```

Sample:

```js
export const MyWidget = ({ api }) => {
...

api.readData({
    callbackComplete: (data) => {},
    callbackError: (e) => {}
});

...
```

# Widget Full Example

Here is a simple example of a widget that offers an end user the ability to customize through the dashboard editor (part of Dash).

```js
/**
 * MyWidget.js
 * Note: We are using the Themed Components in our widget to take advantage
 * of a unified user experience
 */
export const MyWidget = ({
    title = "Hello",
    subtitle = "Im a widget.",
    ...props
}) => {
    // utilize the api if needed for communication to the electron backend
    const { api } = props;
    return (
        <Widget {...props}>
            <Panel>
                {/* notice we are using the value of a userConfig variable */}
                <Heading text={title} />
                <Subheading text={subtitle} />
            </Panel>
        </Widget>
    );
};
```

And here is the `MyWidget.dash.js` file

```js
export default {
    component: MyWidget,
    canHaveChildren: false,
    workspace: "MyWidgetWorkspace-workspace",
    type: "widget",
    userConfig: {
        title: {
            type: "text",
            defaultValue: "default",
            instructions: "Type a heading for your widget",
            options: [],
            displayName: "Title",
            required: true,
        },
        subtitle: {
            type: "text",
            defaultValue: "Im a subtitle",
            instructions: "Type a subtitle for your widget",
            displayName: "Sub Title",
        },
    },
```

# Widget Contexts

A very fun part of the Dashboard/Workspace/Widget framework is the ability to inhect functionality into the Dash itself.

You can do this on a Workspace by Workspace basis.

Example. Let's say I wanted to create a Google Maps Widget. I need to utilize the Google Maps API, and all of my widgets do too.

I can instantiate the google maps client in my workspace component, and then set the context value to be that client.

All of my Widgets will then use the context, grab the client for google maps and use that to perform it's function.

# Storybook

To run the Storybook file:

`npm run storybook`

# Contact

Please contact john.giatropoulos@gmail.com for more information.
