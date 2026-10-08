from pathlib import Path
for filename in ['client/src/pages/Home.tsx', 'client/src/index.css']:
    path = Path('/home/ubuntu/educompass') / filename
    text = path.read_text()
    replacements = {
        '#173b34': '#1f2a5a', '#d78347': '#635bdb', '#dff29e': '#d8d9ff',
        '#edf4e7': '#eef0ff', '#fff1e4': '#f4f0ff', '#31584d': '#3c4776',
        '#e8f4ca': '#e5e4ff', '#f7f9f4': '#f8f9ff', '#e2eadb': '#e4e7f2',
        '#dfe9da': '#e0e3f0', '#dbe8d4': '#dce0ef', '#dce8d6': '#dce0ef',
        '#69817a': '#727b9c', '#6a817a': '#727b9c', '#78908a': '#8991ad',
        '#8aa098': '#9299b2', '#a9c6b5': '#c1c8e5', '#234a40': '#303b70',
        '#28554a': '#384582', '#2f5c50': '#3b4784', '#416b5d': '#5964a0',
        '#c8ddcf': '#d0d5f0', '#c4d9cb': '#cbd1ed', '#f4fbef': '#f7f7ff',
        '#49645d': '#727b9c', '#f7faf4': '#f5f6ff', '#edf1eb': '#edf0f6',
        '#e8eee5': '#edf0f6', '#8ba198': '#9299b2', '#f2f6ef': '#f3f4ff',
        '#eaf2e4': '#ebecfb', '#70908a': '#8991ad', '#f29f5b': '#9b94ee',
        '#d8ed9c': '#d8d9ff', '#e7f1bf': '#e5e4ff', '#d6e5cd': '#dfe1f3',
        '#c7dcb7': '#cfd3ea', '#e4f0d9': '#e6e8f7', '#bdd4b1': '#c5cae5',
        '#b9d3a9': '#bcc2e1', '#5c782b': '#5d58a7', '#6a8a5b': '#6963b5',
        '#be7641': '#635bdb', '#6b8c40': '#625daf', '#5e766f': '#727b9c',
        '#637d74': '#727b9c', '#6e887e': '#727b9c', '#6d8d5c': '#6c66b2',
        '#849990': '#9299b2', '#85a093': '#9299b2', '#95a9a1': '#9299b2',
        '#9aaea3': '#9299b2', '#9baca5': '#9299b2', '#a7b8b0': '#a2a8c0',
        '#cbdcc4': '#cfd3ea', '#d6e9dc': '#dfe2f5', '#e0eee2': '#e3e5f4',
        '#dcecdf': '#dfe2f5', '#c9dcbd': '#cfd3ea', '#e4eadb': '#e4e7f2',
        '#d7e4d5': '#dce0ef', '#d7e6c8': '#d8dcef', '#d8e5d4': '#dce0ef',
        '#d7e4d5': '#dce0ef', '#f0d6c7': '#ddd7f0', '#fff7f1': '#f7f5ff',
        '#8d4f2c': '#514c98', '#9a6e56': '#7772ab', '#f8faf4': '#f5f6ff',
    }
    for old, new in replacements.items():
        text = text.replace(old, new)
    path.write_text(text)

path = Path('/home/ubuntu/educompass/client/src/pages/Home.tsx')
text = path.read_text()
text = text.replace('["/colleges", "Explore colleges"],\n  ["/compare", "Compare"],', '["/colleges", "Explore colleges"],\n  ["/districts", "36 districts"],\n  ["/compare", "Compare"],')
text = text.replace('<Link href="/colleges" className="hover:text-[#727b9c]">College finder</Link><Link href="/compare"', '<Link href="/colleges" className="hover:text-[#1f2a5a]">College finder</Link><Link href="/districts" className="hover:text-[#1f2a5a]">36 district directory</Link><Link href="/compare"')
path.write_text(text)
