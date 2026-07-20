# build
rm .output -rf

PREV_TAG=$(git rev-parse production/current)
# bugfix, secfix, refactor, docs, config changes: are patch changes.
# feature: are minor changes
# breaking: are major changes
CHANGE=patch
if git log $PREV_TAG..HEAD --grep="feature:" -i | grep -q .; then
  CHANGE=minor
fi
if git log $PREV_TAG..HEAD --grep="breaking:" -i | grep -q .; then
  CHANGE=major 
fi

# set the new release version number
npm version $CHANGE -m "Release version: %s"


