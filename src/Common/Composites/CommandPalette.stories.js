import { useState } from "react";
import { mock, MockWrapper } from "../../Mock";
import { CommandPalette } from "./CommandPalette";
import { Button2 } from "../Button";

import "../../tailwind.css";

export default {
    title: "Composites/CommandPalette",
};

export const Default = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <div>
                <Button2 title="Open Command Palette" onClick={() => setIsOpen(true)} />
                <p className="text-sm opacity-50 mt-2">
                    Or press Cmd+K / Ctrl+K
                </p>
            </div>

            <CommandPalette
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                placeholder="Search commands..."
            >
                <CommandPalette.Group label="Actions">
                    <CommandPalette.Item
                        onSelect={() => setIsOpen(false)}
                        shortcut="Cmd+N"
                    >
                        New Widget
                    </CommandPalette.Item>
                    <CommandPalette.Item
                        onSelect={() => setIsOpen(false)}
                        shortcut="Cmd+S"
                    >
                        Save Dashboard
                    </CommandPalette.Item>
                    <CommandPalette.Item
                        onSelect={() => setIsOpen(false)}
                    >
                        Toggle Theme
                    </CommandPalette.Item>
                </CommandPalette.Group>
                <CommandPalette.Group label="Navigation">
                    <CommandPalette.Item
                        onSelect={() => setIsOpen(false)}
                    >
                        Go to Settings
                    </CommandPalette.Item>
                    <CommandPalette.Item
                        onSelect={() => setIsOpen(false)}
                    >
                        Go to Providers
                    </CommandPalette.Item>
                </CommandPalette.Group>
            </CommandPalette>
        </MockWrapper>
    );
};
