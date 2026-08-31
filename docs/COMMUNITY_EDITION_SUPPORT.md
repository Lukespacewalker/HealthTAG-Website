# Community Edition support

Community Edition is the latest available HealthTAG open-source edition. It is a separate product from the Data Source Node currently used by HealthTAG. Commands, services, configuration files, and operational guidance must not be mixed between the two products.

## Sources

- Manual source: `healthtag.io/frontend/src/pages/support/community-edition/user-manual/index.mdx`
- Manual screenshots: `healthtag.io/frontend/src/pages/support/community-edition/user-manual/media/`
- Source revision: `health-tag/healthtag.io@32d1b20ebb6116ddfeaad855345f6f3907aef5b8`
- Owner confirmation on 2026-08-31: no newer Community Edition manual is available

## Public routes

- Thai: `/support/community-edition/user-manual/`
- English navigation: `/en/support/community-edition/user-manual/`

The source manual is in Thai. The English route preserves English site navigation, product status, and safety notes while keeping the manual body in its source language.

## Page structure

The manual uses the existing Clinical Systems Editorial design system:

- product name, open-source status, and manual language at the top
- a direct product boundary between Community Edition and Data Source Node
- sticky contents navigation on desktop and collapsible contents on mobile
- anchored section headings
- language-labelled code blocks with syntax highlighting and copy controls
- original screenshots next to the relevant instructions
- safety guidance before credentials, ports, or patient-facing workflows
- support escalation at the end

## Source treatment

The published manual preserves the Community Edition workflow and screenshots. Formatting defects introduced by the old Word-to-MDX export are corrected:

- typographic quotes in environment files are replaced with plain quotes
- the broken `build` flag is corrected to `--build`
- wrapped shell commands are restored as executable blocks
- code fences declare `bash`, `dotenv`, or `python`
- broken Markdown links and filename placeholders are repaired
- reusable database passwords are replaced with explicit `CHANGE_ME` placeholders

The page does not rewrite Community Edition instructions as Data Source Node instructions. It also does not state that the two products support an in-place migration.

## Acceptance checklist

- [x] Support identifies Community Edition as the latest available open-source edition.
- [x] Support separates Community Edition from Data Source Node.
- [x] The complete source manual is available on an internal website route.
- [x] The original screenshots are preserved with source revision checksums.
- [x] Desktop and mobile table of contents are available.
- [x] Code blocks declare their language and support copying.
- [x] Example credentials are marked for replacement before real use.
- [x] Support copy avoids editorial narration and migration claims.
- [x] Asset verification, Astro checks, build, route validation, responsive checks, accessibility checks, and browser QA pass.
