# Configuration
$SourceBranch = "master"
$SourcePath = "src/clipper"

# Map branches to their specific destination paths
$BranchConfig = @{
    "astro"     = "src/clipper"
    "sveltekit" = "src/lib/clipper"
}

# Get current branch to restore later
$CurrentBranch = git branch --show-current
if (!$CurrentBranch) { $CurrentBranch = "master" }

Write-Host "Starting synchronization from $SourceBranch..." -ForegroundColor Green

foreach ($TargetBranch in $BranchConfig.Keys) {
    $TargetDir = $BranchConfig[$TargetBranch]
    Write-Host "----------------------------------------"
    Write-Host "Processing branch: $TargetBranch (Target: $TargetDir)"
    
    # Check if branch exists
    git show-ref --verify --quiet "refs/heads/$TargetBranch"
    if ($LASTEXITCODE -eq 0) {
        # Switch to target branch
        # We need to capture output to avoid noise, but checking exit code is crucial
        $checkout = git checkout "$TargetBranch" 2>&1
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Error: Could not checkout branch $TargetBranch" -ForegroundColor Red
            Write-Host $checkout
            continue
        }

        # 1. Clean the target directory to ensure no stale files
        if (Test-Path $TargetDir) {
            Remove-Item -Path $TargetDir -Recurse -Force
        }

        # 2. Checkout the source folder to its original path (stages the new files at SourcePath)
        # Note: This puts src/clipper from master into the working directory at src/clipper
        # We use strict path specs
        git checkout "$SourceBranch" -- "$SourcePath" *>$null

        # 3. If target path is different from source path, move the files
        if ($SourcePath -ne $TargetDir) {
            # Ensure target parent exists
            $TargetParent = Split-Path $TargetDir
            if (-not (Test-Path $TargetParent)) {
                New-Item -ItemType Directory -Path $TargetParent -Force *>$null
            }
            if (-not (Test-Path $TargetDir)) {
                New-Item -ItemType Directory -Path $TargetDir -Force *>$null
            }

            # Move contents
            if (Test-Path $SourcePath) {
                Get-ChildItem -Path $SourcePath | Move-Item -Destination $TargetDir -Force
                # Remove the now-empty source directory
                Remove-Item -Path $SourcePath -Force -Recurse -ErrorAction SilentlyContinue
            }
        }
        
        # Stage everything (deletes to old target, adds to new target, removes from temp source if needed)
        git add -A .
        
        # Check for changes
        git diff --quiet --exit-code --cached
        if ($LASTEXITCODE -ne 0) {
            # Commit changes
            git commit -m "chore(clipper): sync from $SourceBranch" *>$null
            Write-Host "✓ Updated $TargetDir and committed changes." -ForegroundColor Cyan
        } else {
            Write-Host "- No changes needed." -ForegroundColor Gray
        }
    } else {
        Write-Host "Warning: Branch $TargetBranch does not exist. Skipping." -ForegroundColor Yellow
    }
}

Write-Host "----------------------------------------"
# Return to original branch
if ($CurrentBranch) {
    Write-Host "Returning to $CurrentBranch..." -ForegroundColor Green
    git checkout "$CurrentBranch" *>$null
}

Write-Host "Done." -ForegroundColor Green
