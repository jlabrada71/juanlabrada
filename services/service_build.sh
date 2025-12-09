GIT_HASH=$(git rev-parse --short HEAD)
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
CURRENT_TAG=$(git describe --tags --abbrev=0)
PACKAGE_VERSION=$(node -p -e "require('./package.json').version")
VERSION_TAG=$1
NEW_TAG=$VERSION_TAG-$GIT_HASH
NEW_TAG_MSG=$2
PTH=$(pwd)
echo $PTH
PROJECT=$3

RELEASE_NOTES=$(git log $CURRENT_TAG..HEAD --oneline)

echo "Last tag: $CURRENT_TAG"
echo $RELEASE_NOTES

if [ -z "$NEW_TAG" ]
then 
  echo "usage: ./service_build.sh <version tag> '<new tag message>' <project>"
else
  if [ -z "$NEW_TAG_MSG" ]
  then
    echo "usage: ./service_build.sh <new tag> '<new tag message>'  <project>"
  else
    echo "New tag: $NEW_TAG"
    
    if [ "$CURRENT_TAG" != "$NEW_TAG" ]
    then
      echo '=============' >> RELEASE_NOTES.txt
      echo "$NEW_TAG => $NEW_TAG_MSG" >> RELEASE_NOTES.txt
      echo '---------' >> RELEASE_NOTES.txt
      echo $RELEASE_NOTES >> RELEASE_NOTES.txt
      echo "import { Injectable } from '@nestjs/common';\n@Injectable()\nexport class AppService {\n  getVersion(): string {\n    return 'Version $NEW_TAG ($GIT_BRANCH)';\n  }" > src/app.service.ts
      echo "  getEnv(key: string): string { \n     return process.env[key]; \n  }\n}" >> src/app.service.ts
      echo "Version $NEW_TAG ($GIT_BRANCH)" > version.txt
      git add version.txt
      git add RELEASE_NOTES.txt
      git add src/app.service.ts
      git commit -m "Creating release $NEW_TAG $NEW_TAG_MSG"
      echo $NEW_TAG_MSG
      git tag -a $NEW_TAG  -m "$NEW_TAG_MSG" 
    else
      echo "Last tag: $GIT_TAG_ABBR == $NEW_TAG"
      echo "No changes to commit"
      echo "No tag created"
    fi
    
    echo "Building project $PROJECT.tar"
    npm run build > build.log
    rm .output -rf
    mkdir .output
    mv dist .output/server  
    cp package.json .output/server
    cd .output/server
    npm install --omit=dev
    cd ../..
    
    tar -czf $PROJECT.tar .output
    echo "Building project $PROJECT.tar done"
  fi
fi
