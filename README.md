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
chromium | map | 268 | 1.51
chromium | generator for..of | 636 | 3.59
chromium | generator for | 468 | 2.64
chromium | Set#add | 193 | 1.09
chromium | iterator | 355 | 2.01
firefox | map | 303 | 1.71
firefox | generator for..of | 1118 | 6.32
firefox | generator for | 1139 | 6.44
firefox | Set#add | 441 | 2.49
firefox | iterator | 605 | 3.42
webkit | map | 253 | 1.43
webkit | generator for..of | 1209 | 6.83
webkit | generator for | 933 | 5.27
webkit | Set#add | 177 | 1.00
webkit | iterator | 705 | 3.98

https://github.com/microsoft/playwright/issues/9811
