param(
  [string]$Directory = "epic_deck/02_sections/05_exports/workbench",
  [switch]$Apply
)

Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

function Get-RepoRoot {
  return (Resolve-Path (Join-Path $PSScriptRoot "..\..")).Path
}

function Resolve-RepoPath {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path,

    [Parameter(Mandatory = $true)]
    [string]$RepoRoot
  )

  if ([System.IO.Path]::IsPathRooted($Path)) {
    return (Resolve-Path $Path).Path
  }

  return (Resolve-Path (Join-Path $RepoRoot $Path)).Path
}

function Get-PageToken {
  param(
    [Parameter(Mandatory = $true)]
    [int[]]$Pages
  )

  $sorted = @($Pages | Sort-Object -Unique)
  if ($sorted.Count -eq 0) {
    throw "Cannot build a filename without page numbers."
  }

  if ($sorted.Count -eq 1) {
    return "page-$($sorted[0].ToString('00'))"
  }

  $segments = @()
  $start = $sorted[0]
  $prev = $sorted[0]

  for ($i = 1; $i -lt $sorted.Count; $i++) {
    $n = $sorted[$i]
    if ($n -eq ($prev + 1)) {
      $prev = $n
      continue
    }

    if ($start -eq $prev) {
      $segments += $start.ToString("00")
    }
    else {
      $segments += ("{0}-{1}" -f $start.ToString("00"), $prev.ToString("00"))
    }

    $start = $n
    $prev = $n
  }

  if ($start -eq $prev) {
    $segments += $start.ToString("00")
  }
  else {
    $segments += ("{0}-{1}" -f $start.ToString("00"), $prev.ToString("00"))
  }

  return "pages-" + ($segments -join "_")
}

function Get-SlideNumbersFromHtml {
  param(
    [Parameter(Mandatory = $true)]
    [string]$Path
  )

  $content = Get-Content -Raw -Encoding UTF8 $Path
  $matches = [regex]::Matches($content, '<section\s+class="slide[^"]*"[^>]*data-slide="(\d+)"')

  if ($matches.Count -eq 0) {
    return @()
  }

  return @(
    $matches |
      ForEach-Object { [int]$_.Groups[1].Value } |
      Sort-Object -Unique
  )
}

$repoRoot = Get-RepoRoot
$targetDir = Resolve-RepoPath -Path $Directory -RepoRoot $repoRoot

$files = Get-ChildItem $targetDir -Filter "workbench-page*.html" | Sort-Object Name
if ($files.Count -eq 0) {
  throw "No workbench HTML files found in $targetDir"
}

$plan = New-Object System.Collections.Generic.List[object]

foreach ($file in $files) {
  $pages = @(Get-SlideNumbersFromHtml -Path $file.FullName)

  if ($pages.Count -eq 0) {
    $plan.Add([pscustomobject]@{
      Status = "skip"
      Source = $file.Name
      Target = ""
      Reason = "No <section class=`"slide`" ... data-slide>` found"
    })
    continue
  }

  $token = Get-PageToken -Pages $pages
  $targetName = "workbench-$token.html"

  if ($file.Name -eq $targetName) {
    $plan.Add([pscustomobject]@{
      Status = "ok"
      Source = $file.Name
      Target = $targetName
      Reason = "Already aligned with slide numbers"
    })
    continue
  }

  $existingTarget = Join-Path $file.DirectoryName $targetName
  if ((Test-Path $existingTarget) -and ((Resolve-Path $existingTarget).Path -ne $file.FullName)) {
    $plan.Add([pscustomobject]@{
      Status = "conflict"
      Source = $file.Name
      Target = $targetName
      Reason = "Target filename already exists"
    })
    continue
  }

  $plan.Add([pscustomobject]@{
    Status = "rename"
    Source = $file.Name
    Target = $targetName
    Reason = "Derived from section data-slide values: $($pages -join ', ')"
  })
}

$conflicts = @($plan | Where-Object { $_.Status -eq "conflict" })

if (-not $Apply) {
  Write-Output "Dry run only. Re-run with -Apply to rename files."
}

foreach ($item in $plan) {
  switch ($item.Status) {
    "rename" {
      Write-Output ("RENAME  {0} -> {1}" -f $item.Source, $item.Target)
      if ($Apply) {
        Rename-Item -LiteralPath (Join-Path $targetDir $item.Source) -NewName $item.Target
      }
    }
    "ok" {
      Write-Output ("OK      {0}" -f $item.Source)
    }
    "skip" {
      Write-Warning ("SKIP    {0} ({1})" -f $item.Source, $item.Reason)
    }
    "conflict" {
      Write-Warning ("CONFLICT {0} -> {1} ({2})" -f $item.Source, $item.Target, $item.Reason)
    }
  }
}

if ($conflicts.Count -gt 0) {
  throw "Found $($conflicts.Count) filename conflict(s). Resolve them before applying."
}

if ($Apply) {
  Write-Output "Rename pass complete."
}
