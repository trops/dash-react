import { deepCopy } from "@dash/Utils";
import { LayoutModel } from "./LayoutModel";
import { ComponentManager } from "@dash/ComponentManager";
import { getNextHighestId, getNextHighestOrder } from "@dash/Utils";

/**
 * A Model for a Workspace (Dashboard)
 * The Dashboard in this instance is the entire Layout inclusive of the workspaces and widgets
 * When the user selects a Dashboard, this is the model that stores that information.
 */
export class DashboardModel {
    
    /**
     * 
     * @param {Object} dashboardItem the dashboard/workspace we are using to initialize
     */
    constructor(dashboardItem) {
        this._initialize(dashboardItem);
    }

    validDashboardTypes = ["layout", "widget", "workspace"];
    validDashboardProperties = [
            "id",
            "name",
            "type",
            "label",
            "layout",
            "menuId",
            "version",
        ];

    /**
     * initialize the model
     * @param {Object} dashboardItem object containing the saved workspace layout 
     */
    _initialize(dashboardItem) {
        this.dashboard = {};

        let obj = dashboardItem !== null && dashboardItem !== undefined
            ? deepCopy(dashboardItem)
            : {};

        this.id = "id" in obj ? obj["id"] : Date.now();
        this.name = "name" in obj ? obj["name"] : "New Dashboard";
        this.type = "type" in obj ? this._sanitizeType(obj["type"]) : "workspace";
        this.label = "label" in obj ? obj["label"] : "New Dashboard";
        this.version = "version" in obj ? obj["version"] : 1;
        this.layout = "layout" in obj ? obj["layout"] : this._initializeLayout();
        this.menuId = "menuId" in obj ? obj["menuId"] : 1;

        obj = null;
        
    }
    
    _initializeLayout() {
        try {
            const newLayout = {
                id: 1,
                order: 1,
                direction: "col",
                width: "w-full",
                component: "Container",
                hasChildren: 1,
                scrollable: false,
                parent: 0,
                menuId: 1, // default menu item id is 1
            };
            return [LayoutModel(newLayout, [])];
        } catch(e) {
            console.log(e);
            return [];
        }
    }

    destroy() {
        this.id = null;
        this.name = null;
        this.type  = null;
        this.label = null;
        this.version = null;
        this.layout = null;
        this.menuId = null;
        this.dashboard = null;
    }

    workspace() {
        return {
            id: this.id,
            name: this.name,
            type: this.type,
            label: this.label,
            version: this.version,
            layout: this.layout,
            menuId: this.menuId,
        }
    }

    /**
     * Make sure the type specified in the component item is valid
     * @param {String} t the type in the dashboard item argument 
     * @returns {Boolean}
     */
    _sanitizeType(t) {
        return this.validDashboardTypes.includes(t) === true ? t : "workspace";
    }

    _sanitizeLayout(layout, workspaceId) {
        if (layout) {
            if (layout.length > 0) {
                return layout;
            } else {
                return [
                    LayoutModel(
                        {
                            workspace: "layout",
                            type: "workspace",
                            dashboardId: workspaceId,
                        },
                        [],
                        workspaceId
                    ),
                ];
            }
        }
    }

    /**
     * Return the LayoutModel based on the id 
     * @param {Number} componentId 
     * @returns 
     */
    getComponentById(componentId) {
        try {
            let item = null;
            this.layout.forEach((l) => {
                if (l.id === componentId) {
                    item = l;
                }
            });
            return item;
        } catch (e) {
            return null;
        }
    }

    /**
     * Get the TOP Container in the layout
     * @returns {LayoutItem} the top container in the entire layout
     */
    getRootContainer() {
        const rootContainers = this.layout.filter(layoutItem => layoutItem.parent === 0);
        return rootContainers.length > 0 ? rootContainers[0] : null;
    }

