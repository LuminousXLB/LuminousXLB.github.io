---
title: Try OpenNIC on U250
description: Something the readme didn't tell you.
toc: true
tags:
  - xilinx
  - nic
categories:
series:
date: '2022-06-10'
lastmod: '2022-06-10'
draft: false
---

## Overview

The [AMD OpenNIC Project](https://github.com/Xilinx/open-nic) consists of a
hardware design (OpenNIC shell) and two software drivers (OpenNIC driver and
OpenNIC DPDK).

This article is base on [open-nic-shell](https://github.com/Xilinx/open-nic-shell/tree/542a487049b454235bc82ebc52d5511a38b8623c) at commit `542a487` and [open-nic-driver](https://github.com/Xilinx/open-nic-driver/tree/2fa96685de279a60a4257c3ac36625275e91ff37) at commit `2fa9668`.

## Tips on the Hardware Part

It's easy to get an FPGA bitstream by following the README.

There are two QSFP28 interfaces on the Alveo U250 Data Center Accelerator Card.
But the shell enables only one of them by default.
Thus, if both of them are needed, do set the parameter `-num_cmac_port` to 2.
And correspondingly, the `-num_phys_func` shall be 2 as well.

## Tips on the Driver

Do note that

> There is an optional parameter `RS_FEC_ENABLED`, which can be set to either zero or one.

The feature shall be either both enabled on OpenNIC and its peer, or both disabled.
It is enabled on OpenNIC by default.
And if the connection doesn't work, do try setting the parameter to `0`.

``` console
$ sudo insmod onic.ko RS_FEC_ENABLED=0
```

## Tips on the Running `iperf3`

Do remember to set `--bind-dev` flag on the OpenNIC side, whether it's server or not, when using `iperf3` to test the connection.

## Something Else You Can Do to Debug

There are some registers you can read in the [Packet Adapter](https://github.com/Xilinx/open-nic-shell/blob/542a487049b454235bc82ebc52d5511a38b8623c/src/packet_adapter/packet_adapter_register.v).
The offset of two packet adapters are `0x0B000` and `0x0F000`.
You can find more information in the comment in [`system_config_address_map.sv`](https://github.com/Xilinx/open-nic-shell/blob/542a487049b454235bc82ebc52d5511a38b8623c/src/system_config/system_config_address_map.sv).

To read the registers, [pcimem](https://github.com/billfarrow/pcimem) can be helpful.
``` console
$ sudo ./pcimem /sys/class/net/enp24s0f0/device/resource2 0x0F000 w*20
/sys/class/net/enp24s0f0/device/resource2 opened.
Target offset is 0xf000, page size is 4096
mmap(0, 4096, 0x3, 0x1, 3, 0xf000)
PCI Memory mapped to address 0x7f0dc57f2000.
Value at offset 0xF000 (0x7f0dc57f2000): 0x00723276
Value at offset 0xF004 (0x7f0dc57f2004): 0x00000000
Value at offset 0xF008 (0x7f0dc57f2008): 0xA3515F63
Value at offset 0xF00C (0x7f0dc57f200c): 0x00000002
Value at offset 0xF010 (0x7f0dc57f2010): 0x00000000
Value at offset 0xF014 (0x7f0dc57f2014): 0x00000000
Value at offset 0xF018 (0x7f0dc57f2018): 0x00000000
Value at offset 0xF01C (0x7f0dc57f201c): 0x00000000
Value at offset 0xF020 (0x7f0dc57f2020): 0x00016DDF
Value at offset 0xF024 (0x7f0dc57f2024): 0x00000000
Value at offset 0xF028 (0x7f0dc57f2028): 0x005E5617
Value at offset 0xF02C (0x7f0dc57f202c): 0x00000000
Value at offset 0xF030 (0x7f0dc57f2030): 0x00000000
Value at offset 0xF034 (0x7f0dc57f2034): 0x00000000
Value at offset 0xF038 (0x7f0dc57f2038): 0x00000000
Value at offset 0xF03C (0x7f0dc57f203c): 0x00000000
Value at offset 0xF040 (0x7f0dc57f2040): 0x00000000
Value at offset 0xF044 (0x7f0dc57f2044): 0x00000000
Value at offset 0xF048 (0x7f0dc57f2048): 0x00000000
Value at offset 0xF04C (0x7f0dc57f204c): 0x00000000
```

