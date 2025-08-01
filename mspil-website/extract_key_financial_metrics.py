#!/usr/bin/env python3
"""Extract key financial metrics from MSPIL Excel model"""

import pandas as pd
import json
import sys

def extract_key_metrics(excel_path):
    """Extract specific financial metrics from Summary sheet"""
    
    print("Extracting Key Financial Metrics from MSPIL Excel Model")
    print("="*70)
    
    # Read Summary sheet which contains consolidated data
    try:
        summary_df = pd.read_excel(excel_path, sheet_name="Summary", header=None)
        print(f"Summary sheet loaded: {summary_df.shape[0]} rows x {summary_df.shape[1]} columns")
        
        # Financial data structure
        financial_data = {
            "revenue_data": {},
            "production_data": {},
            "financial_metrics": {},
            "years": ["FY25", "FY26", "FY27", "FY28", "FY29", "FY30"]
        }
        
        # Extract year headers (row 2 typically contains dates)
        year_row = summary_df.iloc[1] if len(summary_df) > 1 else None
        if year_row is not None:
            print(f"\nYear headers found: {year_row.values[2:8]}")
        
        # Extract revenue data
        print("\n1. EXTRACTING REVENUE DATA:")
        print("-" * 40)
        
        for idx, row in summary_df.iterrows():
            if pd.isna(row.iloc[1]):
                continue
                
            row_label = str(row.iloc[1]).strip().lower()
            
            # Revenue from Operations
            if "revenue from operations" in row_label:
                values = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                financial_data["revenue_data"]["total_revenue"] = dict(zip(financial_data["years"], values))
                print(f"Total Revenue (₹ Crores): {[round(v/1e7, 2) for v in values]}")
            
            # EBITDA
            elif "ebitda" in row_label and "margin" not in row_label:
                values = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                financial_data["financial_metrics"]["ebitda"] = dict(zip(financial_data["years"], values))
                print(f"EBITDA (₹ Crores): {[round(v/1e7, 2) for v in values]}")
            
            # PAT
            elif "pat" in row_label and "margin" not in row_label:
                values = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                financial_data["financial_metrics"]["pat"] = dict(zip(financial_data["years"], values))
                print(f"PAT (₹ Crores): {[round(v/1e7, 2) for v in values]}")
            
            # Operating Margins
            elif "operating margin" in row_label:
                values = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                financial_data["financial_metrics"]["operating_margins"] = dict(zip(financial_data["years"], values))
                print(f"Operating Margins (%): {[round(v*100, 2) for v in values]}")
            
            # Net Profit Margins
            elif "npm" in row_label or "net profit margin" in row_label:
                values = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                financial_data["financial_metrics"]["net_profit_margins"] = dict(zip(financial_data["years"], values))
                print(f"Net Profit Margins (%): {[round(v*100, 2) for v in values]}")
            
            # ROE
            elif "return on equity" in row_label:
                values = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                financial_data["financial_metrics"]["roe"] = dict(zip(financial_data["years"], values))
                print(f"ROE (%): {[round(v*100, 2) for v in values]}")
            
            # ROCE
            elif "return on capital employed" in row_label:
                values = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                financial_data["financial_metrics"]["roce"] = dict(zip(financial_data["years"], values))
                print(f"ROCE (%): {[round(v*100, 2) for v in values]}")
        
        # Now read detailed business sheets for segment-wise revenue
        print("\n2. EXTRACTING SEGMENT-WISE REVENUE:")
        print("-" * 40)
        
        # Read PL sheet for detailed revenue breakdown
        pl_df = pd.read_excel(excel_path, sheet_name="PL", header=None)
        
        # Find Sugar revenue
        for idx, row in pl_df.iterrows():
            if pd.isna(row.iloc[1]):
                continue
            row_label = str(row.iloc[1]).strip().lower()
            
            if "sale of sugar" in row_label:
                # Get FY values (columns with annual totals)
                fy_columns = [8, 13, 18, 23, 28]  # Based on PL sheet structure
                sugar_values = []
                for col in fy_columns:
                    if col < len(row):
                        val = float(row.iloc[col]) if pd.notna(row.iloc[col]) and str(row.iloc[col]) != 'nan' else 0
                        sugar_values.append(val)
                
                if len(sugar_values) >= 5:
                    financial_data["revenue_data"]["sugar"] = dict(zip(financial_data["years"][1:6], sugar_values))
                    print(f"Sugar Revenue (₹ Crores): {[round(v/1e7, 2) for v in sugar_values]}")
                break
        
        # Find Ethanol revenue
        for idx, row in pl_df.iterrows():
            if pd.isna(row.iloc[1]):
                continue
            row_label = str(row.iloc[1]).strip().lower()
            
            if "ethanol sale" in row_label:
                fy_columns = [8, 13, 18, 23, 28]
                ethanol_values = []
                for col in fy_columns:
                    if col < len(row):
                        val = float(row.iloc[col]) if pd.notna(row.iloc[col]) and str(row.iloc[col]) != 'nan' else 0
                        ethanol_values.append(val)
                
                if len(ethanol_values) >= 5:
                    financial_data["revenue_data"]["ethanol"] = dict(zip(financial_data["years"][1:6], ethanol_values))
                    print(f"Ethanol Revenue (₹ Crores): {[round(v/1e7, 2) for v in ethanol_values]}")
                break
        
        # Find DDGS revenue
        for idx, row in pl_df.iterrows():
            if pd.isna(row.iloc[1]):
                continue
            row_label = str(row.iloc[1]).strip().lower()
            
            if "ddgs sale" in row_label:
                fy_columns = [8, 13, 18, 23, 28]
                ddgs_values = []
                for col in fy_columns:
                    if col < len(row):
                        val = float(row.iloc[col]) if pd.notna(row.iloc[col]) and str(row.iloc[col]) != 'nan' else 0
                        ddgs_values.append(val)
                
                if len(ddgs_values) >= 5:
                    financial_data["revenue_data"]["ddgs"] = dict(zip(financial_data["years"][1:6], ddgs_values))
                    print(f"DDGS Revenue (₹ Crores): {[round(v/1e7, 2) for v in ddgs_values]}")
                break
        
        # Extract production data from individual business sheets
        print("\n3. EXTRACTING PRODUCTION DATA:")
        print("-" * 40)
        
        # Sugar production from Sugar sheet
        try:
            sugar_df = pd.read_excel(excel_path, sheet_name="Sugar", header=None)
            for idx, row in sugar_df.iterrows():
                if pd.isna(row.iloc[0]):
                    continue
                row_label = str(row.iloc[0]).strip().lower()
                
                if "sugar production" in row_label or "sugar sales qty" in row_label:
                    production_values = []
                    for col in range(2, 7):  # Assuming FY columns
                        if col < len(row):
                            val = float(row.iloc[col]) if pd.notna(row.iloc[col]) and str(row.iloc[col]) != 'nan' else 0
                            production_values.append(val)
                    
                    if production_values:
                        financial_data["production_data"]["sugar_production_tons"] = dict(zip(financial_data["years"][1:6], production_values))
                        print(f"Sugar Production (Tons): {production_values}")
                    break
        except:
            print("Could not extract sugar production data")
        
        # Ethanol production from Ethanol sheet
        try:
            ethanol_df = pd.read_excel(excel_path, sheet_name="Ethanol", header=None)
            for idx, row in ethanol_df.iterrows():
                if pd.isna(row.iloc[0]):
                    continue
                row_label = str(row.iloc[0]).strip().lower()
                
                if "ethanol production" in row_label or "ethanol sales qty" in row_label:
                    production_values = []
                    for col in range(2, 7):
                        if col < len(row):
                            val = float(row.iloc[col]) if pd.notna(row.iloc[col]) and str(row.iloc[col]) != 'nan' else 0
                            production_values.append(val)
                    
                    if production_values:
                        financial_data["production_data"]["ethanol_production_liters"] = dict(zip(financial_data["years"][1:6], production_values))
                        print(f"Ethanol Production (Liters): {production_values}")
                    break
        except:
            print("Could not extract ethanol production data")
        
        return financial_data
        
    except Exception as e:
        print(f"Error reading Excel file: {e}")
        return None

