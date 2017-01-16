;JAWS PuTTY scripts
;Written by Munawar Bijani
;Updated 01/16/2017
include "hjconst.jsh";
include "common.jsm";

globals
	int spell,
	int value,
	int numberOfCalls,
	string prompt,
	string lastText;

Void function AutoStartEvent()
	AddHook (HK_SCRIPT, "speakPhoneticAndValueHook");
EndFunction


Void function AutoFinishEvent()
	RemoveHook(HK_SCRIPT, "speakPhoneticAndValueHook");
EndFunction


Void function monitorForLineChange(string currentPrompt)
	prompt = currentPrompt;
	numberOfCalls = 0;
	ScheduleFunction("readCurrentLine", 1);
EndFunction

Void function readCurrentLine()
	var string newText = getLine();
	if (prompt != newText) then
		if (StringStripAllBlanks(newText) == "") then
			SayString("blank");
		else
			SayString(StringSegment(newText, "$", -1));
		EndIf
	else
		numberOfCalls = numberOfCalls + 1;
		if (numberOfCalls > 2) then
			numberOfCalls = 0;
			if (StringStripAllBlanks(prompt) == "") then
				SayString("blank");
			else
				SayString(StringSegment(prompt, "$", -1));
			EndIf
		else
			ScheduleFunction("readCurrentLine", 1);
		EndIf
	EndIf
EndFunction

Void function ScreenStabilizedEvent (handle hwnd)
	if (getWindowClass(getFocus()) != "PuTTY") then
		ScreenStabilizedEvent(hwnd);
		return;
	EndIf
	readNewText();
	ScreenStabilizedEvent(hwnd);
EndFunction

Void Function readNewText ()
	var string text = GetTextInWindow (getFocus());
	var int pointer = -1;
	if (lastText != text) then
		while (abs (pointer) <= StringSegmentCount(text, "\n") && StringSegment(text, "\n", pointer) != StringSegment(lastText, "\n", -2))
			pointer = pointer - 1;
		EndWhile
		if (pointer == 1) then
			pointer = -1;
		else
			pointer = pointer + 2;
		EndIf
		var int i;
		for i = pointer to -1
			SayString(StringSegment(text, "\n", i));
		EndFor
		lastText = StringTrimTrailingBlanks(text);
	EndIf
EndFunction


Script SayPriorLine ()
	if (!IsPCCursor() || getWindowClass(getFocus()) != "PuTTY") then
		PerformScript SayPriorLine();
		return;
	EndIf
	PriorLine();
	monitorForLineChange(GetLine());
EndScript


Script SayNextLine ()
	if (!IsPCCursor() || getWindowClass(getFocus()) != "PuTTY") then
		PerformScript SayNextLine();
		return;
	EndIf
	NextLine();
	monitorForLineChange(GetLine());
EndScript


Script SayCharacter ()
	if (!IsPCCursor() || getWindowClass(getFocus()) != "PuTTY") then
		PerformScript SayCharacter();
		return;
	EndIf
	var int r = GetCursorCol ();
	var int l = r - GetCharacterWidth();
	var int t = GetCursorRow() - 1;
	var int b = t + GetCharacterWidth() + 2;
	var string s = GetTextInRect (l, t, r, b, 0);
	if (!IsSameScript()) then
		spell = false;
		value = false;
	elif (IsSameScript() == 1) then
		spell = true;
	else
		spell = false;
		value = true;
	EndIf
	sayAccordingToHook(s);
EndScript


Script SayPriorCharacter ()
	if (!IsPCCursor() || getWindowClass(getFocus()) != "PuTTY") then
		PerformScript SayPriorCharacter();
		return;
	EndIf
	var int cursorCol = GetCursorCol();
	var int startTime = GetTickCount();
	PriorCharacter();
	while (cursorCol == GetCursorCol() && GetTickCount() - startTime < 300)
		;We need to wait here because it will take PuTTY time to move the cursor...
	EndWhile
	var int r = GetCursorCol ();
	var int l = r - GetCharacterWidth();
	var int t = GetCursorRow() - 1;
	var int b = t + GetCharacterWidth() + 2;
	sayAccordingToHook(GetTextInRect (l, t, r, b, 0));
EndScript

Script SayNextCharacter ()
	if (!IsPCCursor() || getWindowClass(getFocus()) != "PuTTY") then
		PerformScript SayNextCharacter();
		return;
	EndIf
	var int cursorCol = GetCursorCol();
	var int startTime = GetTickCount();
NextCharacter();
	while (cursorCol == GetCursorCol() && GetTickCount() - startTime < 300)
		;We need to wait here because it will take PuTTY time to move the cursor...
	EndWhile
	var int r = GetCursorCol ();
	var int l = r - GetCharacterWidth();
	var int t = GetCursorRow() - 1;
	var int b = t + GetCharacterWidth() + 2;
	sayAccordingToHook(GetTextInRect (l, t, r, b, 0));
EndScript


Script JAWSBackspace ()
	if (GetWindowClass(GetFocus()) != "PuTTY") then
		PerformScript JAWSBackspace();
		return;
	EndIf
	var int r = GetCursorCol () - GetCharacterWidth();
	var int l = r - GetCharacterWidth();
	var int t = GetCursorRow() - 1;
	var int b = t + GetCharacterWidth() + 2;
	sayAccordingToHook(GetTextInRect (l, t, r, b, 0));
	TypeKey (cksBackspace);
EndScript


Function SpeakPhoneticAndValueHook (string scriptName)
	if (scriptName != "SayCharacter" && scriptName != "SayNextCharacter" && scriptName != "SayPriorCharacter") then
		spell = false;
		value = false;
	EndIf
	return true;
EndFunction


Void Function sayAccordingToHook (string s)
	if (s == "") then
		s = " ";
	EndIf
	if (spell) then
		if (s == " ") then
			SayString("space");
		else
			SayString(GetCharacterByExample(s));
		EndIf
	elif (value) then
		SayString(GetCharacterValueString (s, cvfWantValueOfWideChar));
	else
		if (s == " ") then
			SayString("space");
		else
			SayString(s);
		EndIf
	EndIf
EndFunction