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
webkit | map | 4214.700000017881 | 1.162162907413227
webkit | generator | 7012.4000000059605 | 1.9336017206246858
webkit | Set#add | 3626.5999999940395 | 1
webkit | iterator | 4563.199999988079 | 1.2582584238668668
firefox | map | 4215 | 1.1595917356812147
firefox | generator | 7028 | 1.9334782249982387
firefox | Set#add | 3634.899999976158 | 1
firefox | iterator | 4566.4000000059605 | 1.2562656469327662
chromium | map | 4213.5 | 1.159083406693942
chromium | generator | 7028.9000000059605 | 1.9335662412051635
chromium | Set#add | 3635.199999988079 | 1
chromium | iterator | 4567 | 1.2563270246520073
