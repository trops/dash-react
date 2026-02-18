import { useContext, Children } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStylesForItem } from "@dash/Utils";
import { themeObjects } from "@dash/Utils/themeObjects";
import { Button2, Button3 } from "../Button";

// ─── Sub-components ─────────────────────────────────────────────────────────────

const StepperStep = ({
    label,
    description = null,
    children = null,
    // Injected by parent
    _index = 0,
    _active = false,
    _completed = false,
}) => {
    // children are rendered by root component, not here
    return null;
};

// ─── Root Component ─────────────────────────────────────────────────────────────

const Stepper = ({
    activeStep = 0,
    onStepChange = null,
    children,
    showNavigation = true,
    completeLabel = "Complete",
    nextLabel = "Next",
    backLabel = "Back",
    className = "",
}) => {
    const { currentTheme } = useContext(ThemeContext);
    const stepStyles = getStylesForItem(
        themeObjects.STEPPER_STEP,
        currentTheme,
        { scrollable: false, grow: false }
    );
    const connectorStyles = getStylesForItem(
        themeObjects.STEPPER_CONNECTOR,
        currentTheme,
        { scrollable: false, grow: false }
    );
    const steps = Children.toArray(children).filter(
        (child) => child.type === StepperStep
    );
    const totalSteps = steps.length;

    const goNext = () => {
        if (onStepChange && activeStep < totalSteps - 1) {
            onStepChange(activeStep + 1);
        }
    };

    const goBack = () => {
        if (onStepChange && activeStep > 0) {
            onStepChange(activeStep - 1);
        }
    };

    const goTo = (index) => {
        if (onStepChange && index <= activeStep) {
            onStepChange(index);
        }
    };

    return (
        <div className={`flex flex-col ${className}`}>
            {/* Step indicators */}
            <div className="flex flex-row items-center mb-6">
                {steps.map((step, i) => {
                    const isActive = i === activeStep;
                    const isCompleted = i < activeStep;

                    return (
                        <div
                            key={i}
                            className="flex flex-row items-center flex-1 last:flex-none"
                        >
                            {/* Step circle */}
                            <button
                                type="button"
                                onClick={() => goTo(i)}
                                disabled={i > activeStep}
                                className={`flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full text-sm font-medium ${stepStyles.transition || "transition-colors duration-200"} ${
                                    isCompleted
                                        ? `${stepStyles.activeBackgroundColor || ""} ${stepStyles.activeTextColor || ""}`
                                        : isActive
                                          ? `${stepStyles.activeBackgroundColor || ""} ${stepStyles.activeTextColor || ""} ring-2 ring-offset-2 ring-offset-transparent ${stepStyles.activeBackgroundColor || ""}`
                                          : `${stepStyles.backgroundColor || ""} ${stepStyles.textColor || ""} opacity-50`
                                } ${i <= activeStep ? "cursor-pointer" : "cursor-default"}`}
                            >
                                {isCompleted ? (
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2.5}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                ) : (
                                    i + 1
                                )}
                            </button>

                            {/* Label */}
                            <div className="flex flex-col ml-2 min-w-0">
                                <span
                                    className={`text-sm font-medium truncate ${isActive || isCompleted ? stepStyles.activeTextColor || "" : `${stepStyles.textColor || ""} opacity-50`}`}
                                >
                                    {step.props.label}
                                </span>
                                {step.props.description && (
                                    <span
                                        className={`text-xs truncate ${stepStyles.textColor || ""} opacity-40`}
                                    >
                                        {step.props.description}
                                    </span>
                                )}
                            </div>

                            {/* Connector line */}
                            {i < totalSteps - 1 && (
                                <div
                                    className={`flex-1 h-px mx-4 ${
                                        i < activeStep
                                            ? connectorStyles.activeBackgroundColor ||
                                              ""
                                            : `${connectorStyles.backgroundColor || ""} opacity-30`
                                    }`}
                                />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Step content */}
            <div className="flex-1 min-h-0">
                {steps[activeStep] ? steps[activeStep].props.children : null}
            </div>

            {/* Navigation */}
            {showNavigation && (
                <div className="flex flex-row justify-between items-center mt-6 pt-4 border-t border-current/10">
                    <Button3
                        title={backLabel}
                        onClick={goBack}
                        disabled={activeStep === 0}
                    />
                    <span className="text-xs opacity-40">
                        Step {activeStep + 1} of {totalSteps}
                    </span>
                    <Button2
                        title={
                            activeStep === totalSteps - 1
                                ? completeLabel
                                : nextLabel
                        }
                        onClick={goNext}
                        disabled={activeStep >= totalSteps - 1 && !onStepChange}
                    />
                </div>
            )}
        </div>
    );
};

Stepper.Step = StepperStep;

export { Stepper };
