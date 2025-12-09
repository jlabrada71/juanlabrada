
NEW_TAG_MSG=$1
VERSION_TAG=$2

CURRENT_TAG=$(git describe --tags --abbrev=0)
RELEASE_NOTES=$(git log $CURRENT_TAG..HEAD --oneline)
IS_BUGFIX=$(echo $RELEASE_NOTES | grep -i "bugfix:")
IS_FEATURE=$(echo $RELEASE_NOTES | grep -i "feature:")
IS_BREAKING=$(echo $RELEASE_NOTES | grep -i "breaking:")
PROJECT=docs.juanlabrada.com
SERVER=juanlabrada.com.server
CHANGE="patch"
if [ ! -z "$IS_FEATURE" ]
then
  CHANGE="minor"
fi
if [ ! -z "$IS_BREAKING" ]
then
  CHANGE="major"
fi

echo "Project: $PROJECT"
echo "Last tag: $CURRENT_TAG"
echo "Release notes:"
echo $RELEASE_NOTES

if [ -z "$VERSION_TAG" ]
then 
  if [ -z "$NEW_TAG_MSG" ]
  then
    echo "Missing new tag message"
    echo "usage: ./web_build_deploy.sh '<new tag message>' <version tag> "

  else
    echo "Bumping version $CHANGE"
    npm version $CHANGE 
    echo "Getting version tag from package.json"

    VERSION_TAG=$(node -p -e "require('./package.json').version")

    if [ "$VERSION_TAG" = "undefined" ]
    then
      echo "Version missing in package.json"
      echo "usage: ./web_build_deploy.sh '<new tag message>' <version tag> "
    else
      echo "Version found '$VERSION_TAG'"
      
      echo "Building version $VERSION_TAG"
      ./web_build.sh $VERSION_TAG "$NEW_TAG_MSG" $PROJECT
      ./web_deploy.sh $PROJECT $SERVER
    fi
  fi
else 
  echo "---$VERSION_TAG---"
fi

