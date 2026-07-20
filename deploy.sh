rm .output -rf
npm run build
git add .output
git commit -m "config: preparing release"
PREV_TAG=$(git rev-parse production/current)
# bugfix, secfix, refactor, docs, config changes: are patch changes.
# feature: are minor changes
# breaking: are major changes
CHANGE=patch
NOTES=$(git log $PREV_TAG..HEAD)
if git log $PREV_TAG..HEAD --grep="feature:" -i | grep -q .; then
  CHANGE=minor
fi
if git log $PREV_TAG..HEAD --grep="breaking:" -i | grep -q .; then
  CHANGE=major 
fi
# delete previous production current
git tag -d production/current
git push production --delete production/current
# set the new release version number
npm version $CHANGE -m "Release version: :up-arrow: @VERSIONNUMBER"
VERSION_TAG=$(node -p -e "require('./package.json').version")
git tag -a production/current -m "Release version $VERSION_TAG"

#push
echo "Release version $VERSION_TAG"
echo "=================================" >> RELEASE_NOTES.txt
echo "Release version $VERSION_TAG" >> RELEASE_NOTES.txt
echo "------------------------------" >> RELEASE_NOTES.txt
echo $NOTES >> RELEASE_NOTES.txt

git push production production/current