def main():
    if len(sys.argv) != 2:
        print("Usage: python extract_key_financial_metrics.py <path_to_excel_file>")
        sys.exit(1)
    
    excel_path = sys.argv[1]
    
    financial_data = extract_key_metrics(excel_path)
    
    if financial_data:
        # Save to JSON file
        output_file = "mspil_key_financial_metrics.json"
        with open(output_file, 'w') as f:
            json.dump(financial_data, f, indent=2)
        
        print(f"\n{'='*70}")
        print(f"Key financial metrics extracted and saved to: {output_file}")
        print(f"{'='*70}")
        
        # Print summary
        print("\nSUMMARY OF EXTRACTED DATA:")
        print("=" * 50)
        
        if "total_revenue" in financial_data["revenue_data"]:
            total_rev = financial_data["revenue_data"]["total_revenue"]
            print(f"Total Revenue Range: ₹{min(total_rev.values())/1e7:.0f} - ₹{max(total_rev.values())/1e7:.0f} Crores")
        
        if "ebitda" in financial_data["financial_metrics"]:
            ebitda = financial_data["financial_metrics"]["ebitda"]
            print(f"EBITDA Range: ₹{min(ebitda.values())/1e7:.0f} - ₹{max(ebitda.values())/1e7:.0f} Crores")
        
        if "pat" in financial_data["financial_metrics"]:
            pat = financial_data["financial_metrics"]["pat"]
            print(f"PAT Range: ₹{min(pat.values())/1e7:.0f} - ₹{max(pat.values())/1e7:.0f} Crores")

if __name__ == "__main__":
    main()