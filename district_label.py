from pathlib import Path
path = Path('/home/ubuntu/educompass/client/src/pages/Districts.tsx')
text = path.read_text()
text = text.replace('District {((directory.data ?? []).findIndex((item) => item.name === active.name) + 1) || ""} of 36', 'District {((directory.data ?? []).findIndex((item) => item.name === active.name) + 1) || ""} of 36')
text = text.replace('Five highlighted colleges to start your research.', 'Five highlighted colleges to start your research. Order is a curated discovery pick, not an official state ranking.')
text = text.replace('Rank {college.rank}', 'Pick {college.rank}')
path.write_text(text)
