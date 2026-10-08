from pathlib import Path
path = Path('/home/ubuntu/educompass/client/src/pages/Home.tsx')
text = path.read_text()
old = '<Eyebrow text="text-[#a9c6b5]">Shortlist health</Eyebrow>'
new = '<p className="eyebrow text-[#a9c6b5]">Shortlist health</p>'
if old not in text:
    raise SystemExit('target not found')
path.write_text(text.replace(old, new))
