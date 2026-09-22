#!/bin/bash
# Stop: if project files changed this session but .claude/handoff.md didn't, ask Claude to update it once.
INPUT=$(cat)
# Loop guard: if we already blocked once, let Claude stop.
echo "$INPUT" | grep -q '"stop_hook_active"[[:space:]]*:[[:space:]]*true' && exit 0

DIR="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
MARKER="$DIR/.claude/.session-start"
HANDOFF="$DIR/.claude/handoff.md"
[ -f "$MARKER" ] || exit 0

# Handoff already updated this session: fine.
[ -f "$HANDOFF" ] && [ "$HANDOFF" -nt "$MARKER" ] && exit 0

# Only nag if real work happened (project files modified since session start).
CHANGED=$(find "$DIR" -newer "$MARKER" -type f \
  -not -path "*/node_modules/*" -not -path "*/.next/*" -not -path "*/.git/*" \
  -not -name ".session-start" -not -name "*.tsbuildinfo" -not -name "next-env.d.ts" | head -1)
[ -z "$CHANGED" ] && exit 0

echo "Project files changed this session but .claude/handoff.md was not updated. Overwrite it now with: current phase, completed, decisions (and why), open TODOs, blockers, exact next step." >&2
exit 2
