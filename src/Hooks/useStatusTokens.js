import { useContext } from "react";
import { ThemeContext } from "@dash/Context/ThemeContext";
import { getStatusColors } from "@dash/Utils/statusColors";

/**
 * useStatusTokens — status colors for the active light/dark variant.
 *
 *   const status = useStatusTokens();
 *   <span className={status.error.icon}>Failed</span>
 *   <span className={`w-2 h-2 rounded-full ${status.success.solidBg}`} />
 *
 * Returns { error, success, warning, info }; see statusColors.js for
 * the per-status keys.
 */
export const useStatusTokens = () => {
    const { themeVariant } = useContext(ThemeContext);
    return getStatusColors(themeVariant);
};
