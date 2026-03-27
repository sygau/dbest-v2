# CSV Structure Guide for Cut-off Scores

## File Organization

The CSV files are organized in the following structure:

```
public/data/cutoff/
├── english/
│   ├── overall.csv
│   ├── paper1.csv
│   ├── paper2.csv
│   ├── paper3.csv
│   └── paper4.csv
├── chinese/
│   ├── overall.csv
│   ├── paper1.csv
│   └── ...
└── ...
```

## CSV Format

Each CSV file should follow this structure:

```csv
year,level,score,percentage
2024,5**,562,84
2024,5*,533,80
2024,5,487,73
2024,4,395,59
2024,3,303,45
2024,2,260,39
```

### Headers

- **year**: The examination year (e.g., 2024, 2023, etc.)
- **level**: The grade level (5**, 5*, 5, 4, 3, 2)
- **score**: The cut-off score (can be empty if not available)
- **percentage**: The percentage of students achieving this grade (can be empty if not available)

### Important Notes

1. **Empty Values**: Both `score` and `percentage` can be empty (just leave the field blank)
2. **Valid Levels**: Only use these grade levels: 5**, 5*, 5, 4, 3, 2
3. **Valid Years**: Years should be between 2010-2030
4. **Valid Percentages**: Percentages should be between 0-100
5. **Scores**: Should be positive integers

## Adding New Data

### 1. Create Subject Directory

```bash
mkdir public/data/cutoff/[subject-name]
```

### 2. Create CSV Files

Create CSV files for each component (e.g., `overall.csv`, `paper1.csv`, etc.)

### 3. Update Configuration

Add the subject configuration to `public/config/cutoff-config.json`:

```json
{
  "subject-name": {
    "tables": [
      {
        "id": "overall",
        "title": "Overall Score",
        "title_zh": "總分",
        "file": "overall.csv",
        "description": "Complete subject score including all components",
        "description_zh": "包含所有組件的完整科目分數"
      }
    ]
  }
}
```

### 4. Validate Data

Run the validation script to check your CSV files:

```bash
npm run cutoff:validate
```

## Example CSV Files

### Overall Score (overall.csv)
```csv
year,level,score,percentage
2024,5**,562,84
2024,5*,533,80
2024,5,487,73
2024,4,395,59
2024,3,303,45
2024,2,260,39
```

### Paper Component (paper1.csv)
```csv
year,level,score,percentage
2024,5**,45,85
2024,5*,42,79
2024,5,38,72
2024,4,32,61
2024,3,25,47
2024,2,20,38
```

### With Empty Values
```csv
year,level,score,percentage
2024,5**,45,85
2024,5*,42,79
2024,5,38,72
2024,4,32,61
2024,3,25,47
2024,2,,38
2023,5**,48,85
2023,5*,44,78
2023,5,40,71
2023,4,34,60
2023,3,28,49
2023,2,22,
```

## Validation

The system includes automatic validation that checks:

- ✅ Correct header structure
- ✅ Valid grade levels
- ✅ Valid years (2010-2030)
- ✅ Valid percentages (0-100)
- ✅ Valid scores (positive integers)
- ⚠️ Empty values (allowed but logged)

## Troubleshooting

### Common Issues

1. **Wrong Headers**: Make sure headers are exactly `year,level,score,percentage`
2. **Invalid Grades**: Only use 5**, 5*, 5, 4, 3, 2
3. **Wrong File Structure**: Files must be in `public/data/cutoff/[subject]/[filename].csv`
4. **Missing Configuration**: Add subject to `cutoff-config.json`

### Validation Commands

```bash
# Validate all CSV files
npm run cutoff:validate

# Process and analyze data
npm run cutoff:process
```

## Best Practices

1. **Consistent Naming**: Use lowercase for file names
2. **Complete Data**: Try to provide both score and percentage when possible
3. **Regular Updates**: Update data annually after exam results are published
4. **Backup**: Keep backups of your CSV files
5. **Version Control**: Commit CSV changes to git for tracking 