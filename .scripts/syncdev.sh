#!/bin/bash
ORIGIN_BRANCH="main"
DESTINY_BRANCH="develop"

LAST_COMMIT_SHORT=$(git log -1 --oneline)
LAST_COMMIT_HASH=$(git log -1 --pretty=%h)
LAST_COMMIT_MESSAGE=$(git log -1 --pretty=%s)
LAST_COMMIT_AUTHOR=$(git log -1 --pretty=%an)

echo "Commit: $LAST_COMMIT_SHORT"
echo "branches: $(git branch)"
echo $(git status -b | grep "On branch")
echo "Processing last commit"
echo "$LAST_COMMIT_HASH | $LAST_COMMIT_AUTHOR - $LAST_COMMIT_MESSAGE"

if [ "$LAST_COMMIT_AUTHOR" == "shopify[bot]" ];then
    git checkout origin/develop
    # git cherry-pick $LAST_COMMIT_HASH
    git merge origin/main
    git push origin develop
    echo "Shopify commit sync in $DESTINY_BRANCH correctly"
else
    echo "No commit to sync"
fi

echo "Processed correctly"