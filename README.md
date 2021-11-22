# Populating JavaScript Set performance comparison

key | value
-|-
Model Name | MacBook Pro
Model Identifier | MacBookPro18,4
Chip | Apple M1 Max
Memory | 32 GB

chrome 97, Firefox 94.0, Safari 15.4

browser | name | duration | normal
-|-|-|-
browser | name | duration | normal
chromium | map | 4095 | 1.16
chromium | generator | 6609 | 1.88
chromium | Set#add | 3517 | 1.00
chromium | iterator | 4359 | 1.24
firefox | map | 3276 | 1.00
firefox | generator | 9823 | 3.00
firefox | Set#add | 4390 | 1.34
firefox | iterator | 5958 | 1.82
webkit | map | 2928 | 1.13
webkit | generator | 12754 | 4.91
webkit | Set#add | 2599 | 1.00
webkit | iterator | 7901 | 3.04

https://github.com/microsoft/playwright/issues/9811