    /**
     * Add a NEW child to the component with the specified id
     * This will automatically add the compatible workspace if necessary
     * @param {LayoutModel} childComponent the child component to add
     * @param {*} itemId the id of the component to add it TO
     * @returns 
     */
    addChildToLayoutItem(childComponent, itemId = 1) {
        try {
            
            // Get the Parent Component to add the child TO
            const parentComponent = this.getComponentById(itemId);

            parentComponent.hasChildren = 1;

            console.log("adding to ", itemId);

            this.updateLayoutItem(parentComponent);

            console.log("adding to parent component ", parentComponent);
            // now we can add the widget to the new workspace.
            const nextId = getNextHighestId(this.layout);
            // then get the next highest ORDER based on the children
            // of the parent
            const nextOrderData = getNextHighestOrder(this.layout, parentComponent.id);
            const nextOrder = nextOrderData["highest"];

             // set the new id and order for the item
            childComponent['id'] = nextId;
            childComponent["order"] = nextOrder;
            // 1. Add the layoutItem as the parentWorkspace of the childComponent
            childComponent["parentWorkspace"] = parentComponent;
            childComponent["parent"] = parentComponent["id"];
            childComponent["parentWorkspaceName"] = parentComponent.workspace;

            console.log("child component after add ", childComponent);
            // 2. Add the element back into the layout
            this.layout.push(childComponent);

            return childComponent.id;


            // this.updateLayoutItem(childComponent);
            /*
            if (childComponent.parent !== itemId) {
                console.log("parent component ", parentComponent);
                if (parentComponent) {
                    if (childComponent.type === "widget") {
                        console.log("item being added is a widget", childComponent);

                        // add the workspace component to the layout
                        const workspaceIdAdded = this.addWorkspaceForWidget(parentComponent, childComponent);
                        console.log("workspace added ", workspaceIdAdded, this.layout);

                        // get this component as the parent of the widget now?
                        const workspaceParent = this.getComponentById(workspaceIdAdded);

                        // now we can add the widget to the new workspace.
                        const nextId = getNextHighestId(this.layout);
                        // then get the next highest ORDER based on the children
                        // of the parent
                        const nextOrderData = getNextHighestOrder(this.layout, workspaceParent.id);
                        const nextOrder = nextOrderData["highest"];

                         // 2. Add the element back into the layout
                        this.layout.push(childComponent);

                        // set the new id and order for the item
                        childComponent['id'] = nextId;
                        childComponent["order"] = nextOrder;

                        this.updateLayoutItem(childComponent);

                        const testParent = this.setParentForLayoutItem(workspaceParent.id, childComponent);


                        // now we have to update the parent
                        workspaceParent.hasChildren = 1;
                        this.updateLayoutItem(workspaceParent);

                        return childComponent.id;
                        
                        // return this.addChildToLayoutItem(childComponent, workspaceIdAdded);
                    } else {
                        console.log("in lower IF");
                        // set an id for the new child component
                        // to avoid collisions
                        const nextId = getNextHighestId(this.layout);
                        // then get the next highest ORDER based on the children
                        // of the parent
                        const nextOrderData = getNextHighestOrder(this.layout, parentComponent.id);
                        const nextOrder = nextOrderData["highest"];

                        // set the new id and order for the item
                        childComponent['id'] = nextId;
                        childComponent["order"] = nextOrder;

                        // 1. Add the layoutItem as the parentWorkspace of the childComponent
                        childComponent["parentWorkspace"] = parentComponent;
                        childComponent["parent"] = parentComponent["id"];

                        // 2. Add the element back into the layout
                        this.layout.push(childComponent);

                        // now we have to update the parent
                        parentComponent.hasChildren = 1;
                        this.replaceItemInLayoutById(parentComponent["id"], parentComponent);

                        return childComponent.id;
                    }
                } else {
                    return null;
                }
            }
                */
            
        } catch(e) {
            return this.layout;
        }
    }

    /**
     * set the parent of the layout item using an id for the parent layout item
     * @param {*} parentId 
     * @param {*} layoutItem 
     * @returns {LayoutModel} 
     */
    setParentForLayoutItem(parentId, layoutItem) {
        try {
            const parentComponent = this.getComponentById(parentId);
            parentComponent.hasChildren = 1;
            this.updateLayoutItem(parentComponent);

            layoutItem.parent = parentComponent.id;
            layoutItem.parentWorkspace = parentComponent;
            layoutItem.parentWorkspaceName = parentWorkspace.workspace;

            return this.updateLayoutItem(layoutItem);
        } catch(e) {
            return null;
        }
    }

    /**
     * Get all of the children for a particular layout item
     * @param {Object} workspace the Workspace Model - use the layout
     * @param {Object} layoutItem the item (LayoutModel) we are checking
     * @returns {Array} the child layout items that are a match
     */
    getChildrenForLayoutItem(layoutItem) {
        return this.layout.filter(workspaceItem => {
            return layoutItem.id === workspaceItem.parent;
        })
    }

