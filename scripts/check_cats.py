import re

with open('lib/exams-data.ts', 'r', encoding='utf-8') as f:
    text = f.read()

matches = re.findall(r'"categories":\s*\[([^\]]+)\]', text)
counts = {}
for m in matches:
    items = [x.strip().replace('"', '') for x in m.split(',')]
    for it in items:
        counts[it] = counts.get(it, 0) + 1

print('Category counts:', counts)

levels = re.findall(r'"levelClassification":\s*"([^"]+)"', text)
lvl_counts = {}
for l in levels:
    lvl_counts[l] = lvl_counts.get(l, 0) + 1
print('Level counts:', lvl_counts)

is_govt = re.findall(r'"isGovernment":\s*(true|false)', text)
print('Govt count:', is_govt.count('true'), 'Private count:', is_govt.count('false'))
