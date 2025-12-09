
NEW_TAG_MSG=$1
VERSION_TAG=$2

CURRENT_TAG=$(git describe --tags --abbrev=0)
RELEASE_NOTES=$(git log $CURRENT_TAG..HEAD --oneline)
PROJECT=coach.juanlabrada.com
SERVER=juanlabrada.com.server

echo "Project: $PROJECT"
echo "Last tag: $CURRENT_TAG"
echo $RELEASE_NOTES

if [ -z "$VERSION_TAG" ]
then 
  echo "Getting version tag from package.json"

  VERSION_TAG=$(node -p -e "require('./package.json').version")

  if [ "$VERSION_TAG" = "undefined" ]
  then
    echo "Version missing in package.json"
    echo "usage: ./web_build_deploy.sh '<new tag message>' <version tag> "
  else
    echo "Version found '$VERSION_TAG'"
    if [ -z "$NEW_TAG_MSG" ]
    then
      echo "Missing new tag message"
      echo "usage: ./web_build_deploy.sh '<new tag message>' <version tag> "
    else
      echo "Building version $VERSION_TAG"
      ./web_build.sh $VERSION_TAG "$NEW_TAG_MSG" $PROJECT
      ./web_deploy.sh $PROJECT $SERVER
    fi
  fi
else 
  echo "---$VERSION_TAG---"
fi