    getRootWorkspaceInContainer(container) {
        try {
            const children = this.getChildrenForLayoutItem(container).filter(v => v.type === "workspace");
            return children;
        } catch(e) {
            return null;
        }
    }

    /**
     * Get the Deepest workspace in the layout for a specified layoutitem
     * @param {*} layoutItem the layout item we are checking
     * @returns {LayoutModel} the workspace that is the deepest
     */
    getHighestOrderWorkspaceForLayoutItem(layoutItem) {
        try {
            // let highestOrderWorkspace = null;
            // let highestOrderNumber = 0;
            let tree = {};
            let level = 1;
            var self = this;

            function recursiveFunction(layoutItem) {
                
                const children = self.getChildrenForLayoutItem(layoutItem);
                console.log("children for component ", children);
                const filtered = children.filter(v => v.type === "workspace");
                console.log("workspace children ", children, layoutItem);
                if (filtered.length > 0) {
                    const layoutItemId = layoutItem["id"];
                    for (var i=0; i < filtered.length; i++) {
                        const child = filtered[i];
                        const childTemp = self.getComponentById(child.id);
                        const parentId = childTemp.parent;
                        if (parentId in tree === false) {
                            tree[parentId] = [];
                        }
                        tree[parentId].push(childTemp);

                        // recurse
                        recursiveFunction(childTemp);
                    };
                }
            }

            recursiveFunction(layoutItem);
            return tree;
        } catch(e) {
            console.log(e);
            return {};
        }
    }

    /**
     * Sanitize the workspace layouts so that the workspaces are not "side by side" 
     * and formed like nexted components for a specific container
     * 
     */
    sanitizeWorkspaceLayouts(layoutItem) {
        try {
            // The goal is to make ALL of the workspaces children of this main layoutItem
            // passed into the function...

            // All Workspaces also will be h-full, w-full, scrollable = false

            // Then all of the widgets become children of the deepest workspace.

            const workspacesForLayout = this.getHighestOrderWorkspaceForLayoutItem(layoutItem);
            console.log("workspaces for layout ", workspacesForLayout, Object.keys(workspacesForLayout));
            
            // for(var i=0; i < workspacesForLayout.length; i++) {
            //     const workspaceItem = this.getComponentById(ws.id);
            //     console.log("setting parent ", layoutItem.id, workspaceItem);
            //     this.setParentForLayoutItem(layoutItem.id, workspaceItem);
            // }

            // if (workspacesForLayout.length > 1) {
            //     workspacesForLayout.forEach(ws => {
            //         const workspaceItem = this.getComponentById(ws.id);
            //         console.log("setting parent ", layoutItem.id, workspaceItem);
            //         this.setParentForLayoutItem(layoutItem.id, workspaceItem);
            //     })
            // }

        } catch(e) {
            return null;
        }
    }
    /**
     * Change the parent for a list of child elements
     * @param {*} parentLayoutItem 
     * @param {*} childLayoutItems 
     */    
    setParentForChildren(parentLayoutItem, childLayoutItems) {
        try {
            childLayoutItems.filter(v => v.id !== parentLayoutItem.id).forEach(child => {
                this.setParentForLayoutItem(parentLayoutItem.id, child);
            });
        } catch(e) {
            console.log("failed to set children of parent");
        }
    }

    /**
     * Once a child gets added or removed, the order numbering can get out of sync
     * This method will "reset" the order 1,2,3 etc.
     * @param {LayoutModel} parentLayoutItem the Layout item we want to reset the children FOR
     */
    sanitizeOrderForChildren(parentLayoutItem) {
        try {
            // get the children of the parent layout
            const children = this.getChildrenForLayoutItem(parentLayoutItem);
            // want to sort the children by order
            // then go through each "in order" and change the order so that it is index + 1;

            children.items.sort((a, b) => a.order - b.order).forEach((child, index) => {
                child.order = index + 1;
                this.updateLayoutItem(child);
            });

        } catch(e) {
            console.log('error sanitizing order');
            return null;
        }
    }

    /**
     * Determine if the layout item has a workspace by the given workspace name
     * A child is denoted by having a parent id equal to the parent id of the item we 
     * are inputting
     * 
     * if parent === layoutItem.id
     */
    layoutItemHasWorkspaceAsChild(layoutItemParent, layoutItem) {
        return this.getChildrenForLayoutItem(layoutItemParent).filter(workspaceItem => {
            return workspaceItem.workspace === layoutItem.workspace && workspaceItem.type === "workspace"
        })
    }

