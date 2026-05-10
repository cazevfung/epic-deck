param(
  [string]$SourceHtml = "deck-system/docs/style-bible.html",
  [string]$OutputPath = "deck-system/templates/deck-shell.html"
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

$repoRoot = Get-RepoRoot
$sourcePath = Resolve-RepoPath -Path $SourceHtml -RepoRoot $repoRoot

if (-not [System.IO.Path]::IsPathRooted($OutputPath)) {
  $OutputPath = Join-Path $repoRoot $OutputPath
}

$outputDir = Split-Path -Parent $OutputPath
if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir | Out-Null
}

$source = Get-Content -Raw -Encoding UTF8 $sourcePath

$coverStart = $source.IndexOf('<section class="slide cover')
if ($coverStart -lt 0) {
  throw "Could not find the cover slide in $sourcePath."
}

$coverEnd = $source.IndexOf('</section>', $coverStart)
if ($coverEnd -lt 0) {
  throw "Could not find the end of the cover slide in $sourcePath."
}
$coverEnd += '</section>'.Length

$secondSlideStart = $source.IndexOf('<section class="slide', $coverEnd)
if ($secondSlideStart -lt 0) {
  throw "Could not find a slide after the cover in $sourcePath."
}

$navigationStart = $source.IndexOf('<!-- Navigation -->', $coverEnd)
if ($navigationStart -lt 0) {
  throw "Could not find the navigation block in $sourcePath."
}

$prefix = $source.Substring(0, $secondSlideStart)
$tail = $source.Substring($navigationStart)

$trailingSlideCommentPattern = '(?s)\s*<!-- ============================================================ -->\s*<!-- .*? -->\s*<!-- ============================================================ -->\s*$'
$prefix = [regex]::Replace($prefix, $trailingSlideCommentPattern, [Environment]::NewLine + [Environment]::NewLine)

$deckPattern = '<div class="([^"]*\bdeck\b[^"]*)"([^>]*)>'
$deckReplacement = '<div class="$1"$2 data-shell="true">'
$deckRegex = [regex]::new($deckPattern)

if (-not $deckRegex.IsMatch($prefix)) {
  throw "Could not find the deck container in $sourcePath."
}

$prefix = $deckRegex.Replace($prefix, $deckReplacement, 1)

$marker = @"
  <!-- WORKBENCH_SLIDES -->

"@

$output = $prefix + $marker + $tail

Set-Content -Path $OutputPath -Value $output -Encoding UTF8

Write-Output "Created deck shell: $OutputPath"
