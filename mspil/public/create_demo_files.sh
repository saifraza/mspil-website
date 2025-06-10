#\!/bin/bash

# Create demo images for all categories
echo "[DEMO] Company announcement image" > images/news/company_announcement_2024.jpg.txt
echo "[DEMO] Award ceremony photo" > images/news/award_ceremony_2024.jpg.txt

echo "[DEMO] Corporate office exterior" > images/office/corporate_office_exterior.jpg.txt
echo "[DEMO] Reception area photo" > images/office/reception_area.jpg.txt
echo "[DEMO] Conference room image" > images/office/conference_room.jpg.txt

echo "[DEMO] CEO portrait photo" > images/leadership/ceo_portrait.jpg.txt
echo "[DEMO] Board of directors photo" > images/leadership/board_meeting.jpg.txt
echo "[DEMO] Management team group photo" > images/leadership/management_team.jpg.txt

echo "[DEMO] Career fair event photo" > images/careers/career_fair_2024.jpg.txt
echo "[DEMO] Employee training session" > images/careers/training_session.jpg.txt
echo "[DEMO] Workplace culture image" > images/careers/workplace_culture.jpg.txt

echo "[DEMO] School renovation project" > images/csr/education/school_renovation.jpg.txt
echo "[DEMO] Student scholarship ceremony" > images/csr/education/scholarship_ceremony.jpg.txt

echo "[DEMO] Mobile health clinic" > images/csr/healthcare/mobile_clinic.jpg.txt
echo "[DEMO] Health camp organization" > images/csr/healthcare/health_camp.jpg.txt

echo "[DEMO] Farmer training program" > images/csr/rural-development/farmer_training.jpg.txt
echo "[DEMO] Village development project" > images/csr/rural-development/village_development.jpg.txt

# Create demo documents
echo "Month,Sugar Production (MT),Revenue (Crores)
Jan 2024,15000,45.5
Feb 2024,16500,49.8
Mar 2024,14200,42.6" > documents/sugar-data/sugar_production_q1_2024.csv

echo "Month,Ethanol Production (KL),Revenue (Crores)
Jan 2024,8500,25.5
Feb 2024,9200,27.6
Mar 2024,8800,26.4" > documents/ethanol-data/ethanol_production_q1_2024.csv

echo "Month,Power Generation (MWh),Revenue (Crores)
Jan 2024,12000,18.5
Feb 2024,13500,20.8
Mar 2024,11800,18.2" > documents/power-data/power_generation_q1_2024.csv

echo "Month,Feed Production (MT),Revenue (Crores)
Jan 2024,2500,7.5
Feb 2024,2800,8.4
Mar 2024,2600,7.8" > documents/feed-data/feed_production_q1_2024.csv

echo "[DEMO] MSPIL Annual Report 2023-24 - Comprehensive business performance review" > documents/investor-relations/annual-reports/annual_report_2023_24.pdf.txt

echo "[DEMO] Q1 FY2024 Financial Results - Quarterly performance summary" > documents/investor-relations/quarterly-results/q1_fy2024_results.pdf.txt

echo "[DEMO] Investor Presentation Dec 2024 - Company overview and future plans" > documents/investor-relations/presentations/investor_presentation_dec2024.pptx.txt

echo "[DEMO] Corporate Governance Policy - Board policies and procedures" > documents/investor-relations/policies/corporate_governance_policy.pdf.txt

echo "[DEMO] CSR Report 2023-24 - Social responsibility initiatives and impact" > documents/csr/csr_report_2023_24.pdf.txt

echo "[DEMO] General Company Document - Miscellaneous corporate information" > documents/general/company_brochure_2024.pdf.txt

echo "✅ All demo files created successfully\!"
