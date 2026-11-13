# Downloads free sources into library/<tier>/ and writes library/manifest.json.
# Inputs: sources/sources.json (EUR-Lex entries resolved by CELEX) + sources/download/resolved-*.json (agent-resolved links).
# Re-runnable: existing valid files are skipped.
$ErrorActionPreference = 'Stop'
$ProgressPreference = 'SilentlyContinue'
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
$root = Split-Path -Parent $PSScriptRoot
$utf8 = New-Object System.Text.UTF8Encoding($false)
$lib = Join-Path $root 'library'
function Norm([string]$t) { $x = ($t.ToLower() -replace '[^a-z0-9]',''); if ($x.Length -gt 50) { $x.Substring(0,50) } else { $x } }
function Slug([string]$t) { $x = ($t -replace '[^A-Za-z0-9]+','-').Trim('-'); if ($x.Length -gt 60) { $x.Substring(0,60).Trim('-') } else { $x } }

$src = [IO.File]::ReadAllText((Join-Path $root 'sources\sources.json'), $utf8) | ConvertFrom-Json
$byId = @{}; foreach ($s in $src) { $byId[$s.id] = $s }

# 1. build job list: url -> {ext, ids}
$jobs = [ordered]@{}
function Add-Job($id, $url, $ext) {
  if (-not $url -or $ext -notin @('pdf','html','docx')) { return }
  if (-not $jobs.Contains($url)) { $jobs[$url] = [pscustomobject]@{ url=$url; ext=$ext; ids=New-Object System.Collections.ArrayList } }
  [void]$jobs[$url].ids.Add($id)
}
foreach ($s in $src) {
  if ($s.free -and $s.url -match 'eur-lex\.europa\.eu/eli/([a-z_]+)/(\d{4})/(\d+)') {
    $kind = $Matches[1]; $yr = $Matches[2]; $num = '{0:D4}' -f [int]$Matches[3]
    $letter = switch -Regex ($kind) { '^reg' {'R'} '^dir' {'L'} '^guideline' {'O'} '^dec' {'D'} default {$null} }
    # EUR-Lex web front-end has an AWS WAF bot challenge; use the Publications Office Cellar API (official machine interface)
    if ($letter) { Add-Job $s.id "https://publications.europa.eu/resource/celex/3$yr$letter$num" 'pdf' }
  }
}
foreach ($f in Get-ChildItem (Join-Path $root 'sources\download') -Filter 'resolved-*.json') {
  foreach ($r in ([IO.File]::ReadAllText($f.FullName, $utf8) | ConvertFrom-Json)) { Add-Job $r.id $r.download_url $r.ext }
}

# 2. download
$manifest = @(); $fail = @()
foreach ($j in $jobs.Values) {
  $first = $byId[$j.ids[0]]
  if (-not $first) { continue }
  $dir = Join-Path $lib $first.tier
  New-Item -ItemType Directory -Force $dir | Out-Null
  $name = "$($first.id)_$(Slug $first.title).$($j.ext)"
  $path = Join-Path $dir $name
  $ok = $false; $err = $null
  if ((Test-Path $path) -and (Get-Item $path).Length -gt 2048) { $ok = $true }
  else {
    try {
      $hdr = @{}
      if ($j.url -like 'https://publications.europa.eu/resource/celex/*') { $hdr = @{ Accept='application/pdf'; 'Accept-Language'='eng' } }
      Start-Sleep -Milliseconds 800
      Invoke-WebRequest $j.url -OutFile $path -UseBasicParsing -TimeoutSec 180 -MaximumRedirection 10 -Headers $hdr `
        -UserAgent 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' | Out-Null
      $bytes = [IO.File]::ReadAllBytes($path)
      $head = [Text.Encoding]::ASCII.GetString($bytes[0..([Math]::Min(511,$bytes.Length-1))])
      if ($j.ext -eq 'pdf') { $ok = $head.StartsWith('%PDF') ; if (-not $ok) { $err = 'not a PDF (got HTML/other)' } }
      elseif ($j.ext -eq 'docx') { $ok = $head.StartsWith('PK'); if (-not $ok) { $err = 'not a DOCX' } }
      else { $ok = ($bytes.Length -gt 2048 -and $head -match '(?i)<(!doctype html|html|head|body)'); if (-not $ok) { $err = 'not an HTML page' } }
    } catch { $err = $_.Exception.Message }
    if (-not $ok -and (Test-Path $path)) { Remove-Item $path -Force }
  }
  # Cellar fallback: some acts have no PDF manifestation -> official XHTML text, saved as .html
  if (-not $ok -and $j.url -like 'https://publications.europa.eu/resource/celex/*') {
    $name = "$($first.id)_$(Slug $first.title).html"; $path = Join-Path $dir $name
    if ((Test-Path $path) -and (Get-Item $path).Length -gt 2048) { $ok = $true; $err = $null }
    else {
      try {
        Start-Sleep -Milliseconds 800
        Invoke-WebRequest $j.url -OutFile $path -UseBasicParsing -TimeoutSec 180 -MaximumRedirection 10 `
          -Headers @{ Accept='application/xhtml+xml'; 'Accept-Language'='eng' } | Out-Null
        $ok = ((Get-Item $path).Length -gt 2048); if ($ok) { $err = $null } else { $err = 'xhtml fallback empty' }
      } catch { $err = "pdf 404; xhtml: $($_.Exception.Message)" }
      if (-not $ok -and (Test-Path $path)) { Remove-Item $path -Force }
    }
  }
  $titles = @($j.ids | ForEach-Object { $byId[$_].title })
  if ($ok) {
    $manifest += [pscustomobject]@{ keys=@($titles | ForEach-Object { Norm $_ } | Select-Object -Unique); ids=@($j.ids); title=$first.title;
      path=("library/$($first.tier)/$name"); url=$j.url; bytes=(Get-Item $path).Length }
  } else { $fail += "$($j.ids -join ',') $($first.title) <$($j.url)> : $err" }
}
New-Item -ItemType Directory -Force $lib | Out-Null
[IO.File]::WriteAllText((Join-Path $lib 'manifest.json'), (ConvertTo-Json -InputObject $manifest -Depth 4), $utf8)
"downloaded files: $($manifest.Count) | sources covered: $(($manifest | ForEach-Object { $_.ids.Count } | Measure-Object -Sum).Sum) | MB: $([math]::Round((($manifest | Measure-Object bytes -Sum).Sum)/1MB,1))"
if ($fail) { "FAILED ($($fail.Count)):"; $fail | ForEach-Object { "  $_" } }