    /**
     * Find the compatible workspaces in the layout for a particular layout item (widget)
     * @param {LayoutModel} layoutItem the layout item we want to find a compatible workspace for
     * @returns {Array} a list of compatible Workspace layout items
     */
    compatibleWorkspaces(layoutItem) {
        return this.layout.filter(item => item.type === "workspace" && item.workspace === layoutItem.workspace);
    }

    /**
     * Check to see if the layout item (container) that we are adding a widget/workspace TO 
     * has a compatible workspace already inside (as a wrapper)
     * - If not, we will have to add a copatible workspace to the root of the container
     * - If so, we can simply add the child to the layout at the deepest level
     * @param {LayoutModel} layoutItemToCheck the LayoutModel item that we want to add a widget TO
     * @param {LayoutModel} layoutItem the LayoutModel item that we want to add
     * @returns {Boolean} if the TO layout is compatible with the LahyoutModel we are adding
     */
    layoutItemIsCompatible(layoutItemToCheck, layoutItem) {
        return this.layoutItemHasWorkspaceAsChild(layoutItemToCheck, layoutItem).length > 0;
    }

    layoutHasCompatibleWorkspace(layoutItem) {
        try {
            const rootContainer = this.getComponentById(1);
            return this.layoutItemIsCompatible(rootContainer, layoutItem);
        } catch(e) {
            return false;
        }
    }

    /**
     * Travel UP the parent chain until we find the top level container for this layout item
     * @param {LayoutModel} layoutItem the layout item we want to use as the source item
     */
    parentContainerForLayoutItem(layoutItem) {
        try {
            if (layoutItem.workspace === "layout") {
                return layoutItem;
            } else {
                const parentLayoutItem = this.getComponentById(layoutItem.parent);
                return this.parentContainerForLayoutItem(parentLayoutItem);
            }
        } catch(e) {
            console.log(e);
            return null;
        }
    }
    /**
     * Look for a container that encapsulates 2 other containers
     * This is used for moving a workspace UP in the hierarchy 
     * in case a user wants to add a widget to a container that is not currently 
     * compatible, but wants to maintain the same workspace to power them both.
     * @param {Array} items the array of layoutItems that are to be checked
     */
    containsLayoutItems(layoutItems) {
        // we have to get the container for each item in the array first. 
        // then check to see WHICH container CONTAINS them all!
        const containers = this.layout.filter(layoutItem => layoutItem.workspace === "layout");
        console.log(containers);
        // now check all of the children of each container
    }

    /**
     * Get the nearest top level container for the layout item
     * @param {LayoutModel} layoutItem the layout item we are checking (typically a widget add motion) 
     */
    containerForLayoutItem(layoutItem) {

    }

    /**
     * Find the deepest workspace in the given container
     * @param {*} container 
     */
    deepestWorkspaceInContainer(container) {
        return this.getHighestOrderWorkspaceForLayoutItem(container);
    }

    /**
     * Find a compatible Workspace for the layout item using the ComponentManager (all registered components) 
     * @param {LayoutModel} layoutItem 
     * @returns {LayoutModel} the compatible workspace component
     */
    findCompatibleWorkspaceComponent(layoutItem) {
        const compatibleWorkspaceComponent = ComponentManager.getWorkspaceByName(layoutItem.workspace);
        if (compatibleWorkspaceComponent) {
            return LayoutModel(compatibleWorkspaceComponent);
        }
        return null;
    }

