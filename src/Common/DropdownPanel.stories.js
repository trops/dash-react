import { useState } from "react";
import { DropdownPanel, DropdownPanel2, DropdownPanel3 } from "./DropdownPanel";
import { MenuItem, MenuItem2, MenuItem3 } from "./MenuItem";
import { mock, MockWrapper } from "@dash";

import "../tailwind.css";

export default {
    title: "Common/DropdownPanel",
    component: DropdownPanel,
};

// ─── Sample data ────────────────────────────────────────────────────────────────

const sampleProviders = [
    { id: "prod", name: "Production API", description: "api.example.com" },
    {
        id: "staging",
        name: "Staging API",
        description: "staging.example.com",
    },
    { id: "local", name: "Local Dev", description: "localhost:3000" },
];

// ─── Story 1: Primary variant ───────────────────────────────────────────────────

export const Primary = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="relative inline-block" style={{ marginTop: 8 }}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                >
                    Toggle Dropdown
                </button>
                <DropdownPanel
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <DropdownPanel.Header>Select Provider</DropdownPanel.Header>
                    <MenuItem onClick={() => {}}>REST API - Production</MenuItem>
                    <MenuItem onClick={() => {}}>REST API - Staging</MenuItem>
                    <MenuItem onClick={() => {}} selected={true}>
                        GraphQL - Main
                    </MenuItem>
                    <DropdownPanel.Divider />
                    <MenuItem onClick={() => {}}>
                        <span className="text-blue-400">+ Create New</span>
                    </MenuItem>
                </DropdownPanel>
            </div>
        </MockWrapper>
    );
};

// ─── Story 2: Secondary variant ─────────────────────────────────────────────────

export const Secondary = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="relative inline-block" style={{ marginTop: 8 }}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                >
                    Toggle Dropdown
                </button>
                <DropdownPanel2
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <DropdownPanel2.Header>
                        Select Provider
                    </DropdownPanel2.Header>
                    <MenuItem2 onClick={() => {}}>
                        REST API - Production
                    </MenuItem2>
                    <MenuItem2 onClick={() => {}}>
                        REST API - Staging
                    </MenuItem2>
                    <MenuItem2 onClick={() => {}} selected={true}>
                        GraphQL - Main
                    </MenuItem2>
                    <DropdownPanel2.Divider />
                    <MenuItem2 onClick={() => {}}>
                        <span className="text-blue-400">+ Create New</span>
                    </MenuItem2>
                </DropdownPanel2>
            </div>
        </MockWrapper>
    );
};

// ─── Story 3: Tertiary variant ──────────────────────────────────────────────────

export const Tertiary = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="relative inline-block" style={{ marginTop: 8 }}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                >
                    Toggle Dropdown
                </button>
                <DropdownPanel3
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <DropdownPanel3.Header>
                        Select Provider
                    </DropdownPanel3.Header>
                    <MenuItem3 onClick={() => {}}>
                        REST API - Production
                    </MenuItem3>
                    <MenuItem3 onClick={() => {}}>
                        REST API - Staging
                    </MenuItem3>
                    <MenuItem3 onClick={() => {}} selected={true}>
                        GraphQL - Main
                    </MenuItem3>
                    <DropdownPanel3.Divider />
                    <MenuItem3 onClick={() => {}}>
                        <span className="text-blue-400">+ Create New</span>
                    </MenuItem3>
                </DropdownPanel3>
            </div>
        </MockWrapper>
    );
};

// ─── Story 4: With descriptions ─────────────────────────────────────────────────

export const WithDescriptions = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [selected, setSelected] = useState("prod");

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="relative inline-block" style={{ marginTop: 8 }}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                >
                    Select Provider
                </button>
                <DropdownPanel
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <DropdownPanel.Header>REST Providers</DropdownPanel.Header>
                    {sampleProviders.map((p) => (
                        <MenuItem2
                            key={p.id}
                            onClick={() => setSelected(p.id)}
                            selected={p.id === selected}
                        >
                            <div>
                                <div className="font-medium">{p.name}</div>
                                <div className="text-xs opacity-60 mt-0.5">
                                    {p.description}
                                </div>
                            </div>
                        </MenuItem2>
                    ))}
                    <DropdownPanel.Divider />
                    <MenuItem2 onClick={() => {}}>
                        <span className="text-blue-400">
                            + Create New Provider
                        </span>
                    </MenuItem2>
                </DropdownPanel>
            </div>
        </MockWrapper>
    );
};

