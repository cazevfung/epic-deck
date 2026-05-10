param(
  [Parameter(Mandatory = $true)]
  [int[]]$Pages,

  [string]$SourceHtml = "deck-system/templates/deck-shell.html",

  [string]$OutputPath,

  [int]$DeckTotal = 20
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

function Get-DefaultOutputPath {
  param(
    [Parameter(Mandatory = $true)]
    [int[]]$PageList,

    [Parameter(Mandatory = $true)]
    [string]$RepoRoot
  )

  $pageText = @($PageList | ForEach-Object { $_.ToString("00") })
  $isContiguous = $true

  for ($i = 1; $i -lt $PageList.Count; $i++) {
    if ($PageList[$i] -ne ($PageList[$i - 1] + 1)) {
      $isContiguous = $false
      break
    }
  }

  if ($PageList.Count -eq 1) {
    $token = "page-$($pageText[0])"
  }
  elseif ($isContiguous) {
    $token = "pages-$($pageText[0])-$($pageText[-1])"
  }
  else {
    $token = "pages-" + ($pageText -join "_")
  }

  $dir = Join-Path $RepoRoot "epic_deck/02_sections/05_exports/workbench"
  return (Join-Path $dir "workbench-$token.html")
}

function Get-PlaceholderSlide {
  param(
    [Parameter(Mandatory = $true)]
    [int]$Page,

    [Parameter(Mandatory = $true)]
    [int]$DeckTotalCount
  )

  $pageLabel = $Page.ToString("00")
  $deckLabel = $DeckTotalCount.ToString("00")

  return @"
  <section class="slide slide-workbench-placeholder" data-slide="$Page" data-toc="Workbench - Page $Page">
    <div class="slide-header">
      <div>
        <div class="eyebrow orange">Workbench</div>
        <h2>Page $Page rebuild in progress</h2>
      </div>
      <div class="page-num">$pageLabel / $deckLabel</div>
    </div>

    <div class="center-all fill">
      <div class="card card-accent-orange" style="max-width:min(70vw,960px); width:100%;">
        <div class="section-label">How to use this scaffold</div>
        <div class="stack-sm">
          <p class="lead">Replace this whole section with the rebuilt HTML for original page $Page.</p>
          <p>Keep the global shell, backdrop, shared CSS, navigation, and print behavior inherited from <span class="mono">deck-shell.html</span> and the bible.</p>
          <p>Use the source slide content and the closest bible family before extracting any new pattern.</p>
          <p class="small">The local counter tracks this workbench file. The page label in the top-right corner tracks the original PPT page.</p>
        </div>
      </div>
    </div>
  </section>

"@
}

$repoRoot = Get-RepoRoot

$cleanPages = @(
  $Pages |
    Where-Object { $_ -gt 0 } |
    Sort-Object -Unique
)

if (-not $cleanPages -or $cleanPages.Count -eq 0) {
  throw "Provide at least one page number greater than 0."
}

$sourcePath = Resolve-RepoPath -Path $SourceHtml -RepoRoot $repoRoot

if (-not $OutputPath) {
  $OutputPath = Get-DefaultOutputPath -PageList $cleanPages -RepoRoot $repoRoot
}
elseif (-not [System.IO.Path]::IsPathRooted($OutputPath)) {
  $OutputPath = Join-Path $repoRoot $OutputPath
}

$outputDir = Split-Path -Parent $OutputPath
if (-not (Test-Path $outputDir)) {
  New-Item -ItemType Directory -Path $outputDir | Out-Null
}

$source = Get-Content -Raw -Encoding UTF8 $sourcePath

$marker = '<!-- WORKBENCH_SLIDES -->'
$markerIndex = $source.IndexOf($marker)
if ($markerIndex -lt 0) {
  throw "Could not find the WORKBENCH_SLIDES marker in $sourcePath. Rebuild deck-shell.html first."
}

$prefix = $source.Substring(0, $markerIndex)
$tail = $source.Substring($markerIndex + $marker.Length)

$deckRegex = [regex]::new('<div class="([^"]*\bdeck\b[^"]*)"([^>]*)>')
if (-not $deckRegex.IsMatch($prefix)) {
  throw "Could not find the deck container in $sourcePath."
}

$prefix = $deckRegex.Replace(
  $prefix,
  '<div class="$1"$2 data-workbench="true" data-start-slide="2">',
  1
)

$placeholderSlides = ($cleanPages | ForEach-Object {
  Get-PlaceholderSlide -Page $_ -DeckTotalCount $DeckTotal
}) -join ""

$workbenchBootstrap = @"
<script>
  (function initWorkbenchStart() {
    const deck = document.querySelector('.deck[data-workbench="true"]');
    if (!deck || location.hash) return;
    const raw = deck.dataset.startSlide || '';
    const n = parseInt(raw, 10);
    if (!Number.isFinite(n) || n < 1) return;
    if (typeof show === 'function') {
      show(n - 1, { syncHash: false });
    }
  })();
</script>

"@

$tail = $tail -replace '</body>', ($workbenchBootstrap + '</body>')

$output = $prefix + $placeholderSlides + $tail

Set-Content -Path $OutputPath -Value $output -Encoding UTF8

Write-Output "Created workbench: $OutputPath"
Write-Output ("Pages: " + (($cleanPages | ForEach-Object { $_.ToString("00") }) -join ", "))
