import React, { useState, useEffect, useContext } from "react";
import { ButtonIcon, MenuItem3, ButtonIcon3, Panel, SelectMenu } from "@dash/Common";
import { renderLayout, replaceItemInLayout, deepCopy } from "@dash/Utils";
import { WorkspaceModel, DashboardModel } from "@dash/Models";
import deepEqual from "deep-equal";
import { ThemeContext } from "@dash/Context";
import { ComponentManager } from "@dash/index";
import { GridEditTile } from "./GridEditTile";
import GridEditor from "./GridEditor";

export const PanelEditItemGrid = ({ workspace, onUpdate, item = null }) => {
    const { theme } = useContext(ThemeContext);

    const [itemSelected, setItemSelected] = useState(item);
    const [workspaceSelected, setWorkspaceSelected] = useState(workspace);
    const [cellSelected, setCellSelected] = useState({ cellNumber: "1.1", component: null, span: null });
    const [cellsSelected, setCellsSelected] = useState([{ cellNumber: "1.1", component: null, span: null }]);
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    useEffect(() => {
        console.log("panel edit item grid", itemSelected, workspaceSelected);
        //console.log('EFFECT PanelEditItem', workspace, workspaceSelected, item['userPrefs'], itemSelected['userPrefs']);
        //console.log('COMPARE RESULT: ', deepEqual(item, itemSelected));
        if (deepEqual(item, itemSelected) === false) {
            console.log("COMPARE CHECK DIFFERENT!");
            setItemSelected(() => item);
            forceUpdate();
        }

        if (deepEqual(workspace, workspaceSelected) === false) {
            setWorkspaceSelected(() => workspace);
            forceUpdate();
        }

        // if (open === false) {
        //     setItemSelected(null);
        //     setWorkspaceSelected(null);
        // }
    }, [workspace, item]);

    function handleSaveChanges(itemData) {
        if (itemData !== null) {
            console.log("handleSaveChanges ", itemData);
            onUpdate(itemData, workspaceSelected);
            setItemSelected(null);
            //setIsOpen(false);
        }
    }


    function updateGridLayout(data) {
        console.log("updateGridLayout ", data);
        // const dashboard = new DashboardModel(workspaceSelected);

        // get the grid layout from the itemSelected
        let itemSelectedTemp = deepCopy(itemSelected);
        let gridLayout = itemSelectedTemp.grid;

        // lets update the grid layout
        gridLayout = data;
        itemSelectedTemp.grid = gridLayout;

        setItemSelected(itemSelectedTemp);
        handleUpdate(itemSelectedTemp);
    }

    function handleUpdate(data) {
        console.log("handling update ", data);

        const dashboard = new DashboardModel(workspaceSelected);
        dashboard.updateLayoutItem(data);

        // const workspaceTemp = WorkspaceModel(workspaceSelected);
        // const newLayout = replaceItemInLayout(
        //     workspaceTemp.layout,
        //     data["id"],
        //     data
        // );
        // workspaceTemp.layout = newLayout;

        setWorkspaceSelected(() => dashboard.workspace());
        // setItemSelected(() => data);
        onUpdate(data, dashboard.workspace());
        forceUpdate();
    }

    /**
     * toggle the selected cell
     */
    function handleSelectCell(data) {
        
        setCellSelected(() => data);
        const cellsSelectedTemp = JSON.parse(JSON.stringify(cellsSelected));
        let hasCell = false;
        cellsSelectedTemp.forEach(c => {
            if (c.cellNumber === data.cellNumber) hasCell = true;
        });

        let filteredCells = [];
        if (hasCell === true) {
            cellsSelectedTemp.forEach(c => {
                if (c.cellNumber !== data.cellNumber) {
                    filteredCells.push(c);
                }
            });
        } else {
            filteredCells = cellsSelectedTemp;
            filteredCells.push(data);
        }
        
        console.log("filtered ", filteredCells);


        // return ONLY TWO CELLS
        setCellsSelected(() => filteredCells.slice(-2));
    }

    function renderEditContainer() {
        try {
            console.log("RENDERING EDIT CONTAINER ", itemSelected);
            if (itemSelected !== null && workspaceSelected !== null) {
                const workspaceSelectedTemp = JSON.parse(
                    JSON.stringify(workspaceSelected)
                );

                if (
                    itemSelected.parentWorkspace !== undefined &&
                    itemSelected.parentWorkspace !== null
                ) {
                    // let's make a custom layout with the parent workspace and the itemSelected
                    // need the workspace for the functionality...
                    let parentWorkspaceTemp = JSON.parse(
                        JSON.stringify(itemSelected.parentWorkspace)
                    );
                    let layout = JSON.parse(
                        JSON.stringify(workspaceSelectedTemp["layout"])
                    );
                    let itemTemp = JSON.parse(JSON.stringify(itemSelected));

                    // VERY IMPORTANT TO CHECK THE WORKSPACES!!!!
                    // otherwise the workspace will crash as the widget doesnt belong...
                    if (
                        itemSelected["workspace"] ===
                        parentWorkspaceTemp["workspace"]
                    ) {
                        if (item.parentWorkspace) {
                            // set the id's to work appropriately.
                            parentWorkspaceTemp["id"] = 1;
                            parentWorkspaceTemp["parent"] = 0;

                            itemTemp["parent"] = 1; //parentWorkspaceTemp['id'];
                            // set the new layout
                            layout = [parentWorkspaceTemp, itemTemp];
                        }

                        return (
                            itemSelected.parentWorkspace &&
                            renderLayout({
                                workspace: workspaceSelected,
                                layout,
                                parentKey: 0,
                                previewMode: true,
                                isDraggable: false,
                            })
                        );
                    } else {
                        // workspace mismatch!
                        return null;
                    }
                }
            }
        } catch (e) {
            console.log(e);
            return null;
        }
    }

    function addColumn() {
        try {
            const dashboard = new DashboardModel(workspaceSelected);

            const itemSelectedTemp = deepCopy(itemSelected);
            const gridLayout = itemSelectedTemp.grid;

            // lets add a column
            let columns = gridLayout.cols + 1;

            gridLayout.cols = columns;

            itemSelectedTemp.grid = gridLayout;

            setItemSelected(itemSelectedTemp);

            handleUpdate(itemSelectedTemp);

        } catch(e) {
            console.log(e);
        }
    }

    function addRow() {
        try {
            const dashboard = new DashboardModel(workspaceSelected);

            const itemSelectedTemp = deepCopy(itemSelected);
            const gridLayout = itemSelectedTemp.grid;

            // lets add a column
            let rows = gridLayout.rows + 1;
            gridLayout.rows = rows;

            itemSelectedTemp.grid = gridLayout;

            // now we have to update the workspace?
            // dashboard.updateLayoutItem(itemSelectedTemp, workspaceSelected);

            setItemSelected(itemSelectedTemp);

            // now call the update
            handleUpdate(itemSelectedTemp);
            
        } catch(e) {
            console.log(e);
        }
    }


    function renderGridLayoutFlow() {
        try {
            const gridContents = [];
            
            const dashboard = new DashboardModel(workspaceSelected);
            let gridLayout = itemSelected.grid || { cols: 1, rows: 1, 1.1: { "component": null }};
            const compatibleWidgets = ComponentManager.getCompatibleWidgetsForWorkspace(itemSelected.component);

            const direction = itemSelected.direction;
            const rows = gridLayout["rows"];
            const cols = gridLayout["cols"];
            const gridFlow = direction === "cols" ? `grid-flow-col grid-rows-${rows}` : `grid-flow-row grid-cols-${cols}`;
            
            // sanitize the grid layout to make sure we have all of the cells?
            for(var i = 1; i < gridLayout.rows + 1; i++) {
                for( var j=1; j < gridLayout.cols + 1; j++) {
                    const cellNumber = `${i}.${j}`;
                    if (cellNumber in gridLayout === false) {
                        gridLayout[cellNumber] = {component: null, span: null }
                    }
                    // const cmpToRender = cellNumber in gridLayout ? gridLayout[cellNumber]["component"] : null;
                    // if (cmpToRender === null && nextCellNumber === null) {
                    //     nextCellNumber = cellNumber;
                    // }
                }
            }

            console.log("grid layout clean", gridLayout);


            const cellsInLayout =  Object.keys(gridLayout).filter(v => v !== "rows" && v !== "cols");

            function sortObjectByKeys(obj) {
                const sortedKeys = Object.keys(obj).sort();
                const sortedObj = {};
                for (const key of sortedKeys) {
                    sortedObj[key] = obj[key];
                }
                return sortedObj;
            }

            Object.keys(sortObjectByKeys(gridLayout)).filter(v => v !== "rows" && v !== "cols").forEach(cell => {
                const cellNumber = cell;
                const cmpIdToRender = cellNumber in gridLayout ? gridLayout[cellNumber]["component"] : null;
                const cellData = gridLayout[cellNumber];

                if (cmpIdToRender !== null) {
                    // get the component based on the id in the grid
                    // we have to choose the component from the layout that we have in place 
                    // and pass that component into the LayoutBuilderGridItem component
                    // with the information for THIS component

                    const componentToRender = dashboard.getComponentById(cmpIdToRender);
                    if (componentToRender !== undefined) {
                        console.log("component to render  ", componentToRender);
                       
                        const cell = renderGridCell(cellNumber, cellData, compatibleWidgets, componentToRender);
                        // gridContents.push(<div className={`h-1/${rows} flex flex-col border-dotted border-gray-600 border-2 w-full  rounded-md p-4 text-gray-200 text-2xl font-bold justify-center items-center align-center`} onClick={() => setCellSelected({ cellNumber, component: componentToRender })}>{componentToRender.component}</div>);
                        gridContents.push(cell);
                    }
                } else {
                    // gridContents.push(<div className={`h-1/${rows} flex flex-col border-dotted border-gray-600 border-2 w-full rounded-md p-4 text-gray-200 text-2xl font-bold justify-center items-center align-center`} onClick={() => setCellSelected({ cellNumber, component: null })}>{cellNumber}</div>);
                    const cell = renderGridCell(cellNumber, cellData, compatibleWidgets);
                    gridContents.push(cell);
                }   
            });



            return (
                <div className="flex flex-col w-full h-full space-y-4">
                    <div className={`grid grid-rows-${gridLayout.rows} grid-cols-${gridLayout.cols} gap-4 h-full w-full`}>
                        {gridContents}
                    </div>
                </div>
            );
        } catch(e) {
            console.log(e);
            return null;
        }
    }

    function handleMergeCells() {
        try {
            const dashboard = new DashboardModel(workspaceSelected);
            const itemSelectedTemp = deepCopy(itemSelected);
            const gridLayout = itemSelectedTemp.grid;

            console.log("merging cells ", cellsSelected);
            let isInline = false;
            let rows = [];
            let cols = [];
            cellsSelected.forEach(cell => {
                const parts = cell.cellNumber.split(".")
                rows.push(parts[0]);
                cols.push(parts[1]);
            });

            const rowSet = [...new Set(rows)];
            const colSet = [...new Set(cols)];

            console.log("merge SETS ", rowSet, colSet);

            if (rowSet.length === 1) {
                
                // if we are merging ROW CELLS, 
                // we have to add the span of 2 to the lowest number (cell) in the row
                // and hide the other cell perhaps?

                let cellToMerge = null;
                let cellToHide = null;
                cellsSelected.forEach(c => {
                    if (cellToMerge === null) {
                        cellToMerge = c;
                    } else {
                        const cellParts = c.cellNumber.split(".");
                        const colPart = cellParts[1];
                        if (colPart < cellToMerge.cellNumber.split(".")[1]) {
                            cellToMerge = c;
                        }
                    }
                });

                cellToHide = cellsSelected.filter(cell => cell.cellNumber !== cellToMerge.cellNumber)[0];

                console.log("ROW TO MERGE CELLS", cellToMerge);
                cellToMerge.span = "col-span-2";
                cellToHide.hide = true;
                gridLayout[cellToMerge.cellNumber] = cellToMerge;
                gridLayout[cellToHide.cellNumber] = cellToHide;
            }

            if (colSet.length === 1) {
                let cellToMerge = null;
                let cellToHide = null;
                cellsSelected.forEach(c => {
                    if (cellToMerge === null) {
                        cellToMerge = c;
                    } else {
                        const cellParts = c.cellNumber.split(".");
                        const colPart = cellParts[0];
                        if (colPart < cellToMerge.cellNumber.split(".")[0]) {
                            
                            cellToMerge = c;
                        }
                    }
                });
                console.log("COL TO MERGE CELLS", cellToMerge);
                cellToHide = cellsSelected.filter(cell => cell.cellNumber !== cellToMerge.cellNumber)[0];
                cellToMerge.span = "row-span-2";
                cellToHide.hide = true;
                gridLayout[cellToMerge.cellNumber] = cellToMerge;
                gridLayout[cellToHide.cellNumber] = cellToHide;
            }

            // lets add a column

            itemSelectedTemp.grid = gridLayout;

            setItemSelected(itemSelectedTemp);

            handleUpdate(itemSelectedTemp);
            // determine if these are in a column or a row...

        } catch(e) {
            console.log(e);
        }
    }

    function handleSplitCell(cellNumber) {
        console.log("split this cell ", cellNumber);
        const dashboard = new DashboardModel(workspaceSelected);
        const itemSelectedTemp = deepCopy(itemSelected);
        const gridLayout = itemSelectedTemp.grid;

        // lets add a column
        let cols = gridLayout.cols + 1;
        gridLayout.cols = cols;

        // now we have to loop through ALL of the other rows and 
        // add a span

        itemSelectedTemp.grid = gridLayout;

        setItemSelected(itemSelectedTemp);
    }


    function handleSelectWidget(componentName, cellNumber, cellData) {
        console.log(componentName, cellNumber, cellData, workspaceSelected, itemSelected);

        const tempItemSelected = deepCopy(itemSelected);
        tempItemSelected.grid[cellNumber] = { component: componentName };

        setItemSelected(tempItemSelected);
    }

    function handleAddCell(data) {
        console.log("add cell ", data);
        const dashboard = new DashboardModel(workspaceSelected);
        const itemSelectedTemp = deepCopy(itemSelected);

        // grab the grid from the layout
        let gridLayout = itemSelectedTemp.grid;
        if (!gridLayout) {
            gridLayout = {
                "rows": 1,
                "cols": 1,
                "1.1": { component: null }
            }
        }

        const { position, cellNumber, cellData } = data;

        if (position === "top" || position === "bottom") {
            // we need to split the cell in the COL
            // lets check the number of rows we have, we may have to add another row..

            // add a row to the grid layout
            gridLayout.rows += 1;

            // now based on top or bottom, we have to adjust the cellNumber...
            const cellParts = cellNumber.split(".");
            const rowNumber = parseInt(cellParts[0]);
            const colNumber = parseInt(cellParts[1]);
            const nextRow = rowNumber + 1;
            const nextCol = colNumber + 1;

            if (rowNumber) {
                // we have to move all of the cells with row = current to the higher
                // and do the same for all subsequent cell keys...
                let tempGridLayout = {
                    "rows": gridLayout.rows,
                    "cols": gridLayout.cols,
                };

                // we need to fill in any cells due to the additional row
                for(var i=1; i < gridLayout.rows + 1; i++) {
                    for( var j=1; j < gridLayout.cols + 1; j++) {

                        tempGridLayout[`${i}.${j}`] = { component: null, hide: false, span: null };
                    }
                }

                console.log("temp grid layout ", tempGridLayout);

                // we want to make all "other" columns span the # rows
                if (gridLayout.cols > 1) {
                    // because we have multiple columns we will have to add a span
                    // that is 1 more than the current span if there is one
                    Object.keys(tempGridLayout).filter(c => c !== "rows" && c !== "cols").forEach(cell => {
                        console.log("number ", cell);
                        const cellParts = cell.split(".");

                        const cellRowNumber = parseInt(cellParts[0]);
                        const cellColNumber = parseInt(cellParts[1]);

                        console.log("cell ", cell, rowNumber, rowNumber + 1, cellRowNumber, rowNumber + 1 === cellRowNumber);

                        const tempCell = cell in gridLayout ? gridLayout[cell] : tempGridLayout[cell];

                        
                        // if the column is NOT the current column selected
                        if (cellColNumber !== colNumber) {
                            //const cellAdjustment = position === "top" ? parseInt(cellParts[0]) + 1 : parseInt(cellParts[0]);
                            if (cellRowNumber === rowNumber) {
                                tempGridLayout[cell] = tempCell;
                                const currentSpan = tempCell["span"] || null;
                                const spanNumber = currentSpan !== null ? currentSpan.split("-").pop() : 1;
                                tempGridLayout[cell]["span"] = currentSpan === null ? "row-span-2" : `row-span-${parseInt(spanNumber) + 1}`;

                            } else if ((rowNumber + 1) === cellRowNumber) {
                                console.log("hide cell ", cell, tempGridLayout);
                                tempGridLayout[cell] = tempCell;
                                tempGridLayout[cell]["hide"] = true;
                            } else {
                                tempGridLayout[cell] = tempCell;
                                // tempGridLayout[cell]["hide"] = true;
                            }
                            
                        } else {
                            // add normally
                            tempGridLayout[cell] = tempCell;
                        }
                    });
                } else {
                    // lets just add the new row no need to do anything else
                    Object.keys(gridLayout).filter(c => c !== "rows" && c !== "cols").forEach(cell => {
                        tempGridLayout[cell] = gridLayout[cell];
                    });
                }


                gridLayout = tempGridLayout;
            }
        }

        if (position === "right" || position === "left") {
            // we need to split the cell in the ROW
            gridLayout.cols += 1;
        }

        // // lets add a column
        // let cols = gridLayout.cols + 1;
        // gridLayout.cols = cols;

        // now we have to loop through ALL of the other rows and 
        // add a span

        itemSelectedTemp.grid = gridLayout;

        setItemSelected(itemSelectedTemp);

    }

    function handleDeleteCell(data) {
        console.log("delete cell ", data);
    }
    /**
     * 
     * @param {*} cellNumber 
     * @param {*} component 
     * @returns 
     */
    function renderGridCell(cellNumber, cellData, compatibleWidgets = [], component = null) {

        const dashboard = new DashboardModel(workspaceSelected);

        return (
            <GridEditTile 
                cellData={cellData} 
                cellsSelected={cellsSelected} 
                cellNumber={cellNumber} 
                component={component} 
                dashboard={dashboard} 
                compatibleWidgets={compatibleWidgets} 
                handleSelectCell={handleSelectCell}
                handleSplitCell={handleSplitCell} 
                handleSelectWidget={handleSelectWidget} 
                handleAddCell={handleAddCell}
                handleDeleteCell={handleDeleteCell}
            />
        );

        // const bgColor = component !== null ? dashboard.getContainerColor(component) : "";
        
        // const direction = itemSelected.direction;
        // const spanValue = "span" in cellData && cellData["span"] !== null ? `${cellData["span"]}` : "";

        // const isSelected = cellsSelected.filter(cell => cell.cellNumber === cellNumber).length > 0;
        // const borderStyle = component !== null ? (isSelected === true ? "border-2 border-gray-200":"") : (isSelected === true ? "border-2 border-gray-200" : "border-dotted border-gray-600 border-2");
        // const isHidden = "hide" in cellData === false ? false : (cellData.hide === true);
        // return isHidden === false && (
        //     <div className={`flex flex-col ${bgColor} w-full h-full rounded-md text-gray-200 ${borderStyle} ${spanValue}`} onClick={() => handleSelectCell({ cellNumber, component })}>
        //         <div className="flex flex-row w-full justify-end p-1 space-x-1">
        //            {component === null ? cellNumber : component.component}
        //         </div>
        //         {/* <div className="flex flex-col w-full h-full justify-center items-center text-2xl font-bold p-4 cursor-pointer">{component === null ? cellNumber : component.component}</div> */}
        //         <div className="flex flex-col w-full h-full justify-center items-center text-2xl font-bold p-4 cursor-pointer">
        //             <SelectMenu onChange={(e) => handleSelectWidget(e.target.value, cellNumber, cellData)}>
        //                 <option value="">Select a Widget</option>
        //                 {compatibleWidgets.map(cw => {
        //                     return (<option value={cw}>{cw}</option>);
        //                 })}
        //             </SelectMenu>
                    
        //         </div>
        //         <div className="flex flex-row w-full justify-end p-1 space-x-1">
        //             <ButtonIcon3
        //                 icon="trash"
        //                 onClick={() => console.log("trash")}
        //                 backgroundColor="bg-transparent"
        //                 hoverBackgroundColor="hover:bg-green-700"
        //                 className={`text-gray-200`}
        //             />
        //             <ButtonIcon3
        //                 icon="xmark"
        //                 onClick={() => handleSplitCell(cellNumber)}
        //                 backgroundColor="bg-transparent"
        //                 hoverBackgroundColor="hover:bg-green-700"
        //                 className={`text-gray-200`}
        //             />
        //             <ButtonIcon3
        //                 icon="pencil"
        //                 onClick={() => console.log("edit")}
        //                 backgroundColor="bg-transparent"
        //                 hoverBackgroundColor="hover:bg-green-700"
        //                 className={`text-gray-200`}
        //             />
        //         </div>
        //     </div>
        // )
    }

    function renderGridLayout() {
        try {

            const gridContents = [];
            
            const dashboard = new DashboardModel(workspaceSelected);
            const gridLayout = itemSelected.grid;


               for(var i = 1; i < gridLayout.rows + 1; i++) {
                   for( var j=1; j < gridLayout.cols + 1; j++) {

                        const cellNumber = `${i}.${j}`;
                        const cmpIdToRender = cellNumber in gridLayout ? gridLayout[cellNumber]["component"] : null;

                        if (cmpIdToRender !== null) {
                            
                            // get the component based on the id in the grid
                            // we have to choose the component from the layout that we have in place 
                            // and pass that component into the LayoutBuilderGridItem component
                            // with the information for THIS component
                            const componentToRender = dashboard.getComponentById(cmpIdToRender);
                            const cell = renderGridCell(cellNumber, componentToRender);
                            if (componentToRender) {
                                gridContents.push(cell);
                            }
                        } else {
                            const cell = renderGridCell(cellNumber, null);
                            gridContents.push(cell);
                        }    
                }
            }
                return (
                <div className="flex flex-col w-full h-full space-y-4">
                    <div className="flex flex-row w-full h-full space-x-4">
                        <div className={`grid grid-cols-${gridLayout["cols"] || 1} grid-rows-${gridLayout["rows"] || 1} gap-4 h-full w-full`}>
                            {gridContents}
                        </div>
                    </div>
                </div>
                );
        } catch(e) {
            console.log(e);
            return null;
        }
    }

     
     /**
         * render the widgets available in the application limited by the workspace
         * @returns 
         */
        function renderWidgets() {
            const componentMap = ComponentManager.map();
            const workspaceType = itemSelected ? itemSelected["workspace"] : null;
            const canAddChildren = itemSelected ? itemSelected["canHaveChildren"] : true;
    
            const parentWorkspaceType =
                itemSelected["parentWorkspaceName"] !== null &&
                itemSelected["parentWorkspaceName"] !== undefined
                    ? itemSelected["parentWorkspaceName"]
                    : "layout";
    
            if (parentWorkspaceType !== null) {
                const options =
                    workspaceType !== null &&
                    canAddChildren &&
                    Object.keys(componentMap)
                        .sort()
                        .filter((c) => componentMap[c]["type"] === "widget")
                        .filter((c) =>
                            workspaceType !== null
                                ? componentMap[c]["workspace"] ===
                                  parentWorkspaceType
                                : true
                        )
                        .map((w) => renderMenuItem("widget", w));
    
                return (
                    <div className="flex flex-col rounded space-y-1">{options}</div>
                );
            } else {
                return <div className="flex flex-col rounded"></div>;
            }
        }
     
    
          function renderMenuItem(type, componentName) {
        //console.log("type and componnet ", type, componentName);
        return (
            <MenuItem3
                key={`menu-item-${componentName}`}
                onClick={() =>
                    handleClickItem({ type, component: componentName })
                }
            >
                {componentName}
            </MenuItem3>
        );
    }

    return (
        itemSelected &&
        workspaceSelected && (
            <Panel>
                <div className={`flex flex-col w-full h-full overflow-clip`}>
                    <div className="flex flex-col w-full h-full overflow-clip">
                        <div className="flex flex-row w-full h-full overflow-clip space-x-4 justify-between">

                        <div className="flex-col h-full rounded font-medium text-gray-400 w-full hidden xl:flex lg:w-1/3 justify-between">
                            <div className="flex flex-col rounded p-4 py-10 space-y-4">
                                <p className={`text-5xl font-bold ${theme["text-secondary-very-light"]}`}>Layout.</p>
                                <p className={`text-xl font-normal ${theme["text-secondary-light"]}`}>
                                    Add and Remove rows and columns to create your layout. You may also merge and split cells to create a more complex layout.
                                </p>
                            </div>
                            <div className="flex flex-col rounded p-4 space-y-2 justify-end">
                                <div className="flex flex-row space-x-2 items-center"><ButtonIcon icon="arrow-right-from-bracket" /><span>To merge a cell</span></div>
                                <div className="flex flex-row space-x-2 items-center"><ButtonIcon icon="arrow-right-to-bracket" /><span>To split a cell</span></div>
                            </div>
                        </div>
                        




                        <div
                            className={`flex flex-col w-full h-full rounded space-y-2 border-2 border-dashed ${theme["border-secondary-very-dark"]}`}
                        >
                            <div className={`flex flex-col h-full w-full overflow-y-auto`}>
                                <GridEditor onUpdate={updateGridLayout} initialGrid={itemSelected.grid} />
                                {/* {itemSelected !== null &&
                                    workspaceSelected !== null &&
                                    renderGridLayoutFlow()} */}
                            </div>
                        </div>

                    {/* <div className="flex flex-col w-1/4 h-full text-xs">
                        {JSON.stringify(itemSelected, null, 4)}
                    </div> */}

                    </div>
                </div>
                </div>
            </Panel>
        )
    );
};

export default PanelEditItemGrid;
