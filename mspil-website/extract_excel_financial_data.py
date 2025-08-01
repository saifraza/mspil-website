#!/usr/bin/env python3
"""Extract comprehensive financial data from MSPIL Excel model"""

import sys
import pandas as pd
import json
from pathlib import Path

def extract_financial_data(excel_path):
    """Extract all financial data from the Excel model"""
    try:
        # Read all sheets from the Excel file
        excel_file = pd.ExcelFile(excel_path)
        sheet_names = excel_file.sheet_names
        
        print(f"Found {len(sheet_names)} sheets in the Excel file:")
        for i, sheet in enumerate(sheet_names):
            print(f"{i+1}. {sheet}")
        
        financial_data = {
            "sheet_names": sheet_names,
            "revenue_data": {},
            "production_data": {},
            "financial_metrics": {},
            "capacity_data": {},
            "cost_structure": {},
            "assumptions": {},
            "all_sheets_data": {}
        }
        
        # Extract data from each sheet
        for sheet_name in sheet_names:
            print(f"\n{'='*60}")
            print(f"ANALYZING SHEET: {sheet_name}")
            print(f"{'='*60}")
            
            try:
                df = pd.read_excel(excel_path, sheet_name=sheet_name, header=None)
                
                # Store raw sheet data
                financial_data["all_sheets_data"][sheet_name] = df.fillna('').to_dict('records')
                
                print(f"Sheet dimensions: {df.shape[0]} rows x {df.shape[1]} columns")
                
                # Print first 20 rows to understand structure
                print("\nFirst 20 rows of data:")
                for idx, row in df.head(20).iterrows():
                    row_data = [str(cell)[:30] + "..." if len(str(cell)) > 30 else str(cell) for cell in row.values]
                    print(f"Row {idx+1}: {row_data}")
                
                # Look for specific financial patterns
                analyze_sheet_content(df, sheet_name, financial_data)
                
            except Exception as e:
                print(f"Error reading sheet {sheet_name}: {e}")
                continue
        
        return financial_data
        
    except Exception as e:
        return {"error": f"Error reading Excel file: {str(e)}"}

def analyze_sheet_content(df, sheet_name, financial_data):
    """Analyze sheet content for specific financial data patterns"""
    
    # Convert all cells to string for pattern matching
    df_str = df.astype(str)
    
    # Look for revenue-related keywords
    revenue_keywords = ['revenue', 'sales', 'income', 'turnover', 'sugar', 'ethanol', 'ddgs', 'power']
    production_keywords = ['production', 'capacity', 'tons', 'liters', 'mw', 'tcd', 'klpd']
    financial_keywords = ['ebitda', 'pat', 'profit', 'margin', 'roce', 'roe', 'interest', 'depreciation']
    
    print(f"\nLooking for financial patterns in {sheet_name}...")
    
    # Search for revenue data
    for idx, row in df.iterrows():
        row_str = ' '.join(str(cell).lower() for cell in row.values if str(cell) != 'nan')
        
        if any(keyword in row_str for keyword in revenue_keywords):
            print(f"Revenue pattern found in row {idx+1}: {row.values[:10]}")
            
        if any(keyword in row_str for keyword in production_keywords):
            print(f"Production pattern found in row {idx+1}: {row.values[:10]}")
            
        if any(keyword in row_str for keyword in financial_keywords):
            print(f"Financial metric pattern found in row {idx+1}: {row.values[:10]}")
    
    # Look for year columns (FY25, FY26, etc.)
    year_pattern_found = False
    for col_idx, col in enumerate(df.columns):
        col_values = df[col].astype(str).str.lower()
        if col_values.str.contains('fy2[5-9]|fy3[0-9]|2025|2026|2027|2028|2029|2030', na=False).any():
            print(f"Year pattern found in column {col_idx+1}")
            year_pattern_found = True
    
    if year_pattern_found:
        print("This sheet appears to contain time-series financial data")

def main():
    if len(sys.argv) != 2:
        print("Usage: python extract_excel_financial_data.py <path_to_excel_file>")
        sys.exit(1)
    
    excel_path = sys.argv[1]
    
    if not Path(excel_path).exists():
        print(f"Error: File {excel_path} does not exist")
        sys.exit(1)
    
    print(f"Extracting comprehensive financial data from: {excel_path}")
    print("="*80)
    
    financial_data = extract_financial_data(excel_path)
    
    # Save extracted data to JSON file
    output_file = "mspil_financial_data_extracted.json"
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(financial_data, f, indent=2, ensure_ascii=False, default=str)
    
    print(f"\n{'='*80}")
    print(f"Financial data extraction completed!")
    print(f"Detailed output saved to: {output_file}")
    print(f"{'='*80}")

if __name__ == "__main__":
    main()