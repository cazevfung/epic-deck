# Templates

`deck-shell.html` is the official production base file for slide work.

Do not hand-author new slide files from scratch.

Do not manually maintain `deck-shell.html` as a custom branch of the bible.

Refresh it from the canon with:

```powershell
.\deck-system\scripts\build-deck-shell.ps1
```

Then create task files with:

```powershell
.\deck-system\scripts\new-slide-workbench.ps1 -Pages 9
```
