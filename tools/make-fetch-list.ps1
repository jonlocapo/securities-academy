# Writes library/TO-FETCH-MANUALLY.md: free sources not in library/manifest.json or library/manual-manifest.json.
$root = Split-Path -Parent $PSScriptRoot
$u = New-Object System.Text.UTF8Encoding($false)
function Norm([string]$t) { $x = ($t.ToLower() -replace '[^a-z0-9]',''); if ($x.Length -gt 50) { $x.Substring(0,50) } else { $x } }
$have = @{}
foreach ($m in ([IO.File]::ReadAllText("$root\library\manifest.json", $u) | ConvertFrom-Json)) { foreach ($k in $m.keys) { $have[$k] = 1 } }
$mm = "$root\library\manual-manifest.json"
if (Test-Path $mm) { foreach ($m in ([IO.File]::ReadAllText($mm, $u) | ConvertFrom-Json)) { $have[(Norm $m.title)] = 1 } }
$why = @{}
foreach ($f in Get-ChildItem "$root\sources\download" -Filter 'resolved-*.json') {
  foreach ($x in ([IO.File]::ReadAllText($f.FullName, $u) | ConvertFrom-Json)) { if (-not $why[$x.id] -or $x.download_url) { $why[$x.id] = $x.reason } }
}
$todo = @(foreach ($s in ([IO.File]::ReadAllText("$root\sources\sources.json", $u) | ConvertFrom-Json)) { if ($s.free -and -not $s.skip -and -not $s.online -and -not $have[(Norm $s.title)]) { $s } })
$sb = New-Object System.Text.StringBuilder
[void]$sb.AppendLine("# Free sources not auto-downloaded ($($todo.Count))`n")
[void]$sb.AppendLine("Free, but the site blocks scripts, needs a free login, or is a whole website/online tool. Open in your browser. Drop any file you fetch into library/ and ask Claude to file it.`n")
foreach ($s in $todo) {
  $r = if ($why[$s.id]) { $why[$s.id] } else { 'site blocks automated download' }
  if ($s.notes -and $s.title -like '*Interactive Single Rulebook*') { $r = $s.notes }
  [void]$sb.AppendLine("- **$($s.id) $($s.title)** - <$($s.url)> _($r)_")
}
[IO.File]::WriteAllText("$root\library\TO-FETCH-MANUALLY.md", $sb.ToString(), $u)
"manual list: $($todo.Count)"
