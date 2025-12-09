GIT_HASH=$(git rev-parse --short HEAD)
GIT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
GIT_TAG=$(git describe --tags)
echo "import { Injectable } from '@nestjs/common';\n @Injectable()\nexport class AppService {\n  getHello(): string {\n    return 'Version $GIT_TAG ($GIT_BRANCH)';\n  }\n}" > src/app.service.ts
echo "Version $GIT_TAG ($GIT_BRANCH)" > version.txt
rm services.juanlabrada.com.tar
echo "Building..."
npm run build
rm .output -rf

mkdir .output
mv dist .output/server  
cp package.json .output/server
cd .output/server
echo "Installing..."
npm install --omit=dev
cd ../..

echo "Compressing..."
tar -czf services.juanlabrada.com.tar .output
cp services.juanlabrada.com.tar ../../aws-config
cd ../../aws-config

echo "Deploying..."
./copy_ssh.sh . services.juanlabrada.com.tar nuc.server

