# ping-site.ps1 — Check all dse.best routes for 404s and errors
# Usage: .\scripts\ping-site.ps1
# Optional flags: -SkipBlog, -SkipSlugs, -Concurrency 10

param(
    [switch]$SkipBlog,
    [switch]$SkipSlugs,
    [int]$Concurrency = 8,
    [string]$BaseUrl = "https://dse.best"
)

$ErrorActionPreference = "SilentlyContinue"

# --- Static pages ---
$staticPaths = @(
    "/",
    "/about",
    "/privacy-policy",
    "/disclaimer",
    "/translator",
    "/eng-writing",
    "/eng-b1b2",
    "/individual-response",
    "/timer",
    "/pomodoro",
    "/timetable",
    "/chat",
    "/study-spots",
    "/countdown",
    "/countdown/2027",
    "/countdown/2028",
    "/countdown/2029",
    "/cutoff",
    "/jupas",
    "/jupas/calculator",
    "/jupas/design",
    "/jupas/bookmarks",
    "/12p",
    "/12p/study",
    "/12p/quiz",
    "/vocab",
    "/vocab/bookmarks",
    "/blog",
    "/calculator-programmes",
    "/bafs",
    "/biology",
    "/chemistry",
    "/chinese",
    "/chinese-history",
    "/citizen",
    "/economics",
    "/english",
    "/geography",
    "/history",
    "/ict",
    "/m1",
    "/m2",
    "/math",
    "/physics",
    "/ths"
)

# --- Subject year slugs (from getStaticPaths data) ---
$subjectYears = @{
    "bafs"          = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","pp","sp")
    "biology"       = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","pp","sp")
    "chemistry"     = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","pp","sp")
    "chinese"       = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","pp","sp")
    "chinese-history" = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","pp","sp")
    "citizen"       = @("2024","sp")
    "economics"     = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","pp","sp")
    "english"       = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","pp","sp")
    "geography"     = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","pp","sp")
    "history"       = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","pp","sp")
    "ict"           = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","pp","sp")
    "m1"            = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","pp","sp")
    "m2"            = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","pp","sp")
    "math"          = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","2025","pp","sp","topic")
    "physics"       = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023","2024","pp","sp")
    "ths"           = @("2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023")
}

# --- Cutoff subject slugs ---
$cutoffSubjects = @(
    "english","chinese","math","physics","chemistry","biology",
    "ict","m1","m2","geography","economics","bafs",
    "history","chinese-history","chinese-literature"
)

# --- Vocab paths ---
$vocabSections = @("social-issues","word-upgrades","intro-endings","sentence-patterns","idioms")
$vocabSets = @{
    "social-issues"    = @("ageing","ai","cashless","education","environmental-conservation","healthcare","lying-flat","social-media-addiction","youth-mental-health")
    "word-upgrades"    = @("adjectives","nouns","verbs")
    "intro-endings"    = @("closings","openings","transitions")
    "sentence-patterns"= @("concession","emphasis","hypothetical")
    "idioms"           = @("common","fixed-expressions")
}

# --- Calculator programmes slugs ---
$calcSlugs = @("casio-fx-50fh-ii","ti-nspire-cx-ii","casio-fx-cg50","casio-fx-cg20","hp-prime")

# --- Build full URL list ---
$allPaths = [System.Collections.Generic.List[string]]::new()

# Static
foreach ($p in $staticPaths) { $allPaths.Add($p) }

if (-not $SkipSlugs) {
    # Subject year pages
    foreach ($subj in $subjectYears.Keys) {
        foreach ($year in $subjectYears[$subj]) {
            $allPaths.Add("/$subj/$year")
        }
    }

    # Cutoff subject pages
    foreach ($s in $cutoffSubjects) {
        $allPaths.Add("/cutoff/$s")
    }

    # Vocab sections + sets
    foreach ($section in $vocabSections) {
        $allPaths.Add("/vocab/$section")
        foreach ($set in $vocabSets[$section]) {
            $allPaths.Add("/vocab/$section/$set")
        }
    }

    # Calculator programmes
    foreach ($slug in $calcSlugs) {
        $allPaths.Add("/calculator-programmes/$slug")
    }
}

