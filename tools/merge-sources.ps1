# Merge sources/raw/*.json -> sources/sources.json + sources/SOURCES.md ; prints coverage counts only.
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$rawDir = Join-Path $root 'sources\raw'
$utf8 = New-Object System.Text.UTF8Encoding($false)

$allTags = @('MATH-PRECALC','MATH-CALC','MATH-LINALG','MATH-PROB','MATH-STOCH','MATH-NUMERICAL','STAT-ECONOMETRICS',
 'FIN-FOUNDATIONS','FIN-ASSETPRICING','FIN-PORTFOLIO','FIN-CORPFIN',
 'PROD-EQUITY','PROD-BOND','PROD-FUND','PROD-ETF','PROD-DERIV','PROD-STRUCTURED','PROD-ALTS',
 'TRADE-ORDERFLOW','TRADE-VENUES','TRADE-MICROSTRUCTURE','TRADE-BESTEX','TRADE-FIX','TRADE-COMMISSIONS',
 'POST-CLEARING','POST-SETTLEMENT','POST-CUSTODY','POST-CORPACTIONS','POST-TRANSFERS','POST-CONFIRMS','POST-SECLENDING','POST-MESSAGING',
 'VAL-NAV','VAL-PNL','VAL-PERFORMANCE','CREDIT-LOMBARD','CREDIT-MARGIN','CREDIT-COLLATERAL',
 'ACC-INCOME','ACC-GAINS','ACC-COA','ACC-IFRS9','ACC-FUND','ACC-TAX',
 'CLIENT-ONBOARDING','CLIENT-ACCOUNTS','CLIENT-SUITABILITY','CLIENT-WEALTH',
 'CTRL-LIMITS','CTRL-RESTRICTIONS','CTRL-APPROVALS','CTRL-RISK',
 'REG-EU','REG-US','REG-UK','REG-CH','REG-SG','REG-HK','REG-NATIONAL')
$areaNames = [ordered]@{ MATH='Mathematics'; STAT='Statistics & econometrics'; FIN='Finance theory'; PROD='Products';
 TRADE='Trading & execution'; POST='Post-trade, custody & corporate actions'; VAL='Valuation, NAV, PnL & performance';
 CREDIT='Lending, margin & collateral'; ACC='Accounting & tax'; CLIENT='Clients, onboarding & suitability';
 CTRL='Limits, restrictions, approvals & risk'; REG='Regulation' }
$tierOrder = @('foundation','core','advanced','reference')

function Test-Isbn13([string]$s) {
  if (-not $s) { return $false }
  $d = ($s -replace '[^0-9]','')
  if ($d.Length -ne 13) { return $false }
  $sum = 0
  for ($i=0; $i -lt 13; $i++) { $sum += [int]::Parse($d[$i]) * $(if ($i % 2 -eq 0) {1} else {3}) }
  return ($sum % 10 -eq 0)
}
function Norm([string]$t) { $x = ($t.ToLower() -replace '[^a-z0-9]',''); if ($x.Length -gt 50) { $x.Substring(0,50) } else { $x } }

$merged = [ordered]@{}
$badIsbn = @(); $parseErr = @()
foreach ($f in Get-ChildItem $rawDir -Filter *.json | Sort-Object Name) {
  try { $arr = [IO.File]::ReadAllText($f.FullName, $utf8) | ConvertFrom-Json } catch { $parseErr += $f.Name; continue }
  foreach ($s in $arr) {
    $s | Add-Member -NotePropertyName clusters -NotePropertyValue @($f.BaseName) -Force
    if ($s.isbn13) {
      if (-not (Test-Isbn13 $s.isbn13)) { $badIsbn += "$($f.BaseName): $($s.title) [$($s.isbn13)]"; $s.isbn13 = $null; $s.verified = $false }
      else { $s.isbn13 = ($s.isbn13 -replace '[^0-9]','') }
    }
    $key = if ($s.isbn13) { 'I' + $s.isbn13 } else { 'T' + (Norm $s.title) }
    # also collapse same normalised title even if one copy has an ISBN
    $tkey = 'T' + (Norm $s.title)
    $existingKey = $null
    if ($merged.Contains($key)) { $existingKey = $key }
    else { foreach ($k in $merged.Keys) { if (('T' + (Norm $merged[$k].title)) -eq $tkey) { $existingKey = $k; break } } }
    if ($existingKey) {
      $e = $merged[$existingKey]
      $e.topics = @(($e.topics + $s.topics) | Select-Object -Unique)
      $e.clusters = @(($e.clusters + $s.clusters) | Select-Object -Unique)
      if (-not $e.verified -and $s.verified) { foreach ($p in 'isbn13','edition','year','verified','verification_url') { $e.$p = $s.$p } }
    } else { $merged[$key] = $s }
  }
}

