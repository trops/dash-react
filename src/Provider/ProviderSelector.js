import React, { useState } from "react";
import { Modal } from "@dash/Common";
import { ProviderForm } from "./ProviderForm";
import { Panel } from "@dash/Common";

/**
 * ProviderSelector Modal Component
 *
 * Application-level component for managing providers.
 * Two-tab modal for managing providers:
 * 1. Select existing provider from filtered list
 * 2. Create new provider with credentialSchema form
 *
 * @param {boolean} isOpen - Whether modal is open
 * @param {Function} setIsOpen - Callback to close modal
 * @param {string} providerType - Type of provider to filter by (e.g., "algolia")
 * @param {Array} existingProviders - List of existing providers: [{name, type, credentials}, ...]
 * @param {Object} credentialSchema - Schema for creating new provider
 * @param {Function} onSelect - Callback when provider is selected: (providerName) => void
 * @param {Function} onCreate - Callback when new provider is created: (providerName, credentials) => void
 */
export const ProviderSelector = ({
    isOpen,
    setIsOpen,
    providerType,
    existingProviders = [],
    credentialSchema = {},
    onSelect,
    onCreate,
}) => {
    const [activeTab, setActiveTab] = useState("select"); // "select" or "create"

    /**
     * Filter providers by type
     */
    const filteredProviders = existingProviders.filter(
        (p) => p.type === providerType
    );

    /**
     * Handle provider selection
     */
    const handleSelectProvider = (providerName) => {
        onSelect(providerName);
        setIsOpen(false);
    };

    /**
     * Handle new provider creation
     */
    const handleCreateProvider = (formData) => {
        // formData now contains { name, credentials }
        const { name: providerName, credentials } = formData;
        onCreate(providerName, credentials);
        setIsOpen(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            width="w-3/4"
            height="h-3/4"
        >
            {/* Modal Header */}
            <div className="bg-white border-b border-gray-200 p-4">
                <h2 className="text-lg font-bold text-gray-900">
                    {providerType ? (
                        <>
                            Manage{" "}
                            <span className="capitalize">{providerType}</span>{" "}
                            Providers
                        </>
                    ) : (
                        "Select Provider"
                    )}
                </h2>
                <p className="text-sm text-gray-600 mt-1">
                    {activeTab === "select"
                        ? `Select an existing ${providerType} provider or create a new one`
                        : `Create a new ${providerType} provider`}
                </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 bg-gray-50">
                <button
                    onClick={() => setActiveTab("select")}
                    className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 ${
                        activeTab === "select"
                            ? "text-blue-600 border-blue-600"
                            : "text-gray-600 border-transparent hover:text-gray-900"
                    }`}
                >
                    Select Existing ({filteredProviders.length})
                </button>
                <button
                    onClick={() => setActiveTab("create")}
                    className={`flex-1 px-4 py-3 text-sm font-medium border-b-2 ${
                        activeTab === "create"
                            ? "text-blue-600 border-blue-600"
                            : "text-gray-600 border-transparent hover:text-gray-900"
                    }`}
                >
                    Create New
                </button>
            </div>

            {/* Modal Content */}
            <div className="flex-1 overflow-y-auto bg-white">
                {activeTab === "select" ? (
                    // Select Tab
                    <div className="p-6">
                        {filteredProviders.length > 0 ? (
                            <div className="space-y-3">
                                {filteredProviders.map((provider) => (
                                    <button
                                        key={provider.name}
                                        onClick={() =>
                                            handleSelectProvider(provider.name)
                                        }
                                        className="w-full text-left p-4 border border-gray-200 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition"
                                    >
                                        <div className="font-semibold text-gray-900">
                                            {provider.name}
                                        </div>
                                        <div className="text-sm text-gray-600 mt-1">
                                            Type:{" "}
                                            <span className="capitalize">
                                                {provider.type}
                                            </span>
                                        </div>
                                        {provider.credentials &&
                                            Object.keys(provider.credentials)
                                                .length > 0 && (
                                                <div className="text-xs text-gray-500 mt-2">
                                                    Fields:{" "}
                                                    {Object.keys(
                                                        provider.credentials
                                                    ).join(", ")}
                                                </div>
                                            )}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <Panel className="text-center py-8">
                                <p className="text-gray-600">
                                    No {providerType} providers found
                                </p>
                                <p className="text-sm text-gray-500 mt-2">
                                    Create one on the "Create New" tab
                                </p>
                            </Panel>
                        )}
                    </div>
                ) : (
                    // Create Tab
                    <ProviderForm
                        credentialSchema={credentialSchema}
                        onSubmit={handleCreateProvider}
                        onCancel={() => setIsOpen(false)}
                        submitLabel="Create Provider"
                        providerType={providerType}
                    />
                )}
            </div>
        </Modal>
    );
};
