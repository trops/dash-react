#!/bin/bash

# dash-react Library Validation Script
# This script validates that the dash-react library builds correctly

set -e  # Exit on error

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🔍 Validating dash-react library...${NC}\n"

# Step 1: Prettify
echo -e "${YELLOW}📝 Step 1/4: Running Prettier...${NC}"
if npm run prettify > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Code formatted successfully${NC}\n"
else
    echo -e "${RED}❌ Prettier failed${NC}"
    exit 1
fi

# Step 2: Build library with Rollup
echo -e "${YELLOW}🏗️  Step 2/4: Building library with Rollup...${NC}"
if npm run roll 2>&1 | tee /tmp/rollup-build.log; then
    echo -e "${GREEN}✅ Rollup build successful${NC}\n"
else
    echo -e "${RED}❌ Rollup build failed${NC}"
    cat /tmp/rollup-build.log
    exit 1
fi

# Step 3: Verify build output
echo -e "${YELLOW}📦 Step 3/4: Verifying build output...${NC}"

# Check for dist/index.js
if [ ! -f "dist/index.js" ]; then
    echo -e "${RED}❌ dist/index.js not found${NC}"
    exit 1
fi
echo -e "${GREEN}✅ dist/index.js exists${NC}"

# Get file size
INDEX_SIZE=$(ls -lh dist/index.js | awk '{print $5}')
echo -e "${BLUE}   dist/index.js: ${INDEX_SIZE}${NC}\n"

# Step 4: Create package
echo -e "${YELLOW}📦 Step 4/4: Creating npm package...${NC}"
if npm run pack-local-esm > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Package created successfully${NC}\n"
else
    echo -e "${RED}❌ Package creation failed${NC}"
    exit 1
fi

# Verify package exists
if [ ! -f "package/trops-dash-react.tgz" ]; then
    echo -e "${RED}❌ package/trops-dash-react.tgz not found${NC}"
    exit 1
fi

PACKAGE_SIZE=$(ls -lh package/trops-dash-react.tgz | awk '{print $5}')
echo -e "${BLUE}   package/trops-dash-react.tgz: ${PACKAGE_SIZE}${NC}\n"

# Validation summary
echo -e "${YELLOW}📋 Validation Summary${NC}"
echo -e "${GREEN}✅ Code formatting: PASSED${NC}"
echo -e "${GREEN}✅ Rollup build: PASSED${NC}"
echo -e "${GREEN}✅ Output verification: PASSED${NC}"
echo -e "${GREEN}✅ Package creation: PASSED${NC}"

echo -e "\n${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✅ All validations passed!${NC}"
echo -e "${GREEN}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}\n"

echo -e "${BLUE}Build artifacts:${NC}"
echo -e "  📦 Package: ${YELLOW}package/trops-dash-react.tgz${NC} (${PACKAGE_SIZE})"
echo -e "  📦 Bundle:  ${YELLOW}dist/index.js${NC} (${INDEX_SIZE})\n"

echo -e "${BLUE}Next steps:${NC}"
echo -e "  • Run ${YELLOW}npm run storybook${NC} to test components interactively"
echo -e "  • Build CSS if needed: ${YELLOW}npm run build:css${NC}"
echo -e "  • Install in dash-electron: ${YELLOW}cd ../dash-electron && npm install ../dash-react/package/trops-dash-react.tgz${NC}"
echo -e "  • Test integration: ${YELLOW}cd ../dash-electron && npm run dev${NC}\n"

exit 0