# --- Blog posts from Sanity (optional, needs internet) ---
if (-not $SkipBlog) {
    Write-Host "Fetching blog slugs from Sanity..." -ForegroundColor Cyan
    try {
        $sanityProjectId = "8fbafbyw"
        $sanityDataset   = "production"
        $query = '*[_type == "post" && defined(slug.current)]{ "slug": slug.current }'
        $encoded = [System.Uri]::EscapeDataString($query)
        $sanityUrl = "https://$sanityProjectId.api.sanity.io/v2023-05-03/data/query/$sanityDataset`?query=$encoded"
        $resp = Invoke-RestMethod -Uri $sanityUrl -TimeoutSec 10
        foreach ($post in $resp.result) {
            $allPaths.Add("/blog/$($post.slug)")
        }
        Write-Host "  Got $($resp.result.Count) blog posts." -ForegroundColor Green
    } catch {
        Write-Host "  Blog fetch failed: $($_.Exception.Message)" -ForegroundColor Yellow
        Write-Host "  Skipping blog slugs. Use -SkipBlog to suppress this." -ForegroundColor Yellow
    }
}

$total = $allPaths.Count
Write-Host "`nPinging $total URLs on $BaseUrl (concurrency: $Concurrency)..." -ForegroundColor Cyan
Write-Host "=" * 60

# --- Results storage ---
$results = [System.Collections.Concurrent.ConcurrentBag[PSObject]]::new()
$counter = [System.Threading.SemaphoreSlim]::new($Concurrency, $Concurrency)

$jobs = @()
foreach ($path in $allPaths) {
    $url = "$BaseUrl$path"
    $jobs += [System.Threading.Tasks.Task]::Run([scriptblock]{
        param($u, $p, $bag, $sem)
        $sem.Wait()
        try {
            $sw = [System.Diagnostics.Stopwatch]::StartNew()
            try {
                $resp = Invoke-WebRequest -Uri $u -Method Head -TimeoutSec 15 -MaximumRedirection 3 -UseBasicParsing -ErrorAction Stop
                $sw.Stop()
                $bag.Add([PSCustomObject]@{
                    Path   = $p
                    Status = $resp.StatusCode
                    Ms     = $sw.ElapsedMilliseconds
                    Ok     = ($resp.StatusCode -lt 400)
                })
            } catch [Microsoft.PowerShell.Commands.HttpResponseException] {
                $sw.Stop()
                $code = [int]$_.Exception.Response.StatusCode
                $bag.Add([PSCustomObject]@{
                    Path   = $p
                    Status = $code
                    Ms     = $sw.ElapsedMilliseconds
                    Ok     = $false
                })
            } catch {
                $sw.Stop()
                $bag.Add([PSCustomObject]@{
                    Path   = $p
                    Status = "ERR"
                    Ms     = $sw.ElapsedMilliseconds
                    Ok     = $false
                })
            }
        } finally {
            $sem.Release()
        }
    }.GetNewClosure(), @($url, $path, $results, $counter))
}

# Wait with progress bar
$done = 0
while ($jobs | Where-Object { -not $_.IsCompleted }) {
    $done = ($jobs | Where-Object { $_.IsCompleted }).Count
    Write-Progress -Activity "Checking dse.best" -Status "$done / $total done" -PercentComplete ([int](($done / $total) * 100))
    Start-Sleep -Milliseconds 300
}
[System.Threading.Tasks.Task]::WaitAll($jobs)
Write-Progress -Completed -Activity "Checking dse.best"

# --- Print results ---
$sorted   = $results | Sort-Object Path
$errors   = $sorted | Where-Object { -not $_.Ok }
$ok       = $sorted | Where-Object { $_.Ok }

Write-Host "`n--- OK ($($ok.Count)) ---" -ForegroundColor Green
foreach ($r in $ok) {
    $color = if ($r.Ms -gt 3000) { "Yellow" } else { "Green" }
    Write-Host ("  [{0,3}] {1,-55} {2}ms" -f $r.Status, $r.Path, $r.Ms) -ForegroundColor $color
}

if ($errors.Count -gt 0) {
    Write-Host "`n--- ERRORS ($($errors.Count)) ---" -ForegroundColor Red
    foreach ($r in $errors) {
        Write-Host ("  [{0,3}] {1}" -f $r.Status, $r.Path) -ForegroundColor Red
    }
} else {
    Write-Host "`nAll $total paths OK!" -ForegroundColor Green
}

Write-Host "`nSummary: $($ok.Count) ok, $($errors.Count) errors / $total total"

# Export errors to file if any
if ($errors.Count -gt 0) {
    $outFile = "scripts\ping-results-$(Get-Date -Format 'yyyyMMdd-HHmm').txt"
    $errors | ForEach-Object { "$($_.Status) $BaseUrl$($_.Path)" } | Out-File $outFile
    Write-Host "Errors saved to: $outFile" -ForegroundColor Yellow
}
