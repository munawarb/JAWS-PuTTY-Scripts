# JAWS PuTTY Scripts
For a long while now, PuTTY has been a popular choice for SSH and terminal sessions. While terminal windows read well using screen readers such as [NVDA](www.nvaccess.org) because the developers took time to make terminal windows accessible, [JAWS](www.freedomscientific.com) support for PuTTY does not exist, and there is no indication of Freedom Scientific-supported support for terminal windows coming in the near future.

In light of this, I took it upon myself to write scripts for JAWS and PuTTY, because I use it at work on a regular basis, and JAWS' lack of support for this terminal application was slowing me down. These scripts make PuTTY accessible to JAWS users.

## Issues That These Scripts Correct
- JAWS does not track the cursor properly in PuTTY. As a result, As you arrow left or right over the input line, the screen reader will not accurately announce where the cursor is situated. This makes editing files difficult in the terminal. With these scripts, you can arrow left and right over the input line and the correct character is announced.
- JAWS does not automatically read PuTTY output. As a result, when you issue a command, you have to use the JAWS Cursor to review the text that the terminal session returned. With these scripts, PuTTY output is automatically read by JAWS.
- JAWS does not accurately read the current line when you arrow up or down to cycle through the command history, or while you move up and down a text editor such as Nano. A workaround to this issue was to press up or down arrow, then issue the "Say Line" command so that JAWS will read the new line. This issue is caused by a delay in the terminal, where the new line does not show up immediately. With these scripts, JAWS announces the new line only after the line has refreshed.
- JAWS says "space" as you press BACKSPACE to delete input. These scripts correct this issue.

## Fixes And Enhancements in the 01/16/2017 update
- JAWS properly reports "blank" or "space" as you arrow over a blank line or over a whitespace character. Previously, JAWS would remain silent in both instances.
- JAWS announces the character just deleted when you press BACKSPACE. Previously, JAWS would say "space."
- Pressing the "Say Character" command twice reports the phonetic version of the character to the right of the cursor, and pressing it three times reports the UNICODE value of the character.
- If you pressed LEFT ARROW or RIGHT ARROW too quickly, PuTTY and JAWS would be out of sync. This would result in inaccurate reporting of the character to the right of the cursor. This update fixes this issue.

## Download
There are two files available for download:
- [The scripts in a zip file](putty.zip): To install these scripts, extract the files in the zip archive to `%appdata%\Freedom Scientific\JAWS\VERSION_NUMBER\Settings\enu`.
- [The JAWS 18 Settings File](PuTTY.sbak): To install the scripts in this package using JAWS 18 or higher, use the Import Wizard by going to the JAWS window, then selecting `Utilities -> Import/Export -> Import Settings`.
