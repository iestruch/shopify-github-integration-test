#!/bin/bash
ORIGIN_BRANCH="main"
DESTINY_BRANCH="develop"

LAST_COMMIT_HASH=$(git log -1 --pretty=%h)
LAST_COMMIT_BODY=$(git log -1 --pretty=%b)
LAST_COMMIT_AUTHOR=$(git log -1 --pretty=%an)

echo $(git status -b | grep "On branch")
echo "Processing last commit"
echo "$LAST_COMMIT_HASH | $LAST_COMMIT_AUTHOR - $LAST_COMMIT_BODY"

if [ "$LAST_COMMIT_AUTHOR" == "shopify[bot]" ];then
    git checkout develop
    # git cherry-pick $LAST_COMMIT_HASH
    git merge origin/main
    git push origin develop
    echo "Shopify commit sync in $DESTINY_BRANCH correctly"
else
    echo "No commit to sync"
fi

echo "Processed correctly"