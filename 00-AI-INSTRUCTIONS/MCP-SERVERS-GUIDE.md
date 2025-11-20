# MCP Servers Guide for UI/UX Design

## What are MCP Servers?

Model Context Protocol (MCP) servers extend Claude's capabilities by providing access to external tools and services. For UI/UX design work, MCPs can provide design tools, asset management, and workflow automation.

## Recommended MCP Servers for This Project

### 1. **Figma MCP Server** (HIGHLY RECOMMENDED)
**Purpose**: Direct integration with Figma for design work
**Capabilities**:
- Access Figma files and components
- Export designs and assets
- Manage design tokens
- Sync design system

**Installation**:
```bash
npm install -g @mcp/figma-server
```

**Use Cases**:
- Creating wireframes and mockups
- Managing design system components
- Exporting assets for development
- Maintaining design-dev sync

### 2. **Screenshot/Visual MCP Server**
**Purpose**: Capture and annotate visual references
**Capabilities**:
- Take screenshots of references
- Annotate designs
- Compare visual versions
- Create mood boards

**Use Cases**:
- Competitive analysis
- Design inspiration gathering
- Visual QA and testing
- Progress documentation

### 3. **Color Palette MCP Server**
**Purpose**: Advanced color management
**Capabilities**:
- Generate accessible color palettes
- Test color contrast (WCAG)
- Create color variations
- Export color tokens

**Use Cases**:
- Ensuring accessibility compliance
- Creating dark/light mode palettes
- Managing brand colors
- Testing color combinations

### 4. **Typography MCP Server**
**Purpose**: Font and typography management
**Capabilities**:
- Preview font combinations
- Calculate type scales
- Test readability
- Generate font stacks

**Use Cases**:
- Selecting appropriate fonts
- Creating responsive type scales
- Ensuring readability
- Building typography system

### 5. **Asset Management MCP**
**Purpose**: Manage design assets and resources
**Capabilities**:
- Organize images and icons
- Optimize asset sizes
- Generate multiple resolutions
- Track asset usage

**Use Cases**:
- Managing icon libraries
- Optimizing images for mobile
- Creating asset documentation
- Maintaining asset consistency

## MCP Servers NOT Needed for UI/UX Phase

These are coding-focused MCPs to avoid during design phase:

- Database MCPs (PostgreSQL, MongoDB)
- Docker/Kubernetes MCPs
- Git/GitHub MCPs (except for saving designs)
- Testing framework MCPs
- Deployment MCPs

## How to Install MCP Servers

### Step 1: Update Claude Desktop Configuration

1. Open Claude Desktop settings
2. Navigate to "Developer" section
3. Click "Edit Config"

### Step 2: Add MCP Server Configuration

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "figma": {
      "command": "npx",
      "args": ["-y", "@mcp/figma-server"],
      "env": {
        "FIGMA_ACCESS_TOKEN": "your-token-here"
      }
    },
    "screenshot": {
      "command": "npx",
      "args": ["-y", "@mcp/screenshot-server"]
    },
    "colors": {
      "command": "npx",
      "args": ["-y", "@mcp/color-server"]
    }
  }
}
```

### Step 3: Restart Claude Desktop

After adding configurations, restart Claude Desktop to activate the MCP servers.

## Design Workflow with MCPs

### Phase 1: Research & Inspiration
1. Use Screenshot MCP to capture competitor apps
2. Use Color MCP to extract color palettes
3. Document findings in `/02-UI-UX-DESIGN/research/`

### Phase 2: Wireframing
1. Use Figma MCP to create low-fidelity wireframes
2. Focus on layout and information architecture
3. Test flows with User Flow documentation

### Phase 3: Visual Design
1. Apply design system tokens
2. Use Color MCP for accessibility testing
3. Use Typography MCP for text hierarchy
4. Export components with Figma MCP

### Phase 4: Prototyping
1. Create interactive prototypes in Figma
2. Test micro-interactions
3. Document animations and transitions
4. Export specs for developers

### Phase 5: Design Handoff
1. Export all assets via Asset MCP
2. Generate style guides
3. Create component documentation
4. Prepare developer specifications

## Best Practices for MCP Usage

### Do's
- ✅ Use MCPs to automate repetitive tasks
- ✅ Leverage MCPs for consistency checks
- ✅ Export designs in multiple formats
- ✅ Keep design tokens synchronized
- ✅ Test accessibility with every design

### Don'ts
- ❌ Don't use coding MCPs during design phase
- ❌ Don't bypass manual design review
- ❌ Don't over-automate creative decisions
- ❌ Don't ignore platform-specific guidelines
- ❌ Don't skip user testing

## Troubleshooting MCPs

### Common Issues

**MCP Not Connecting**:
- Check if MCP server is installed
- Verify configuration syntax
- Restart Claude Desktop
- Check API tokens/credentials

**Slow Performance**:
- Limit concurrent MCP calls
- Clear MCP cache
- Update to latest versions
- Check network connectivity

**Data Sync Issues**:
- Verify API permissions
- Check rate limits
- Ensure stable connection
- Review error logs

## Alternative Tools (If MCPs Unavailable)

If MCP servers aren't available, these tools can be used separately:

### Design Tools
- **Figma**: Web-based, free tier available
- **Sketch**: MacOS only, powerful plugins
- **Adobe XD**: Cross-platform, Creative Cloud
- **Penpot**: Open-source, self-hosted option

### Prototyping
- **Framer**: Advanced interactions
- **Principle**: MacOS animation tool
- **ProtoPie**: Sensor-based prototypes
- **InVision**: Simple click-through prototypes

### Handoff Tools
- **Zeplin**: Design to dev handoff
- **Avocode**: Design file versioning
- **Abstract**: Version control for design
- **Sympli**: Automated design specs

### Asset Management
- **Iconjar**: Icon organization
- **Eagle**: General asset management
- **Brandfolder**: Brand asset management
- **Cloudinary**: Image optimization

## Project-Specific MCP Configuration

For Stoic.af project, prioritize:

1. **Figma MCP** - Primary design tool
2. **Color MCP** - For Stoic color palette
3. **Screenshot MCP** - For competitor analysis
4. **Typography MCP** - For readability testing

Save configurations in:
`/.claude/mcp-config.json`

## Getting Help

- MCP Documentation: https://github.com/anthropics/mcp
- Claude Desktop Settings: Help > Developer
- Community Discord: MCP Developers channel
- Project Issues: github.com/scottmcquaig/app.stoicaf.co/issues

## Next Steps

1. Install recommended MCPs
2. Configure API tokens
3. Test each MCP with simple commands
4. Begin design workflow
5. Document any issues encountered