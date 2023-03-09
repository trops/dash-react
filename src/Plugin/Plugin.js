import React from 'react';
import { activationPoints, plugins, setup, extensionPoints } from 'pluggable-electron/renderer';

// setup({
//     // Provide the import function
//     importer: async (pluginPath) => {
//         return import( /* webpackIgnore: true */ pluginPath)
//     }
// });

export const withPlugins = (WrappedComponent) => {
    return class extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                isActivated: false
            }
        }

        componentDidMount() {
            // activate the plugins
            if (this.state.isActivated === false) {
                plugins.registerActive().then(d => {
                    this.state.isActivated === false && activationPoints.trigger('init');
                    this.setState({ isActivated: true });
                });
            }
            
        }

        componentDidUpdate() {
            //console.log('did update HOC');
            // if (this.state.isActivated === false) {
            //     plugins.registerActive().then(d => {
            //         console.log('inside now activate');
            //         this.state.isActivated === false && activationPoints.trigger('init');
            //         this.setState({ isActivated: true });
            //     });
            // }
        }

        render() {
        // Notice that we pass through any additional props
        // pass in th3e extensionPoints
        return <WrappedComponent active={this.state.isActivated} {...this.props} extensionPoints={extensionPoints} />;
        }
    };
}
