# get release notes
PREV_TAG=$(git rev-parse production/current)
NOTES=$(git log $PREV_TAG..HEAD)

git add .output
git commit -m "config: preparing release"

# delete previous production current
git tag -d production/current
git push production --delete production/current

# update  production current
VERSION_TAG=$(node -p -e "require('./package.json').version")
git tag -a production/current -m "Release version $VERSION_TAG"

#push
echo "Release version $VERSION_TAG"
echo "=================================" >> RELEASE_NOTES.txt
echo "Release version $VERSION_TAG" >> RELEASE_NOTES.txt
echo "------------------------------" >> RELEASE_NOTES.txt
echo $NOTES >> RELEASE_NOTES.txt
git push production production/current

