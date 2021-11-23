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
chromium | map | 274 | 1.46
chromium | generator for | 628 | 3.36
chromium | generator for..of | 472 | 2.53
chromium | Set#add | 207 | 1.11
chromium | iterator | 354 | 1.89
firefox | map | 275 | 1.47
firefox | generator for | 1128 | 6.03
firefox | generator for..of | 1133 | 6.06
firefox | Set#add | 432 | 2.31
firefox | iterator | 603 | 3.22
webkit | map | 239 | 1.28
webkit | generator for | 1193 | 6.38
webkit | generator for..of | 917 | 4.90
webkit | Set#add | 187 | 1.00
webkit | iterator | 703 | 3.76

https://github.com/microsoft/playwright/issues/9811
