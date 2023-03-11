import React, { useEffect } from "react";
import { LayoutContainer } from "@dash/Layout";
import { DashboardContext } from "@dash/Context";

export const DashboardMonitor = () => {
    const { pub } = useContext(DashboardContext);

    useEffect(() => {});

    return (
        <LayoutContainer direction="col" scrollable={true}></LayoutContainer>
    );
};