    /**
     * Add a Workspace to the Layout if required to work with the Widget being added.
     * @param {LayoutModel} layoutItem the LayoutModel component we want to check the children to see if there is a workspace compatible
     */
    addWorkspaceForWidget(toLayoutItem, layoutItemToAdd) {
        try {
            if (layoutItemToAdd.type === "widget") {

                // workspace we will use to add to the Layout
                let workspaceToAddTo = null;

                // the name of the workspace compatible with the item being added
                const workspaceRequiredName = layoutItemToAdd.workspace;
                
                // Fetch any compatible workspaces with in the cource container
                const compatibleWorkspaceChildren = this.layoutItemHasWorkspaceAsChild(toLayoutItem, layoutItemToAdd);

                console.log("compatible children ", compatibleWorkspaceChildren, workspaceRequiredName);
                // if (compatibleWorkspaceChildren.length > 0) {
                //     console.log("ok we can add this widget as a child per usual - highest id");
                //     // choose the workspace with the highest ID to add the item to
                //     let orderId = 0;
                //     compatibleWorkspaceChildren.forEach(childComponent => {
                //         if(childComponent.order > orderId) {
                //             workspaceToAddTo = childComponent;
                //         }
                //     });
                // } else {
                //     // we have to conjur up a Compatible workspace based on the item specified
                //     workspaceToAddTo = ComponentManager.getWorkspaceByName(workspaceRequiredName);
                //     console.log("workspace component conjured ", workspaceToAddTo);
                //     // now we have to build out a temporary layout in order to preview the widget selected
                // }

                if (compatibleWorkspaceChildren.length === 0) {
                    // we have to conjur up a Compatible workspace based on the item specified
                    const tempWorkspaceComponent = ComponentManager.getWorkspaceByName(workspaceRequiredName);
                    console.log("temp workspace name ", tempWorkspaceComponent);
                    workspaceToAddTo = LayoutModel({ 
                        type: tempWorkspaceComponent.type, 
                        component: tempWorkspaceComponent.name,
                        // parent: toLayoutItem.id,
                        // parentWorkspace: toLayoutItem,
                        // parentWorkspaceName: toLayoutItem.workspace
                    });
                    
                    console.log("workspace component conjured from DashboardModel", workspaceToAddTo);
                } else {
                    // we have to add this as usual to the toLayoutItem
                }

                // now we have to add the workspace as a child, but NOT below the widgets
                // we want to basically add this as 
                // Container
                // workspace, workspace workspace
                // widgets...
                const highestOrderWorkspace = this.getHighestOrderWorkspaceForLayoutItem(toLayoutItem);
                if (highestOrderWorkspace > 0) {
                    return this.addChildToLayoutItem(workspaceToAddTo, highestOrderWorkspace["id"]);
                } else {
                    // add to the Container if no other workspaces found
                    return this.addChildToLayoutItem(workspaceToAddTo, toLayoutItem["id"]);
                }
                
            }
        } catch(e) {
            console.log(e);
        }
    }
    setParentForItem(parentId, childId) {

    }

    setOrderForItem(order, itemId) {

    }

    /**
     * Update the LayoutModel item using the id in the item itself to execute the update
     * @param {LayoutModel} itemData the LayoutModel we want to replace in the layout 
     * @returns {Object} the new layout
     */
    updateLayoutItem(itemData) {
        try {
            const id = itemData["id"];
            const item = this.getComponentById(id);
            if (item) {
                Object.keys(itemData).forEach((key) => {
                    item[key] = itemData[key];
                });
                return this.replaceItemInLayout(id, item);
            }
            return this.layout;
        } catch(e) {

            return this.layout;
        }
    }

    /**
     * Find and return the index of the item in the layout
     * @param {Number} id the id of the LayoutModel item we are trying to find in the layout
     * @returns {Number} the index of the item in the layout, or -1 if not found
     */
    getIndexOfLayoutItemById(id) {
        let indexOfItem = -1;
        try {
            this.layout.forEach((t, index) => {
                if (t.id === id) {
                    indexOfItem = index;
                }
            });
            return indexOfItem;
        } catch(e) {
            return indexOfItem;
        }
    }

    getIndexOfLayoutChildrenForItem(id) {
        let indexOfItem = [];
        this.layout.forEach((t, index) => {
            if (t.parent === id) {
                indexOfItem.push(index);
            }
        });
        return indexOfItem;
    }

    /**
     * Replace the LayoutModel item in the layout based on its id, with a new LayoutModel item
     * @param {Number} id the id of the item we wish to replace
     * @param {LayoutModel} item the LayoutModel we are using as the replacement
     * @returns 
     */
    replaceItemInLayoutById(id, item) {
        try {
            const indexOfItem = this.getIndexOfLayoutItemById(id);
            // console.log("Index of item to replace", indexOfItem);
            if (indexOfItem > -1) {
                this.layout[indexOfItem] = item;
            }
            // console.log("replace with ", item, tempLayout);
            return this.layout;
        } catch(e) {
            console.log(e);
            return this.layout;
        }
    }


};
