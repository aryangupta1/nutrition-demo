#!/bin/bash
# SessionStart: stamp session start time, then print the handoff so it is injected into context.
DIR="${CLAUDE_PROJECT_DIR:-$(cd "$(dirname "$0")/../.." && pwd)}"
touch "$DIR/.claude/.session-start"
if [ -f "$DIR/.claude/handoff.md" ]; then
  echo "=== Session handoff (.claude/handoff.md) ==="
  cat "$DIR/.claude/handoff.md"
else
  echo "No .claude/handoff.md found. Create one before ending this session."
fi
exit 0
