# Populating JavaScript Set performance comparison

key | value
-|-
Model Name | MacBook Pro
Model Identifier | MacBookPro18,4
Chip | Apple M1 Max
Total Number of Cores | 10 (8 performance and 2 efficiency)
Memory | 32 GB
deno | 1.16.2

browser | name | duration | normal
-|-|-|-
browser | name | duration | normal
chromium | map | 4208 | 1.15
chromium | generator | 7005 | 1.92
chromium | Set#add | 3655 | 1.00
chromium | iterator | 4554 | 1.25
webkit | map | 4209 | 1.15
webkit | generator | 7022 | 1.92
webkit | Set#add | 3653 | 1.00
webkit | iterator | 4549 | 1.25
firefox | map | 4214 | 1.14
firefox | generator | 7017 | 1.90
firefox | Set#add | 3686 | 1.00
firefox | iterator | 4521 | 1.23
