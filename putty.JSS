;JAWS PuTTY scripts
;Written by Munawar Bijani
;Updated 01/11/2017
include "hjconst.jsh";
globals
	int numberOfCalls,
	String prompt,
	string lastText;

void function monitorForLineChange(string currentPrompt)
	prompt = currentPrompt;
	numberOfCalls = 0;
	ScheduleFunction("readCurrentLine", 1);
EndFunction

void function readCurrentLine()
	var string newText = getLine();
	if (prompt != newText) then
		SayString(StringSegment(newText, "$", -1));
	else
		numberOfCalls = numberOfCalls + 1;
		if (numberOfCalls > 3) then
			SayString(StringSegment(prompt, "$", -1));
		else
			ScheduleFunction("readCurrentLine", 1);
		EndIf
	EndIf
EndFunction

void function ScreenStabilizedEvent (handle hwnd)
	if (getWindowClass(getFocus()) != "PuTTY") then
		ScreenStabilizedEvent(hwnd);
		return;
	EndIf
	readNewText();
	ScreenStabilizedEvent(hwnd);
EndFunction

Void Function readNewText ()
	var string text;
	text = GetTextInWindow (getFocus());
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
	if (getWindowClass(getFocus()) != "PuTTY") then
		PerformScript SayCharacter();
		return;
	EndIf
	if (!IsPCCursor ()) then
		PerformScript SayCharacter();
		return;
		EndIf
	JAWSCursor();
	SaveCursor();
	RouteJAWSToPC();
	PriorCharacter();
	var string c = GetCharacter();
	RestoreCursor();
	PCCursor();
	if (!IsSameScript()) then
		SayString(c);
	elif (IsSameScript() == 1) then
		SayString(GetCharacterByExample (c));
		AddHook (HK_SCRIPT, "PhoneticSpellHook");
	else
		SayString(GetCharacterValueString (c, cvfWantValueOfWideChar));
		AddHook (HK_SCRIPT, "CharacterValueHook");
	EndIf
EndScript


Script SayPriorCharacter ()
	if (getWindowClass(getFocus()) != "PuTTY") then
		PerformScript SayPriorCharacter();
		return;
	EndIf
	if (!IsPCCursor ()) then
		PerformScript SayPriorCharacter();
		return;
		EndIf
PriorCharacter();
var int r = GetCursorCol () - GetCharacterWidth();
	var int l = r - GetCharacterWidth();
	var int t = GetCursorRow() - 1;
var int b = t + GetCharacterWidth() + 2;
	SayString(GetTextInRect (l, t, r, b, 0));
EndScript

Script SayNextCharacter ()
	if (getWindowClass(getFocus()) != "PuTTY") then
		PerformScript SayPriorCharacter();
		return;
	EndIf
	if (!IsPCCursor ()) then
		PerformScript SayNextCharacter();
		return;
		EndIf
NextCharacter();
var int l = GetCursorCol ();
	var int r = GetCursorCol() + GetCharacterWidth();
	var int t = GetCursorRow() - 1;
var int b = t + GetCharacterWidth() + 2;
	SayString(GetTextInRect (l, t, r, b, 0));
EndScript
