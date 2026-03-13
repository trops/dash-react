#!/bin/bash

# dash-react Integration Validation Script
# This script builds dash-react and tests it in the dash application

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Paths — derived dynamically, no hardcoded user paths
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
DASH_REACT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
# Expect dash-electron as a sibling directory (override with DASH_APP_DIR env var)
DASH_APP_DIR="${DASH_APP_DIR:-$(cd "$DASH_REACT_DIR/../dash-electron" 2>/dev/null && pwd || echo "")}"
if [[ -z "$DASH_APP_DIR" || ! -d "$DASH_APP_DIR" ]]; then
    echo "Error: dash-electron not found at expected sibling path (../dash-electron)."
    echo "Set DASH_APP_DIR env var to override, or run setup-repos.sh from dash-electron."
    exit 1
fi

echo -e "${BLUE}🔍 Validating dash-react integration with dash...${NC}\n"

# Step 1: Validate current directory
echo -e "${YELLOW}📍 Step 1/4: Checking current directory...${NC}"
CURRENT_DIR=$(pwd)
if [ "$CURRENT_DIR" != "$DASH_REACT_DIR" ]; then
    echo -e "${YELLOW}⚠️  Not in dash-react directory, changing...${NC}"
    cd "$DASH_REACT_DIR"
fi
echo -e "${GREEN}✅ In dash-react directory${NC}\n"

# Step 2: Build dash-react
echo -e "${YELLOW}🏗️  Step 2/4: Building dash-react library...${NC}"
echo -e "${BLUE}   Running full production build...${NC}"
if npm run prod > /tmp/dash-react-build.log 2>&1; then
    echo -e "${GREEN}✅ dash-react built successfully${NC}"

    # Get package info
    PACKAGE_SIZE=$(ls -lh package/trops-dash-react.tgz | awk '{print $5}')
    VERSION=$(node -p "require('./package.json').version")
    echo -e "${BLUE}   Version: ${VERSION}${NC}"
    echo -e "${BLUE}   Package size: ${PACKAGE_SIZE}${NC}\n"
else
    echo -e "${RED}❌ dash-react build failed${NC}"
    echo -e "${YELLOW}Last 20 lines of build output:${NC}"
    tail -20 /tmp/dash-react-build.log
    exit 1
fi

# Step 3: Install in dash
echo -e "${YELLOW}📦 Step 3/4: Installing dash-react in dash app...${NC}"
cd "$DASH_APP_DIR"

if npm install "$DASH_REACT_DIR/package/trops-dash-react.tgz" > /tmp/dash-install.log 2>&1; then
    echo -e "${GREEN}✅ dash-react installed in dash${NC}\n"
else
    echo -e "${RED}❌ Installation failed${NC}"
    echo -e "${YELLOW}Last 20 lines of install output:${NC}"
    tail -20 /tmp/dash-install.log
    exit 1
fi

# Step 4: Validate dash build
echo -e "${YELLOW}🏗️  Step 4/4: Validating dash build...${NC}"
echo -e "${BLUE}   (This will take ~30 seconds)${NC}"

# Build CSS first
if npm run build:css > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Dash CSS built${NC}"
else
    echo -e "${RED}❌ Dash CSS build failed${NC}"
    exit 1
fi

# Create temp log file
BUILD_LOG=$(mktemp)

# Start dev server in background
BROWSER=none npm start > "$BUILD_LOG" 2>&1 &
BUILD_PID=$!

# Wait for success or timeout (30 seconds)
SUCCESS=false
for i in {1..60}; do
    if grep -q "Compiled successfully" "$BUILD_LOG" 2>/dev/null; then
        SUCCESS=true
        break
    fi
    sleep 0.5
done

# Kill the dev server
kill $BUILD_PID 2>/dev/null || true
sleep 1
pkill -P $BUILD_PID 2>/dev/null || true

if [ "$SUCCESS" = true ]; then
    echo -e "${GREEN}✅ Dash builds successfully with new dash-react${NC}\n"
else
    echo -e "${RED}❌ Dash build failed or timed out${NC}"
    echo -e "${YELLOW}Last 30 lines of build output:${NC}"
    tail -30 "$BUILD_LOG"
    rm "$BUILD_LOG"
    exit 1
fi

# Clean up log file
rm "$BUILD_LOG"

# Success summary
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ Integration validation passed!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "${BLUE}Integration summary:${NC}"
echo -e "  📦 dash-react version: ${YELLOW}${VERSION}${NC}"
echo -e "  📦 Package size: ${YELLOW}${PACKAGE_SIZE}${NC}"
echo -e "  ✅ Installed in dash successfully"
echo -e "  ✅ Dash compiles without errors\n"

echo -e "${BLUE}Manual testing recommended:${NC}"
echo -e "  1. Run: ${YELLOW}cd $DASH_APP_DIR && npm run dev${NC}"
echo -e "  2. Open Electron DevTools (View → Toggle Developer Tools)"
echo -e "  3. Check console for theme loading messages:"
echo -e "     ${GREEN}[ThemeWrapper] Loading X saved themes...${NC}"
echo -e "     ${GREEN}[ThemeWrapper] Loaded theme: theme-1${NC}"
echo -e "  4. Verify components render with correct colors"
echo -e "  5. Check for errors (should see none)\n"

exit 0
