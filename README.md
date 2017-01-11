# JAWS PuTTY Scripts
For a long while now, PuTTY has been a popular choice for SSH and terminal sessions. Unfortunately, for users of the JAWS screen reader, the PuTTY terminal window has remained inaccessible. These scripts make the PuTTY application accessible to users of the JAWS screen reader.

## Issues That These Scripts Correct
- JAWS does not track the cursor properly in PuTTY. As a result, As you arrow left or right over the input line, the screen reader will not accurately announce where the cursor is situated. This makes editing files difficult in the terminal. With these scripts, you can arrow left and right over the input line and the correct character is announced.
- JAWS also does not automatically read PuTTY output. As a result, when you issue a command, you have to use the JAWS Cursor to review the text that the terminal session returned. With these scripts, PuTTY output is automatically read by JAWS.
- JAWS also does not accurately read the current line when you arrow up or down to cycle through the command history, or while you move up and down a text editor such as Nano. A workaround to this issue was to press up or down arrow, then issue the "Say Line" command so that JAWS will read the new line. This issue is caused by a delay in the terminal, where the new line does not show up immediately. With these scripts, JAWS announces the new line only after the line has refreshed.

## Known Issues
The issues mentioned here are being worked on for a future release.
- The BACKSPACE key reports "Space" or "blank" as you press it to delete text on the input line, when it should report the character that was deleted.
- If you arrow over a whitespace character, JAWS remains silent.

## Download
There are two files available for download:
- [The scripts in a zip file](putty.zip): To install these scripts, extract the files in the zip archive to `%appdata%\Freedom Scientific\JAWS\Settings\enu`.
- [The JAWS 18 Settings File](JAWS-PuTTY-Scripts/PuTTY.sbak): To install the scripts in this package using JAWS 18 or higher, use the Import Wizard by going to the JAWS window, then selecting `Utilities -> Import/Export -> Import Settings`.
