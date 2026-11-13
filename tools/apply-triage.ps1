# Applies sources/download/triage.json to the raw source files, then rebuilds everything.
#  retry       -> direct link added to sources/download/resolved-F-triage.json
#  alternative -> new entry in sources/raw/09-alternatives.json; original marked skip (replaced_by)
#  online      -> original marked online (browser-only resource, kept as link)
#  skip        -> original marked skip with reason
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$u = New-Object System.Text.UTF8Encoding($false)
function Norm([string]$t) { $x = ($t.ToLower() -replace '[^a-z0-9]',''); if ($x.Length -gt 50) { $x.Substring(0,50) } else { $x } }
function ReadArr($p) { $o = [IO.File]::ReadAllText($p, $u) | ConvertFrom-Json; @(foreach ($x in $o) { $x }) }

$tri = ReadArr "$root\sources\download\triage.json"
$src = ReadArr "$root\sources\sources.json"
$byId = @{}; foreach ($s in $src) { $byId[$s.id] = $s }

$altPath = "$root\sources\raw\09-alternatives.json"
$alts = @(if (Test-Path $altPath) { ReadArr $altPath })
$retry = @(); $marks = @{}   # normtitle -> hashtable of fields to set
foreach ($t in $tri) {
  $orig = $byId[$t.id]; if (-not $orig) { "unknown id $($t.id)"; continue }
  $k = Norm $orig.title
  $newAlts = @()
  if ($t.alternatives) { $newAlts = @($t.alternatives) } elseif ($t.alternative) { $a = $t.alternative; $a | Add-Member download_url $t.download_url -Force; $a | Add-Member ext $t.ext -Force; $newAlts = @($a) }
  # extra files of a retried source become their own entries: "<title> — <label>"
  foreach ($e in @($t.extra_files)) { if ($e -and $e.download_url) { $newAlts += [pscustomobject]@{ title="$($orig.title) — $($e.label)"; authors=$orig.authors; year=$orig.year; publisher=$orig.publisher;
      type=$orig.type; tier=$orig.tier; topics=@($orig.topics); jurisdiction=$orig.jurisdiction; why="Part of $($orig.id): $($e.label)"; url=$e.download_url; download_url=$e.download_url; ext=$e.ext } } }
  foreach ($a in $newAlts) {
    if (-not $a.download_url) { continue }
    if (-not (@($alts | Where-Object { (Norm $_.title) -eq (Norm $a.title) }).Count)) {
      $alts += [pscustomobject]@{ title=$a.title; authors=$a.authors; edition=$null; year=$a.year; publisher=$a.publisher; isbn13=$null;
        type=$a.type; tier=$a.tier; topics=@($a.topics); jurisdiction=$a.jurisdiction; why=$a.why; access='free download';
        url=$a.url; free=$true; verified=$true; verification_url=$a.download_url; notes="Added for $($t.id) ($($orig.title)): $($t.reason)";
        alt_download=$a.download_url; alt_ext=$a.ext }
    }
  }
  switch ($t.action) {
    'retry'  { $retry += @{ id = $t.id; download_url = $t.download_url; ext = $t.ext; reason = $t.reason } }
    'online' { $marks[$k] = @{ online = $true; online_note = $t.reason } }
    'skip'   { $marks[$k] = @{ skip = $true; skip_reason = $t.reason } }
    'alternative' { $marks[$k] = @{ skip = $true; skip_reason = "replaced by free alternative(s): " + (($newAlts | ForEach-Object { $_.title }) -join '; ') } }
  }
}
[IO.File]::WriteAllText($altPath, (ConvertTo-Json -InputObject @($alts) -Depth 6), $u)

foreach ($f in (Get-ChildItem "$root\sources\raw" -Filter '*.json' | Where-Object { $_.Name -match '^0[1-8]-' })) {
  $arr = ReadArr $f.FullName; $changed = $false
  foreach ($x in $arr) { $m = $marks[(Norm $x.title)]; if ($m) { foreach ($p in $m.Keys) { $x | Add-Member -NotePropertyName $p -NotePropertyValue $m[$p] -Force }; $changed = $true } }
  if ($changed) { [IO.File]::WriteAllText($f.FullName, (ConvertTo-Json -InputObject @($arr) -Depth 6), $u) }
}

& "$root\tools\merge-sources.ps1" | Select-Object -First 1
# links for alternatives (need their new ids)
$src = ReadArr "$root\sources\sources.json"
foreach ($s in $src) { if ($s.alt_download) { $retry += @{ id = $s.id; download_url = $s.alt_download; ext = $s.alt_ext; reason = 'free alternative' } } }
[IO.File]::WriteAllText("$root\sources\download\resolved-F-triage.json", (ConvertTo-Json -InputObject @($retry)), $u)
& "$root\tools\download-library.ps1"
& "$root\tools\merge-sources.ps1" | Select-Object -First 1
& "$root\tools\make-fetch-list.ps1"
"marked: $($marks.Count) | alternatives: $(@($alts).Count) | retry+alt links: $($retry.Count)"
