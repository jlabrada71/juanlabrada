PTH=$(pwd)
echo $PTH
PROJECT=$1
SERVER=$2

cd /mnt/data/sources/aws-connect
./copy_ssh.sh $PTH $PROJECT.tar $SERVER
server=`cat $SERVER`
# ssh -i ~/.ssh/aws-juanlabrada.com.pem $server './new_deploy.sh'
# ssh -i ~/.ssh/aws-juanlabrada.com.pem $server './test.sh'
cd $PTH
