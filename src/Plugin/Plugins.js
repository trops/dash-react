import React, { useEffect, useState } from "react";
import { activationPoints, plugins } from "pluggable-electron/renderer";
import { Button, withRouter } from "@dash/Common";
import { MainMenuItem } from "@dash/Menu";
import { withPlugins } from "./Plugin";
import { Workspace } from "@dash/Workspace";

const mainApi = window.mainApi;

// console.log('path ', remote.app.getPath('userData'));
// Enable the activation points
// setup({
//   // Provide the import function
//   importer: async (pluginPath) => import( /* webpackIgnore: true */ pluginPath)
//   // False is the default for presetEPs
// })

const PluginsC = ({ navigate }) => {
    const [filepathChosen, setFilepathChosen] = useState("");
    const [filenameChosen, setFilenameChosen] = useState("");
    const [activePlugins, setActivePlugins] = useState(null);

    useEffect(() => {
        console.log("Plugins use effect");
        // plugins.registerActive();
        // activationPoints.trigger('init');
        if (activePlugins === null) fetchActivePlugins();
    });

    function handleChooseFile(e) {
        // set the filepath for the plugin we are going to install
        console.log(e.target.files[0].name);
        setFilepathChosen(e.target.files[0].path);
        setFilenameChosen(e.target.files[0].name);
    }

    function handleClickInstall(e) {
        try {
            if (filepathChosen !== "") {
                console.log("file path chosen to install ", filepathChosen);
                // console.log('PATH ', mainApi.pathPlugins);

                mainApi.removeAllListeners();
                mainApi.on("plugin-install-complete", handleInstallComplete);
                mainApi.on("plugin-install-error", handleInstallError);

                plugins.install([filepathChosen]).then((data) => {
                    console.log("package installed ", data[0]);

                    // install the plugin..
                    mainApi.plugins.install(data[0].name, filepathChosen);

                    // test to see what plugins are loaded...
                    plugins.getActive().then((d) => console.log("ACTIVE ", d));
                    plugins.registerActive();

                    // Insert this in your code when you are ready to activate the plugins
                    activationPoints.trigger("init");

                    // render the list of active plugins
                    fetchActivePlugins();
                });
            }
        } catch (e) {
            console.log(e.message);
        }
    }

    function handleInstallComplete(e, message) {
        console.log(e, message);

        // const mainJs = message.root + "/index.js";
        // console.log(mainJs);
        // const test = '/Users/johngiatropoulos/Library/Application Support/Electron Skeleton Accelerator/plugins/test-moment/index.js';
        // const OtherComponent = React.lazy(() => import('/Users/johngiatropoulos/Library/Application Support/Electron Skeleton Accelerator/plugins/test-moment/index.js'));

        activationPoints.trigger("init");

        // and now we can fetch them to render on the screen
        fetchActivePlugins();
    }

    function handleInstallError(e, message) {
        console.log(e, message);
        // const moment = require(message.root);

        activationPoints.trigger("init");
        // const manager = new PluginManager(config);
        // manager.require('test-moment');
    }

    function handleClickUninstall(e) {
        console.log("uninstall plugin", e);
        // if (filepathChosen !== '') {
        //     console.log('file path chosen to install ', filepathChosen);
        //     plugins.uninstall(['demo-plugin']).then(data => {
        //         //console.log(data);

        //         // test to see what plugins are loaded...
        //         plugins.getActive().then(d => console.log(d));

        //     });
        // }
    }

    function handleMenuClick(item) {
        console.log("menu click", item);
        navigate(`/${item}`);
    }

    function fetchActivePlugins() {
        plugins.getActive().then((p) => {
            setActivePlugins(p);
        });
    }

    function renderActivePlugins() {
        return (
            activePlugins !== null &&
            activePlugins.map((p) => {
                return (
                    <MainMenuItem
                        title={p.name}
                        onClick={() => handleUninstallPlugin(p)}
                    />
                );
            })
        );
    }

    function handleUninstallPlugin(plugin) {
        console.log(plugin);
        plugins
            .uninstall([plugin.name])
            .then((result) => {
                console.log(result);
            })
            .catch((e) => console.log(e));
    }

    return (
        <Workspace>
            <div className="flex flex-col w-full h-full justify-center items-center space-y-4">
                <Button onClick={() => navigate("/")} title="Go Home" />
                <div className="flex text-2xl font-bold text-gray-200">
                    Manage Plugins
                </div>
                <div className="flex flex-row bg-gray-800 p-2 rounded">
                    <form id="install-file">
                        <div className="flex flex-row items-end">
                            <div class="col-8">
                                <label class="form-label">
                                    Package file:
                                    <input
                                        type="file"
                                        name="plugin-file"
                                        class="form-control"
                                        onChange={handleChooseFile}
                                    />
                                </label>
                            </div>
                            <div>
                                <Button
                                    onClick={handleClickInstall}
                                    title="Install"
                                />
                                <Button
                                    onClick={handleClickUninstall}
                                    title="Un-Install"
                                />
                            </div>
                        </div>
                    </form>
                </div>
                {renderActivePlugins()}
                {/* <MainMenu onClick={handleMenuClick} /> */}
            </div>
        </Workspace>
    );
};

const Plugins = withPlugins(PluginsC);
export { Plugins };
