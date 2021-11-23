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
chromium | map | 278 | 1.55
chromium | generator for..of | 633 | 3.54
chromium | generator for | 479 | 2.67
chromium | Set#add for..of | 213 | 1.19
chromium | Set#add for | 202 | 1.13
chromium | iterator | 358 | 2.00
firefox | map | 271 | 1.51
firefox | generator for..of | 1106 | 6.18
firefox | generator for | 1131 | 6.32
firefox | Set#add for..of | 438 | 2.45
firefox | Set#add for | 405 | 2.26
firefox | iterator | 609 | 3.40
webkit | map | 246 | 1.37
webkit | generator for..of | 1197 | 6.69
webkit | generator for | 914 | 5.11
webkit | Set#add for..of | 185 | 1.03
webkit | Set#add for | 179 | 1.00
webkit | iterator | 708 | 3.96

https://github.com/microsoft/playwright/issues/9811