// ─── Story 5: Empty state ───────────────────────────────────────────────────────

export const EmptyState = () => {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div className="relative inline-block" style={{ marginTop: 8 }}>
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="px-3 py-1.5 text-sm rounded-md bg-white/10 hover:bg-white/20 transition-colors"
                >
                    Toggle Dropdown
                </button>
                <DropdownPanel
                    isOpen={isOpen}
                    onClose={() => setIsOpen(false)}
                >
                    <div className="px-3 py-2 text-xs opacity-50 italic">
                        No providers configured
                    </div>
                    <MenuItem2 onClick={() => {}}>
                        <span className="text-blue-400">
                            + Create New Provider
                        </span>
                    </MenuItem2>
                </DropdownPanel>
            </div>
        </MockWrapper>
    );
};

// ─── Story 6: All Variants ──────────────────────────────────────────────────────

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    DropdownPanel (Primary Variant)
                </h3>
                <div className="relative inline-block">
                    <DropdownPanel
                        isOpen={true}
                        onClose={() => {}}
                        position="relative"
                    >
                        <DropdownPanel.Header>
                            Select Provider
                        </DropdownPanel.Header>
                        <MenuItem onClick={() => {}}>
                            Production API
                        </MenuItem>
                        <MenuItem onClick={() => {}} selected={true}>
                            Staging API
                        </MenuItem>
                        <MenuItem onClick={() => {}}>Local Dev</MenuItem>
                        <DropdownPanel.Divider />
                        <MenuItem onClick={() => {}}>
                            <span className="text-blue-400">+ Create New</span>
                        </MenuItem>
                    </DropdownPanel>
                </div>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Theme: bg-primary-very-dark / border-primary-dark /
                    text-primary-medium
                    <br />
                    Shadow: shadow-xl
                    <br />
                    Border radius: rounded-lg
                    <br />
                    Header: text-primary-light / text-xs / font-semibold
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    DropdownPanel2 (Secondary Variant)
                </h3>
                <div className="relative inline-block">
                    <DropdownPanel2
                        isOpen={true}
                        onClose={() => {}}
                        position="relative"
                    >
                        <DropdownPanel2.Header>
                            Select Provider
                        </DropdownPanel2.Header>
                        <MenuItem2 onClick={() => {}}>
                            Production API
                        </MenuItem2>
                        <MenuItem2 onClick={() => {}} selected={true}>
                            Staging API
                        </MenuItem2>
                        <MenuItem2 onClick={() => {}}>Local Dev</MenuItem2>
                        <DropdownPanel2.Divider />
                        <MenuItem2 onClick={() => {}}>
                            <span className="text-blue-400">+ Create New</span>
                        </MenuItem2>
                    </DropdownPanel2>
                </div>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Theme: bg-secondary-very-dark / border-secondary-dark /
                    text-secondary-medium
                    <br />
                    Shadow: shadow-xl
                    <br />
                    Border radius: rounded-lg
                    <br />
                    Header: text-secondary-light / text-xs / font-semibold
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    DropdownPanel3 (Tertiary Variant)
                </h3>
                <div className="relative inline-block">
                    <DropdownPanel3
                        isOpen={true}
                        onClose={() => {}}
                        position="relative"
                    >
                        <DropdownPanel3.Header>
                            Select Provider
                        </DropdownPanel3.Header>
                        <MenuItem3 onClick={() => {}}>
                            Production API
                        </MenuItem3>
                        <MenuItem3 onClick={() => {}} selected={true}>
                            Staging API
                        </MenuItem3>
                        <MenuItem3 onClick={() => {}}>Local Dev</MenuItem3>
                        <DropdownPanel3.Divider />
                        <MenuItem3 onClick={() => {}}>
                            <span className="text-blue-400">+ Create New</span>
                        </MenuItem3>
                    </DropdownPanel3>
                </div>
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Theme: bg-tertiary-very-dark / border-tertiary-dark /
                    text-tertiary-medium
                    <br />
                    Shadow: shadow-lg
                    <br />
                    Border radius: rounded-md
                    <br />
                    Header: text-tertiary-light / text-xs / font-medium
                </div>
            </div>
        </div>
    </MockWrapper>
);
