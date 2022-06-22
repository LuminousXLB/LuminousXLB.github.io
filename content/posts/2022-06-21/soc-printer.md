---
title: Setup Printers from NUS SoC on Ubuntu
description: It's strange that there's official instruction for Windows and macOS users, leaving Linux users to explore on their own.
toc: false
tags:
  - soc
categories:
series:
date: '2022-06-21'
lastmod: '2022-06-21'
draft: false
---

## Install a Printer Driver

Visit [Lexmark Website](https://support.lexmark.com/en_us/drivers-downloads.html) and search for the driver for the printer you want to use.
You may find the device model from [dochub](https://dochub.comp.nus.edu.sg/cf/guides/printing/print-queues).
Download the corresponding `deb` package and install it using

``` console
$ sudo apt install ./Lexmark-UPD-PPD-Files-[some-version-number].amd64.deb
```

## Setup the Printer

Launch the config by executing
``` console
$ sudo system-config-printer
```

### Select Device

- Click "Add" and choose "Network Printer" > "Windows Printer via SAMBA" from the "Devices" frame.
- Enter `nusstu/ntsxx.comp.nus.edu.sg/psxddd` after "smb://"
    - Use a domain that's appropriate for you.
    - The hostname can be found in [dochub](https://dochub.comp.nus.edu.sg/cf/guides/printing/windows/adding_network_printer_for_windows7).
    - Replace `psxddd` with the queue name you want.
- Select "Set authentication details now" and fill in your **NUSNET ID** credentials.
    - Do not prefix your id with domain. It has been included in the url above.
    - **Think twice** if you are not the only one with root access on the machine.
        The credentials will be stored in plaintext in a file that only root can read.
- Click "Forward".

### Choose Driver

- The driver you installed comes with a PPD file named `Lexmark_UPD_Series.ppd`.
    It might be in `/usr/share/ppd/Lexmark_PPD/`.
    If you cannot find it in your system, you can unpack the deb package using
    ``` console
    $ dpkg -X Lexmark-UPD-PPD-Files-1.0-05252022.amd64.deb <output-dir>
    ```
    And the PPD file shall be in `<output-dir>/usr/local/Lexmark/ppd/Lexmark-UPD-PPD-Files/GlobalPPD_1.4/`
- Choose "Provide PPD file" and select the file you found in the previous step.
- Click "Forward".

### Installable Options

- Click "Forward".

### Describe Printer

- Fill in anything at your discretion.
- Click "Apply".

## Finished

That's all.
You may want to print something to test your configuration.
