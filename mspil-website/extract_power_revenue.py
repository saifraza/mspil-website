#!/usr/bin/env python3
"""Extract Power revenue data from MSPIL Excel financial model"""

import pandas as pd
import json
import sys

def extract_power_revenue(excel_path):
    """Extract Power revenue specifically from Excel model"""
    
    print("🔍 EXTRACTING POWER REVENUE DATA")
    print("="*80)
    
    try:
        # Read PL sheet for power revenue
        pl_df = pd.read_excel(excel_path, sheet_name="PL", header=None)
        power_df = pd.read_excel(excel_path, sheet_name="Power", header=None)
        
        power_revenue = {}
        
        print("\n📊 SEARCHING FOR POWER REVENUE IN PL SHEET:")
        print("-" * 50)
        
        # Search for power-related revenue items
        power_keywords = [
            "sale of power", "power sale", "power revenue", "electricity sale",
            "export of power", "power export", "co-generation", "cogeneration"
        ]
        
        found_power = False
        
        for idx, row in pl_df.iterrows():
            if pd.isna(row.iloc[1]):
                continue
            row_label = str(row.iloc[1]).strip().lower()
            
            for keyword in power_keywords:
                if keyword in row_label:
                    print(f"🔍 Found power revenue row: '{row.iloc[1]}'")
                    
                    # Extract FY26-FY30 values (columns 8, 13, 18, 23, 28)
                    fy_columns = [8, 13, 18, 23, 28]
                    power_values = []
                    
                    for col in fy_columns:
                        if col < len(row):
                            val = float(row.iloc[col]) if pd.notna(row.iloc[col]) and str(row.iloc[col]) != 'nan' else 0
                            power_values.append(round(val/1e7, 2))
                    
                    if len(power_values) >= 5:
                        power_revenue = dict(zip(["FY26", "FY27", "FY28", "FY29", "FY30"], power_values))
                        print(f"✅ Power Revenue (₹ Cr): {power_values}")
                        found_power = True
                        break
            
            if found_power:
                break
        
        if not found_power:
            print("❌ No direct power revenue found in PL sheet. Checking Power sheet...")
            
            # Search in Power sheet
            print("\n📊 SEARCHING IN POWER SHEET:")
            print("-" * 50)
            
            for idx, row in power_df.iterrows():
                if pd.isna(row.iloc[0]):
                    continue
                row_label = str(row.iloc[0]).strip().lower()
                
                # Look for power generation or sales data
                if any(word in row_label for word in ["sale", "revenue", "export", "income"]):
                    print(f"🔍 Found in Power sheet: '{row.iloc[0]}'")
                    
                    # Look for numerical values in subsequent columns
                    for col_idx in range(1, min(len(row), 10)):
                        if pd.notna(row.iloc[col_idx]) and isinstance(row.iloc[col_idx], (int, float)):
                            print(f"   Column {col_idx}: {row.iloc[col_idx]}")
        
        # Also check if power is netted against costs
        print("\n🔍 CHECKING FOR POWER COST NETTING:")
        print("-" * 50)
        
        for idx, row in pl_df.iterrows():
            if pd.isna(row.iloc[1]):
                continue
            row_label = str(row.iloc[1]).strip().lower()
            
            if "power cost" in row_label or "electricity cost" in row_label:
                print(f"🔍 Found power cost row: '{row.iloc[1]}'")
                
                # Check if values are negative (indicating netting)
                fy_columns = [8, 13, 18, 23, 28]
                for i, col in enumerate(fy_columns):
                    if col < len(row) and pd.notna(row.iloc[col]):
                        val = float(row.iloc[col])
                        if val < 0:
                            print(f"   FY{26+i}: {round(val/1e7, 2)} Cr (negative - indicates netting)")
        
        return power_revenue
        
    except Exception as e:
        print(f"❌ Error extracting power revenue: {e}")
        return {}

def main():
    if len(sys.argv) != 2:
        print("Usage: python extract_power_revenue.py <path_to_excel_file>")
        sys.exit(1)
    
    excel_path = sys.argv[1]
    power_revenue = extract_power_revenue(excel_path)
    
    print(f"\n{'='*80}")
    print(f"📊 POWER REVENUE EXTRACTION COMPLETED")
    
    if power_revenue:
        print(f"✅ Power revenue data found: {power_revenue}")
    else:
        print("❌ No power revenue data found or power is netted against costs")
    
    print(f"{'='*80}")

if __name__ == "__main__":
    main()