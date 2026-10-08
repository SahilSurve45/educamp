from pathlib import Path
path = Path('/home/ubuntu/educompass/shared/collegeData.ts')
text = path.read_text()
text = text.replace('''      cutoff("CSE (AI & Machine Learning)", "0617591110", 98.5222885, 5039),\n      cutoff("Computer Engineering", "0617584410", 98.45, 5400),\n      cutoff("Information Technology", "0617584610", 98.15, 6200),\n      cutoff("Electronics & Telecommunication", "0617572110", 96.8, 11100),''', '''      cutoff("CSE (AI & Machine Learning)", "0617591110", 98.5222885, 5039),''')
text = text.replace('''      cutoff("Computer Science & Engineering", "0100224210", 97.3737374, 9196),\n      cutoff("Information Technology", "0100224610", 96.3316055, 12891),\n      cutoff("Civil Engineering", "0100219110", 91.1459607, 30071),\n      cutoff("Electrical Engineering", "0100229310", 94.8, 16000),''', '''      cutoff("Computer Science & Engineering", "0100224210", 97.3737374, 9196),\n      cutoff("Information Technology", "0100224610", 96.3316055, 12891),\n      cutoff("Civil Engineering", "0100219110", 91.1459607, 30071),''')
path.write_text(text)
