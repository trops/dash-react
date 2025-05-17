export const Container = ({
    id,
    children,
    direction = "row",
    className = "",
    scrollable = true,
    width = "w-full",
    height = "h-full min-h-fit",
    debug = false,
    onMouseOver = null,
    onMouseOut = null,
}) => {
    // determine the classes based on the props...
    const directionStyle =
        direction === "row" ? "flex-row space-x-2" : "flex-col space-y-2";
    const scrollStyle =
        scrollable === true ? "scrollbar overflow-y-scroll" : "overflow-clip";
    const widthStyle = width;
    const heightStyle = scrollable === true ? height : height;

    // since we do not have a layout container we can create an id like so
    const uuid = getUUID(id, "container");
    return (
        <div
            id={uuid}
            onMouseOver={onMouseOver}
            onMouseOut={onMouseOut}
            className={`flex ${directionStyle} ${scrollStyle} ${widthStyle} ${heightStyle} ${className}`}
        >
            {children}
        </div>
    );
};
