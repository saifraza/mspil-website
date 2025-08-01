#!/usr/bin/env python3
"""Comprehensive analysis of MSPIL Excel financial model vs Website data"""

import pandas as pd
import json
import sys

def analyze_excel_vs_website(excel_path):
    """Comprehensive analysis of all data points in Excel model"""
    
    print("🔍 COMPREHENSIVE EXCEL MODEL ANALYSIS")
    print("="*80)
    
    try:
        # Read all relevant sheets
        summary_df = pd.read_excel(excel_path, sheet_name="Summary", header=None)
        pl_df = pd.read_excel(excel_path, sheet_name="PL", header=None)
        assumptions_df = pd.read_excel(excel_path, sheet_name="Assumptions", header=None)
        sugar_df = pd.read_excel(excel_path, sheet_name="Sugar", header=None)
        ethanol_df = pd.read_excel(excel_path, sheet_name="Ethanol", header=None)
        power_df = pd.read_excel(excel_path, sheet_name="Power", header=None)
        
        analysis = {
            "excel_data": {},
            "website_data": {},
            "discrepancies": [],
            "summary": {}
        }
        
        print("\n📊 EXTRACTING EXCEL DATA:")
        print("-" * 50)
        
        # Extract total revenue from Summary sheet
        for idx, row in summary_df.iterrows():
            if pd.isna(row.iloc[1]):
                continue
            row_label = str(row.iloc[1]).strip().lower()
            
            if "revenue from operations" in row_label:
                excel_revenue = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                analysis["excel_data"]["total_revenue"] = {
                    "FY25": round(excel_revenue[0]/1e7, 2),
                    "FY26": round(excel_revenue[1]/1e7, 2),
                    "FY27": round(excel_revenue[2]/1e7, 2),
                    "FY28": round(excel_revenue[3]/1e7, 2),
                    "FY29": round(excel_revenue[4]/1e7, 2),
                    "FY30": round(excel_revenue[5]/1e7, 2)
                }
                print(f"✅ Total Revenue (₹ Cr): {list(analysis['excel_data']['total_revenue'].values())}")
                break
        
        # Extract segment-wise revenue from PL sheet
        segment_revenue = {}
        
        # Sugar Revenue
        for idx, row in pl_df.iterrows():
            if pd.isna(row.iloc[1]):
                continue
            row_label = str(row.iloc[1]).strip().lower()
            
            if "sale of sugar" in row_label:
                fy_columns = [8, 13, 18, 23, 28]
                sugar_values = []
                for col in fy_columns:
                    if col < len(row):
                        val = float(row.iloc[col]) if pd.notna(row.iloc[col]) and str(row.iloc[col]) != 'nan' else 0
                        sugar_values.append(round(val/1e7, 2))
                
                if len(sugar_values) >= 5:
                    segment_revenue["sugar"] = dict(zip(["FY26", "FY27", "FY28", "FY29", "FY30"], sugar_values))
                    print(f"✅ Sugar Revenue (₹ Cr): {sugar_values}")
                break
        
        # Ethanol Revenue
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
                        ethanol_values.append(round(val/1e7, 2))
                
                if len(ethanol_values) >= 5:
                    segment_revenue["ethanol"] = dict(zip(["FY26", "FY27", "FY28", "FY29", "FY30"], ethanol_values))
                    print(f"✅ Ethanol Revenue (₹ Cr): {ethanol_values}")
                break
        
        # DDGS Revenue
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
                        ddgs_values.append(round(val/1e7, 2))
                
                if len(ddgs_values) >= 5:
                    segment_revenue["ddgs"] = dict(zip(["FY26", "FY27", "FY28", "FY29", "FY30"], ddgs_values))
                    print(f"✅ DDGS Revenue (₹ Cr): {ddgs_values}")
                break
        
        analysis["excel_data"]["segment_revenue"] = segment_revenue
        
        # Extract financial metrics from Summary
        financial_metrics = {}
        
        for idx, row in summary_df.iterrows():
            if pd.isna(row.iloc[1]):
                continue
            row_label = str(row.iloc[1]).strip().lower()
            
            if "ebitda" in row_label and "margin" not in row_label:
                values = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                financial_metrics["ebitda"] = dict(zip(["FY25", "FY26", "FY27", "FY28", "FY29", "FY30"], 
                                                      [round(v/1e7, 2) for v in values]))
                print(f"✅ EBITDA (₹ Cr): {list(financial_metrics['ebitda'].values())}")
            
            elif "pat" in row_label and "margin" not in row_label:
                values = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                financial_metrics["pat"] = dict(zip(["FY25", "FY26", "FY27", "FY28", "FY29", "FY30"], 
                                                   [round(v/1e7, 2) for v in values]))
                print(f"✅ PAT (₹ Cr): {list(financial_metrics['pat'].values())}")
            
            elif "operating margin" in row_label:
                values = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                financial_metrics["operating_margins"] = dict(zip(["FY25", "FY26", "FY27", "FY28", "FY29", "FY30"], 
                                                                 [round(v*100, 1) for v in values]))
                print(f"✅ Operating Margins (%): {list(financial_metrics['operating_margins'].values())}")
            
            elif ("npm" in row_label or "net profit margin" in row_label) and len(row_label) < 20:
                values = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                financial_metrics["net_profit_margins"] = dict(zip(["FY25", "FY26", "FY27", "FY28", "FY29", "FY30"], 
                                                                  [round(v*100, 1) for v in values]))
                print(f"✅ Net Profit Margins (%): {list(financial_metrics['net_profit_margins'].values())}")
            
            elif "return on equity" in row_label:
                values = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                financial_metrics["roe"] = dict(zip(["FY25", "FY26", "FY27", "FY28", "FY29", "FY30"], 
                                                   [round(v*100, 1) for v in values]))
                print(f"✅ ROE (%): {list(financial_metrics['roe'].values())}")
            
            elif "return on capital employed" in row_label:
                values = [float(x) if pd.notna(x) and str(x) != 'nan' else 0 for x in row.iloc[2:8]]
                financial_metrics["roce"] = dict(zip(["FY25", "FY26", "FY27", "FY28", "FY29", "FY30"], 
                                                    [round(v*100, 1) for v in values]))
                print(f"✅ ROCE (%): {list(financial_metrics['roce'].values())}")
        
        analysis["excel_data"]["financial_metrics"] = financial_metrics
        
        # Now define website data (from the financialData.js file we read)
        print("\n🌐 WEBSITE DATA:")
        print("-" * 50)
        
        website_data = {
            "total_revenue": {
                "FY25": 300.0, "FY26": 811.08, "FY27": 1310.56, 
                "FY28": 1378.40, "FY29": 1462.27, "FY30": 1564.91
            },
            "segment_revenue": {
                "sugar": {"FY26": 407.48, "FY27": 261.59, "FY28": 274.67, "FY29": 291.19, "FY30": 408.02},
                "ethanol": {"FY26": 215.58, "FY27": 883.74, "FY28": 883.74, "FY29": 883.74, "FY30": 924.61},
                "ddgs": {"FY26": 41.46, "FY27": 169.95, "FY28": 169.95, "FY29": 169.95, "FY30": 177.94}
            },
            "financial_metrics": {
                "ebitda": {"FY26": 171.82, "FY27": 296.13, "FY28": 372.92, "FY29": 406.12, "FY30": 434.30},
                "pat": {"FY26": 76.45, "FY27": 170.13, "FY28": 246.99, "FY29": 276.34, "FY30": 301.45},
                "operating_margins": {"FY26": 21.2, "FY27": 22.6, "FY28": 27.1, "FY29": 27.8, "FY30": 27.8},
                "net_profit_margins": {"FY26": 9.4, "FY27": 13.0, "FY28": 17.9, "FY29": 18.9, "FY30": 19.3},
                "roe": {"FY26": 27.0, "FY27": 38.5, "FY28": 46.0, "FY29": 37.9, "FY30": 30.9},
                "roce": {"FY26": 15.5, "FY27": 41.2, "FY28": 49.0, "FY29": 42.5, "FY30": 37.2}
            }
        }
        
        analysis["website_data"] = website_data
        
        print("✅ Website total revenue loaded")
        print("✅ Website segment revenue loaded")
        print("✅ Website financial metrics loaded")
        
        # Compare and identify discrepancies
        print("\n🚨 DISCREPANCY ANALYSIS:")
        print("-" * 50)
        
        discrepancies = []
        
        # Compare total revenue
        if "total_revenue" in analysis["excel_data"] and "total_revenue" in website_data:
            for year in ["FY25", "FY26", "FY27", "FY28", "FY29", "FY30"]:
                excel_val = analysis["excel_data"]["total_revenue"].get(year, 0)
                website_val = website_data["total_revenue"].get(year, 0)
                
                if abs(excel_val - website_val) > 0.1:  # More than 0.1 crore difference
                    discrepancy = {
                        "metric": "Total Revenue",
                        "year": year,
                        "excel_value": excel_val,
                        "website_value": website_val,
                        "difference": round(excel_val - website_val, 2),
                        "percentage_diff": round(((excel_val - website_val) / website_val * 100), 1) if website_val != 0 else "N/A"
                    }
                    discrepancies.append(discrepancy)
                    print(f"❌ {year} Total Revenue: Excel ₹{excel_val} Cr vs Website ₹{website_val} Cr (Diff: {discrepancy['difference']} Cr)")
        
        # Compare segment revenue
        for segment in ["sugar", "ethanol", "ddgs"]:
            if segment in analysis["excel_data"]["segment_revenue"] and segment in website_data["segment_revenue"]:
                for year in ["FY26", "FY27", "FY28", "FY29", "FY30"]:
                    excel_val = analysis["excel_data"]["segment_revenue"][segment].get(year, 0)
                    website_val = website_data["segment_revenue"][segment].get(year, 0)
                    
                    if abs(excel_val - website_val) > 0.1:
                        discrepancy = {
                            "metric": f"{segment.title()} Revenue",
                            "year": year,
                            "excel_value": excel_val,
                            "website_value": website_val,
                            "difference": round(excel_val - website_val, 2),
                            "percentage_diff": round(((excel_val - website_val) / website_val * 100), 1) if website_val != 0 else "N/A"
                        }
                        discrepancies.append(discrepancy)
                        print(f"❌ {year} {segment.title()} Revenue: Excel ₹{excel_val} Cr vs Website ₹{website_val} Cr (Diff: {discrepancy['difference']} Cr)")
        
        # Compare financial metrics
        for metric in ["ebitda", "pat"]:
            if metric in analysis["excel_data"]["financial_metrics"] and metric in website_data["financial_metrics"]:
                for year in ["FY26", "FY27", "FY28", "FY29", "FY30"]:
                    excel_val = analysis["excel_data"]["financial_metrics"][metric].get(year, 0)
                    website_val = website_data["financial_metrics"][metric].get(year, 0)
                    
                    if abs(excel_val - website_val) > 0.1:
                        discrepancy = {
                            "metric": metric.upper(),
                            "year": year,
                            "excel_value": excel_val,
                            "website_value": website_val,
                            "difference": round(excel_val - website_val, 2),
                            "percentage_diff": round(((excel_val - website_val) / website_val * 100), 1) if website_val != 0 else "N/A"
                        }
                        discrepancies.append(discrepancy)
                        print(f"❌ {year} {metric.upper()}: Excel ₹{excel_val} Cr vs Website ₹{website_val} Cr (Diff: {discrepancy['difference']} Cr)")
        
        analysis["discrepancies"] = discrepancies
        
        # Summary
        print(f"\n📋 SUMMARY:")
        print("-" * 50)
        print(f"Total discrepancies found: {len(discrepancies)}")
        
        if discrepancies:
            print("\n🔥 CRITICAL DISCREPANCIES:")
            major_discrepancies = [d for d in discrepancies if abs(d["difference"]) > 50]  # More than 50 cr difference
            for disc in major_discrepancies[:10]:  # Show top 10
                print(f"• {disc['year']} {disc['metric']}: {disc['difference']} Cr difference ({disc['percentage_diff']}%)")
        else:
            print("✅ All data matches between Excel model and website!")
        
        analysis["summary"] = {
            "total_discrepancies": len(discrepancies),
            "major_discrepancies": len([d for d in discrepancies if abs(d["difference"]) > 50]),
            "status": "DISCREPANCIES FOUND" if discrepancies else "ALL DATA MATCHES"
        }
        
        return analysis
        
    except Exception as e:
        print(f"❌ Error analyzing Excel file: {e}")
        return None

def main():
    if len(sys.argv) != 2:
        print("Usage: python extract_detailed_excel_analysis.py <path_to_excel_file>")
        sys.exit(1)
    
    excel_path = sys.argv[1]
    
    analysis = analyze_excel_vs_website(excel_path)
    
    if analysis:
        # Save detailed analysis
        output_file = "mspil_comprehensive_analysis.json"
        with open(output_file, 'w') as f:
            json.dump(analysis, f, indent=2)
        
        print(f"\n{'='*80}")
        print(f"📊 COMPREHENSIVE ANALYSIS COMPLETED")
        print(f"Detailed report saved to: {output_file}")
        print(f"Status: {analysis['summary']['status']}")
        print(f"{'='*80}")

if __name__ == "__main__":
    main()