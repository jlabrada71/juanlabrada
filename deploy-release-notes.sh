
VERSION_TAG=$(node -p -e "require('./package.json').version")
git tag -a production/current -m "Release version $VERSION_TAG"

#push
echo "Release version $VERSION_TAG"
echo "=================================" >> RELEASE_NOTES.txt
echo "Release version $VERSION_TAG" >> RELEASE_NOTES.txt
echo "------------------------------" >> RELEASE_NOTES.txt
echo $NOTES >> RELEASE_NOTES.txt

