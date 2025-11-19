# HelixDesk Utility Scripts

This directory contains Python and C++ utilities for enhanced functionality.

## Python Analytics Engine

**File:** `analytics.py`

Analyzes Kanban board data to generate actionable insights.

### Features
- **Velocity Calculation**: Track team productivity
- **Bottleneck Detection**: Identify workflow issues
- **Priority Analysis**: Monitor task distribution
- **Smart Recommendations**: Get AI-driven suggestions

### Usage

```bash
# Install Python 3.8+ if needed
python --version

# Run with sample data
python scripts/analytics.py path/to/tasks.json

# Example output structure:
# {
#   "velocity": { "average_daily_velocity": 3.5 },
#   "bottlenecks": [...],
#   "recommendations": [...]
# }
```

### Integration Example

```javascript
// In your Node.js backend (server/routes/analytics.js)
const { spawn } = require('child_process');

function getAnalytics(tasksData) {
  return new Promise((resolve, reject) => {
    const python = spawn('python', ['scripts/analytics.py']);
    
    python.stdin.write(JSON.stringify(tasksData));
    python.stdin.end();
    
    let output = '';
    python.stdout.on('data', (data) => output += data);
    python.on('close', () => resolve(JSON.parse(output)));
  });
}
```

## C++ Text Processor

**File:** `text_processor.cpp`

High-performance search and text analysis utility.

### Features
- **Fuzzy Search**: Find tasks with typo tolerance
- **Keyword Extraction**: Auto-tag content
- **Reading Time**: Estimate task description length
- **Word Frequency**: Analyze common terms

### Build & Run

```bash
# Compile (requires g++ with C++17 support)
g++ -std=c++17 -O3 scripts/text_processor.cpp -o scripts/text_processor

# Run demo
./scripts/text_processor --demo

# Windows
scripts\text_processor.exe --demo
```

### Performance
Optimized for sub-millisecond search on thousands of items.

### Integration Example

```javascript
// Call from Node.js
const { execSync } = require('child_process');

function fuzzySearch(query, items) {
  // Write items to temp file or pass via stdin
  const result = execSync(`./scripts/text_processor "${query}"`);
  return JSON.parse(result.toString());
}
```

## When to Use Each

| Use Case | Tool | Why |
|----------|------|-----|
| Analytics dashboard | Python | Rich libraries, easy JSON handling |
| Real-time search | C++ | Ultra-fast processing |
| Batch processing | Python | Simpler syntax, better for data |
| Performance-critical | C++ | Maximum speed |

## Dependencies

**Python:**
- Python 3.8+
- Standard library only (no external packages needed)

**C++:**
- g++ or clang with C++17 support
- Standard library only

## Future Enhancements

- [ ] Python: ML-based task prioritization
- [ ] C++: Multi-threaded batch processing
- [ ] Integration: REST API endpoints for both
- [ ] Python: Predictive analytics for delivery dates
