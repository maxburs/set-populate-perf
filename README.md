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
chromium | map | 4025 | 1.53
chromium | generator | 6681 | 2.54
chromium | Set#add | 3457 | 1.31
chromium | iterator | 4241 | 1.61
firefox | map | 3257 | 1.24
firefox | generator | 9802 | 3.73
firefox | Set#add | 4323 | 1.64
firefox | iterator | 5966 | 2.27
webkit | map | 2932 | 1.11
webkit | generator | 12707 | 4.83
webkit | Set#add | 2630 | 1.00
webkit | iterator | 7902 | 3.00

https://github.com/microsoft/playwright/issues/9811