# stable ids: sources/ids.json maps normalised title -> id, ids are never reused; new sources get max+1
$list = @($merged.Values)
$idFile = Join-Path $root 'sources\ids.json'
$idMap = @{}
if (Test-Path $idFile) { $o = [IO.File]::ReadAllText($idFile, $utf8) | ConvertFrom-Json; foreach ($p in $o.PSObject.Properties) { $idMap[$p.Name] = $p.Value } }
$max = 0; foreach ($v in $idMap.Values) { $n = [int]($v.Substring(1)); if ($n -gt $max) { $max = $n } }
foreach ($s in ($list | Sort-Object { [array]::IndexOf($tierOrder, $_.tier) }, title)) {
  $k = Norm $s.title
  if (-not $idMap.ContainsKey($k)) { $max++; $idMap[$k] = ('S{0:D3}' -f $max) }
  $s | Add-Member -NotePropertyName id -NotePropertyValue $idMap[$k] -Force
}
$ordered = [ordered]@{}; foreach ($k in ($idMap.Keys | Sort-Object { $idMap[$_] })) { $ordered[$k] = $idMap[$k] }
[IO.File]::WriteAllText($idFile, (ConvertTo-Json -InputObject $ordered), $utf8)
$list = $list | Sort-Object id
[IO.File]::WriteAllText((Join-Path $root 'sources\sources.json'), ($list | ConvertTo-Json -Depth 6), $utf8)

# downloaded files (library/manifest.json, keyed by normalised title so it survives id renumbering)
$dl = @{}
$mf = Join-Path $root 'library\manifest.json'
if (Test-Path $mf) { foreach ($m in ([IO.File]::ReadAllText($mf, $utf8) | ConvertFrom-Json)) { foreach ($k in $m.keys) { $dl[$k] = $m.path } } }
# files the user added by hand: library/manual-manifest.json = [{ "title": "<exact source title>", "path": "<repo-relative path>" }]
$mm = Join-Path $root 'library\manual-manifest.json'
if (Test-Path $mm) { foreach ($m in ([IO.File]::ReadAllText($mm, $utf8) | ConvertFrom-Json)) { $dl[(Norm $m.title)] = $m.path } }

