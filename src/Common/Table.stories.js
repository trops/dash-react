import { Table, Table2, Table3 } from "./Table";
import { mock, MockWrapper } from "@dash";
import { Tag, Tag2, Tag3 } from "./Tag";
import "@dash/tailwind.css";

export default {
    title: "Common/Table",
    component: Table,
};

// Sample data for the stories
const sampleData = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "Active",
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        status: "Active",
    },
    {
        id: 3,
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "User",
        status: "Inactive",
    },
    {
        id: 4,
        name: "Alice Williams",
        email: "alice@example.com",
        role: "Editor",
        status: "Active",
    },
    {
        id: 5,
        name: "Charlie Brown",
        email: "charlie@example.com",
        role: "User",
        status: "Active",
    },
];

const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "role", label: "Role" },
    { key: "status", label: "Status" },
];

const Template = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Table columns={columns} data={sampleData} {...args} />
        </MockWrapper>
    );
};

const Template2 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Table2 columns={columns} data={sampleData} {...args} />
        </MockWrapper>
    );
};

const Template3 = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Table3 columns={columns} data={sampleData} {...args} />
        </MockWrapper>
    );
};

const TemplateWithCustomRender = (args) => {
    const customColumns = [
        { key: "id", label: "ID" },
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "role", label: "Role" },
        {
            key: "status",
            label: "Status",
            render: (value) => (
                <Tag
                    text={value}
                    className={value === "Active" ? "" : "opacity-50"}
                />
            ),
        },
    ];

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Table columns={customColumns} data={sampleData} {...args} />
        </MockWrapper>
    );
};

const TemplateStriped = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Table
                columns={columns}
                data={sampleData}
                striped={true}
                {...args}
            />
        </MockWrapper>
    );
};

const TemplateCompact = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Table
                columns={columns}
                data={sampleData}
                compact={true}
                {...args}
            />
        </MockWrapper>
    );
};

const TemplateClickable = (args) => {
    const handleRowClick = (row) => {
        alert(`Clicked on: ${row.name}`);
    };

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Table
                columns={columns}
                data={sampleData}
                onRowClick={handleRowClick}
                {...args}
            />
        </MockWrapper>
    );
};

const TemplateEmpty = (args) => {
    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Table columns={columns} data={[]} {...args} />
        </MockWrapper>
    );
};

const TemplateWithNumbers = (args) => {
    const numericData = [
        { product: "Widget A", price: 29.99, quantity: 150, total: 4498.5 },
        { product: "Widget B", price: 19.99, quantity: 200, total: 3998.0 },
        { product: "Widget C", price: 49.99, quantity: 75, total: 3749.25 },
        { product: "Widget D", price: 9.99, quantity: 500, total: 4995.0 },
        { product: "Widget E", price: 99.99, quantity: 50, total: 4999.5 },
    ];

    const numericColumns = [
        { key: "product", label: "Product" },
        {
            key: "price",
            label: "Price",
            render: (value) => `$${value.toFixed(2)}`,
        },
        { key: "quantity", label: "Quantity" },
        {
            key: "total",
            label: "Total",
            render: (value) => `$${value.toFixed(2)}`,
        },
    ];

    return (
        <MockWrapper api={mock.api} theme={mock.themes}>
            <Table2 columns={numericColumns} data={numericData} {...args} />
        </MockWrapper>
    );
};

export const Primary = Template.bind({});
export const Secondary = Template2.bind({});
export const Tertiary = Template3.bind({});
export const CustomRender = TemplateWithCustomRender.bind({});
export const Striped = TemplateStriped.bind({});
export const Compact = TemplateCompact.bind({});
export const Clickable = TemplateClickable.bind({});
export const Empty = TemplateEmpty.bind({});
export const WithNumbers = TemplateWithNumbers.bind({});

Primary.args = {
    sortable: true,
    hoverable: true,
    bordered: true,
};

Secondary.args = {
    sortable: true,
    hoverable: true,
    bordered: true,
};

Tertiary.args = {
    sortable: true,
    hoverable: true,
    bordered: true,
};

CustomRender.args = {
    sortable: true,
    hoverable: true,
    bordered: true,
};

Striped.args = {
    sortable: true,
    hoverable: true,
    bordered: true,
};

Compact.args = {
    sortable: true,
    hoverable: true,
    bordered: true,
};

Clickable.args = {
    sortable: true,
    hoverable: true,
    bordered: true,
};

Empty.args = {
    sortable: true,
    hoverable: true,
    bordered: true,
};

WithNumbers.args = {
    sortable: true,
    hoverable: true,
    bordered: true,
};

const simpleData = [
    { id: 1, name: "Item A", value: 100 },
    { id: 2, name: "Item B", value: 200 },
    { id: 3, name: "Item C", value: 300 },
];

const simpleColumns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    { key: "value", label: "Value" },
];

export const AllVariants = () => (
    <MockWrapper api={mock.api} theme={mock.themes}>
        <div className="space-y-8 p-4">
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Table (Primary Variant)
                </h3>
                <Table
                    columns={simpleColumns}
                    data={simpleData}
                    bordered={true}
                />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Padding: Uses paddingClass variable
                    <br />
                    Structure: w-full, overflow-x-auto
                    <br />
                    Borders: border-b on rows
                    <br />
                    <span className="text-amber-600">
                        ⚠️ Note: Variants may differ only in theme colors and
                        padding size - check implementation
                    </span>
                </div>
            </div>
            <div className="border-b pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Table2 (Secondary Variant)
                </h3>
                <Table2
                    columns={simpleColumns}
                    data={simpleData}
                    bordered={true}
                />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Padding: Uses paddingClass variable
                    <br />
                    Structure: w-full, overflow-x-auto
                    <br />
                    Borders: border-b on rows
                    <br />
                    <span className="text-amber-600">
                        ⚠️ Note: Check if padding differs from primary
                    </span>
                </div>
            </div>
            <div className="pb-6">
                <h3 className="text-lg font-semibold mb-4">
                    Table3 (Tertiary Variant)
                </h3>
                <Table3
                    columns={simpleColumns}
                    data={simpleData}
                    bordered={true}
                />
                <div className="text-sm text-gray-600 mt-2 font-mono">
                    Padding: Uses paddingClass variable
                    <br />
                    Structure: w-full, overflow-x-auto
                    <br />
                    Borders: border-b on rows
                    <br />
                    <span className="text-amber-600">
                        ⚠️ Note: Check if padding differs from primary and
                        secondary
                    </span>
                </div>
            </div>
        </div>
    </MockWrapper>
);
