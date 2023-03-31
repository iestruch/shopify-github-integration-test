#!/bin/bash
ORIGIN_BRANCH="main"
DESTINY_BRANCH="develop"

LAST_COMMIT_INFO=$(git shortlog -1 --format=reference)
LAST_COMMIT_HASH=$(git log -1 --pretty=%h)
LAST_COMMIT_AUTHOR=$(git log -1 --pretty=%an)

if [[ ! $LAST_COMMIT_HASH ]] || [[ ! $LAST_COMMIT_AUTHOR ]]  || [[ ! $LAST_COMMIT_INFO ]];then
    >&2 echo "ERROR: No commit info available"
    exit 1
fi

echo "Processing last commit"
echo "$LAST_COMMIT_INFO"

if [ "$LAST_COMMIT_AUTHOR" == "shopify[bot]" ];then
    git config user.name  $LAST_COMMIT_AUTHOR
    git config user.email no-reply@github.com
    git checkout $DESTINY_BRANCH
    git merge origin/$ORIGIN_BRANCH
    git push origin $DESTINY_BRANCH
    echo "Shopify commit sync in $DESTINY_BRANCH correctly"
else
    echo "No commit to sync"
fi

echo "Processed correctly"