# markdown
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine('# Securities Academy — source list')
[void]$sb.AppendLine('')
[void]$sb.AppendLine("Generated from sources/sources.json ($($list.Count) sources). Tiers: **foundation** = first exposure; **core** = practitioner depth; **advanced** = graduate/PhD-entry; **reference** = look-up (regulation, standards, handbooks). ⚠ = edition/ISBN not independently verified. ~~Struck through~~ ✅ = free copy already downloaded into library/ ($($dl.Count) titles); 🌐 = free online-only resource (website/tool/course); ⏭ = skipped (registration-only or unreachable; a free alternative was added where one exists).")
foreach ($tier in $tierOrder) {
  $inTier = @($list | Where-Object { $_.tier -eq $tier })
  if (-not $inTier.Count) { continue }
  [void]$sb.AppendLine(''); [void]$sb.AppendLine("## $($tier.Substring(0,1).ToUpper()+$tier.Substring(1)) ($($inTier.Count))")
  foreach ($area in $areaNames.Keys) {
    $inArea = @($inTier | Where-Object { ($_.topics[0] -split '-')[0] -eq $area } | Sort-Object title)
    if (-not $inArea.Count) { continue }
    [void]$sb.AppendLine(''); [void]$sb.AppendLine("### $($areaNames[$area])")
    foreach ($s in $inArea) {
      $ed = @($s.edition, $s.year) | Where-Object { $_ } ; $edTxt = ($ed -join ', ')
      $flag = if ($s.verified) { '' } else { ' ⚠' }
      $isbn = if ($s.isbn13) { " ISBN $($s.isbn13)." } else { '' }
      $local = $dl[(Norm $s.title)]
      if ($s.skip) {
        [void]$sb.AppendLine("- ~~**$($s.id) — $($s.title)** ($edTxt) — $($s.authors).~~ ⏭ skipped: $($s.skip_reason)")
        continue
      }
      if ($s.online -and -not $local) {
        [void]$sb.AppendLine("- ~~**$($s.id) — $($s.title)** ($edTxt) — $($s.authors).~~ 🌐 online only, use in browser: <$($s.url)> *[$($s.type), $($s.jurisdiction); $($s.topics -join ' ')]*")
        continue
      }
      if ($local) {
        [void]$sb.AppendLine("- ~~**$($s.id) — $($s.title)** ($edTxt) — $($s.authors). $($s.publisher).~~ ✅ downloaded: [$(Split-Path $local -Leaf)](../$local) *[$($s.type), $($s.jurisdiction); $($s.topics -join ' ')]*")
      } else {
        [void]$sb.AppendLine("- **$($s.id) — $($s.title)** ($edTxt)$flag — $($s.authors). $($s.publisher).$isbn *[$($s.type), $($s.jurisdiction); $($s.topics -join ' ')]*")
      }
      [void]$sb.AppendLine("  $($s.why) Access: $($s.access)$(if ($s.url) { " — <$($s.url)>" })$(if ($s.notes) { " _Note: $($s.notes)_" })")
    }
  }
}
[void]$sb.AppendLine(''); [void]$sb.AppendLine('## Coverage by topic'); [void]$sb.AppendLine('')
[void]$sb.AppendLine('| Tag | foundation | core | advanced | reference | total |'); [void]$sb.AppendLine('|---|---|---|---|---|---|')
$cov = @()
foreach ($t in $allTags) {
  $hit = @($list | Where-Object { $_.topics -contains $t })
  $c = foreach ($tier in $tierOrder) { @($hit | Where-Object { $_.tier -eq $tier }).Count }
  [void]$sb.AppendLine("| $t | $($c -join ' | ') | $($hit.Count) |")
  $cov += [pscustomobject]@{ tag=$t; f=$c[0]; c=$c[1]; a=$c[2]; r=$c[3]; n=$hit.Count }
}
[IO.File]::WriteAllText((Join-Path $root 'sources\SOURCES.md'), $sb.ToString(), $utf8)

# console summary only
"TOTAL: $($list.Count) | unverified: $(@($list | Where-Object { -not $_.verified }).Count)"
"By tier: " + (($tierOrder | ForEach-Object { $t=$_; "$t=$(@($list | Where-Object { $_.tier -eq $t }).Count)" }) -join ' ')
if ($parseErr) { "PARSE ERRORS: $($parseErr -join ', ')" }
if ($badIsbn) { "BAD ISBN CHECKSUM (nulled):"; $badIsbn | ForEach-Object { "  $_" } }
"WEAK TAGS (<2 total, or 0 foundation for MATH/FIN/STAT):"
$cov | Where-Object { $_.n -lt 2 -or ($_.tag -match '^(MATH|FIN|STAT)' -and $_.f -eq 0) } | ForEach-Object { "  $($_.tag) f=$($_.f) c=$($_.c) a=$($_.a) r=$($_.r)" }
