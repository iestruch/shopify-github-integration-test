#!/bin/bash
ORIGIN_BRANCH="main"
DESTINY_BRANCH="develop"

LAST_COMMIT_INFO=$(git log -1 --format=reference)
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
    if ! git merge origin/$ORIGIN_BRANCH ; then
        >&2 echo "ERROR: Failed to merge '$ORIGIN_BRANCH' in '$DESTINY_BRANCH'"
        exit 1
    fi
    if ! git push origin $DESTINY_BRANCH ; then
        >&2 echo "ERROR: Failed to push merge operation to '$DESTINY_BRANCH'"
        exit 1
    fi
    echo "Shopify commit sync in $DESTINY_BRANCH correctly"
else
    echo "No commit to sync"
fi

echo "Processed correctly"